/* ===================== IMPORTS ===================== */

import { CustomTextInput } from "@/constants/Customtextinput";
import { DropdownList } from "@/constants/DropdownList";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ===================== TYPE DEFINITIONS ===================== */

// Example 1: Company data structure
interface Company {
  CompanyCode: string;
  CompanyId: string;
  CompanyName: string;
}

// Example 2: Fruit data structure (old format)
interface Fruit {
  id: number;
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

// Example 3: User data structure
interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

// Example 4: Product data structure
interface Product {
  sku: string;
  productName: string;
  brand: string;
  price: number;
  inStock: boolean;
}

// Example 5: Country data structure
interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

/* ===================== MAIN COMPONENT ===================== */

export default function Index() {
  // State for text inputs
  const [password, setPassword] = useState('');
  const [hostname, setHostname] = useState('');
  const [username, setUsername] = useState('');

  // State for dropdowns
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Example 1: Company data
  const companies: Company[] = [
    { CompanyCode: "010", CompanyId: "36", CompanyName: "Focus Orders Demo" },
    { CompanyCode: "020", CompanyId: "37", CompanyName: "Tech Solutions Inc" },
    { CompanyCode: "030", CompanyId: "38", CompanyName: "Global Trading Co" },
    { CompanyCode: "040", CompanyId: "39", CompanyName: "Innovation Labs" },
  ];

  // Example 2: Fruit data
  const fruits: Fruit[] = [
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
      description: 'Fresh red apples',
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
      description: 'Sweet ripe bananas',
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
      description: 'Alphonso mangoes',
    },
  ];

  // Example 3: User data
  const users: User[] = [
    { userId: "U001", firstName: "John", lastName: "Doe", email: "john@example.com", role: "Admin" },
    { userId: "U002", firstName: "Jane", lastName: "Smith", email: "jane@example.com", role: "Manager" },
    { userId: "U003", firstName: "Bob", lastName: "Johnson", email: "bob@example.com", role: "User" },
  ];

  // Example 4: Product data
  const products: Product[] = [
    { sku: "SKU001", productName: "Laptop Pro 15", brand: "TechBrand", price: 1299.99, inStock: true },
    { sku: "SKU002", productName: "Wireless Mouse", brand: "ClickCo", price: 29.99, inStock: true },
    { sku: "SKU003", productName: "USB-C Hub", brand: "ConnectAll", price: 49.99, inStock: false },
  ];

