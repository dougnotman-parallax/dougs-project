# Aura Design System - Analysis Summary

## Overview
Analysis of the "WIP - Aura Library" Figma file reveals a comprehensive, well-structured design system built on CSS variables and semantic naming conventions. The system emphasizes consistency, accessibility, and scalability.

---

## Typography

### Font Family
- **Primary Font**: `Inter` (sans-serif)
- **Fallback**: `'Inter:400', sans-serif` or `'Inter:500', sans-serif`
- **Special Cases**: `'Space_Grotesk:Medium', sans-serif` (used for large headings, 64px)

### Typography Scale

| Style | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `text/xs` | 12px | 400 (regular) | 14px (`leading/14`) | -0.1px (`tracking/tightest`) | Small labels, badges |
| `text/xs` | 12px | 500 (medium) | 14px (`leading/14`) | -0.08px (`tracking/tighter`) | Small emphasized text |
| `text/sm` | 14px | 400 (regular) | 18px (`leading/18`) | -0.04px (`tracking/tight`) | Secondary text, metadata |
| `text/sm` | 14px | 500 (medium) | 18px (`leading/18`) | 0px (`tracking/normal`) | Medium emphasis |
| `text/base` | 16px | 400 (regular) | 20px (`leading/20`) | -0.1px (`tracking/tightest`) | Body text, primary content |
| `text/base` | 16px | 500 (medium) | 20px (`leading/20`) | -0.08px (`tracking/tighter`) | Emphasized body text |
| `text/2xl` | 24px | 400 (regular) | 28px (`leading/28`) | -0.1px (`tracking/tightest`) | Large headings, descriptions |

### Font Weights
- **400 (Regular)**: Default body text, labels
- **500 (Medium)**: Emphasized text, button labels, section headers

### Letter Spacing Scale
- `tracking/tightest`: -0.1px (most compact)
- `tracking/tighter`: -0.08px
- `tracking/tight`: -0.04px
- `tracking/normal`: 0px (default)

---

## Color System

### CSS Variable Structure
The design system uses CSS variables with semantic naming: `var(--category/property, fallback)`

### Color Categories

#### Foreground Colors
- `--foreground`: `#111213` (dark text, light mode)
- `--foreground`: `#f1f2f3` (light text, dark mode)
- `--muted-foreground`: `#5e666d` (light mode) / `#bbc0c4` (dark mode)
- `--card-forground`: `#111213` (light mode) / `#f1f2f3` (dark mode)

#### Background Colors
- `--background`: `white` (light mode) / `#111213` (dark mode)
- `--card`: `#f9fafa` (light mode) / `#212426` (dark mode)
- `--accent`: `#f1f2f3`
- `--disabled`: `#f1f2f3`

#### Border Colors
- `--border`: `#e4e6e8`
- Border width: `var(--border-width/1, 1px)`

#### Decorative Colors
- `--decorative/background/nordic`: `#b4f2e5` (light) / `#7fe9d2` (dark)
- `--decorative/foreground/nordic`: `#0d4e40`
- `--decorative/background/mountain`: `#e4e6e8`
- `--decorative/foreground/mountain`: `#40464a`

#### Interactive States
- `--toggled`: `#e2e5f4` (light) / `#5d70c0` (dark)
- `--toggled-foreground`: `#32417f` (light) / `#f0f2f9` (dark)

#### Chart Colors
- `--chart/fjord/solid`: `#2f55ea` (light) / `#aebdf7` (dark)
- `--chart/fjord/opacity-2`: `rgba(47,85,234,0.65)` (light) / `rgba(174,189,247,0.65)` (dark)

---

## Spacing System

### Spacing Scale
The system uses a consistent spacing scale referenced via CSS variables:

| Variable | Value | Usage |
|----------|-------|-------|
| `--spacing/4` | 4px | Tight spacing, icon gaps |
| `--spacing/8` | 8px | Small gaps, component padding |
| `--spacing/12` | 12px | Medium gaps |
| `--spacing/16` | 16px | Standard gaps, section spacing |
| `--spacing/24` | 24px | Large gaps, section padding |
| `--spacing/48` | 48px | Extra large spacing |

### Padding Scale
- `--padding/p-4`: 4px
- `--padding/p-6`: 6px
- `--padding/p-8`: 8px
- `--padding/p-12`: 12px
- `--padding/p-16`: 16px

