=== Simple Accordion Block ===
Contributors: mortogo321
Tags: accordion, faq, gutenberg, block, collapse
Requires at least: 5.8
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A lightweight, accessible accordion block for Gutenberg. No bloat, just accordions.

== Description ==

**Stop installing massive block libraries just for one accordion!**

Simple Accordion Block is a single-purpose Gutenberg block that does one thing perfectly: create beautiful, accessible accordions.

= Why This Plugin? =

Most accordion plugins come bundled with 30+ other blocks you don't need. This plugin gives you just the accordion - lightweight, fast, and focused.

= Features =

* **Lightweight** - Less than 10KB total
* **Accessible** - Full ARIA support, keyboard navigation
* **Customizable** - 3 icon styles (Chevron, Plus/Minus, Arrow)
* **No Dependencies** - Pure WordPress, no jQuery required
* **Dark Mode Support** - Respects user's color scheme preference
* **Reduced Motion** - Respects prefers-reduced-motion setting

= How to Use =

1. Add a new block in Gutenberg
2. Search for "Accordion"
3. Add your accordion items with titles and content
4. Customize icon style and behavior in the sidebar

= Settings =

**Accordion Settings:**
* Allow multiple open - Let users open multiple items at once

**Item Settings:**
* Open by default - Show item expanded on page load
* Icon Style - Choose between Chevron, Plus/Minus, or Arrow

== Installation ==

1. Upload the `simple-accordion-block` folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu
3. Add the "Accordion" block in the Gutenberg editor

== Frequently Asked Questions ==

= Does this work with the Classic Editor? =

No, this is a Gutenberg block. It requires the WordPress block editor.

= Can I nest accordions inside each other? =

Yes! You can add an accordion block inside another accordion's content area.

= How do I customize the colors? =

Use the block's color settings in the sidebar, or add custom CSS using the built-in CSS variables:

`
.sab-accordion {
    --sab-border-color: #your-color;
    --sab-header-bg: #your-color;
    --sab-header-bg-hover: #your-color;
}
`

= Is it accessible? =

Yes! The accordion follows WAI-ARIA best practices:
* Proper aria-expanded states
* Keyboard navigation (Enter, Space, Arrow keys)
* Focus management
* Screen reader friendly

== Screenshots ==

1. Accordion block in the editor
2. Customization options in the sidebar
3. Different icon styles
4. Accordion on the frontend

== Changelog ==

= 1.0.0 =
* Initial release
* Accordion wrapper block
* Accordion item block with nested content
* 3 icon styles: Chevron, Plus/Minus, Arrow
* Allow multiple open setting
* Open by default setting
* Full accessibility support
* Dark mode support
* Reduced motion support

== Upgrade Notice ==

= 1.0.0 =
Initial release

== Developer Notes ==

**Building from source:**

This plugin includes pre-built assets, but if you want to modify the source:

`
# Using Bun (recommended)
bun install
bun run build

# Using npm
npm install
npm run build
`

**CSS Variables:**

Customize the accordion appearance with CSS variables:

`
.sab-accordion {
    --sab-border-color: #e0e0e0;
    --sab-header-bg: #f9f9f9;
    --sab-header-bg-hover: #f0f0f0;
    --sab-header-padding: 16px 20px;
    --sab-content-padding: 20px;
    --sab-border-radius: 4px;
    --sab-transition-duration: 0.3s;
    --sab-icon-size: 20px;
}
`
