# Inactivity Reset Strategy Documentation

## Overview

This document outlines the code strategy for implementing a global inactivity timer that automatically resets the application to its initial state after a period of user inactivity. This ensures a fresh experience for subsequent users and prevents the app from staying in an intermediate state indefinitely.

## Core Concept

The inactivity reset system:
- **Monitors user activity** across all screens and views
- **Tracks inactivity** using a 30-second timer
- **Automatically resets** the app to the initial "Moonshot" button state
- **Works globally** on home screen, path screens, and all future screens
- **Resets on any user activity** (mouse, keyboard, touch, scroll, click)

## Architecture

### Global Timer Management

The inactivity timer is managed at the **App component level** (not individual screen components) to ensure it works across all screens:

```javascript
const App = () => {
    const { useRef, useEffect } = React;
    const inactivityTimerRef = useRef(null);
    
    // Timer management functions
    // Event listeners
    // Reset logic
};
```

**Why App level?**
- Single source of truth for timer state
- Works regardless of current view or screen
- Easier to maintain and debug
- Consistent behavior across all screens

## Implementation Components

### 1. Timer Reference

Use React's `useRef` to store the timer ID:

```javascript
const inactivityTimerRef = useRef(null);
```

**Why useRef?**
- Persists across re-renders without causing re-renders
- Allows clearing the timer from anywhere in the component
- Doesn't trigger re-renders when updated

### 2. Reset Function

The `resetToHomeButton` function handles the complete reset:

```javascript
const resetToHomeButton = () => {
    // Always reset navigation state first
    setCurrentView('home');
    setCurrentPath(null);
    setCurrentScreen(1);
    setHasNavigatedFromPath(false);
    
    // Hide gradient overlay
    const overlay = document.querySelector('.gradient-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
    }
    
    // Trigger reset event to fade out home page content if visible
    window.dispatchEvent(new Event('app-reset'));
};
```

**What it does:**
1. Resets all navigation state to initial values
2. Hides the gradient overlay
3. Dispatches a custom event to trigger fade-out animations
4. Returns app to initial "Moonshot" button state

### 3. Timer Reset Function

The `resetInactivityTimer` function manages the timer lifecycle:

```javascript
const resetInactivityTimer = () => {
    // Clear existing timer
    if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
    }
    
    // Set timer for 30 seconds - works on all screens
    inactivityTimerRef.current = setTimeout(() => {
        resetToHomeButton();
    }, 30000); // 30 seconds
};
```

**Key behaviors:**
- **Clears existing timer** before setting a new one (prevents multiple timers)
- **Sets 30-second timeout** that calls `resetToHomeButton` when expired
- **Called on every user activity** to reset the countdown

### 4. Activity Tracking

Track user activity using multiple event types:

```javascript
useEffect(() => {
    resetInactivityTimer();
    
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
        resetInactivityTimer();
    };
    
    // Add event listeners
    activityEvents.forEach(event => {
        window.addEventListener(event, handleActivity);
    });
    
    // Cleanup
    return () => {
        activityEvents.forEach(event => {
            window.removeEventListener(event, handleActivity);
        });
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
    };
}, [currentView, currentPath, currentScreen]);
```

**Tracked Events:**
- `mousedown` - Mouse button press
- `mousemove` - Mouse movement
- `keypress` - Keyboard input
- `scroll` - Page scrolling
- `touchstart` - Touch interaction (mobile)
- `click` - Click events

**Why multiple events?**
- Catches all forms of user interaction
- Works on desktop and mobile
- Ensures timer resets on any activity

**Dependencies:**
- `[currentView, currentPath, currentScreen]` - Re-runs when navigation changes
- Ensures timer resets when switching screens
- Prevents timer from expiring during navigation

### 5. HomePage Reset Handler

The HomePage component listens for the reset event:

```javascript
const HomePage = ({ onPathClick, showContentImmediately = false }) => {
    const { useState, useEffect } = React;
    const [contentVisible, setContentVisible] = useState(showContentImmediately);
    const [buttonVisible, setButtonVisible] = useState(!showContentImmediately);
    const [isFadingOut, setIsFadingOut] = useState(false);
    
    // Handle fade out when resetting (triggered by parent)
    useEffect(() => {
        const handleReset = () => {
            setIsFadingOut(true);
            const overlay = document.querySelector('.gradient-overlay');
            if (overlay) {
                overlay.classList.remove('visible');
            }
            setTimeout(() => {
                setContentVisible(false);
                setIsFadingOut(false);
                setButtonVisible(true);
            }, 800);
        };
        
        // Listen for reset events
        window.addEventListener('app-reset', handleReset);
        return () => window.removeEventListener('app-reset', handleReset);
    }, []);
    
    // ... rest of component
};
```

