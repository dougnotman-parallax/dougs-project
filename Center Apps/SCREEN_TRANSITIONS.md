# Screen Transition Strategy Documentation

## Overview

This document outlines the code strategy for implementing smooth, parallax-style screen transitions with fade-in animations. This approach creates a polished, professional feel as elements gracefully ease into view when screens load.

## Core Animation System

### CSS Keyframes

The foundation of our transition system is the `fadeInUp` keyframe animation:

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**Properties:**
- **Duration**: 0.8 seconds
- **Easing**: `ease-out` (starts fast, ends slow)
- **Fill Mode**: `forwards` (maintains final state)
- **Initial State**: Elements start invisible (`opacity: 0`) and 30px below their final position
- **Final State**: Elements fade in and slide up to their natural position

### Animation Classes

#### Base Animation Class
```css
.animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
}
```

**Usage**: Apply this class to any element you want to animate in.

#### Delay Classes

Stagger animations by applying delay classes:

```css
.animate-delay-100 { animation-delay: 0.1s; }
.animate-delay-200 { animation-delay: 0.2s; }
.animate-delay-300 { animation-delay: 0.3s; }
.animate-delay-400 { animation-delay: 0.4s; }
.animate-delay-500 { animation-delay: 0.5s; }
.animate-delay-600 { animation-delay: 0.6s; }
.animate-delay-700 { animation-delay: 0.7s; }
.animate-delay-800 { animation-delay: 0.8s; }
```

**Best Practice**: Use increments of 100ms (0.1s) between elements for a smooth cascading effect.

## Implementation Pattern

### Step 1: Component Setup

Each screen component should include a `useEffect` hook to reset animations when the screen mounts:

```javascript
const YourScreen = ({ onNext, onPrev, onHome }) => {
    const { useEffect, useState } = React;
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        // Reset animations by removing and re-adding classes
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('.animate-fade-in-up');
            elements.forEach(el => {
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = '';
                }, 10);
            });
        }, 50);
        return () => clearTimeout(timer);
    }, []);
    
    // ... rest of component
};
```

**Why this pattern?**
- Ensures animations trigger every time the screen is visited
- Prevents animation conflicts when navigating between screens
- Small delay (50ms) ensures DOM is ready before triggering animations

### Step 2: Apply Animation Classes

Apply animation classes to elements in the order you want them to appear:

```jsx
<div className="content min-h-screen px-8 py-24 pb-32">
    {/* First element - no delay */}
    <h1 className="text-white text-4xl font-bold mb-6 animate-fade-in-up">
        Screen Title
    </h1>
    
    {/* Second element - 100ms delay */}
    <p className="text-white text-xl mb-8 animate-fade-in-up animate-delay-100">
        Description text
    </p>
    
    {/* Third element - 200ms delay */}
    <div className="flex items-center space-x-2 mb-12 animate-fade-in-up animate-delay-200">
        <Icon />
        <p>Subtitle</p>
    </div>
    
    {/* Content blocks - staggered delays */}
    <div className="space-y-6">
        <div className="rounded-xl p-2 animate-fade-in-up animate-delay-300">
            {/* Content block 1 */}
        </div>
        
        <div className="rounded-xl p-2 animate-fade-in-up animate-delay-400">
            {/* Content block 2 */}
        </div>
        
        <div className="rounded-xl p-2 animate-fade-in-up animate-delay-500">
            {/* Content block 3 */}
        </div>
    </div>
</div>
```

## Animation Timing Strategy

### Recommended Delay Sequence

1. **Title/Heading**: `animate-fade-in-up` (no delay)
2. **Subtitle/Description**: `animate-delay-100` (0.1s)
3. **Icon + Text Row**: `animate-delay-200` (0.2s)
4. **First Content Block**: `animate-delay-300` (0.3s)
5. **Second Content Block**: `animate-delay-400` (0.4s)
6. **Third Content Block**: `animate-delay-500` (0.5s)
7. **Additional Elements**: Continue in 100ms increments

### Timing Guidelines

- **Minimum delay**: 0.1s (100ms) - prevents elements from appearing simultaneously
- **Maximum delay**: 0.8s - matches animation duration for smooth flow
- **Increment**: 0.1s (100ms) - creates consistent cascading effect
- **Total animation window**: ~1.3s (0.8s animation + 0.5s max delay)

## Complete Example

Here's a complete example of a screen component with proper transitions:

