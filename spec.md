# Casa Fácil

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Single-page React landing page with smooth scroll navigation
- Header with logo and nav buttons (Pedir Orçamento, WhatsApp)
- Hero section with title, subtitle, and two CTA buttons
- Services section with 8 service cards
- Como Funciona section with 3 steps
- Quote form with conditional subcategory field for Móveis
- On form submit: build WhatsApp message and open wa.me link (no server)
- Sobre Nós section with company description
- Footer with brand name and copyright
- Fixed floating WhatsApp button bottom-right

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Create App.tsx as single-page component with all sections
2. Implement smooth scroll to form anchor on CTA button clicks
3. Implement conditional subcategory select (shown only when Móveis is selected)
4. Implement WhatsApp form submission logic with encodeURIComponent
5. Add fixed floating WhatsApp FAB button
6. Apply mobile-first responsive layout with Tailwind CSS
