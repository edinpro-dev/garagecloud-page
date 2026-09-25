/*
 * The site is static; this Worker only answers POST /api/waitlist (wrangler's
 * `run_worker_first` sends nothing else here) and relays the native waiting-list
 * form to the HighLevel form it replaced.
 *
 * It posts to the same endpoint HighLevel's own embed uses, with the same field
 * keys, so submissions still land as submissions of that form and any workflow
 * triggered by it keeps firing. The browser can't call HighLevel directly: its
 * forms backend refuses cross-origin requests, so the page would never learn
 * whether a signup went through.
 *
 * ⚠️ The endpoint is the one the embed calls, not a documented public API. If
 * HighLevel changes it, signups fail loudly (the page shows the error state and
 * the fallback email address) rather than silently.
 */

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const HIGHLEVEL_SUBMIT_URL = "https://backend.leadconnectorhq.com/forms/submit";
const FORM_ID = "AE1hYyVQNf8NXq5m41q1";
const LOCATION_ID = "htgRrR14ABUfmresSIqQ";

/*
 * Field keys, read from the form's own definition in the builder.
 *
 * ⚠️ The builder currently maps "Email address" onto the contact's first name
 * and "Business name" onto the last name. The standard `email` and
 * `organization` keys are sent as well so the contact record gets both; once
 * the builder's fields are remapped, the first_name/last_name lines can go.
 */
const FIELD = {
  emailAsFirstName: "first_name",
  businessAsLastName: "last_name",
  businessType: "1ATU88NWxEBwwgrDV0WW",
  consent: "terms_and_conditions",
} as const;

// Must match the dropdown options in the builder exactly.
const BUSINESS_TYPES = new Set([
  "Independent garage",
  "MOT test centre",
  "Mobile mechanic / tyre fitter",
  "Auto locksmith",
  "Fleet service",
  "Other",
]);

const CONSENT_TEXT = "I agree to be emailed about the GarageCloud launch. Read our privacy page.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

async function handleWaitlist(request: Request): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400);
  }

  const read = (key: string) => String(form.get(key) ?? "").trim();

  // Honeypot: a field people never see. Bots that fill it get a quiet success.
  if (read("website")) return json({ ok: true });

  const email = read("email").toLowerCase();
  const business = read("business").slice(0, 200);
  const businessType = read("businessType");
  const consent = read("consent") === "yes";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }
  if (businessType && !BUSINESS_TYPES.has(businessType)) {
    return json({ ok: false, error: "invalid_business_type" }, 400);
  }
  if (!consent) {
    return json({ ok: false, error: "consent_required" }, 400);
  }

  const pageUrl = request.headers.get("referer") ?? "https://garagecloud.co/";

  const formData: Record<string, unknown> = {
    [FIELD.emailAsFirstName]: email,
    email,
    [FIELD.consent]: CONSENT_TEXT,
    formId: FORM_ID,
    location_id: LOCATION_ID,
    eventData: {
      source: "direct",
      url: pageUrl,
      page: { url: pageUrl, title: "GarageCloud" },
      medium: "form",
      mediumId: FORM_ID,
      timestamp: Date.now(),
    },
  };
  if (business) {
    formData[FIELD.businessAsLastName] = business;
    formData.organization = business;
  }
  if (businessType) formData[FIELD.businessType] = businessType;

  const body = new FormData();
  body.set("formData", JSON.stringify(formData));
  body.append("locationId", LOCATION_ID);
  body.append("formId", FORM_ID);

  const upstream = await fetch(`${HIGHLEVEL_SUBMIT_URL}?formId=${FORM_ID}&locationId=${LOCATION_ID}`, {
    method: "POST",
    body,
  });

  if (!upstream.ok) {
    console.error("HighLevel submit failed", upstream.status, await upstream.text().catch(() => ""));
    return json({ ok: false, error: "upstream_failed" }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/waitlist") {
      if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);
      return handleWaitlist(request);
    }

    return env.ASSETS.fetch(request);
  },
};
