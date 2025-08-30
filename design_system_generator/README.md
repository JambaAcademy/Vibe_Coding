# Design System Generator

A modern, accessible React component library for building B2B dashboard interfaces. This project includes reusable, customizable UI components such as financial cards, metric cards, and more, with support for light/dark modes, gradients, and interactive states.

## Features
- **FinancialCard**: Displays account or metric information with icons, values, subtitles, and status. Supports gradient backgrounds, hover animations, and dark mode.
- **DashboardMetricCard**: Shows metric title, value, percentage change (color-coded), and a sparkline trend visualization.
- **Storybook Integration**: Preview and interact with components in isolation using Storybook.
- **Accessibility**: ARIA roles, keyboard navigation, and color contrast for inclusive design.
- **TypeScript**: All components are fully typed for safety and IDE support.

## Getting Started

### 1. Clone the Repository
```sh
# Clone the repo
git clone <your-repo-url>
cd design_system_generator
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run Storybook
Preview and interact with components:
```sh
npx storybook
```
Storybook will open in your browser (usually at http://localhost:6006).

### 4. Usage in Your App
Import and use components in your React app:
```tsx
import { FinancialCard } from "./src/components/FinancialCard";
import { FaDollarSign } from "react-icons/fa";

<FinancialCard
  title="Account Balance"
  value="$12,345.67"
  icon={<FaDollarSign />}
  subtitle="Main Checking Account"
  status="Updated 2 min ago"
  darkMode={false}
/>
```

## Component Documentation

### FinancialCard
- **Props:**
  - `title`: string (required)
  - `value`: string | number (required)
  - `icon`: ReactNode (optional)
  - `subtitle`: string (optional)
  - `status`: string (optional)
  - `darkMode`: boolean (optional)
- **Features:**
  - Gradient background (light/dark)
  - Hover animation
  - Accessible region and labels

### DashboardMetricCard
- **Props:**
  - `title`: string (required)
  - `value`: string | number (required)
  - `change`: number (required, percentage)
  - `sparkline`: number[] (optional)
- **Features:**
  - Color-coded change (green/red)
  - Inline SVG sparkline
  - Accessible and keyboard focusable

## Accessibility
- All components use ARIA roles and labels
- Keyboard navigation supported
- Color contrast meets WCAG guidelines

## Customization
- Override styles via props or CSS
- Extend components for additional features

## Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

## License
MIT

## Troubleshooting
- If Storybook fails to start, ensure you have a valid `package.json` and all dependencies installed (`npm install`).
- For missing modules, run `npm install react react-dom react-icons`.
- For TypeScript errors, check your tsconfig and ensure all types are installed.

## Contact
For questions or support, open an issue or contact the maintainer.
