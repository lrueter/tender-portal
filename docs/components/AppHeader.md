# AppHeader Component

## Overview
The `AppHeader` component serves as the main navigation header for the application, providing a consistent layout for the application title, navigation tabs, and user actions.

## Features
- Responsive design with mobile-friendly adjustments
- Smooth transitions and animations
- Integrated authentication controls
- Consistent styling with the application theme

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| tabValue | number | Yes | The currently selected tab index |
| onTabChange | (event: React.SyntheticEvent, newValue: number) => void | Yes | Callback function when tab selection changes |

## Usage Example

```tsx
import { AppHeader } from '../components/layout/AppHeader';

function MyComponent() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <AppHeader 
        tabValue={tabValue} 
        onTabChange={handleTabChange} 
      />
      {/* Rest of the application content */}
    </div>
  );
}
```

## Styling
The component uses Material-UI's styling system with the following customizations:
- Gradient background
- Custom shadow effects
- Responsive padding and spacing
- Custom tab styling with hover effects
- Consistent typography hierarchy

## Authentication Integration
- Integrated with Firebase Authentication
- Provides logout functionality
- Maintains consistent user session state

## Accessibility
- Proper heading hierarchy
- Keyboard navigation support
- ARIA-compliant tab controls
- High contrast color scheme

## Best Practices
1. Always provide both required props
2. Ensure proper error handling for authentication actions
3. Maintain consistent spacing and typography
4. Consider adding loading states for authentication actions
5. Test across different screen sizes

## Responsive Behavior
- Adjusts padding and font sizes for mobile devices
- Maintains usability on smaller screens
- Preserves functionality across all breakpoints 