<?php
/**
 * Plugin Name: Simple Accordion Block
 * Plugin URI: https://github.com/mortogo321/wordpress-simple-accordion-block
 * Description: A lightweight, accessible accordion block for Gutenberg. No bloat, just accordions.
 * Version: 1.0.0
 * Author: Mor
 * Author URI: https://github.com/mortogo321
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: simple-accordion-block
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define('SAB_VERSION', '1.0.0');
define('SAB_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SAB_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Register the block
 */
function sab_register_block() {
    // Register block script
    wp_register_script(
        'sab-editor-script',
        SAB_PLUGIN_URL . 'build/index.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
        SAB_VERSION,
        true
    );

    // Register editor styles
    wp_register_style(
        'sab-editor-style',
        SAB_PLUGIN_URL . 'build/editor.css',
        ['wp-edit-blocks'],
        SAB_VERSION
    );

    // Register frontend styles
    wp_register_style(
        'sab-style',
        SAB_PLUGIN_URL . 'build/style.css',
        [],
        SAB_VERSION
    );

    // Register frontend script
    wp_register_script(
        'sab-frontend-script',
        SAB_PLUGIN_URL . 'build/frontend.js',
        [],
        SAB_VERSION,
        true
    );

    // Register the accordion wrapper block
    register_block_type('sab/accordion', [
        'editor_script' => 'sab-editor-script',
        'editor_style' => 'sab-editor-style',
        'style' => 'sab-style',
        'render_callback' => 'sab_render_accordion',
    ]);

    // Register the accordion item block
    register_block_type('sab/accordion-item', [
        'editor_script' => 'sab-editor-script',
        'render_callback' => 'sab_render_accordion_item',
    ]);
}
add_action('init', 'sab_register_block');

/**
 * Render accordion wrapper
 */
function sab_render_accordion($attributes, $content) {
    $wrapper_attributes = get_block_wrapper_attributes([
        'class' => 'sab-accordion',
        'data-allow-multiple' => isset($attributes['allowMultiple']) && $attributes['allowMultiple'] ? 'true' : 'false',
    ]);

    // Enqueue frontend script only when block is used
    wp_enqueue_script('sab-frontend-script');

    return sprintf(
        '<div %1$s>%2$s</div>',
        $wrapper_attributes,
        $content
    );
}

/**
 * Render accordion item
 */
function sab_render_accordion_item($attributes, $content) {
    $title = isset($attributes['title']) ? $attributes['title'] : '';
    $is_open = isset($attributes['isOpen']) && $attributes['isOpen'];
    $item_id = 'sab-item-' . wp_unique_id();

    $icon_style = isset($attributes['iconStyle']) ? $attributes['iconStyle'] : 'chevron';

    $icon_svg = sab_get_icon_svg($icon_style);

    return sprintf(
        '<div class="sab-accordion-item%1$s" data-open="%2$s">
            <button
                class="sab-accordion-header"
                aria-expanded="%2$s"
                aria-controls="%3$s"
                type="button"
            >
                <span class="sab-accordion-title">%4$s</span>
                <span class="sab-accordion-icon" aria-hidden="true">%5$s</span>
            </button>
            <div
                id="%3$s"
                class="sab-accordion-content"
                role="region"
                %6$s
            >
                <div class="sab-accordion-content-inner">%7$s</div>
            </div>
        </div>',
        $is_open ? ' sab-open' : '',
        $is_open ? 'true' : 'false',
        esc_attr($item_id),
        esc_html($title),
        $icon_svg,
        $is_open ? '' : 'hidden',
        $content
    );
}

/**
 * Get icon SVG
 */
function sab_get_icon_svg($style) {
    $icons = [
        'chevron' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',
        'plus' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12" class="sab-icon-horizontal"></line></svg>',
        'arrow' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
    ];

    return $icons[$style] ?? $icons['chevron'];
}

/**
 * Load plugin textdomain
 */
function sab_load_textdomain() {
    load_plugin_textdomain('simple-accordion-block', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('init', 'sab_load_textdomain');
