# Aura Design System Update Progress

## ✅ Completed Updates

### 1. CSS Variables & Design Tokens
- Added comprehensive Aura CSS variables to `:root`
- Typography scale (text-xs, text-sm, text-base, text-2xl)
- Line heights (leading-14, leading-18, leading-20, leading-28)
- Letter spacing (tracking-tightest, tracking-tighter, tracking-tight, tracking-normal)
- Spacing scale (spacing-4 through spacing-48)
- Padding scale (padding-4 through padding-16)
- Margin scale (margin-8 through margin-40)
- Border radius scale (radius-xs through radius-2xl)
- Color system with semantic naming

### 2. Utility Classes
Created Aura utility classes for consistent styling:
- `.aura-h1` - Large headings (24px, medium weight)
- `.aura-h3` - Section headings (16px, medium weight)
- `.aura-body` - Body text (16px, regular weight)
- `.aura-body-sm` - Small body text (14px, regular weight)
- `.aura-body-xs` - Extra small text (12px, regular weight)
- `.aura-label` - Labels (12px, medium weight)
- `.aura-card` - Card styling
- `.aura-button` - Button base styling

### 3. Component Updates
- **Header Component**: Updated to use Aura spacing, border radius, and typography
- **BottomNav Component**: Updated to use Aura spacing, colors, and typography
- **WhatScreen1**: Updated typography, spacing, and component styling to use Aura tokens
- **Ghost Button**: Updated to use Aura typography and spacing

## 🔄 Remaining Updates Needed

### Screens to Update
1. **WhatScreen2** - Core Principles screen
2. **WhatScreen3** - Journey to Proof screen
3. **WhyScreen1** - The Stark Reality screen
4. **WhyScreen2** - Pillars of Value Assurance screen
5. **WhyScreen3** - Behavioral Transformation screen
6. **HowScreen1** - Key Milestones screen
7. **HowScreen2** - Role Mandates screen
8. **HowScreen3** - Continuous Feedback Loop screen
9. **HomePage** - Main home page with path selection

### Patterns to Apply

#### Typography
Replace all text elements with Aura typography:
- `text-4xl` → Use `.aura-h1` or `fontSize: 'var(--text-2xl)'`
- `text-xl` → Use `.aura-body` or `fontSize: 'var(--text-base)'`
- `text-lg` → Use `.aura-body` or `fontSize: 'var(--text-base)'`
- `text-sm` → Use `.aura-body-sm` or `fontSize: 'var(--text-sm)'`
- `text-xs` → Use `.aura-body-xs` or `fontSize: 'var(--text-xs)'`

#### Spacing
Replace Tailwind spacing with Aura variables:
- `p-2` → `padding: 'var(--padding-8)'`
- `p-4` → `padding: 'var(--padding-16)'`
- `p-6` → `padding: 'var(--spacing-24)'`
- `mb-6` → `marginBottom: 'var(--spacing-24)'`
- `mb-8` → `marginBottom: 'var(--spacing-16)'`
- `mb-12` → `marginBottom: 'var(--spacing-48)'`
- `space-x-4` → `gap: 'var(--spacing-16)'`
- `space-y-6` → `gap: 'var(--spacing-24)'` (with flex-direction: column)

#### Border Radius
Replace Tailwind radius with Aura variables:
- `rounded-lg` → `borderRadius: 'var(--radius-md)'`
- `rounded-xl` → `borderRadius: 'var(--radius-xl)'`
- `rounded-2xl` → `borderRadius: 'var(--radius-2xl)'`
- `rounded-full` → Keep as is (or use large radius value)

#### Colors
Use semantic color variables where appropriate:
- Text colors: Use `var(--foreground)` or `var(--muted-foreground)`
- Backgrounds: Use `var(--card)` or `var(--background)`
- Borders: Use `var(--border)`

## 📋 Update Checklist Template

For each screen component:

```javascript
// Before (Tailwind classes)
<h1 className="text-white text-4xl font-bold mb-6">Title</h1>
<p className="text-white text-xl mb-8">Description</p>
<div className="rounded-xl p-2 space-y-6">

// After (Aura Design System)
<h1 className="text-white aura-h1" style={{ marginBottom: 'var(--spacing-24)' }}>Title</h1>
<p className="text-white aura-body" style={{ marginBottom: 'var(--spacing-16)' }}>Description</p>
<div style={{ borderRadius: 'var(--radius-xl)', padding: 'var(--padding-8)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
```

## 🎯 Key Principles

1. **Use CSS Variables**: Always prefer `var(--token-name)` over hardcoded values
2. **Semantic Naming**: Use semantic color names (foreground, muted-foreground, etc.)
3. **Consistent Spacing**: Use the spacing scale (4px, 8px, 12px, 16px, 24px, 48px)
4. **Typography Hierarchy**: Follow the typography scale consistently
5. **Border Radius**: Use the radius scale (2px, 4px, 6px, 8px, 12px, 16px)

## 📝 Notes

- The file `index-exploration.html` is now set up with Aura design tokens
- Utility classes are available for quick application
- All screens should be updated to use Aura patterns for consistency
- The original `index.html` remains unchanged for reference
