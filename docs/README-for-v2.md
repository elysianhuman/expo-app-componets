# CustomTextInput Component

A highly customizable TextInput component for React Native with the same styling flexibility as the DropdownList component.

## Features

✅ Customizable floating labels  
✅ **Support for ANY icon library** (Ionicons, MaterialIcons, FontAwesome, AntDesign, Feather, or custom components)  
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
# Install your preferred icon library (optional)
npm install @expo/vector-icons

# Or use react-native-vector-icons
npm install react-native-vector-icons
```

**Note:** Icon libraries are optional. You can pass any React component as an icon!

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
| `leftIcon` | `ReactNode` | - | Left icon component (any React element) |
| `rightIcon` | `ReactNode` | - | Right icon component (any React element) |
| `leftIconColor` | `string` | `'#555'` | Left icon color (deprecated - set in icon component) |
| `rightIconColor` | `string` | `'#555'` | Right icon color (deprecated - set in icon component) |
| `leftIconSize` | `number` | `22` | Left icon size (deprecated - set in icon component) |
| `rightIconSize` | `number` | `22` | Right icon size (deprecated - set in icon component) |
| `onLeftIconPress` | `() => void` | - | Left icon press handler |
| `onRightIconPress` | `() => void` | - | Right icon press handler |

### Clear Button
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showClearButton` | `boolean` | `false` | Show clear button when input has value |
| `clearButtonIcon` | `ReactNode` | - | Custom clear button icon component |
| `clearButtonColor` | `string` | `'#999'` | Clear button color (for default icon) |
| `clearButtonSize` | `number` | `20` | Clear button size (for default icon) |

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
| `passwordVisibleIcon` | `ReactNode` | - | Custom icon when password is visible |
| `passwordHiddenIcon` | `ReactNode` | - | Custom icon when password is hidden |
| `passwordToggleColor` | `string` | `'#555'` | Password toggle icon color (for default icon) |
| `passwordToggleSize` | `number` | `22` | Password toggle icon size (for default icon) |

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

### Using Different Icon Libraries

**Ionicons:**
```tsx
import { Ionicons } from '@expo/vector-icons';

<CustomTextInput
  label="Username"
  placeholder="Enter username"
  leftIcon={<Ionicons name="person" size={22} color="#555" />}
/>
```

**MaterialIcons:**
```tsx
import { MaterialIcons } from '@expo/vector-icons';

<CustomTextInput
  label="Email"
  placeholder="Enter email"
  leftIcon={<MaterialIcons name="email" size={22} color="#1976D2" />}
/>
```

**FontAwesome:**
```tsx
import { FontAwesome } from '@expo/vector-icons';

<CustomTextInput
  label="User"
  placeholder="Enter username"
  leftIcon={<FontAwesome name="user" size={20} color="#555" />}
/>
```

**AntDesign:**
```tsx
import { AntDesign } from '@expo/vector-icons';

<CustomTextInput
  placeholder="Search..."
  leftIcon={<AntDesign name="search1" size={20} color="#666" />}
/>
```

**Custom Component as Icon:**
```tsx
<CustomTextInput
  label="Price"
  placeholder="0.00"
  leftIcon={
    <View style={{
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#4caf50',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>$</Text>
    </View>
  }
/>
```

### Email Input with Validation
```tsx
import { Ionicons } from '@expo/vector-icons';

<CustomTextInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  leftIcon={<Ionicons name="mail" size={22} color="#555" />}
  keyboardType="email-address"
  autoCapitalize="none"
  error={emailError}
  showClearButton
/>
```

### Password with Toggle
```tsx
import { FontAwesome } from '@expo/vector-icons';

<CustomTextInput
  label="Password"
  placeholder="Enter password"
  value={password}
  onChangeText={setPassword}
  leftIcon={<FontAwesome name="lock" size={22} color="#555" />}
  secureTextEntry
  showPasswordToggle
  passwordVisibleIcon={<FontAwesome name="eye-slash" size={22} color="#555" />}
  passwordHiddenIcon={<FontAwesome name="eye" size={22} color="#555" />}
  helperText="Must be at least 8 characters"
/>
```

### Search Bar
```tsx
import { Ionicons } from '@expo/vector-icons';

<CustomTextInput
  placeholder="Search..."
  value={search}
  onChangeText={setSearch}
  leftIcon={<Ionicons name="search" size={22} color="#555" />}
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
import { Ionicons } from '@expo/vector-icons';

<CustomTextInput
  label="Username"
  placeholder="Enter username"
  inputBackgroundColor="#f3e5f5"
  inputBorderColor="#9c27b0"
  focusedBorderColor="#7b1fa2"
  textColor="#4a148c"
  placeholderTextColor="#ba68c8"
  leftIcon={<Ionicons name="person" size={22} color="#9c27b0" />}
/>
```

### Minimal (No Label, Round)
```tsx
import { Ionicons } from '@expo/vector-icons';

<CustomTextInput
  placeholder="Search location..."
  showLabel={false}
  leftIcon={<Ionicons name="search" size={22} color="#555" />}
  inputBorderRadius={30}
  inputPadding={20}
  inputBackgroundColor="#fff"
  inputBorderColor="#e0e0e0"
/>
```

## Mixing Icon Libraries

You can mix and match different icon libraries in the same component:

```tsx
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

<CustomTextInput
  label="Location"
  placeholder="Enter location"
  leftIcon={<MaterialIcons name="location-on" size={22} color="#e91e63" />}
  rightIcon={<Feather name="navigation" size={20} color="#e91e63" />}
  showClearButton
  clearButtonIcon={<AntDesign name="close" size={18} color="#999" />}
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