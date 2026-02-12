import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomTextInput } from './CustomTextInput';

// Import different icon libraries
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

/**
 * Example App demonstrating CustomTextInput with different icon libraries
 */
export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [search, setSearch] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Custom Icons Examples</Text>

        {/* Example 1: Ionicons (Default) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Ionicons (Default)</Text>
          <CustomTextInput
            label="Username"
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            leftIcon={<Ionicons name="person" size={22} color="#555" />}
            rightIcon={<Ionicons name="checkmark-circle" size={22} color="#4caf50" />}
          />
        </View>

        {/* Example 2: MaterialIcons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. MaterialIcons</Text>
          <CustomTextInput
            label="Email"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            leftIcon={<MaterialIcons name="email" size={22} color="#1976D2" />}
            showClearButton
            clearButtonIcon={<MaterialIcons name="close" size={20} color="#999" />}
          />
        </View>

        {/* Example 3: FontAwesome */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. FontAwesome</Text>
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
          />
        </View>

        {/* Example 4: AntDesign */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. AntDesign</Text>
          <CustomTextInput
            label="Search"
            placeholder="Search here..."
            value={search}
            onChangeText={setSearch}
            leftIcon={<AntDesign name="search1" size={20} color="#666" />}
            showClearButton
            clearButtonIcon={<AntDesign name="closecircle" size={20} color="#999" />}
          />
        </View>

        {/* Example 5: Feather Icons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Feather Icons</Text>
          <CustomTextInput
            label="Phone"
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            leftIcon={<Feather name="phone" size={20} color="#555" />}
            rightIcon={<Feather name="check" size={20} color="#4caf50" />}
          />
        </View>

        {/* Example 6: Mixed Icons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Mixed Icon Libraries</Text>
          <CustomTextInput
            label="Location"
            placeholder="Enter location"
            leftIcon={<MaterialIcons name="location-on" size={22} color="#e91e63" />}
            rightIcon={<Feather name="navigation" size={20} color="#e91e63" />}
            showClearButton
            clearButtonIcon={<AntDesign name="close" size={18} color="#999" />}
          />
        </View>

        {/* Example 7: Custom Color Variants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Colorful Icons</Text>
          <CustomTextInput
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            leftIcon={<MaterialIcons name="credit-card" size={22} color="#ff9800" />}
            rightIcon={<MaterialIcons name="verified" size={22} color="#4caf50" />}
          />
        </View>

        {/* Example 8: Without Icons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. No Icons (Text Only)</Text>
          <CustomTextInput
            label="Full Name"
            placeholder="John Doe"
            showClearButton
          />
        </View>

        {/* Example 9: Only Left Icon */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Left Icon Only</Text>
          <CustomTextInput
            placeholder="Message"
            showLabel={false}
            leftIcon={<Ionicons name="chatbubble" size={20} color="#9c27b0" />}
          />
        </View>

        {/* Example 10: Only Right Icon */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Right Icon Only</Text>
          <CustomTextInput
            placeholder="Share your thoughts..."
            showLabel={false}
            rightIcon={<Ionicons name="send" size={20} color="#2196f3" />}
            onRightIconPress={() => console.log('Send clicked!')}
          />
        </View>

        {/* Example 11: Custom SVG or Component */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Custom Component as Icon</Text>
          <CustomTextInput
            label="Custom"
            placeholder="With custom component"
            leftIcon={
              <View style={styles.customIcon}>
                <Text style={styles.customIconText}>$</Text>
              </View>
            }
          />
        </View>

        {/* Example 12: Large Icons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Large Icons</Text>
          <CustomTextInput
            placeholder="Search everything..."
            showLabel={false}
            leftIcon={<MaterialIcons name="search" size={28} color="#1976D2" />}
            inputPadding={20}
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
  customIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customIconText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});