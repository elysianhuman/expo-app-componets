import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomTextInput } from './CustomTextInput';

/**
 * Example App demonstrating various CustomTextInput configurations
 */
export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [search, setSearch] = useState('');
  const [phone, setPhone] = useState('');

  const [emailError, setEmailError] = useState('');

  // Validate email on change
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text && !text.includes('@')) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Custom TextInput Examples</Text>

        {/* Example 1: Basic Input with Label */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Basic Input with Label</Text>
          <CustomTextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Example 2: Email Input with Error */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Email with Validation</Text>
          <CustomTextInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            leftIcon="mail"
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            showClearButton
          />
        </View>

        {/* Example 3: Password Input with Toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Password with Toggle</Text>
          <CustomTextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            leftIcon="lock-closed"
            secureTextEntry
            showPasswordToggle
            helperText="Must be at least 8 characters"
          />
        </View>

        {/* Example 4: Search Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Search Input</Text>
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
        </View>

        {/* Example 5: Phone Number Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Phone Number</Text>
          <CustomTextInput
            label="Phone"
            placeholder="(123) 456-7890"
            value={phone}
            onChangeText={setPhone}
            leftIcon="call"
            keyboardType="phone-pad"
            rightIcon="checkmark-circle"
            rightIconColor="#4caf50"
          />
        </View>

        {/* Example 6: Multiline Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Multiline with Character Count</Text>
          <CustomTextInput
            label="Bio"
            placeholder="Tell us about yourself..."
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
            maxLength={200}
            showCharacterCount
            inputPadding={14}
            textAlignVertical="top"
            style={{ minHeight: 100 }}
          />
        </View>

        {/* Example 7: Custom Colors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Custom Colors (Purple Theme)</Text>
          <CustomTextInput
            label="Custom Input"
            placeholder="Purple themed input"
            inputBackgroundColor="#f3e5f5"
            inputBorderColor="#9c27b0"
            focusedBorderColor="#7b1fa2"
            textColor="#4a148c"
            placeholderTextColor="#ba68c8"
            leftIcon="person"
            leftIconColor="#9c27b0"
          />
        </View>

        {/* Example 8: Disabled State */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Disabled State</Text>
          <CustomTextInput
            label="Disabled"
            placeholder="This input is disabled"
            value="You can't edit this"
            disabled
            leftIcon="ban"
          />
        </View>

        {/* Example 9: No Label */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Without Label</Text>
          <CustomTextInput
            placeholder="Enter city name"
            showLabel={false}
            leftIcon="location"
            leftIconColor="#e91e63"
            rightIcon="navigate"
            rightIconColor="#e91e63"
          />
        </View>

        {/* Example 10: Rounded with Shadow */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Rounded with Custom Styling</Text>
          <CustomTextInput
            placeholder="Search location..."
            showLabel={false}
            leftIcon="search"
            inputBorderRadius={30}
            inputPadding={20}
            inputBackgroundColor="#fff"
            inputBorderColor="#e0e0e0"
            inputBorderWidth={2}
            containerStyle={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 12,
  },
});