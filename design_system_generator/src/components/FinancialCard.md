# FinancialCard Component

A visually appealing, accessible card for financial dashboards.

## Props
- `title` (string, required): Card title (e.g., "Account Balance")
- `value` (string | number, required): Main value (e.g., "$12,345.67")
- `icon` (ReactNode, optional): Icon element (e.g., <DollarIcon />)
- `subtitle` (string, optional): Subtitle or description
- `status` (string, optional): Status or timestamp (e.g., "Updated 2 min ago")

## Usage Example
```tsx
import { FinancialCard } from "./src/components/FinancialCard";
import { FaDollarSign } from "react-icons/fa";

<FinancialCard
  title="Account Balance"
  value="$12,345.67"
  icon={<FaDollarSign />}
  subtitle="Main Checking Account"
  status="Updated 2 min ago"
/>
```

## Accessibility
- Uses `role="region"` and `aria-label` for screen readers
- Keyboard focusable (`tabIndex={0}`)
- Sufficient color contrast for text
- Icon is marked `aria-hidden` (decorative)

## Customization
- Style via props or override with CSS classes
- Add more props for actions or interactivity as needed