  // Example 5: Country data
  const countries: Country[] = [
    { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
    { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
    { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
    { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.appContainer}>
          
          <Text style={styles.title}>Flexible Dropdown Examples</Text>

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

          {/* ===================== EXAMPLE 1: COMPANY DROPDOWN ===================== */}
          <Text style={styles.sectionHeader}>1. Company Data (Custom Format)</Text>

          <View style={styles.section}>
            <DropdownList<Company>
              label="Select Company"
              data={companies}
              renderItem={(company) => `${company.CompanyName} [${company.CompanyCode}]`}
              getItemId={(company) => company.CompanyId}
              placeholder="Choose a company"
              leftIcon={<Ionicons name="business" size={22} color="#1976D2" />}
              headerBackgroundColor="#f0f8ff"
              headerBorderColor="#1976D2"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#bbdefb"
              itemSelectedTextColor="#1e2180ff"
              checkIconColor="#0d47a1"
              onSelectionChange={(selected) => {
                setSelectedCompany(selected as Company);
                console.log('Selected company:', selected);
              }}
            />
          </View>

          {/* Show selected company details */}
          {selectedCompany && (
            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>Selected Company:</Text>
              <Text style={styles.resultText}>Name: {selectedCompany.CompanyName}</Text>
              <Text style={styles.resultText}>Code: {selectedCompany.CompanyCode}</Text>
              <Text style={styles.resultText}>ID: {selectedCompany.CompanyId}</Text>
            </View>
          )}

          {/* ===================== EXAMPLE 2: FRUIT DROPDOWN (OLD FORMAT) ===================== */}
          <Text style={styles.sectionHeader}>2. Fruit Data (Standard Format)</Text>

          <View style={styles.section}>
            <DropdownList<Fruit>
              label="Select Fruit"
              data={fruits}
              renderItem={(fruit) => `${fruit.name} - ₹${fruit.price}/${fruit.unit}`}
              getItemId={(fruit) => fruit.id}
              placeholder="Choose a fruit"
              leftIcon={<MaterialIcons name="apple" size={22} color="#ff6b6b" />}
              headerBackgroundColor="#fff5f5"
              headerBorderColor="#ff6b6b"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#ffe0e0"
              itemSelectedTextColor="#d63031"
              checkIconColor="#d63031"
              onSelectionChange={(selected) => {
                setSelectedFruit(selected as Fruit);
                console.log('Selected fruit:', selected);
              }}
            />
          </View>

          {/* ===================== EXAMPLE 3: USER DROPDOWN ===================== */}
          <Text style={styles.sectionHeader}>3. User Data (Name + Email + Role)</Text>

          <View style={styles.section}>
            <DropdownList<User>
              label="Select User"
              data={users}
              renderItem={(user) => `${user.firstName} ${user.lastName} (${user.role})`}
              getItemId={(user) => user.userId}
              placeholder="Choose a user"
              leftIcon={<Ionicons name="people" size={22} color="#9c27b0" />}
              headerBackgroundColor="#f3e5f5"
              headerBorderColor="#9c27b0"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#e1bee7"
              itemSelectedTextColor="#6a1b9a"
              checkIconColor="#6a1b9a"
              // Custom search filter: search in firstName, lastName, and email
              searchFilter={(user, query) => {
                const lowerQuery = query.toLowerCase();
                return (
                  user.firstName.toLowerCase().includes(lowerQuery) ||
                  user.lastName.toLowerCase().includes(lowerQuery) ||
                  user.email.toLowerCase().includes(lowerQuery) ||
                  user.role.toLowerCase().includes(lowerQuery)
                );
              }}
              onSelectionChange={(selected) => {
                setSelectedUser(selected as User);
                console.log('Selected user:', selected);
              }}
            />
          </View>

          {selectedUser && (
            <View style={styles.resultBox}>
              <Text style={styles.resultTitle}>Selected User:</Text>
              <Text style={styles.resultText}>Name: {selectedUser.firstName} {selectedUser.lastName}</Text>
              <Text style={styles.resultText}>Email: {selectedUser.email}</Text>
              <Text style={styles.resultText}>Role: {selectedUser.role}</Text>
            </View>
          )}

          {/* ===================== EXAMPLE 4: PRODUCT DROPDOWN ===================== */}
          <Text style={styles.sectionHeader}>4. Product Data (SKU + Brand + Price + Stock)</Text>

          <View style={styles.section}>
            <DropdownList<Product>
              label="Select Product"
              data={products}
              renderItem={(product) => 
                `${product.productName} - ${product.brand} ($${product.price}) ${product.inStock ? '✓' : '✗'}`
              }
              getItemId={(product) => product.sku}
              placeholder="Choose a product"
              leftIcon={<MaterialIcons name="shopping-cart" size={22} color="#4caf50" />}
              headerBackgroundColor="#f1f8e9"
              headerBorderColor="#4caf50"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#c8e6c9"
              itemSelectedTextColor="#2e7d32"
              checkIconColor="#2e7d32"
              onSelectionChange={(selected) => {
                setSelectedProduct(selected as Product);
                console.log('Selected product:', selected);
              }}
            />
          </View>

          {/* ===================== EXAMPLE 5: COUNTRY DROPDOWN WITH FLAGS ===================== */}
          <Text style={styles.sectionHeader}>5. Country Data (With Flag Emoji)</Text>

          <View style={styles.section}>
            <DropdownList<Country>
              label="Select Country"
              data={countries}
              renderItem={(country) => `${country.flag} ${country.name} (${country.dialCode})`}
              getItemId={(country) => country.code}
              placeholder="Choose a country"
              leftIcon={<Ionicons name="earth" size={22} color="#ff9800" />}
              headerBackgroundColor="#fff3e0"
              headerBorderColor="#ff9800"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#ffe0b2"
              itemSelectedTextColor="#e65100"
              checkIconColor="#e65100"
              onSelectionChange={(selected) => {
                setSelectedCountry(selected as Country);
                console.log('Selected country:', selected);
              }}
            />
          </View>

          {/* ===================== EXAMPLE 6: MULTI-SELECT ===================== */}
          <Text style={styles.sectionHeader}>6. Multi-Select Example</Text>

          <View style={styles.section}>
            <DropdownList<Fruit>
              label="Select Multiple Fruits"
              data={fruits}
              renderItem={(fruit) => fruit.name}
              getItemId={(fruit) => fruit.id}
              multiSelect
              placeholder="Choose fruits"
              leftIcon={<MaterialIcons name="checklist" size={22} color="#4caf50" />}
              headerBackgroundColor="#f1f8e9"
              headerBorderColor="#4caf50"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#c8e6c9"
              itemSelectedTextColor="#2e7d32"
              checkIconColor="#2e7d32"
              onSelectionChange={(selected) => {
                console.log('Selected multiple fruits:', selected);
              }}
            />
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>✨ Key Features:</Text>
            <Text style={styles.infoText}>• Works with ANY data structure</Text>
            <Text style={styles.infoText}>• Custom renderItem function defines display</Text>
            <Text style={styles.infoText}>• getItemId function for unique identification</Text>
            <Text style={styles.infoText}>• Optional custom search filter</Text>
            <Text style={styles.infoText}>• Returns complete object on selection</Text>
            <Text style={styles.infoText}>• Keyboard-aware positioning</Text>
          </View>

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
    fontSize: 16,
    fontWeight: '700',
    color: '#1976D2',
    marginTop: 20,
    marginBottom: 12,
    paddingBottom: 6,
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
    marginTop: -10,
    marginBottom: 20,
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