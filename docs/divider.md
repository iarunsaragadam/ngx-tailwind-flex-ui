# Divider Component

The `DividerComponent` provides a simple visual separator between UI elements.

## Usage
```html
<lib-divider orientation="horizontal"></lib-divider>
```

## Inputs
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider orientation |
| `class` | `string` | `''` | Additional Tailwind classes |

## Accessibility
- Uses `role="separator"` and sets `aria-orientation` to match the divider orientation.