```javascript
const ExampleScreen = ({ onNext, onPrev, onHome }) => {
    const { useEffect, useState } = React;
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        // Reset animations
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('.animate-fade-in-up');
            elements.forEach(el => {
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = '';
                }, 10);
            });
        }, 50);
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className="content min-h-screen px-8 py-24 pb-32">
            <Header onHomeClick={onHome} showBreadcrumb={false} />
            
            <div className="max-w-4xl mx-auto">
                {/* Title - First to appear */}
                <h1 className="text-white text-4xl font-bold mb-6 animate-fade-in-up">
                    Screen Title
                </h1>
                
                {/* Description - Second */}
                <p className="text-white text-xl mb-8 leading-relaxed animate-fade-in-up animate-delay-100">
                    Screen description text goes here.
                </p>
                
                {/* Icon + Text - Third */}
                <div className="flex items-center space-x-2 mb-12 animate-fade-in-up animate-delay-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        {/* SVG icon */}
                    </svg>
                    <p className="text-white text-lg">Supporting text</p>
                </div>
                
                {/* Content Blocks - Staggered */}
                <div className="space-y-6">
                    <div className="rounded-xl p-2 animate-fade-in-up animate-delay-300">
                        <h3 className="text-white font-bold text-xl mb-2">Block 1</h3>
                        <p className="text-white/70">Content...</p>
                    </div>
                    
                    <div className="rounded-xl p-2 animate-fade-in-up animate-delay-400">
                        <h3 className="text-white font-bold text-xl mb-2">Block 2</h3>
                        <p className="text-white/70">Content...</p>
                    </div>
                    
                    <div className="rounded-xl p-2 animate-fade-in-up animate-delay-500">
                        <h3 className="text-white font-bold text-xl mb-2">Block 3</h3>
                        <p className="text-white/70">Content...</p>
                    </div>
                </div>
            </div>
            
            <BottomNav 
                onPrev={onPrev} 
                onNext={onNext} 
                currentPage={1} 
                totalPages={3} 
            />
        </div>
    );
};
```

## Best Practices

### ✅ Do's

1. **Always include the reset useEffect** - Ensures animations work on every visit
2. **Use consistent delay increments** - Stick to 100ms (0.1s) increments
3. **Start with no delay** - First element should have no delay
4. **Animate in logical order** - Title → Description → Content blocks
5. **Group related elements** - Use same delay for elements that should appear together
6. **Keep delays under 0.8s** - Don't exceed animation duration

### ❌ Don'ts

1. **Don't skip the reset useEffect** - Animations won't retrigger on navigation
2. **Don't use random delays** - Maintain consistent timing
3. **Don't animate everything at once** - Stagger for better visual flow
4. **Don't exceed 0.8s delays** - Creates awkward pauses
5. **Don't forget the base class** - Always include `animate-fade-in-up`

## Customization

### Adjusting Animation Speed

To make animations faster or slower, modify the keyframe duration:

```css
.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards; /* Faster */
    /* or */
    animation: fadeInUp 1.0s ease-out forwards; /* Slower */
    opacity: 0;
}
```

### Adjusting Movement Distance

To change how far elements move up:

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px); /* Less movement */
        /* or */
        transform: translateY(50px); /* More movement */
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Creating New Delay Classes

To add more granular control:

```css
.animate-delay-50 { animation-delay: 0.05s; }
.animate-delay-150 { animation-delay: 0.15s; }
.animate-delay-250 { animation-delay: 0.25s; }
/* etc. */
```

## Troubleshooting

### Animations Not Triggering

1. **Check useEffect is included** - Must reset animations on mount
2. **Verify classes are applied** - Both `animate-fade-in-up` and delay class
3. **Check timing** - Ensure 50ms delay in useEffect is sufficient
4. **Verify CSS is loaded** - Check that stylesheet includes animation definitions

### Elements Appearing Too Fast/Slow

- **Too fast**: Increase delay increments (use 150ms or 200ms)
- **Too slow**: Decrease delay increments (use 50ms) or reduce animation duration

### Animation Conflicts

- **Multiple screens**: Each screen should have its own useEffect reset
- **Navigation issues**: Ensure timer cleanup in useEffect return statement
- **State conflicts**: Use separate state for each screen component

## Summary

The screen transition strategy uses:
- **CSS keyframe animations** for smooth fade-in and slide-up effects
- **Staggered delays** for cascading parallax-style appearance
- **React useEffect hooks** to reset animations on screen mount
- **Consistent timing** (100ms increments) for professional polish

This creates a cohesive, polished user experience across all screens in the application.