**What it does:**
1. Listens for `app-reset` custom event
2. Triggers fade-out animation (800ms)
3. Hides content and shows the "Moonshot" button
4. Removes gradient overlay

## Complete Implementation Example

Here's the complete App component with inactivity reset:

```javascript
const App = () => {
    const { useRef, useEffect } = React;
    const [currentView, setCurrentView] = useState('home');
    const [currentPath, setCurrentPath] = useState(null);
    const [currentScreen, setCurrentScreen] = useState(1);
    const [hasNavigatedFromPath, setHasNavigatedFromPath] = useState(false);
    const inactivityTimerRef = useRef(null);
    
    // Reset function - returns app to initial state
    const resetToHomeButton = () => {
        // Reset navigation state
        setCurrentView('home');
        setCurrentPath(null);
        setCurrentScreen(1);
        setHasNavigatedFromPath(false);
        
        // Hide gradient overlay
        const overlay = document.querySelector('.gradient-overlay');
        if (overlay) {
            overlay.classList.remove('visible');
        }
        
        // Trigger reset event for fade-out animations
        window.dispatchEvent(new Event('app-reset'));
    };
    
    // Timer management function
    const resetInactivityTimer = () => {
        // Clear existing timer
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        
        // Set new 30-second timer
        inactivityTimerRef.current = setTimeout(() => {
            resetToHomeButton();
        }, 30000);
    };
    
    // Activity tracking - runs on mount and navigation changes
    useEffect(() => {
        // Initialize timer
        resetInactivityTimer();
        
        // Define activity events to track
        const activityEvents = [
            'mousedown', 
            'mousemove', 
            'keypress', 
            'scroll', 
            'touchstart', 
            'click'
        ];
        
        // Activity handler - resets timer on any activity
        const handleActivity = () => {
            resetInactivityTimer();
        };
        
        // Add event listeners to window
        activityEvents.forEach(event => {
            window.addEventListener(event, handleActivity);
        });
        
        // Cleanup function
        return () => {
            // Remove all event listeners
            activityEvents.forEach(event => {
                window.removeEventListener(event, handleActivity);
            });
            // Clear timer if component unmounts
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, [currentView, currentPath, currentScreen]); // Re-run on navigation
    
    // ... rest of App component (routing, handlers, etc.)
    
    return renderView();
};
```

## Custom Event System

### Event Dispatch

The App component dispatches a custom event when reset is triggered:

```javascript
window.dispatchEvent(new Event('app-reset'));
```

### Event Listening

Components that need to respond to reset listen for the event:

```javascript
useEffect(() => {
    const handleReset = () => {
        // Fade out logic
        // Hide content
        // Show initial state
    };
    
    window.addEventListener('app-reset', handleReset);
    return () => window.removeEventListener('app-reset', handleReset);
}, []);
```

**Benefits:**
- Decouples reset logic from App component
- Allows multiple components to respond
- Easy to extend for future components
- No prop drilling required

## Configuration

### Timer Duration

To change the inactivity timeout, modify the timeout value:

```javascript
inactivityTimerRef.current = setTimeout(() => {
    resetToHomeButton();
}, 30000); // Change this value (in milliseconds)
```

**Common durations:**
- `30000` - 30 seconds (current)
- `60000` - 1 minute
- `120000` - 2 minutes
- `300000` - 5 minutes

### Activity Events

To track additional events, add them to the array:

```javascript
const activityEvents = [
    'mousedown', 
    'mousemove', 
    'keypress', 
    'scroll', 
    'touchstart', 
    'click',
    'wheel',        // Mouse wheel
    'pointerdown',  // Pointer events
    'pointermove'   // Pointer movement
];
```

### Fade-Out Duration

To change the fade-out animation duration:

```javascript
setTimeout(() => {
    setContentVisible(false);
    setButtonVisible(true);
}, 800); // Change this value (in milliseconds)
```

## State Management

### Required State Variables

The App component manages these state variables:

```javascript
const [currentView, setCurrentView] = useState('home');
const [currentPath, setCurrentPath] = useState(null);
const [currentScreen, setCurrentScreen] = useState(1);
const [hasNavigatedFromPath, setHasNavigatedFromPath] = useState(false);
```

**Reset values:**
- `currentView` → `'home'`
- `currentPath` → `null`
- `currentScreen` → `1`
- `hasNavigatedFromPath` → `false`

### HomePage State

The HomePage component manages its own state:

