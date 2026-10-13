# SEO Strategy

## In scope
- Public FlowNet Automation marketing pages (`/`, `/tech-care`) and source-visible public SEO assets.

## Out of scope
- API health and form endpoints, internal mockup canvas, and authenticated/internal tooling.

## Target audience
- Organizations seeking workflow automation and AI/systems consulting; homeowners, seniors, churches, and small organizations seeking local tech help in Hampton Roads.

## Primary keywords
- Workflow automation consulting, systems consulting, tech care Hampton Roads (inferred from public copy; not user-approved targets).

## Crawler assumptions
- Public marketing pages should be discoverable, shareable, and readable in initial HTML by social and AI crawlers.
- Google can render JavaScript, but client rendering can delay indexing; do not assume social/AI crawlers execute it.

## Source architecture and domain context
- The public artifact uses React/Wouter and Vite with static production serving and a catch-all HTML rewrite. The API artifact serves API endpoints, not SSR marketing pages.
- The supplied sitemap and robots reference `https://flow-net-automation.replit.app`. Use the deployment domain as canonical until the user approves connecting the rebuild to another domain.
- Project handoff documentation says this is a fresh rebuild; keep the older website untouched until approval. Do not infer a domain migration requirement from the new artifact alone.

## Dismissed categories
- (None yet)
