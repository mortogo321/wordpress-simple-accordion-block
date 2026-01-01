/**
 * Simple Accordion Block - Pre-built Editor Script
 * For production use, run: npm run build
 */

(function(wp) {
    'use strict';

    const { registerBlockType } = wp.blocks;
    const { InnerBlocks, useBlockProps, InspectorControls, RichText } = wp.blockEditor;
    const { PanelBody, ToggleControl, SelectControl } = wp.components;
    const { createElement: el, Fragment } = wp.element;
    const { __ } = wp.i18n;

    // Accordion wrapper icon
    const accordionIcon = el('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: 24,
        height: 24
    }, el('path', {
        d: 'M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z',
        fill: 'currentColor'
    }));

    // Chevron icon
    const chevronIcon = el('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: 24,
        height: 24,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2
    }, el('polyline', { points: '6 9 12 15 18 9' }));

    // Plus icon
    const plusIcon = el('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: 24,
        height: 24,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2
    }, [
        el('line', { key: 'v', x1: 12, y1: 5, x2: 12, y2: 19 }),
        el('line', { key: 'h', x1: 5, y1: 12, x2: 19, y2: 12, className: 'sab-icon-horizontal' })
    ]);

    // Arrow icon
    const arrowIcon = el('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: 24,
        height: 24,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2
    }, [
        el('line', { key: 'l', x1: 5, y1: 12, x2: 19, y2: 12 }),
        el('polyline', { key: 'p', points: '12 5 19 12 12 19' })
    ]);

    function getIcon(style) {
        switch (style) {
            case 'plus': return plusIcon;
            case 'arrow': return arrowIcon;
            default: return chevronIcon;
        }
    }

    /**
     * Accordion Wrapper Block
     */
    registerBlockType('sab/accordion', {
        title: __('Accordion', 'simple-accordion-block'),
        description: __('Add collapsible accordion sections.', 'simple-accordion-block'),
        category: 'design',
        icon: accordionIcon,
        keywords: ['accordion', 'faq', 'collapse', 'toggle'],
        supports: {
            align: ['wide', 'full'],
            html: false,
            color: { background: true, text: true },
            spacing: { margin: true, padding: true }
        },
        attributes: {
            allowMultiple: { type: 'boolean', default: false }
        },

        edit: function(props) {
            const { attributes, setAttributes } = props;
            const { allowMultiple } = attributes;
            const blockProps = useBlockProps({ className: 'sab-accordion sab-accordion-editor' });

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Accordion Settings', 'simple-accordion-block') },
                        el(ToggleControl, {
                            label: __('Allow multiple open', 'simple-accordion-block'),
                            help: __('Allow multiple items to be open at once.', 'simple-accordion-block'),
                            checked: allowMultiple,
                            onChange: function(value) { setAttributes({ allowMultiple: value }); }
                        })
                    )
                ),
                el('div', blockProps,
                    el(InnerBlocks, {
                        allowedBlocks: ['sab/accordion-item'],
                        template: [
                            ['sab/accordion-item', { title: __('Accordion Item 1', 'simple-accordion-block') }],
                            ['sab/accordion-item', { title: __('Accordion Item 2', 'simple-accordion-block') }]
                        ],
                        renderAppender: InnerBlocks.ButtonBlockAppender
                    })
                )
            );
        },

        save: function() {
            const blockProps = useBlockProps.save({ className: 'sab-accordion' });
            return el('div', blockProps, el(InnerBlocks.Content));
        }
    });

    /**
     * Accordion Item Block
     */
    registerBlockType('sab/accordion-item', {
        title: __('Accordion Item', 'simple-accordion-block'),
        description: __('A single accordion section.', 'simple-accordion-block'),
        category: 'design',
        icon: 'arrow-down-alt2',
        parent: ['sab/accordion'],
        supports: { html: false, reusable: false },
        attributes: {
            title: { type: 'string', default: '' },
            isOpen: { type: 'boolean', default: false },
            iconStyle: { type: 'string', default: 'chevron' }
        },

        edit: function(props) {
            const { attributes, setAttributes, isSelected } = props;
            const { title, isOpen, iconStyle } = attributes;
            const blockProps = useBlockProps({
                className: 'sab-accordion-item' + (isOpen ? ' sab-open' : '')
            });

            return el(Fragment, null,
                el(InspectorControls, null,
                    el(PanelBody, { title: __('Item Settings', 'simple-accordion-block') },
                        el(ToggleControl, {
                            label: __('Open by default', 'simple-accordion-block'),
                            help: __('Show expanded when page loads.', 'simple-accordion-block'),
                            checked: isOpen,
                            onChange: function(value) { setAttributes({ isOpen: value }); }
                        }),
                        el(SelectControl, {
                            label: __('Icon Style', 'simple-accordion-block'),
                            value: iconStyle,
                            options: [
                                { label: __('Chevron', 'simple-accordion-block'), value: 'chevron' },
                                { label: __('Plus/Minus', 'simple-accordion-block'), value: 'plus' },
                                { label: __('Arrow', 'simple-accordion-block'), value: 'arrow' }
                            ],
                            onChange: function(value) { setAttributes({ iconStyle: value }); }
                        })
                    )
                ),
                el('div', blockProps,
                    el('div', {
                        className: 'sab-accordion-header',
                        onClick: function() { setAttributes({ isOpen: !isOpen }); },
                        role: 'button',
                        tabIndex: 0,
                        onKeyDown: function(e) {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setAttributes({ isOpen: !isOpen });
                            }
                        }
                    },
                        el(RichText, {
                            tagName: 'span',
                            className: 'sab-accordion-title',
                            value: title,
                            onChange: function(value) { setAttributes({ title: value }); },
                            placeholder: __('Accordion title...', 'simple-accordion-block'),
                            onClick: function(e) { e.stopPropagation(); }
                        }),
                        el('span', {
                            className: 'sab-accordion-icon sab-icon-' + iconStyle,
                            'aria-hidden': 'true'
                        }, getIcon(iconStyle))
                    ),
                    el('div', {
                        className: 'sab-accordion-content',
                        style: { display: (isOpen || isSelected) ? 'block' : 'none' }
                    },
                        el('div', { className: 'sab-accordion-content-inner' },
                            el(InnerBlocks, {
                                template: [['core/paragraph', { placeholder: __('Add content here...', 'simple-accordion-block') }]],
                                templateLock: false
                            })
                        )
                    )
                )
            );
        },

        save: function(props) {
            const { attributes } = props;
            const { title, isOpen, iconStyle } = attributes;
            const blockProps = useBlockProps.save({
                className: 'sab-accordion-item' + (isOpen ? ' sab-open' : ''),
                'data-open': isOpen ? 'true' : 'false'
            });

            return el('div', blockProps,
                el('div', { className: 'sab-accordion-header' },
                    el(RichText.Content, {
                        tagName: 'span',
                        className: 'sab-accordion-title',
                        value: title
                    }),
                    el('span', {
                        className: 'sab-accordion-icon sab-icon-' + iconStyle,
                        'aria-hidden': 'true'
                    })
                ),
                el('div', { className: 'sab-accordion-content' },
                    el('div', { className: 'sab-accordion-content-inner' },
                        el(InnerBlocks.Content)
                    )
                )
            );
        }
    });

})(window.wp);
