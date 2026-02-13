/* ===================== IMPORTS ===================== */

import { companyList, executeSqlQuery } from "@/api/focus/focus_api";
import { CustomTextInput } from "@/constants/Customtextinput";
import { DropdownList } from "@/constants/DropdownList";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
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
  const [companies, setCompanies] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCompany, setSelectedCompany] = useState<Item | null>(null);
  const [error, setError] = useState(null)
  // const companies: Item[] = [
  //   {
  //     id: 1,
  //     name: 'Tech Corp',
  //     category: 'Technology',
  //     color: 'Blue',
  //     price: 0,
  //     unit: '',
  //     origin: 'USA',
  //     stock: 0,
  //     rating: 4.5,
  //     description: 'Leading tech company',
  //   },
  //   {
  //     id: 2,
  //     name: 'Finance Inc',
  //     category: 'Finance',
  //     color: 'Green',
  //     price: 0,
  //     unit: '',
  //     origin: 'UK',
  //     stock: 0,
  //     rating: 4.3,
  //     description: 'Global finance corporation',
  //   },
  //   {
  //     id: 3,
  //     name: 'Health Plus',
  //     category: 'Healthcare',
  //     color: 'Red',
  //     price: 0,
  //     unit: '',
  //     origin: 'Germany',
  //     stock: 0,
  //     rating: 4.7,
  //     description: 'Healthcare solutions provider',
  //   },
  // ];


  /* FOR LOGGING PURPOSE */
  useEffect(() => {
    console.log("companies", products)
  }, [products])


  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!hostname) return
        const query = `select p.iMasterId as iProduct,p.sName as product, p.sCode as productCode,p.iProductType as productType from mCore_Product p where p.iMasterId <> 0 and p.iStatus <> 5`
        const products = await executeSqlQuery("0N0-130220261215383418281", hostname, query)
        // console.log("products", products)
        if (products.data.length > 0) {
          setProducts(products?.data)
        }

      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  }, [hostname])



  // const getCompanyList = async () => {
  //   try {
  //     const stored_hostname = await AsyncStorage.getItem('hostname');
  //     let data;
  //     if (stored_hostname) {
  //       data = await companyList(stored_hostname);
  //     } else {
  //       data = await companyList(hostname);
  //     }

  //     // console.log("company list", JSON.stringify(data, null, 2))
  //     setCompanies(data?.data)
  //     return data;
  //   } catch (error) {
  //     setError(error)
  //     return setCompanies([])
  //   }
  // }

  const getCompanyList = async () => {
    try {
      setError(null);

      const storedHostname = await AsyncStorage.getItem('hostname');

      // Determine which hostname to use
      const activeHostname = storedHostname ?? hostname;

      if (!activeHostname) {
        setError('Please enter a hostname.');
        setCompanies([]);
        return;
      }

      const data = await companyList(activeHostname);

      setCompanies(data?.data ?? []);
      return data;

    } catch (error: any) {
      // Safe error extraction
      const message =
        error?.message ||
        'Unable to fetch company list. Please check your server connection.';

      setError(message);
      setCompanies([]);
    }
  };





  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.appContainer}>

          <Text style={styles.title}>Focus Softnet ERP</Text>

          {/* ===================== TEXT INPUTS ===================== */}
          <Text style={styles.sectionHeader}>Server Connection</Text>

          <View style={styles.section}>
            <CustomTextInput
              label="Hostname"
              placeholder="Enter your hostname"
              value={hostname}
              inputBackgroundColor="#f0f8ff"
              inputBorderColor="#1976D2"
              focusedBorderColor="#00458eff"
              onChangeText={setHostname}
              onBlur={() => getCompanyList()}
              leftIcon={<Ionicons name="server" size={22} color="#555" />}
            />
          </View>

          <View style={styles.section}>
            <CustomTextInput
              label="Username"
              placeholder="Enter your username"
              value={username}
              inputBackgroundColor="#f0f8ff"
              inputBorderColor="#1976D2"
              focusedBorderColor="#00458eff"
              inputBorderWidth={1}
              onChangeText={setUsername}
              leftIcon={<Ionicons name="person" size={22} color="#555" />}
            />
          </View>

          <View style={styles.section}>
            <CustomTextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              inputBackgroundColor="#f0f8ff"
              inputBorderColor="#1976D2"
              focusedBorderColor="#00458eff"
              onChangeText={setPassword}
              leftIcon={<Ionicons name="lock-closed" size={22} color="#555" />}
              secureTextEntry
              showPasswordToggle
            />
          </View>
          <View style={styles.section}>
            <DropdownList
              label="Select Company"
              data={companies}
              placeholder="Choose a company"
              renderItem={(company) => `${company.CompanyName} [${company.CompanyCode}]`}
              getItemId={(company) => company.CompanyId}
              leftIcon={<Ionicons name="business" size={22} color="#555" />}
              headerBackgroundColor="#f0f8ff"
              headerBorderColor="#1976D2"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#bbdefb"
              itemSelectedTextColor="#1e2180ff"
              checkIconColor="#0d47a1"
              onSelectionChange={(selected) => {
                // Full company object with all properties!
                console.log(selected);
                // { CompanyCode: "010", CompanyId: "36", CompanyName: "Focus Orders Demo" }
              }}
            />
          </View>

          <View style={styles.section}>
            <DropdownList
              label="Select item"
              data={products}
              multiSelect
              placeholder="Choose a Item"
              renderItem={(product) => `${product.product} [${product.iProduct}]`}
              getItemId={(product) => product.iProduct}
              leftIcon={<Ionicons name="egg" size={22} color="#555" />}
              headerBackgroundColor="#f0f8ff"
              headerBorderColor="#1976D2"
              headerBorderWidth={1}
              itemSelectedBackgroundColor="#bbdefb"
              itemSelectedTextColor="#1e2180ff"
              checkIconColor="#0d47a1"
              onSelectionChange={(selected) => {
                // Full company object with all properties!
                console.log(selected);
                // { CompanyCode: "010", CompanyId: "36", CompanyName: "Focus Orders Demo" }
              }}
            />
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