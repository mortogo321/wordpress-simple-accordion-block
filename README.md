# Simple Accordion Block

A lightweight, accessible accordion block for Gutenberg. No bloat, just accordions.

![WordPress Plugin Version](https://img.shields.io/badge/version-1.0.0-blue)
![WordPress](https://img.shields.io/badge/WordPress-5.8%2B-blue)
![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple)
![License](https://img.shields.io/badge/license-GPL--2.0%2B-green)

## The Problem

Most accordion plugins come bundled with 30+ other blocks you don't need. You install a massive library just to get one simple accordion.

## The Solution

Simple Accordion Block is a single-purpose Gutenberg block that does one thing perfectly: create beautiful, accessible accordions.

## Features

- **Lightweight** - Less than 10KB total
- **Accessible** - Full ARIA support, keyboard navigation
- **Customizable** - 3 icon styles (Chevron, Plus/Minus, Arrow)
- **No Dependencies** - Pure WordPress, no jQuery required
- **Dark Mode Support** - Respects user's color scheme preference
- **Reduced Motion** - Respects prefers-reduced-motion setting

## Screenshots

*Screenshots coming soon*

### Features
- **Editor** - Easy drag-and-drop accordion building
- **Icon Styles** - Choose between Chevron, Plus/Minus, or Arrow icons

## Installation

### From GitHub
1. Download the latest release
2. Upload to `/wp-content/plugins/`
3. Activate through the 'Plugins' menu
4. Add the "Accordion" block in Gutenberg

### From WordPress.org
Coming soon!

## Usage

1. Add a new block in Gutenberg
2. Search for "Accordion"
3. Add your accordion items with titles and content
4. Customize icon style and behavior in the sidebar

## Customization

### CSS Variables

```css
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
```

## Development

```bash
# Install dependencies (using Bun)
bun install

# Build for production
bun run build

# Development mode with watch
bun run dev
```

## Requirements

- WordPress 5.8+
- PHP 7.4+
- Gutenberg (Block Editor)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

GPL-2.0-or-later - see [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html)

## Author

**Mor** - [GitHub](https://github.com/mortogo321) | [WordPress](https://profiles.wordpress.org/mortogo321/)
