/**
 * Mobile Interactions Module
 * Handles touch events for mobile drag & drop with improved responsiveness
 */

// Configuration constants
const DRAG_THRESHOLD = 25; // Minimum distance in pixels to start drag
const DRAG_START_DELAY = 150; // Minimum time before drag can start (ms)
const THROTTLE_DELAY = 16; // Throttle moves to ~60fps
const TAP_DURATION = 200; // Maximum duration for a tap (ms)

/**
 * Initialize mobile card interactions
 * This is called once during initialization
 */
export function setupMobileCardInteractions() {
    // Individual card touch events are added in createCardElement()
}

/**
 * Add mobile touch event listeners to a card element
 * Improved with debouncing and throttling to reduce oversensitivity
 * @param {HTMLElement} cardElement - The card element to add touch events to
 */
export function addMobileTouchEvents(cardElement) {
    if (window.innerWidth > 768) return; // Only on mobile

    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };
    let isDragging = false;
    let dragStarted = false;
    let lastMoveTime = 0;

    cardElement.addEventListener('touchstart', (e) => {
        // Don't start drag if touching action buttons
        if (e.target.closest('.card-actions')) return;

        touchStartTime = Date.now();
        touchStartPos = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        dragStarted = false;

        e.preventDefault();
    }, { passive: false });

    cardElement.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartPos.x);
        const deltaY = Math.abs(touch.clientY - touchStartPos.y);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const timeSinceStart = Date.now() - touchStartTime;

        // Start dragging only if:
        // 1. Moved more than threshold
        // 2. Enough time has passed since touch start
        // 3. Not already dragging
        if (distance > DRAG_THRESHOLD &&
            timeSinceStart > DRAG_START_DELAY &&
            !isDragging &&
            !dragStarted) {
            isDragging = true;
            dragStarted = true;
            cardElement.classList.add('dragging');
            e.preventDefault();
        }

        if (isDragging) {
            // Throttle move events to reduce sensitivity
            const now = Date.now();
            if (now - lastMoveTime < THROTTLE_DELAY) {
                e.preventDefault();
                return;
            }
            lastMoveTime = now;

            // Move card with finger
            const offsetX = touch.clientX - touchStartPos.x;
            const offsetY = touch.clientY - touchStartPos.y;

            cardElement.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(5deg) scale(1.05)`;

            // Check which column we're over
            const columns = document.querySelectorAll('.column');
            let targetColumn = null;

            columns.forEach(column => {
                const columnRect = column.getBoundingClientRect();
                if (touch.clientX >= columnRect.left &&
                    touch.clientX <= columnRect.right &&
                    touch.clientY >= columnRect.top &&
                    touch.clientY <= columnRect.bottom) {
                    targetColumn = column;
                }
            });

            // Update visual feedback
            columns.forEach(column => {
                if (column === targetColumn) {
                    column.classList.add('drag-over');
                } else {
                    column.classList.remove('drag-over');
                }
            });

            e.preventDefault();
        }
    }, { passive: false });

    cardElement.addEventListener('touchend', (e) => {
        const touchDuration = Date.now() - touchStartTime;

        if (isDragging) {
            // Find target column
            const columns = document.querySelectorAll('.column');
            let targetColumn = null;

            columns.forEach(column => {
                if (column.classList.contains('drag-over')) {
                    targetColumn = column;
                }
            });

            if (targetColumn) {
                const newStatus = targetColumn.dataset.status;
                const cardId = parseInt(cardElement.dataset.cardId) || cardElement.dataset.cardId;

                // Dispatch custom event for card status update
                const event = new CustomEvent('cardStatusUpdate', {
                    detail: { cardId, newStatus }
                });
                document.dispatchEvent(event);

                // Show success feedback
                showMobileDragSuccess();
            }

            // Reset visual state
            cardElement.classList.remove('dragging');
            cardElement.style.transform = '';

            columns.forEach(column => {
                column.classList.remove('drag-over');
            });

            isDragging = false;
        } else if (touchDuration < TAP_DURATION) {
            // Short tap - dispatch custom event to open card details
            if (!e.target.closest('.card-actions')) {
                const cardId = parseInt(cardElement.dataset.cardId) || cardElement.dataset.cardId;
                const event = new CustomEvent('cardTap', {
                    detail: { cardId }
                });
                document.dispatchEvent(event);
            }
        }
    });

    cardElement.addEventListener('touchcancel', () => {
        if (isDragging) {
            cardElement.classList.remove('dragging');
            cardElement.style.transform = '';

            document.querySelectorAll('.column').forEach(column => {
                column.classList.remove('drag-over');
            });

            isDragging = false;
        }
    });
}

/**
 * Show success message after mobile drag operation
 */
function showMobileDragSuccess() {
    // Create temporary success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #10b981;
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 2000;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    `;
    successMsg.textContent = '🎉 Verschoben!';
    document.body.appendChild(successMsg);

    // Remove after animation
    setTimeout(() => {
        successMsg.style.opacity = '0';
        successMsg.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            document.body.removeChild(successMsg);
        }, 300);
    }, 1000);
}
