import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type InputMode = 'text' | 'numeric' | 'email' | 'password';

type InputTextProps = {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    mode?: InputMode;
    activeBorderColor?: string;
    fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    fontSize?: number;
};

export default function InputText({
    label,
    value,
    onChangeText,
    placeholder,
    mode = 'text',
    activeBorderColor = '#2563eb',
    fontWeight = 500,
    fontSize = 16
}: InputTextProps) {
    const [isFocused, setIsFocused] = useState(false);
    const handleChangeText = (text: string) => {
        if (mode === 'numeric') {
            const cleaned = text.replace(/[^0-9]/g, '');
            onChangeText(cleaned);
            return;
        }

        onChangeText(text);
    };

    const getInputProps = () => {
        switch (mode) {
            case 'numeric':
                return {
                    keyboardType: 'number-pad' as const,
                    inputMode: 'numeric' as const,
                };

            case 'email':
                return {
                    keyboardType: 'email-address' as const,
                    autoCapitalize: 'none' as const,
                };

            case 'password':
                return {
                    secureTextEntry: true,
                    autoCapitalize: 'none' as const,
                };

            default:
                return {
                    keyboardType: 'default' as const,
                };
        }
    };

    return (
        <View style={styles.wrapper}>
            {label ? <Text style={styles.label}>{label}</Text> : null}

            <TextInput
                style={[
                    styles.input,
                    { fontSize, fontWeight },
                    isFocused && { borderColor: activeBorderColor },
                ]}
                value={value}
                onChangeText={handleChangeText}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...getInputProps()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
    },

    label: {
        marginBottom: 6,
        fontSize: 14,
        fontWeight: '500',
    },

    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 6,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
});