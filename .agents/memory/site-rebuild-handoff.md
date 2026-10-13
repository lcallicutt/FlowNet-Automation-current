---
name: FlowNet site rebuild handoff
description: Covers how the new FlowNet site relates to the older FlowNet Automation website.
---

Treat the current FlowNet Automation web artifact as a fresh rebuild. Keep the older website untouched until the user approves the new site.

**Why:** The user explicitly wanted to avoid accidentally building inside or overwriting an old FlowNet Automation website.

**How to apply:** Develop and review the new site independently. Only after approval should the new build be connected to the canonical domain, and the future GHL funnel should replace the temporary on-site Tech Care request destination.

When the user approves a canonical domain, update search-facing identity URLs together, including structured data, rather than leaving the temporary published address as the organization's identity.

**Why:** The current rebuild can have a verified public deployment URL without that URL being the business's final canonical domain.

**How to apply:** Coordinate the domain change with metadata, sitemaps, and structured data as one release.