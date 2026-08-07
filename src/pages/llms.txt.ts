import type { APIRoute } from "astro";
import { SITE, FEATURES, PRICING_TIERS } from "../data/site";

export const GET: APIRoute = () => {
  const featureLine = FEATURES.map((feature) => feature.title).join(", ");
  const pricingLines = PRICING_TIERS.map(
    (tier) => `- ${tier.name} — ${tier.price}/month: ${tier.tagline}`,
  ).join("\n");

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} connects ${featureLine} into one system.

## Pricing (excluding VAT)
${pricingLines}
- 14 day free trial at launch. No hidden add-ons.

## Status
Pre-launch. Onboarding from a waiting list.

## Contact
${SITE.contactEmail}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
