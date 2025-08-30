# DashboardMetricCard Component

A clean, modern card for B2B dashboards displaying metrics, percentage change, and a sparkline.

## Props
- `title` (string, required): Metric title (e.g., "Revenue Growth")
- `value` (string | number, required): Main value (e.g., "$1,234,567")
- `change` (number, required): Percentage change (e.g., 5.2 for +5.2%)
- `sparkline` (number[], optional): Array of numbers for sparkline visualization

## Usage Example
```tsx
import { DashboardMetricCard } from "./src/components/DashboardMetricCard";

<DashboardMetricCard
  title="Revenue Growth"
  value="$1,234,567"
  change={5.2}
  sparkline={[1, 2, 3, 2.5, 3.5, 4, 5]}
/>
```

## Accessibility
- Uses `role="region"` and `aria-label` for screen readers
- Keyboard focusable (`tabIndex={0}`)
- Color coding for change: green for positive, red for negative
- Sparkline is decorative (`aria-hidden`)

## Customization
- Style via props or override with CSS classes
- Extend with tooltips, actions, or more metrics as needed
