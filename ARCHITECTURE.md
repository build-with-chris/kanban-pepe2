# Kanban Pepe - Architecture Documentation

## Overview
This document outlines the current architecture and provides guidelines for transitioning to a component-based structure.

## Current State (2025-11-07)

### Structure
- **Type**: Monolithic single-page application
- **Framework**: Vanilla JavaScript (No framework)
- **File**: `index.html` (contains HTML, CSS, and JavaScript)
- **Backend**: Supabase with localStorage fallback
- **PWA**: Progressive Web App enabled

### Recent Improvements
1. **Mobile Drag & Drop** - Improved sensitivity and responsiveness:
   - Increased drag threshold from 10px to 25px
   - Added 150ms delay before drag starts
   - Implemented throttling (16ms ~60fps) for smoother experience
   - Added debouncing to prevent oversensitive reactions

### Key Sections in index.html

| Section | Lines | Description |
|---------|-------|-------------|
| Vision Screen | 94-174 | Intro animation |
| Sync Status | 42-92 | Online/offline indicator |
| Team Filter | 204-317 | Filter UI and logic |
| Week Goals | 513-632 | Goal management |
| Kanban Board | 634-799 | Main board UI |
| Modal Forms | 801-948 | Card and email modals |
| Supabase Integration | 1259-1573 | Database operations |
| Local Storage Fallback | 1650-1738 | Offline support |
| Team Filter Logic | 1741-1935 | Filter operations |
| UI Rendering | 1937-2106 | DOM manipulation |
| Mobile Interactions | 2294-2550 | Touch events (IMPROVED) |
| Drag and Drop | 2551-2625 | Desktop drag events |
| Initialization | 2631-2646 | App startup |

## Modular Architecture (Target State)

### Folder Structure
```
kanban-pepe2/
├── index.html              # Main HTML entry point
├── js/
│   ├── modules/            # Business logic modules
│   │   ├── dragDrop.js     # Desktop drag & drop (CREATED)
│   │   ├── mobileInteractions.js  # Mobile touch events (CREATED)
│   │   ├── storage.js      # Supabase + localStorage (TODO)
│   │   ├── filters.js      # Team filtering (TODO)
│   │   └── goals.js        # Week goals management (TODO)
│   ├── components/         # UI components
│   │   ├── card.js         # Card component (TODO)
│   │   ├── column.js       # Column component (TODO)
│   │   ├── modal.js        # Modal dialogs (TODO)
│   │   └── syncStatus.js   # Sync indicator (TODO)
│   ├── utils/              # Utility functions
│   │   ├── dom.js          # DOM helpers (TODO)
│   │   └── validation.js   # Input validation (TODO)
│   └── main.js             # Application initialization (TODO)
├── css/
│   ├── main.css            # Main styles (TODO)
│   ├── mobile.css          # Mobile-specific styles (TODO)
│   └── components/         # Component styles (TODO)
└── manifest.json           # PWA manifest
```

## Component-Based Standards

### 1. Module Pattern
Each module should follow this pattern:

```javascript
/**
 * Module Name
 * Brief description of what this module does
 */

// Private state
let privateVariable = null;

// Private functions
function privateHelper() {
    // ...
}

// Public API
export function publicFunction() {
    // ...
}

export function initModule() {
    // Initialization logic
}
```

### 2. Event-Driven Architecture
Use custom events for module communication:

```javascript
// Dispatch event
const event = new CustomEvent('cardStatusUpdate', {
    detail: { cardId, newStatus }
});
document.dispatchEvent(event);

// Listen to event
document.addEventListener('cardStatusUpdate', (e) => {
    const { cardId, newStatus } = e.detail;
    // Handle event
});
```

### 3. Component Structure
Each component should be self-contained:

```javascript
/**
 * Card Component
 */
export class Card {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    render() {
        // Create DOM element
        return this.element;
    }

    update(newData) {
        // Update component
    }

    destroy() {
        // Cleanup
    }
}
```

