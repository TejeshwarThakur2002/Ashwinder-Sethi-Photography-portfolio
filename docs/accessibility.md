# Accessibility Guidelines - Shoot Studio

This document summarizes the accessibility practices implemented in the Shoot Studio website and provides guidance for maintaining accessibility standards.

## Overview

The site follows WCAG 2.1 Level AA guidelines and implements best practices for:
- Semantic HTML structure
- Keyboard navigation
- Screen reader compatibility
- Reduced motion preferences
- Color contrast and visual accessibility

## Implemented Features

### 1. Skip to Content Link

A "Skip to main content" link is provided at the top of every page, visible on keyboard focus:

```tsx
// In app/layout.tsx
<a href="#main-content" className="skip-to-content">
  Skip to main content
</a>
```

All pages include `id="main-content"` on their `<main>` element.

### 2. Semantic Landmarks

Every page uses proper HTML5 landmark elements:
- `<header role="banner">` - Site header/navigation
- `<nav aria-label="Main navigation">` - Navigation menus
- `<main id="main-content">` - Primary page content
- `<footer>` - Site footer
- `<section>` - Major content sections
- `<article>` - Blog posts and standalone content
- `<aside>` - Complementary content (e.g., sidebar)

### 3. Heading Hierarchy

Each page follows a logical heading structure:
- Single `<h1>` per page (page title)
- `<h2>` for major sections
- `<h3>` and below for subsections

The `SectionHeading` component supports dynamic heading levels:

```tsx
<SectionHeading 
  title="Gallery"
  as="h1"  // Use h1 for page titles, h2 for sections
/>
```

### 4. Keyboard Navigation

All interactive elements are:
- Focusable via Tab/Shift+Tab
- Activatable via Enter/Space
- Have visible focus indicators

**Focus Styles (globals.css):**
```css
:focus-visible {
  outline: 2px solid var(--color-red);
  outline-offset: 2px;
}
```

**Mobile Menu:**
- Toggle button has `aria-expanded` and `aria-controls`
- Menu has `role="menu"` and `aria-label`

### 5. Modal/Lightbox Accessibility

The `LightboxModal` component implements:
- `role="dialog"` and `aria-modal="true"`
- Focus trap (Tab cycles within modal)
- Keyboard support (Escape to close, Arrow keys to navigate)
- Focus restoration to trigger element on close
- Prevents body scroll while open

```tsx
// Focus restoration pattern
const triggerElementRef = useRef<HTMLElement | null>(null);

const handlePhotoClick = (photo, triggerElement) => {
  triggerElementRef.current = triggerElement;
  setSelectedPhoto(photo);
};

const handleClose = () => {
  setSelectedPhoto(null);
  triggerElementRef.current?.focus();
};
```

### 6. Forms & Validation

All form fields have:
- Associated `<label>` elements via `htmlFor`
- `aria-invalid` when validation fails
- `aria-describedby` linking to error messages
- `aria-live="polite"` for success/error announcements

Example from `ContactForm.tsx`:
```tsx
<label htmlFor="name">Name</label>
<input
  id="name"
  aria-invalid={!!errors.name}
  aria-describedby={errors.name ? 'name-error' : undefined}
/>
{errors.name && (
  <p id="name-error" role="alert">{errors.name}</p>
)}
```

### 7. Images & Alt Text

- All meaningful images have descriptive `alt` text
- Decorative images use `alt=""` or `aria-hidden="true"`
- Gallery images have `aria-label` on buttons: `View {photo.title}`

### 8. Reduced Motion

The site respects `prefers-reduced-motion`:

**CSS (globals.css):**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**JavaScript (Hero.tsx):**
```tsx
const prefersReducedMotion = useReducedMotion();

// Disable auto-advance for reduced motion users
useEffect(() => {
  if (prefersReducedMotion) return;
  // Auto-advance logic...
}, [prefersReducedMotion]);
```

### 9. Touch Targets

On touch devices, buttons and links maintain minimum 44x44px tap targets:

```css
@media (pointer: coarse) {
  button, a, [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## Testing Checklist

### Keyboard Testing
- [ ] Tab through all pages - focus order is logical
- [ ] All interactive elements are reachable
- [ ] Focus indicators are visible
- [ ] Escape closes modals
- [ ] Arrow keys work in lightbox

### Screen Reader Testing
- [ ] Page titles are announced correctly
- [ ] Headings create logical document outline
- [ ] Form labels are announced
- [ ] Error messages are announced
- [ ] Images have appropriate alt text

### Visual Testing
- [ ] Site works at 200% zoom
- [ ] No horizontal scrolling at 320px width
- [ ] Color contrast meets AA requirements
- [ ] Focus indicators have sufficient contrast

## Future Improvements

The following accessibility enhancements are deferred for future sprints:

1. **ARIA Live Regions**: Add `aria-live` regions for dynamic content updates (e.g., gallery filter results count)

2. **Skip Links for Filters**: Add skip links to bypass filter controls

3. **Comprehensive Screen Reader Testing**: Full testing with NVDA, VoiceOver, and JAWS

4. **High Contrast Mode**: Test and optimize for Windows High Contrast Mode

5. **Internationalization**: Add `lang` attributes for multi-language content when applicable

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist)
- [A11y Project](https://www.a11yproject.com/)
- [Framer Motion Accessibility](https://www.framer.com/motion/accessibility/)
