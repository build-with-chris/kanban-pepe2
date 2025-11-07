# Modules Directory

This directory contains reusable business logic modules for the Kanban Pepe application.

## Available Modules

### dragDrop.js
**Status**: ✅ Complete

Desktop drag & drop functionality using HTML5 Drag API.

**Exports**:
- `setupDragAndDrop()` - Initialize drag & drop listeners
- `handleDragStart(e)` - Called when drag starts
- `handleDragEnd(e)` - Called when drag ends

**Events Emitted**:
- `cardStatusUpdate` - When a card is dropped in a new column
  - `detail: { cardId, newStatus }`

**Usage**:
```javascript
import { setupDragAndDrop, handleDragStart, handleDragEnd } from './modules/dragDrop.js';

// Initialize
setupDragAndDrop();

// Add to card elements
cardElement.addEventListener('dragstart', handleDragStart);
cardElement.addEventListener('dragend', handleDragEnd);
```

---

### mobileInteractions.js
**Status**: ✅ Complete (Improved 2025-11-07)

Mobile touch event handling with improved responsiveness.

**Configuration**:
- `DRAG_THRESHOLD = 25px` - Distance needed to start drag
- `DRAG_START_DELAY = 150ms` - Delay before drag starts
- `THROTTLE_DELAY = 16ms` - Move event throttling (~60fps)
- `TAP_DURATION = 200ms` - Max duration for tap detection

**Exports**:
- `setupMobileCardInteractions()` - Initialize mobile interactions
- `addMobileTouchEvents(cardElement)` - Add touch listeners to a card

**Events Emitted**:
- `cardStatusUpdate` - When card is dragged to new column
  - `detail: { cardId, newStatus }`
- `cardTap` - When card is tapped (not dragged)
  - `detail: { cardId }`

**Usage**:
```javascript
import { addMobileTouchEvents } from './modules/mobileInteractions.js';

// Add to each card element
addMobileTouchEvents(cardElement);
```

**Mobile Improvements**:
- Reduced sensitivity: 25px threshold (was 10px)
- Added start delay: 150ms (prevents accidental drags)
- Throttled move events: 60fps (smoother performance)
- Better tap detection: Separate tap from drag intent

---

## Planned Modules

### storage.js
**Status**: 📋 Planned

Handles data persistence with Supabase and localStorage fallback.

**Planned Exports**:
- `initStorage()` - Initialize storage layer
- `loadCards()` - Load all cards
- `saveCard(cardData)` - Save/update a card
- `deleteCard(cardId)` - Delete a card
- `updateCardStatus(cardId, status)` - Update card status
- `loadGoals()` - Load week goals
- `saveGoal(goalText, author)` - Save a goal
- `toggleGoal(goalId)` - Toggle goal completion
- `deleteGoal(goalId)` - Delete a goal

---

### filters.js
**Status**: 📋 Planned

Team and tag filtering logic.

**Planned Exports**:
- `setupFilters()` - Initialize filter UI
- `applyFilters()` - Apply current filter state
- `getActiveFilters()` - Get active filter tags
- `clearFilters()` - Clear all filters

---

### goals.js
**Status**: 📋 Planned

Week goals management.

**Planned Exports**:
- `renderGoals(goals)` - Render goals list
- `addGoal(text, author)` - Add new goal
- `toggleGoal(goalId)` - Toggle completion
- `deleteGoal(goalId)` - Delete goal

---

## Integration Guide

### Event-Driven Communication

Modules communicate via custom events to maintain loose coupling:

```javascript
// Module A: Dispatch event
document.dispatchEvent(new CustomEvent('cardStatusUpdate', {
    detail: { cardId: 123, newStatus: 'doing' }
}));

// Module B: Listen to event
document.addEventListener('cardStatusUpdate', (e) => {
    const { cardId, newStatus } = e.detail;
    // Update storage
    updateCardInDatabase(cardId, newStatus);
});
```

### Current Integration (index.html)

The modules are ready to use but not yet integrated. To integrate:

1. Add module imports to index.html:
```html
<script type="module">
    import { setupDragAndDrop, handleDragStart, handleDragEnd } from './js/modules/dragDrop.js';
    import { addMobileTouchEvents } from './js/modules/mobileInteractions.js';

    // Use in initialization
    document.addEventListener('DOMContentLoaded', () => {
        setupDragAndDrop();
        // ... rest of initialization
    });
</script>
```

2. Listen to events emitted by modules:
```javascript
document.addEventListener('cardStatusUpdate', async (e) => {
    const { cardId, newStatus } = e.detail;
    await updateCardStatus(cardId, newStatus);
});

document.addEventListener('cardTap', (e) => {
    const { cardId } = e.detail;
    openCardExpanded(cardId);
});
```

## Development Notes

### Adding New Modules

1. Create file in `js/modules/`
2. Follow module pattern (see ARCHITECTURE.md)
3. Use named exports
4. Emit custom events for cross-module communication
5. Document exports in this README
6. Add JSDoc comments to functions

### Module Template

```javascript
/**
 * Module Name
 * Brief description
 */

// Configuration
const CONFIG = {
    SETTING: 'value'
};

// Private state
let privateState = null;

// Private functions
function _privateHelper() {
    // Implementation
}

// Public API
export function publicFunction() {
    // Implementation
}

export function initModule() {
    // Initialization
}
```

## Testing

When testing modules:
- Test in isolation when possible
- Mock event listeners
- Test both desktop and mobile
- Test error cases
- Verify event emission

---

**Last Updated**: 2025-11-07
