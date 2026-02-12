/* ===================== IMPORTS ===================== */

import { CustomTextInput } from "@/constants/Customtextinput";
import { DropdownList } from "@/constants/DropdownList";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ===================== TYPES ===================== */

interface Item {
  id: string | number;
  name: string;
  category: string;
  color: string;
  price: number;
  unit: string;
  origin: string;
  stock: number;
  rating: number;
  description: string;
}

/* ===================== USAGE EXAMPLE ===================== */

export default function Index() {
  const [password, setPassword] = useState('');
  const [hostname, setHostname] = useState('');
  const [username, setUsername] = useState('');
  const [selectedFruit, setSelectedFruit] = useState<Item | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Item | null>(null);

  const fruits: Item[] = [
    {
      id: 1,
      name: 'Apple',
      category: 'Fruit',
      color: 'Red',
      price: 120,
      unit: 'kg',
      origin: 'Kashmir, India',
      stock: 45,
      rating: 4.5,
      description: 'Fresh red apples, crisp and juicy',
    },
    {
      id: 2,
      name: 'Banana',
      category: 'Fruit',
      color: 'Yellow',
      price: 60,
      unit: 'dozen',
      origin: 'Tamil Nadu, India',
      stock: 120,
      rating: 4.2,
      description: 'Sweet ripe bananas, rich in potassium',
    },
    {
      id: 3,
      name: 'Mango',
      category: 'Fruit',
      color: 'Orange',
      price: 150,
      unit: 'kg',
      origin: 'Andhra Pradesh, India',
      stock: 80,
      rating: 4.8,
      description: 'Sweet and juicy Alphonso mangoes',
    },
    {
      id: 4,
      name: 'Orange',
      category: 'Fruit',
      color: 'Orange',
      price: 80,
      unit: 'kg',
      origin: 'Nagpur, India',
      stock: 60,
      rating: 4.3,
      description: 'Fresh Nagpur oranges',
    },
    {
      id: 5,
      name: 'Grapes',
      category: 'Fruit',
      color: 'Green',
      price: 100,
      unit: 'kg',
      origin: 'Nashik, India',
      stock: 50,
      rating: 4.6,
      description: 'Sweet green grapes',
    },
  ];

  const companies: Item[] = [
    {
      id: 1,
      name: 'Tech Corp',
      category: 'Technology',
      color: 'Blue',
      price: 0,
      unit: '',
      origin: 'USA',
      stock: 0,
      rating: 4.5,
      description: 'Leading tech company',
    },
    {
      id: 2,
      name: 'Finance Inc',
      category: 'Finance',
      color: 'Green',
      price: 0,
      unit: '',
      origin: 'UK',
      stock: 0,
      rating: 4.3,
      description: 'Global finance corporation',
    },
    {
      id: 3,
      name: 'Health Plus',
      category: 'Healthcare',
      color: 'Red',
      price: 0,
      unit: '',
      origin: 'Germany',
      stock: 0,
      rating: 4.7,
      description: 'Healthcare solutions provider',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.appContainer}>

          <Text style={styles.title}>Form with Keyboard-Aware Dropdowns</Text>

          {/* ===================== TEXT INPUTS ===================== */}
          <Text style={styles.sectionHeader}>Server Connection</Text>

          <View style={styles.section}>
            <CustomTextInput
              label="Hostname"
              placeholder="Enter your hostname"
              value={hostname}
              onChangeText={setHostname}
              leftIcon={<Ionicons name="server" size={22} color="#555" />}
            />
          </View>

          <View style={styles.section}>
            <CustomTextInput
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              leftIcon={<Ionicons name="person" size={22} color="#555" />}
            />
          </View>

          <View style={styles.section}>
            <CustomTextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              leftIcon={<Ionicons name="lock-closed" size={22} color="#555" />}
              secureTextEntry
              showPasswordToggle
            />
          </View>

          {/* ===================== DROPDOWNS WITH ICONS ===================== */}
          <Text style={styles.sectionHeader}>Dropdowns with Left Icons</Text>

          {/* Dropdown 1: With Custom Icon */}
          <View style={styles.section}>
            <DropdownList
              label="Select Fruit"
              data={fruits}
              placeholder="Choose a fruit"
              leftIcon={<MaterialIcons name="apple" size={22} color="#ff6b6b" />}
              headerBackgroundColor="#fff5f5"
              headerBorderColor="#ff6b6b"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#ffe0e0"
              itemSelectedTextColor="#d63031"
              checkIconColor="#d63031"
              onSelectionChange={(selected) => {
                setSelectedFruit(selected as Item);
                console.log('Selected fruit:', selected);
              }}
            />
          </View>

          {/* Dropdown 2: With Different Icon */}
          <View style={styles.section}>
            <DropdownList
              label="Select Company"
              data={companies}
              placeholder="Choose a company"
              leftIcon={<Ionicons name="business" size={22} color="#1976D2" />}
              headerBackgroundColor="#f0f8ff"
              headerBorderColor="#1976D2"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#bbdefb"
              itemSelectedTextColor="#1e2180ff"
              checkIconColor="#0d47a1"
              onSelectionChange={(selected) => {
                setSelectedCompany(selected as Item);
                console.log('Selected company:', selected);
              }}
            />
          </View>

          {/* ===================== DROPDOWN WITHOUT ICON ===================== */}
          <Text style={styles.sectionHeader}>Dropdown without Icon</Text>

          <View style={styles.section}>
            <DropdownList
              label="Standard Dropdown"
              data={fruits}
              placeholder="Select an option"
              onSelectionChange={(selected) => {
                console.log('Standard dropdown:', selected);
              }}
            />
          </View>

          {/* ===================== MULTI-SELECT DROPDOWN ===================== */}
          <Text style={styles.sectionHeader}>Multi-Select with Icon</Text>

          <View style={styles.section}>
            <DropdownList
              label="Select Multiple Fruits"
              data={fruits}
              placeholder="Choose fruits"
              multiSelect
              leftIcon={<MaterialIcons name="checklist" size={22} color="#4caf50" />}
              headerBackgroundColor="#f1f8e9"
              headerBorderColor="#4caf50"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#c8e6c9"
              itemSelectedTextColor="#2e7d32"
              checkIconColor="#2e7d32"
              onSelectionChange={(selected) => {
                console.log('Selected multiple:', selected);
              }}
            />
          </View>

          {/* Info Section */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>✨ Features Demonstrated:</Text>
            <Text style={styles.infoText}>• Keyboard-aware dropdowns (works on iOS & Android)</Text>
            <Text style={styles.infoText}>• Dropdown automatically repositions above keyboard</Text>
            <Text style={styles.infoText}>• Left icon support (like CustomTextInput)</Text>
            <Text style={styles.infoText}>• Searchable dropdown with smooth scrolling</Text>
            <Text style={styles.infoText}>• Multi-select and single-select modes</Text>
          </View>

          {/* Selected Values Display */}
          {(selectedFruit || selectedCompany) && (
            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>Selected Values:</Text>
              {selectedFruit && (
                <Text style={styles.resultText}>🍎 Fruit: {selectedFruit.name}</Text>
              )}
              {selectedCompany && (
                <Text style={styles.resultText}>🏢 Company: {selectedCompany.name}</Text>
              )}
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  appContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1976D2',
    marginTop: 20,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#e3f2fd',
  },
  section: {
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    lineHeight: 20,
  },
  resultBox: {
    backgroundColor: '#f1f8e9',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    lineHeight: 20,
  },
});