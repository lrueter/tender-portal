# TabPanel Component

## Overview
The `TabPanel` component is a reusable layout component that provides a consistent way to display tab content with smooth transitions and animations.

## Features
- Smooth fade and grow animations when switching between tabs
- Proper accessibility with ARIA attributes
- Responsive design
- Consistent spacing and styling

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | No | The content to be displayed in the tab panel |
| index | number | Yes | The index of the tab panel |
| value | number | Yes | The currently selected tab index |

## Usage Example

```tsx
import { TabPanel } from '../components/layout/TabPanel';

function MyComponent() {
  const [value, setValue] = useState(0);

  return (
    <div>
      {/* Tab controls would go here */}
      <TabPanel value={value} index={0}>
        <h2>First Tab Content</h2>
        <p>This is the content for the first tab</p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>Second Tab Content</h2>
        <p>This is the content for the second tab</p>
      </TabPanel>
    </div>
  );
}
```

## Styling
The component uses Material-UI's styling system and includes:
- Fade transition with 450ms duration
- Grow animation with 450ms duration
- Consistent padding (3 units)
- Relative positioning for proper layout

## Accessibility
- Uses `role="tabpanel"` for proper ARIA semantics
- Properly handles visibility based on selected tab
- Maintains focus management for keyboard navigation

## Best Practices
1. Always provide unique indices for each tab panel
2. Ensure the value prop matches the currently selected tab
3. Use consistent content structure within tab panels
4. Consider adding loading states for async content 