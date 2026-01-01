/**
 * Simple Accordion Block - Frontend Script
 */

(function() {
    'use strict';

    /**
     * Initialize all accordions on the page
     */
    function initAccordions() {
        const accordions = document.querySelectorAll('.sab-accordion');

        accordions.forEach(function(accordion) {
            initAccordion(accordion);
        });
    }

    /**
     * Initialize a single accordion
     */
    function initAccordion(accordion) {
        const allowMultiple = accordion.dataset.allowMultiple === 'true';
        const items = accordion.querySelectorAll('.sab-accordion-item');

        items.forEach(function(item) {
            const header = item.querySelector('.sab-accordion-header');
            const content = item.querySelector('.sab-accordion-content');

            if (!header || !content) return;

            // Set initial state
            const isOpen = item.dataset.open === 'true';
            updateItemState(item, isOpen);

            // Add click handler
            header.addEventListener('click', function(e) {
                e.preventDefault();
                toggleItem(item, accordion, allowMultiple);
            });

            // Add keyboard handler
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleItem(item, accordion, allowMultiple);
                }

                // Arrow key navigation
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    navigateItems(item, accordion, e.key === 'ArrowDown' ? 1 : -1);
                }

                // Home/End navigation
                if (e.key === 'Home') {
                    e.preventDefault();
                    focusFirstItem(accordion);
                }

                if (e.key === 'End') {
                    e.preventDefault();
                    focusLastItem(accordion);
                }
            });
        });
    }

    /**
     * Toggle accordion item
     */
    function toggleItem(item, accordion, allowMultiple) {
        const isCurrentlyOpen = item.classList.contains('sab-open');

        // If not allowing multiple, close all other items
        if (!allowMultiple && !isCurrentlyOpen) {
            const items = accordion.querySelectorAll('.sab-accordion-item');
            items.forEach(function(otherItem) {
                if (otherItem !== item) {
                    closeItem(otherItem);
                }
            });
        }

        // Toggle current item
        if (isCurrentlyOpen) {
            closeItem(item);
        } else {
            openItem(item);
        }
    }

    /**
     * Open an accordion item
     */
    function openItem(item) {
        updateItemState(item, true);
    }

    /**
     * Close an accordion item
     */
    function closeItem(item) {
        updateItemState(item, false);
    }

    /**
     * Update item state (open/closed)
     */
    function updateItemState(item, isOpen) {
        const header = item.querySelector('.sab-accordion-header');
        const content = item.querySelector('.sab-accordion-content');

        if (isOpen) {
            item.classList.add('sab-open');
            item.dataset.open = 'true';
            header.setAttribute('aria-expanded', 'true');
            content.removeAttribute('hidden');
        } else {
            item.classList.remove('sab-open');
            item.dataset.open = 'false';
            header.setAttribute('aria-expanded', 'false');
            content.setAttribute('hidden', '');
        }
    }

    /**
     * Navigate between accordion items with keyboard
     */
    function navigateItems(currentItem, accordion, direction) {
        const items = Array.from(accordion.querySelectorAll('.sab-accordion-item'));
        const currentIndex = items.indexOf(currentItem);
        let nextIndex = currentIndex + direction;

        // Wrap around
        if (nextIndex < 0) {
            nextIndex = items.length - 1;
        } else if (nextIndex >= items.length) {
            nextIndex = 0;
        }

        const nextHeader = items[nextIndex].querySelector('.sab-accordion-header');
        if (nextHeader) {
            nextHeader.focus();
        }
    }

    /**
     * Focus first item in accordion
     */
    function focusFirstItem(accordion) {
        const firstHeader = accordion.querySelector('.sab-accordion-item .sab-accordion-header');
        if (firstHeader) {
            firstHeader.focus();
        }
    }

    /**
     * Focus last item in accordion
     */
    function focusLastItem(accordion) {
        const items = accordion.querySelectorAll('.sab-accordion-item .sab-accordion-header');
        const lastHeader = items[items.length - 1];
        if (lastHeader) {
            lastHeader.focus();
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccordions);
    } else {
        initAccordions();
    }

    // Re-initialize for dynamically added content (e.g., AJAX)
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        if (node.classList && node.classList.contains('sab-accordion')) {
                            initAccordion(node);
                        }
                        const nestedAccordions = node.querySelectorAll && node.querySelectorAll('.sab-accordion');
                        if (nestedAccordions) {
                            nestedAccordions.forEach(initAccordion);
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

})();
