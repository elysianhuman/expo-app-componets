# CustomTextInput Component

A highly customizable TextInput component for React Native with the same styling flexibility as the DropdownList component.

## Features

✅ Customizable floating labels  
✅ Left and right icons  
✅ Password visibility toggle  
✅ Clear button  
✅ Error and helper text  
✅ Character counter  
✅ Focus states  
✅ Disabled states  
✅ Full style customization  
✅ Multiline support  

## Installation

```bash
npm install @expo/vector-icons
```

## Basic Usage

```tsx
import { CustomTextInput } from './CustomTextInput';

function MyComponent() {
  const [text, setText] = useState('');

  return (
    <CustomTextInput
      label="Username"
      placeholder="Enter username"
      value={text}
      onChangeText={setText}
    />
  );
}
```

## Props Reference

### Label Customization
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text displayed above input |
| `labelStyle` | `TextStyle` | - | Custom style for label |
| `showLabel` | `boolean` | `true` | Show/hide the label |

### Placeholder
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Enter text...'` | Placeholder text |
| `placeholderTextColor` | `string` | `'#999'` | Placeholder color |

### Input Appearance
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inputBorderRadius` | `number` | `12` | Border radius |
| `inputBackgroundColor` | `string` | `'#ffffff'` | Background color |
| `inputBorderColor` | `string` | `'#ddd'` | Border color |
| `inputBorderWidth` | `number` | `1` | Border width |
| `inputPadding` | `number` | `18` | Internal padding |

### Text Appearance
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `textColor` | `string` | `'#333'` | Text color |
| `textFontSize` | `number` | `16` | Font size |
| `textFontWeight` | `TextStyle['fontWeight']` | `'400'` | Font weight |

### Icons
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leftIcon` | `string` | - | Left icon name (Ionicons) |
| `rightIcon` | `string` | - | Right icon name (Ionicons) |
| `leftIconColor` | `string` | `'#555'` | Left icon color |
| `rightIconColor` | `string` | `'#555'` | Right icon color |
| `leftIconSize` | `number` | `22` | Left icon size |
| `rightIconSize` | `number` | `22` | Right icon size |
| `onLeftIconPress` | `() => void` | - | Left icon press handler |
| `onRightIconPress` | `() => void` | - | Right icon press handler |

### Clear Button
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showClearButton` | `boolean` | `false` | Show clear button when input has value |
| `clearButtonColor` | `string` | `'#999'` | Clear button color |
| `clearButtonSize` | `number` | `20` | Clear button size |

### Error State
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `string` | - | Error message to display |
| `errorColor` | `string` | `'#d32f2f'` | Error text color |
| `errorFontSize` | `number` | `13` | Error text font size |

### Helper Text
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `helperText` | `string` | - | Helper text below input |
| `helperTextColor` | `string` | `'#666'` | Helper text color |
| `helperTextFontSize` | `number` | `13` | Helper text font size |

### Focus State
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `focusedBorderColor` | `string` | `'#1976D2'` | Border color when focused |
| `focusedBackgroundColor` | `string` | - | Background color when focused |

### Password Toggle
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `secureTextEntry` | `boolean` | `false` | Hide text (password mode) |
| `showPasswordToggle` | `boolean` | `false` | Show eye icon to toggle visibility |
| `passwordToggleColor` | `string` | `'#555'` | Password toggle icon color |
| `passwordToggleSize` | `number` | `22` | Password toggle icon size |

### Character Counter
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showCharacterCount` | `boolean` | `false` | Show character counter |
| `maxLength` | `number` | - | Maximum character length |
| `characterCountColor` | `string` | `'#666'` | Counter text color |
| `characterCountFontSize` | `number` | `12` | Counter font size |

### Other
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Disable input |
| `disabledOpacity` | `number` | `0.5` | Opacity when disabled |
| `containerStyle` | `ViewStyle` | - | Custom container style |
| `value` | `string` | `''` | Input value |
| `onChangeText` | `(text: string) => void` | - | Text change handler |

Plus all standard React Native `TextInput` props!

## Common Examples

### Email Input with Validation
```tsx
<CustomTextInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  leftIcon="mail"
  keyboardType="email-address"
  autoCapitalize="none"
  error={emailError}
  showClearButton
/>
```

### Password with Toggle
```tsx
<CustomTextInput
  label="Password"
  placeholder="Enter password"
  value={password}
  onChangeText={setPassword}
  leftIcon="lock-closed"
  secureTextEntry
  showPasswordToggle
  helperText="Must be at least 8 characters"
/>
```

### Search Bar
```tsx
<CustomTextInput
  placeholder="Search..."
  value={search}
  onChangeText={setSearch}
  leftIcon="search"
  showClearButton
  inputBorderRadius={25}
  inputBackgroundColor="#f5f5f5"
  inputBorderColor="#f5f5f5"
  showLabel={false}
/>
```

### Multiline with Counter
```tsx
<CustomTextInput
  label="Bio"
  placeholder="Tell us about yourself..."
  value={bio}
  onChangeText={setBio}
  multiline
  numberOfLines={4}
  maxLength={200}
  showCharacterCount
  textAlignVertical="top"
/>
```

### Custom Colors (Theme)
```tsx
<CustomTextInput
  label="Username"
  placeholder="Enter username"
  inputBackgroundColor="#f3e5f5"
  inputBorderColor="#9c27b0"
  focusedBorderColor="#7b1fa2"
  textColor="#4a148c"
  placeholderTextColor="#ba68c8"
  leftIcon="person"
  leftIconColor="#9c27b0"
/>
```

### Minimal (No Label, Round)
```tsx
<CustomTextInput
  placeholder="Search location..."
  showLabel={false}
  leftIcon="search"
  inputBorderRadius={30}
  inputPadding={20}
  inputBackgroundColor="#fff"
  inputBorderColor="#e0e0e0"
/>
```

## Priority of Right-Side Elements

The right side of the input shows only ONE element in this priority order:
1. Clear button (if `showClearButton={true}` and input has value)
2. Password toggle (if `showPasswordToggle={true}` and `secureTextEntry={true}`)
3. Right icon (if `rightIcon` is provided)

## Styling Tips

### Matching the Dropdown Style
```tsx
// Use these props to match the dropdown appearance:
<CustomTextInput
  inputBorderRadius={12}
  inputBackgroundColor="#ffffff"
  inputBorderColor="#ddd"
  inputBorderWidth={1}
  inputPadding={18}
  textFontSize={16}
  focusedBorderColor="#1976D2"
/>
```

### Material Design Style
```tsx
<CustomTextInput
  inputBorderRadius={4}
  inputBackgroundColor="transparent"
  inputBorderColor="#e0e0e0"
  focusedBorderColor="#1976D2"
  textColor="#212121"
/>
```

### iOS Style
```tsx
<CustomTextInput
  inputBorderRadius={10}
  inputBackgroundColor="#f2f2f7"
  inputBorderColor="#f2f2f7"
  focusedBorderColor="#007aff"
  textColor="#000000"
/>
```

## License

MIT
