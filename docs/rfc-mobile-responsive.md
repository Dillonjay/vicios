# RFC: Improve Mobile Responsiveness

## Problem Statement

The current site is optimized for desktop resolutions but lacks a tailored experience for mobile devices. Navigation, animations, and layout can appear cramped or misaligned on smaller screens. We need to improve mobile rendering while retaining all existing animations and styles.

## Goals

- Ensure pages render well on common mobile breakpoints (e.g., 375px–768px widths).
- Preserve all current animations, interactions, and styling.
- Maintain a single codebase with responsive adjustments via Tailwind CSS.
- Keep performance acceptable on mobile devices.

## Non‑Goals

- Major redesign of desktop layout.
- Removing or simplifying existing animations.

## Proposed Approach

1. **Audit Existing Components**
   - Review each component and section for responsiveness. Identify areas where layout or text overflow occurs on small screens.
2. **Utilize Tailwind Responsive Utilities**
   - Apply `sm:`/`md:`/`lg:` classes so typography and spacing adapt gracefully.
   - For multi-column grids (e.g., About and Project sections), collapse into single-column or simplified layouts on `sm` breakpoints.
3. **Responsive Navigation Menu**
   - Keep the animated circular menu but ensure hit targets are large enough for touch.
   - On very small screens, consider reducing the scale of the expanded menu so links remain visible without overflowing.
4. **Section-Specific Layouts**
   - **Hero & Album Showcase**: Shorten the hero section on small devices and scale album art so it stays in view without cropping. Adjust framer-motion transforms to maintain performance on mobile.
   - **About & Project Sections**: Collapse multi-column layouts into a single column and stack images below text while keeping sticky animations intact.
   - **Lyrics Section**: Provide a scrollable container with increased font size and better line wrapping so lyrics are legible on phones.
   - **Connect Section**: Reflow social icons and contact links into a vertical list with larger touch targets.
   - **Navigation**: Keep the circular menu but allow it to shift slightly inward or move to the bottom on ultra-narrow screens.
5. **Image and Video Scaling**
   - Ensure images use `max-w-full` and `h-auto` so they scale down appropriately.
   - Optimize heavy assets to reduce load times on mobile connections.
6. **Touch & Accessibility**
   - Verify all interactive elements are reachable via touch with at least a 44×44px target.
   - Maintain keyboard accessibility and ARIA labels from the desktop version.
7. **Testing**
   - Use device emulation and real devices to test breakpoints.
   - Check for animation jank or excessive CPU usage on low‑end phones.
8. **Deployment Considerations**
   - Autoprefixer is already configured; confirm it outputs vendor prefixes for mobile browsers.
   - Continuously run `npm run verify` to catch lint/format issues.

## Alternatives Considered

- Creating a separate mobile site – rejected to avoid code duplication.
- Disabling animations on mobile – rejected as the goal is to preserve interaction parity.

## Success Metrics

- Pages pass Google Lighthouse mobile audits with scores above 90.
- No layout shifts or overflow when tested on iOS Safari and Android Chrome at common device sizes.
- Navigation functions correctly with touch gestures.
