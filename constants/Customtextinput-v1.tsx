import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

/**
 * Props for the CustomTextInput component
 * All styling and behavior can be customized through these props
 */
interface CustomTextInputProps extends Omit<TextInputProps, 'style'> {
    // Label customization
    label?: string;
    labelStyle?: TextStyle;
    showLabel?: boolean;

    // Placeholder customization
    placeholder?: string;
    placeholderTextColor?: string;

    // Input appearance
    inputBorderRadius?: number;
    inputBackgroundColor?: string;
    inputBorderColor?: string;
    inputBorderWidth?: number;
    inputPadding?: number;

    // Text appearance
    textColor?: string;
    textFontSize?: number;
    textFontWeight?: TextStyle['fontWeight'];

    // Icons
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    leftIconColor?: string;
    rightIconColor?: string;
    leftIconSize?: number;
    rightIconSize?: number;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;

    // Clear button
    showClearButton?: boolean;
    clearButtonColor?: string;
    clearButtonSize?: number;

    // Error state
    error?: string;
    errorColor?: string;
    errorFontSize?: number;

    // Helper text
    helperText?: string;
    helperTextColor?: string;
    helperTextFontSize?: number;

    // Focus state
    focusedBorderColor?: string;
    focusedBackgroundColor?: string;

    // Disabled state
    disabled?: boolean;
    disabledOpacity?: number;

    // Container style
    containerStyle?: ViewStyle;

    // Password visibility toggle
    secureTextEntry?: boolean;
    showPasswordToggle?: boolean;
    passwordToggleColor?: string;
    passwordToggleSize?: number;

    // Character counter
    showCharacterCount?: boolean;
    maxLength?: number;
    characterCountColor?: string;
    characterCountFontSize?: number;

    // Value
    value?: string;
    onChangeText?: (text: string) => void;
}

/**
 * A flexible, customizable TextInput component for React Native
 * Supports labels, icons, error states, password toggle, and character counter
 */