```javascript
const [contentVisible, setContentVisible] = useState(showContentImmediately);
const [buttonVisible, setButtonVisible] = useState(!showContentImmediately);
const [isFadingOut, setIsFadingOut] = useState(false);
```

**Reset values:**
- `contentVisible` → `false`
- `buttonVisible` → `true`
- `isFadingOut` → `false`

## Flow Diagram

```
User Activity Detected
    ↓
resetInactivityTimer() called
    ↓
Clear existing timer
    ↓
Set new 30-second timer
    ↓
[30 seconds of inactivity]
    ↓
Timer expires
    ↓
resetToHomeButton() called
    ↓
Reset navigation state
    ↓
Hide gradient overlay
    ↓
Dispatch 'app-reset' event
    ↓
HomePage receives event
    ↓
Fade out content (800ms)
    ↓
Show "Moonshot" button
    ↓
App in initial state
```

## Best Practices

### ✅ Do's

1. **Manage timer at App level** - Single source of truth
2. **Clear timer before setting new one** - Prevents multiple timers
3. **Track multiple event types** - Catches all user activity
4. **Clean up event listeners** - Prevents memory leaks
5. **Reset timer on navigation** - Ensures fresh start on screen change
6. **Use custom events** - Decouples reset logic from components
7. **Include cleanup in useEffect** - Prevents timer leaks on unmount

### ❌ Don'ts

1. **Don't manage timer in screen components** - Won't work across screens
2. **Don't forget to clear timers** - Causes memory leaks
3. **Don't skip cleanup** - Event listeners will accumulate
4. **Don't hardcode reset logic** - Use custom events for flexibility
5. **Don't ignore navigation changes** - Timer should reset on screen change
6. **Don't use state for timer ID** - Causes unnecessary re-renders (use ref)

## Troubleshooting

### Timer Not Resetting

**Symptoms:** Timer doesn't reset on user activity

**Solutions:**
1. Check event listeners are attached to `window`
2. Verify `resetInactivityTimer` is called in `handleActivity`
3. Ensure events are in the `activityEvents` array
4. Check for JavaScript errors in console

### Timer Not Expiring

**Symptoms:** App never resets after 30 seconds

**Solutions:**
1. Verify timer is being set: `console.log(inactivityTimerRef.current)`
2. Check timeout value is correct (30000ms = 30s)
3. Ensure `resetToHomeButton` is called in timeout callback
4. Check for errors in `resetToHomeButton` function

### Multiple Timers Running

**Symptoms:** App resets multiple times or unexpectedly

**Solutions:**
1. Ensure `clearTimeout` is called before setting new timer
2. Check that `resetInactivityTimer` clears existing timer first
3. Verify cleanup function clears timer on unmount
4. Check for duplicate event listeners

### Reset Not Working on HomePage

**Symptoms:** Timer expires but HomePage doesn't reset

**Solutions:**
1. Verify `app-reset` event is being dispatched
2. Check HomePage has event listener set up
3. Ensure `handleReset` function is correct
4. Verify state updates are working

### Timer Resets Too Frequently

**Symptoms:** Timer resets constantly, never expires

**Solutions:**
1. Check if too many events are being tracked
2. Verify events aren't firing continuously (e.g., `mousemove`)
3. Consider debouncing high-frequency events
4. Check for event bubbling issues

## Advanced Customization

### Debouncing High-Frequency Events

For events like `mousemove` that fire frequently, add debouncing:

```javascript
let activityTimeout;
const handleActivity = () => {
    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(() => {
        resetInactivityTimer();
    }, 100); // Debounce to 100ms
};
```

### Different Timeouts for Different Screens

To have different timeout durations per screen:

```javascript
const getTimeoutDuration = () => {
    if (currentView === 'home') return 30000;
    if (currentPath === 'what') return 45000;
    return 30000; // default
};

inactivityTimerRef.current = setTimeout(() => {
    resetToHomeButton();
}, getTimeoutDuration());
```

### Pause Timer on Specific Actions

To pause the timer during certain actions:

```javascript
const [timerPaused, setTimerPaused] = useState(false);

const resetInactivityTimer = () => {
    if (timerPaused) return; // Don't reset if paused
    
    if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
    }
    
    inactivityTimerRef.current = setTimeout(() => {
        resetToHomeButton();
    }, 30000);
};
```

## Summary

The inactivity reset strategy provides:
- **Global timer management** at App component level
- **Multi-event activity tracking** for comprehensive detection
- **Custom event system** for decoupled reset handling
- **Automatic state reset** to initial app state
- **Smooth fade-out animations** for polished UX
- **Works across all screens** without per-screen implementation

This creates a robust, maintainable system that ensures the app always returns to a clean initial state after periods of inactivity.
