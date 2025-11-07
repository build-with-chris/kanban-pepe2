/**
 * Drag and Drop Module
 * Handles desktop drag & drop functionality using HTML5 Drag API
 */

let draggedCard = null;

/**
 * Initialize drag and drop event listeners on columns
 */
export function setupDragAndDrop() {
    const columns = document.querySelectorAll('.column');

    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
        column.addEventListener('dragleave', handleDragLeave);
    });
}

/**
 * Handle drag start event
 * @param {DragEvent} e - Drag event
 */
export function handleDragStart(e) {
    draggedCard = e.target;
    e.target.classList.add('dragging');
}

/**
 * Handle drag end event
 * @param {DragEvent} e - Drag event
 */
export function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

/**
 * Handle drag over event
 * @param {DragEvent} e - Drag event
 */
function handleDragOver(e) {
    e.preventDefault();
    const column = e.target.closest('.column');
    if (column) {
        column.classList.add('drag-over');
    }
}

/**
 * Handle drag leave event
 * @param {DragEvent} e - Drag event
 */
function handleDragLeave(e) {
    const column = e.target.closest('.column');
    if (column) {
        column.classList.remove('drag-over');
    }
}

/**
 * Handle drop event
 * @param {DragEvent} e - Drag event
 */
function handleDrop(e) {
    e.preventDefault();
    const column = e.target.closest('.column');

    if (column && draggedCard) {
        column.classList.remove('drag-over');

        const newStatus = column.dataset.status;
        const cardId = parseInt(draggedCard.dataset.cardId) || draggedCard.dataset.cardId;

        // Dispatch custom event for card status update
        const event = new CustomEvent('cardStatusUpdate', {
            detail: { cardId, newStatus }
        });
        document.dispatchEvent(event);
    }
}