export const CustomTextInput: React.FC<CustomTextInputProps> = ({
    // Label
    label,
    labelStyle,
    showLabel = true,

    // Placeholder
    placeholder = 'Enter text...',
    placeholderTextColor = '#999',

    // Input appearance
    inputBorderRadius = 12,
    inputBackgroundColor = '#ffffff',
    inputBorderColor = '#ddd',
    inputBorderWidth = 1,
    inputPadding = 18,

    // Text appearance
    textColor = '#333',
    textFontSize = 16,
    textFontWeight = '400',

    // Icons
    leftIcon,
    rightIcon,
    leftIconColor = '#555',
    rightIconColor = '#555',
    leftIconSize = 22,
    rightIconSize = 22,
    onLeftIconPress,
    onRightIconPress,

    // Clear button
    showClearButton = false,
    clearButtonColor = '#999',
    clearButtonSize = 20,

    // Error state
    error,
    errorColor = '#d32f2f',
    errorFontSize = 13,

    // Helper text
    helperText,
    helperTextColor = '#666',
    helperTextFontSize = 13,

    // Focus state
    focusedBorderColor = '#1976D2',
    focusedBackgroundColor,

    // Disabled state
    disabled = false,
    disabledOpacity = 0.5,

    // Container style
    containerStyle,

    // Password visibility
    secureTextEntry = false,
    showPasswordToggle = false,
    passwordToggleColor = '#555',
    passwordToggleSize = 22,

    // Character counter
    showCharacterCount = false,
    maxLength,
    characterCountColor = '#666',
    characterCountFontSize = 12,

    // Value
    value = '',
    onChangeText,

    // Other TextInput props
    ...textInputProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    /**
     * Handle text change
     */
    const handleChangeText = (text: string) => {
        if (onChangeText) {
            onChangeText(text);
        }
    };

    /**
     * Handle clear button press
     */
    const handleClear = () => {
        if (onChangeText) {
            onChangeText('');
        }
    };

    /**
     * Toggle password visibility
     */
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    /**
     * Determine if clear button should be shown
     */
    const shouldShowClearButton = showClearButton && value.length > 0 && !disabled;

    /**
     * Determine if password toggle should be shown
     */
    const shouldShowPasswordToggle = showPasswordToggle && secureTextEntry;

    /**
     * Get the current border color based on state
     */
    const getBorderColor = () => {
        if (error) return errorColor;
        if (isFocused) return focusedBorderColor;
        return inputBorderColor;
    };

    /**
     * Get the current background color based on state
     */
    const getBackgroundColor = () => {
        if (isFocused && focusedBackgroundColor) return focusedBackgroundColor;
        return inputBackgroundColor;
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {/* Input Wrapper */}
            <View style={styles.inputWrapper}>
                {/* Label positioned above the input */}
                {label && showLabel && (
                    <View style={[styles.labelContainer, labelStyle]}>
                        <Text style={styles.labelText}>{label}</Text>
                    </View>
                )}

                {/* Input Container */}
                <View
                    style={[
                        styles.inputContainer,
                        {
                            padding: inputPadding,
                            backgroundColor: getBackgroundColor(),
                            borderRadius: inputBorderRadius,
                            borderWidth: inputBorderWidth,
                            borderColor: getBorderColor(),
                            opacity: disabled ? disabledOpacity : 1,
                        },
                    ]}
                >
                    {/* Left Icon */}
                    {leftIcon && (
                        <TouchableOpacity
                            onPress={onLeftIconPress}
                            disabled={!onLeftIconPress || disabled}
                            activeOpacity={0.7}
                            style={styles.iconContainer}
                        >
                            <Ionicons name={leftIcon} size={leftIconSize} color={leftIconColor} />
                        </TouchableOpacity>
                    )}

                    {/* Text Input */}
                    <TextInput
                        style={[
                            styles.textInput,
                            {
                                color: textColor,
                                fontSize: textFontSize,
                                fontWeight: textFontWeight,
                            },
                        ]}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        value={value}
                        onChangeText={handleChangeText}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        editable={!disabled}
                        secureTextEntry={secureTextEntry && !isPasswordVisible}
                        maxLength={maxLength}
                        {...textInputProps}
                    />

                    {/* Clear Button */}
                    {shouldShowClearButton && (
                        <TouchableOpacity
                            onPress={handleClear}
                            activeOpacity={0.7}
                            style={styles.iconContainer}
                        >
                            <Ionicons
                                name="close-circle"
                                size={clearButtonSize}
                                color={clearButtonColor}
                            />
                        </TouchableOpacity>
                    )}

                    {/* Password Toggle */}
                    {shouldShowPasswordToggle && !shouldShowClearButton && (
                        <TouchableOpacity
                            onPress={togglePasswordVisibility}
                            activeOpacity={0.7}
                            style={styles.iconContainer}
                        >
                            <Ionicons
                                name={isPasswordVisible ? 'eye-off' : 'eye'}
                                size={passwordToggleSize}
                                color={passwordToggleColor}
                            />
                        </TouchableOpacity>
                    )}

                    {/* Right Icon */}
                    {rightIcon && !shouldShowClearButton && !shouldShowPasswordToggle && (
                        <TouchableOpacity
                            onPress={onRightIconPress}
                            disabled={!onRightIconPress || disabled}
                            activeOpacity={0.7}
                            style={styles.iconContainer}
                        >
                            <Ionicons name={rightIcon} size={rightIconSize} color={rightIconColor} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Bottom Section: Error, Helper Text, and Character Count */}
            <View style={styles.bottomSection}>
                <View style={styles.textSection}>
                    {/* Error Message */}
                    {error && (
                        <Text
                            style={[
                                styles.errorText,
                                {
                                    color: errorColor,
                                    fontSize: errorFontSize,
                                },
                            ]}
                        >
                            {error}
                        </Text>
                    )}

                    {/* Helper Text */}
                    {helperText && !error && (
                        <Text
                            style={[
                                styles.helperText,
                                {
                                    color: helperTextColor,
                                    fontSize: helperTextFontSize,
                                },
                            ]}
                        >
                            {helperText}
                        </Text>
                    )}
                </View>

                {/* Character Counter */}
                {showCharacterCount && maxLength && (
                    <Text
                        style={[
                            styles.characterCount,
                            {
                                color: characterCountColor,
                                fontSize: characterCountFontSize,
                            },
                        ]}
                    >
                        {value.length}/{maxLength}
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // Main container
    container: {
        marginBottom: 20,
    },

    // Input wrapper (contains label and input)
    inputWrapper: {
        position: 'relative',
    },

    // Label styling (floating above the input)
    labelContainer: {
        position: 'absolute',
        top: -10,
        left: 14,
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        zIndex: 10,
    },
    labelText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#333',
    },

    // Input container (border, background, padding)
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    // Icon container
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Text input
    textInput: {
        flex: 1,
        fontSize: 16,
        padding: 0, // Remove default padding
    },

    // Bottom section (error, helper text, character count)
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 6,
        paddingHorizontal: 4,
    },

    // Text section (error or helper text)
    textSection: {
        flex: 1,
    },

    // Error text
    errorText: {
        fontSize: 13,
    },

    // Helper text
    helperText: {
        fontSize: 13,
    },

    // Character counter
    characterCount: {
        fontSize: 12,
        marginLeft: 8,
    },
});