### 4. Naming Conventions
- **Files**: camelCase (e.g., `dragDrop.js`, `mobileInteractions.js`)
- **Functions**: camelCase (e.g., `setupDragAndDrop()`, `handleCardClick()`)
- **Classes**: PascalCase (e.g., `Card`, `Column`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DRAG_THRESHOLD`, `API_URL`)
- **Private functions**: prefix with underscore (e.g., `_privateHelper()`)

### 5. Code Organization

#### Module Exports
```javascript
// Named exports (preferred)
export function publicFunction() {}
export const PUBLIC_CONSTANT = 'value';

// Default export for single-purpose modules
export default class MainClass {}
```

#### Module Imports
```javascript
// Import specific functions
import { setupDragAndDrop, handleDragStart } from './modules/dragDrop.js';

// Import all as namespace
import * as DragDrop from './modules/dragDrop.js';

// Import default
import Card from './components/card.js';
```

### 6. Error Handling
```javascript
async function fetchData() {
    try {
        const response = await supabase.from('table').select();
        if (response.error) throw response.error;
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback or user feedback
        showErrorMessage('Daten konnten nicht geladen werden');
        return null;
    }
}
```

### 7. Mobile-First Responsive Design
- Always design for mobile first
- Use media queries for desktop enhancements
- Touch targets minimum 44x44px
- Prevent accidental interactions with debouncing/throttling

### 8. Performance Best Practices
- **Debouncing**: Delay function execution until after a pause
- **Throttling**: Limit function execution rate
- **Event Delegation**: Use parent listeners instead of many children
- **Virtual DOM**: For large lists, consider virtual scrolling
- **Lazy Loading**: Load components only when needed

## Mobile Drag & Drop Configuration

### Current Settings (IMPROVED)
```javascript
const DRAG_THRESHOLD = 25;        // Minimum distance to start drag (px)
const DRAG_START_DELAY = 150;     // Minimum time before drag starts (ms)
const THROTTLE_DELAY = 16;        // Throttle moves to ~60fps (ms)
const TAP_DURATION = 200;         // Maximum tap duration (ms)
```

### Adjusting Sensitivity
To make drag & drop less sensitive:
- **Increase** `DRAG_THRESHOLD` (e.g., 30-40px)
- **Increase** `DRAG_START_DELAY` (e.g., 200-250ms)
- **Increase** `THROTTLE_DELAY` (e.g., 32ms for ~30fps)

To make it more sensitive:
- **Decrease** `DRAG_THRESHOLD` (e.g., 15-20px)
- **Decrease** `DRAG_START_DELAY` (e.g., 100ms)
- **Decrease** `THROTTLE_DELAY` (e.g., 8ms for ~120fps)

## Migration Path

### Phase 1: Core Modules (STARTED)
- [x] Create folder structure
- [x] Extract drag & drop logic
- [x] Extract mobile interactions
- [ ] Extract storage layer
- [ ] Create main.js entry point

### Phase 2: UI Components
- [ ] Create Card component
- [ ] Create Column component
- [ ] Create Modal component
- [ ] Create SyncStatus component

### Phase 3: Utilities
- [ ] Extract DOM helpers
- [ ] Extract validation logic
- [ ] Extract filter logic

### Phase 4: Styling
- [ ] Split CSS into separate files
- [ ] Organize by component
- [ ] Remove duplicate media queries

### Phase 5: Testing & Documentation
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Document all public APIs
- [ ] Create developer guide

## Development Guidelines

### Before Starting New Features
1. Check if a module already exists
2. Follow the component-based structure
3. Write self-documenting code
4. Add comments for complex logic
5. Test on both desktop and mobile

### Code Review Checklist
- [ ] Follows naming conventions
- [ ] Uses event-driven communication
- [ ] Handles errors properly
- [ ] Responsive design (mobile-first)
- [ ] Performance optimized
- [ ] No duplicate code
- [ ] Documented public API

## Technology Stack

### Frontend
- **Language**: JavaScript (ES6+)
- **Styling**: CSS3 with media queries
- **PWA**: Service Worker + Manifest

### Backend
- **Primary**: Supabase (PostgreSQL + Realtime)
- **Fallback**: localStorage (offline mode)

### Build Tools
- None currently (vanilla JS)
- Future: Consider Vite or Webpack for bundling

## Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [Supabase Docs](https://supabase.com/docs)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

### Performance
- [Web Performance](https://web.dev/performance/)
- [Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)

## Contributing

When adding new features:
1. Create feature branch
2. Follow component-based structure
3. Test on mobile and desktop
4. Update this documentation
5. Create pull request

---

**Last Updated**: 2025-11-07
**Status**: In Progress - Mobile improvements completed, full modularization pending
