/**
 * Simple Accordion Block - Editor Scripts
 */

import { registerBlockType } from '@wordpress/blocks';
import {
    InnerBlocks,
    useBlockProps,
    InspectorControls,
    RichText
} from '@wordpress/block-editor';
import {
    PanelBody,
    ToggleControl,
    SelectControl
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Accordion icon
const accordionIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" fill="currentColor"/>
    </svg>
);

/**
 * Accordion Wrapper Block
 */
registerBlockType('sab/accordion', {
    title: __('Accordion', 'simple-accordion-block'),
    description: __('Add collapsible accordion sections.', 'simple-accordion-block'),
    category: 'design',
    icon: accordionIcon,
    keywords: [
        __('accordion', 'simple-accordion-block'),
        __('faq', 'simple-accordion-block'),
        __('collapse', 'simple-accordion-block'),
        __('toggle', 'simple-accordion-block'),
    ],
    supports: {
        align: ['wide', 'full'],
        html: false,
        color: {
            background: true,
            text: true,
        },
        spacing: {
            margin: true,
            padding: true,
        },
    },
    attributes: {
        allowMultiple: {
            type: 'boolean',
            default: false,
        },
    },

    edit: function Edit({ attributes, setAttributes }) {
        const { allowMultiple } = attributes;
        const blockProps = useBlockProps({
            className: 'sab-accordion sab-accordion-editor',
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Accordion Settings', 'simple-accordion-block')}>
                        <ToggleControl
                            label={__('Allow multiple open', 'simple-accordion-block')}
                            help={__('Allow multiple accordion items to be open at once.', 'simple-accordion-block')}
                            checked={allowMultiple}
                            onChange={(value) => setAttributes({ allowMultiple: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <InnerBlocks
                        allowedBlocks={['sab/accordion-item']}
                        template={[
                            ['sab/accordion-item', { title: __('Accordion Item 1', 'simple-accordion-block') }],
                            ['sab/accordion-item', { title: __('Accordion Item 2', 'simple-accordion-block') }],
                        ]}
                        renderAppender={InnerBlocks.ButtonBlockAppender}
                    />
                </div>
            </>
        );
    },

    save: function Save() {
        const blockProps = useBlockProps.save({
            className: 'sab-accordion',
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
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
    supports: {
        html: false,
        reusable: false,
    },
    attributes: {
        title: {
            type: 'string',
            default: '',
        },
        isOpen: {
            type: 'boolean',
            default: false,
        },
        iconStyle: {
            type: 'string',
            default: 'chevron',
        },
    },

    edit: function Edit({ attributes, setAttributes, isSelected }) {
        const { title, isOpen, iconStyle } = attributes;
        const blockProps = useBlockProps({
            className: `sab-accordion-item ${isOpen ? 'sab-open' : ''}`,
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Item Settings', 'simple-accordion-block')}>
                        <ToggleControl
                            label={__('Open by default', 'simple-accordion-block')}
                            help={__('Show this item expanded when the page loads.', 'simple-accordion-block')}
                            checked={isOpen}
                            onChange={(value) => setAttributes({ isOpen: value })}
                        />
                        <SelectControl
                            label={__('Icon Style', 'simple-accordion-block')}
                            value={iconStyle}
                            options={[
                                { label: __('Chevron', 'simple-accordion-block'), value: 'chevron' },
                                { label: __('Plus/Minus', 'simple-accordion-block'), value: 'plus' },
                                { label: __('Arrow', 'simple-accordion-block'), value: 'arrow' },
                            ]}
                            onChange={(value) => setAttributes({ iconStyle: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div
                        className="sab-accordion-header"
                        onClick={() => setAttributes({ isOpen: !isOpen })}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setAttributes({ isOpen: !isOpen });
                            }
                        }}
                    >
                        <RichText
                            tagName="span"
                            className="sab-accordion-title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Accordion title...', 'simple-accordion-block')}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className={`sab-accordion-icon sab-icon-${iconStyle}`} aria-hidden="true">
                            {iconStyle === 'chevron' && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            )}
                            {iconStyle === 'plus' && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12" className="sab-icon-horizontal"></line>
                                </svg>
                            )}
                            {iconStyle === 'arrow' && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            )}
                        </span>
                    </div>
                    <div className="sab-accordion-content" style={{ display: isOpen || isSelected ? 'block' : 'none' }}>
                        <div className="sab-accordion-content-inner">
                            <InnerBlocks
                                template={[['core/paragraph', { placeholder: __('Add content here...', 'simple-accordion-block') }]]}
                                templateLock={false}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: function Save({ attributes }) {
        const { title, isOpen, iconStyle } = attributes;
        const blockProps = useBlockProps.save({
            className: `sab-accordion-item ${isOpen ? 'sab-open' : ''}`,
        });

        return (
            <div {...blockProps} data-open={isOpen ? 'true' : 'false'}>
                <div className="sab-accordion-header">
                    <RichText.Content
                        tagName="span"
                        className="sab-accordion-title"
                        value={title}
                    />
                    <span className={`sab-accordion-icon sab-icon-${iconStyle}`} aria-hidden="true"></span>
                </div>
                <div className="sab-accordion-content">
                    <div className="sab-accordion-content-inner">
                        <InnerBlocks.Content />
                    </div>
                </div>
            </div>
        );
    },
});
