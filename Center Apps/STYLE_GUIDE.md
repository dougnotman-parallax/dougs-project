# Typography Style Guide
## Based on Screen 1 - "What is MoonShot?"

This style guide documents the font styles used in Screen 1 and provides standardized typography classes for building new screens.

---

## Font Family
- **Primary Font**: Inter (sans-serif)
- Imported via Google Fonts: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`

---

## Heading Styles

### H1 - Main Page Title
**Usage**: Primary page/screen title
```html
<h1 className="text-white text-4xl font-bold mb-6">Page Title</h1>
```
- **Size**: `text-4xl` (2.25rem / 36px)
- **Weight**: `font-bold` (700)
- **Color**: `text-white`
- **Margin Bottom**: `mb-6` (1.5rem / 24px)

**Example from Screen 1**: "What is MoonShot?"

---

### H2 - Section Headings
**Usage**: Major section titles, secondary headings
```html
<h2 className="text-white text-2xl font-bold mb-4">Section Title</h2>
```
- **Size**: `text-2xl` (1.5rem / 24px)
- **Weight**: `font-bold` (700)
- **Color**: `text-white`
- **Margin Bottom**: `mb-4` (1rem / 16px)

**Note**: H2 can also be used with colored text for emphasis:
```html
<h2 className="text-blue-400 text-2xl font-bold mb-4">Colored Section Title</h2>
```

---

### H3 - Card/Item Titles
**Usage**: Card titles, list item headings, subsection titles
```html
<h3 className="text-white font-bold text-xl mb-2">Card Title</h3>
```
- **Size**: `text-xl` (1.25rem / 20px)
- **Weight**: `font-bold` (700)
- **Color**: `text-white`
- **Margin Bottom**: `mb-2` (0.5rem / 8px)

**Example from Screen 1**: "Value Assurance", "Beyond Pilots", "P&L Impact"

**Colored Variants** (for emphasis):
```html
<h3 className="text-blue-400 font-bold text-xl mb-2">Colored Title</h3>
<h3 className="text-red-400 font-bold text-xl mb-2">Red Title</h3>
<h3 className="text-green-400 font-bold text-xl mb-2">Green Title</h3>
```

---

### H4 - Subsection Headings
**Usage**: Minor headings, labels, small section titles
```html
<h4 className="text-white font-semibold text-lg mb-2">Subsection Title</h4>
```
- **Size**: `text-lg` (1.125rem / 18px)
- **Weight**: `font-semibold` (600)
- **Color**: `text-white`
- **Margin Bottom**: `mb-2` (0.5rem / 8px)

**Alternative (lighter weight)**:
```html
<h4 className="text-white font-medium text-lg mb-2">Subsection Title</h4>
```

---

## Paragraph Styles

### P - Main Body Text
**Usage**: Primary paragraph text, descriptions
```html
<p className="text-white text-xl mb-8 leading-relaxed">Main paragraph text content.</p>
```
- **Size**: `text-xl` (1.25rem / 20px)
- **Weight**: `font-normal` (400) - default
- **Color**: `text-white`
- **Line Height**: `leading-relaxed` (1.625)
- **Margin Bottom**: `mb-8` (2rem / 32px)

**Example from Screen 1**: Main description paragraph

---

### P - Card Description Text
**Usage**: Descriptions within cards, secondary text
```html
<p className="text-white/70">Card description text with reduced opacity.</p>
```
- **Size**: Default (1rem / 16px)
- **Weight**: `font-normal` (400) - default
- **Color**: `text-white/70` (70% opacity)
- **Margin**: None (controlled by parent)

**Example from Screen 1**: Card descriptions under "Value Assurance", "Beyond Pilots", "P&L Impact"

---

### P - Small Text / Captions
**Usage**: Small captions, metadata, fine print
```html
<p className="text-white/70 text-sm">Small caption text</p>
```
- **Size**: `text-sm` (0.875rem / 14px)
- **Weight**: `font-normal` (400) - default
- **Color**: `text-white/70` (70% opacity)

---

## Text Utilities

### Text Colors
- **Primary White**: `text-white`
- **Primary White (70% opacity)**: `text-white/70`
- **Primary White (90% opacity)**: `text-white/90`
- **Blue Accent**: `text-blue-400`
- **Gray Secondary**: `text-gray-400`

### Font Weights
- **Normal**: `font-normal` (400)
- **Medium**: `font-medium` (500)
- **Semibold**: `font-semibold` (600)
- **Bold**: `font-bold` (700)
- **Extra Bold**: `font-extrabold` (800)

### Text Sizes
- **Extra Small**: `text-xs` (0.75rem / 12px)
- **Small**: `text-sm` (0.875rem / 14px)
- **Base**: `text-base` (1rem / 16px)
- **Large**: `text-lg` (1.125rem / 18px)
- **XL**: `text-xl` (1.25rem / 20px)
- **2XL**: `text-2xl` (1.5rem / 24px)
- **4XL**: `text-4xl` (2.25rem / 36px)
- **5XL**: `text-5xl` (3rem / 48px)

### Line Heights
- **Tight**: `leading-tight` (1.25)
- **Normal**: `leading-normal` (1.5)
- **Relaxed**: `leading-relaxed` (1.625)
- **Loose**: `leading-loose` (2)

---

## Usage Examples

### Complete Card Component
```html
<div className="rounded-xl p-2">
    <div className="flex items-start space-x-4">
        <div className="bg-blue-600/40 rounded-lg p-3 flex-shrink-0">
            <img src="images/icon.png" alt="Icon" className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-white font-bold text-xl mb-2">Card Title</h3>
            <p className="text-white/70">Card description text with 70% opacity.</p>
        </div>
    </div>
</div>
```

### Section with Heading and Content
```html
<div className="mb-8">
    <h2 className="text-white text-2xl font-bold mb-4">Section Title</h2>
    <p className="text-white text-xl mb-4 leading-relaxed">
        Main paragraph content goes here.
    </p>
    <p className="text-white/70">
        Secondary paragraph with reduced opacity.
    </p>
</div>
```

---

## Notes
- All text uses the Inter font family
- White text is the primary color for readability on dark backgrounds
- Opacity variations (70%, 90%) are used for hierarchy and visual distinction
- Consistent spacing (mb-2, mb-4, mb-6, mb-8) creates visual rhythm
- Bold weights are used for headings to create clear hierarchy