### Margin Scale
- `--margin/m-8`: 8px
- `--margin/m-12`: 12px
- `--margin/m-16`: 16px
- `--margin/m-40`: 40px

### Special Spacing
- `--ai-chat/user-padding`: 80px (user message padding)
- `--ai-chat/agent-response-padding`: 40px (agent response padding)

---

## Border Radius

| Variable | Value | Usage |
|----------|-------|-------|
| `--radius/xs` | 2px | Small elements, chart legends |
| `--radius/sm` | 4px | Buttons, small components, avatars |
| `--radius/md` | 6px | Cards, badges, inputs |
| `--radius/lg` | 8px | Larger cards, containers |
| `--radius/xl` | 12px | Large containers, sections |
| `--radius/2xl` | 16px | Extra large containers |

---

## Component Patterns

### Buttons
- **Size**: `28px` height (standard), `size-[28px]`
- **Border Radius**: `--radius/sm` (4px)
- **Icon Size**: `16px` (`size-[16px]`)
- **States**: Default, hover, disabled, toggled
- **Variants**: Icon-only, text with icon, text-only

### Badges/Chips
- **Height**: `20px`
- **Padding**: `px-[6px]` horizontal, `h-[20px]` vertical
- **Border Radius**: `--radius/md` (6px)
- **Icon Size**: `12px` within badges
- **Text**: `text-xs` (12px), medium weight (500)

### Cards
- **Background**: `--card` color
- **Padding**: `p-[16px]` standard
- **Border Radius**: `--radius/lg` (8px) or `--radius/md` (6px)
- **Spacing**: `gap-[16px]` for internal elements

### Input Fields
- **Padding**: `p-[12px]` standard
- **Border**: `1px solid var(--border)`
- **Border Radius**: `--radius/xl` (12px)
- **Height**: Flexible based on content

### Avatars
- **Size**: `28px` standard (`size-[28px]`)
- **Border Radius**: `--radius/sm` (4px)
- **Icon Size**: `16px` within avatar

### Messages (Chat)
- **Padding**: `px-[8px] py-[8px]`
- **Border Radius**: `--radius/md` (6px)
- **Background**: `--card` color
- **Text Alignment**: Right for user, left for agent

---

## Shadows

### Shadow System
- **Light Mode**: `shadow-[0px_2px_4px_0px_var(--effect/shadow-lg,rgba(0,0,0,0.06)),0px_4px_6px_0px_var(--effect/shadow-xl,rgba(0,0,0,0.1))]`
- **Dark Mode**: `shadow-[0px_2px_4px_0px_var(--effect/shadow-lg,rgba(0,0,0,0.4)),0px_4px_6px_0px_var(--effect/shadow-xl,rgba(0,0,0,0.6))]`

---

## Design Tokens Summary

### Key Principles
1. **Semantic Naming**: All tokens use descriptive, semantic names (e.g., `--foreground`, `--muted-foreground`)
2. **Fallback Values**: Every CSS variable includes a fallback value
3. **Theme Support**: System supports both light and dark modes with variable overrides
4. **Consistent Scale**: Spacing, typography, and sizing follow consistent scales
5. **Component-Based**: Tokens are organized by component and property type

### Implementation Notes
- Uses CSS custom properties (CSS variables) extensively
- Tailwind CSS classes are used but can be converted to other systems
- React components follow a consistent pattern with TypeScript props
- Icons are typically 16px for standard use, 12px for badges
- All measurements use pixel values, but can be converted to rem/em

---

## Recommendations for Implementation

1. **Create a Design Tokens File**: Export all CSS variables to a central tokens file
2. **TypeScript Types**: Generate TypeScript types for all design tokens
3. **Theme Provider**: Implement a theme provider for light/dark mode switching
4. **Component Library**: Build reusable components following the patterns observed
5. **Documentation**: Document each token's usage and when to use alternatives

---

## Component Inventory Observed

- **AI Chat Components**: Input, messages, tool calls, reasoning, suggestions
- **Buttons**: Various sizes and states
- **Badges**: Default, decorative variants
- **Cards**: Standard, chart containers
- **Avatars**: With icons/logos
- **Charts**: With headers, legends, tooltips
- **Collapsible/Accordion**: Expandable sections
- **Icons**: Comprehensive icon set (Lucide-based)

---

*Analysis Date: Based on Figma file "WIP - Aura Library"*
*Source: Figma Design Context API*
