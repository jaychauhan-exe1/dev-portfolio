# Jay Singh Chauhan - Developer Portfolio

A minimalist, modern developer portfolio website built with Next.js and Tailwind CSS. Featuring smooth animations, dark/light mode support, and dynamic content.
URL: https:***.com

## Features

### Core Features
- **Dark/Light Mode Toggle** - Seamless theme switching with localStorage persistence
- **Multi-Language Greetings** - Animated greeting text cycling through 7 languages with smooth slide-up animations
- **Expandable Sections** - Interactive sections for Experience, Learnings, and Achievements with smooth height animations
- **GitHub Contributions** - Live GitHub calendar that adapts to your current theme
- **Responsive Design** - Fully responsive layout optimized for all screen sizes

### Interactive Components
- **Cursor-Following Navbar** - Fixed navbar with a smooth cursor-tracking glow effect using requestAnimationFrame for 60fps performance
- **Animated Call-to-Action Button** - Dynamic button with animated gradient edges
- **Smooth Transitions** - All UI elements feature polished CSS transitions and animations

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Custom React components with hooks

## Project Structure

```
├── app/
│   ├── page.tsx              # Main portfolio page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles and animations
├── components/
│   ├── expandableContent.tsx # Reusable expandable section component
│   └── ui/
│       ├── Navbar.tsx        # Navigation with cursor tracking
│       ├── gradientButton.tsx
│       └── TechStack.tsx
├── public/                   # Static assets
└── config files              # Next.js, TypeScript, ESLint configs
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Wanna test website locally?

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

## Key Sections

### Hero Section
- Animated profile image with gradient overlay
- Dynamic greeting in multiple languages (Hello, Hola, Bonjour, Ciao, Namaste, こんにちは, Guten Tag)
- Elegant name display with custom font styling
- Professional tagline with smooth typography

### Experience & Achievements
- Expandable cards with clip animation
- Gradient overlay that transitions smoothly
- "View More/Less" toggle with smooth height animation

### GitHub Contributions
- Real-time GitHub activity calendar
- Automatically switches between light and dark theme colors
- Shows contribution history

### Call-to-Action
- Interactive button with animated gradient edge effects
- Dark mode optimized styling
- Hover effects with smooth transitions

### Customization
- Light mode: Foreground background with text color invert on hover
- Dark mode: Foreground colors remain consistent on hover

## Components Library

This portfolio will soon feature a dedicated `/components` page showcasing reusable components developed during the website creation process. These components are designed to be:
- **Modular** - Easy to copy and integrate into other projects
- **Customizable** - Built with Tailwind CSS for easy styling
- **Optimized** - Performance-focused implementations
- **Well-documented** - Clear usage examples and props documentation

Components coming soon:
- Expandable Content Component
- Cursor-Tracking Effects
- Animated Theme Switcher
- Smooth Transition Wrappers

## Configuration

### Theme System
The portfolio uses CSS custom properties for theming. Modify colors in `app/globals.css`:

```css
:root {
  --background: #FBFAF6;
  --foreground: #121215;
  --border: #E4E2DC;
}

.dark {
  --background: #121215;
  --foreground: #FBFAF6;
  --border: #242423;
}
```


## Performance Optimizations

- **useMemo** - Prevents unnecessary re-renders of expandable sections
- **requestAnimationFrame** - Smooth 60fps cursor tracking in navbar
- **CSS Animations** - Hardware-accelerated animations for better performance
- **Image Optimization** - Next.js Image component for automatic optimization
- **Code Splitting** - Automatic by Next.js

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Upcoming Features

- [ ] `/components` page with reusable component library
- [ ] Component code snippets with copy functionality
- [ ] Interactive component playground
- [ ] Blog section
- [ ] Dark mode system preference detection

## Contact & Links

- **GitHub**: [@jaychauhan-exe1](https://github.com/jaychauhan-exe1)
- **Portfolio**: [Visit Live Site](#)

## License

This project is open source and available under the MIT License.

---

Built with ❤️ by Jay Singh Chauhan
