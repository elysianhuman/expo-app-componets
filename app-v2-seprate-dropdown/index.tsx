
/* ===================== TYPES ===================== */

import { DropdownList } from "@/constants/DropdownList";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Generic item structure - can be extended based on your data needs
 */
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
  const data: Item[] = [
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
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.appContainer}>
        {/* Example 1: Single select with label */}
        <DropdownList
          label="Select Fruit"
          data={data}
          onSelectionChange={(selected) => {
            console.log('Single select:', selected);
          }}
        />

        {/* Example 2: Multi select without label */}
        <DropdownList
          data={data}
          multiSelect
          placeholder="Choose multiple fruits"
          onSelectionChange={(selected) => {
            console.log('Multi select:', selected);
          }}
        />

        {/* Example 3: Custom styled dropdown */}
        <DropdownList
          label="Premium Fruits"
          data={data}
          headerBackgroundColor="#f0f8ff"
          headerBorderColor="#1976D2"
          headerBorderWidth={2}
          itemSelectedBackgroundColor="#bbdefb"
          itemSelectedTextColor="#1e2180ff"
          checkIconColor="#0d47a1"
          placeholder="Select premium fruit"
          onSelectionChange={(selected) => {
            console.log('Custom styled:', selected);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  // App container
  appContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  // Main container for each dropdown instance
  container: {
    marginBottom: 30,
  },

  // Header wrapper (contains label and dropdown header)
  headerWrapper: {
    position: 'relative',
  },

  // Label styling (floating above the dropdown)
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

  // Dropdown header (clickable button area)
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Container for selected items display
  selectedContainer: {
    flex: 1,
  },

  // Placeholder text when nothing is selected
  placeholder: {
    fontSize: 16,
  },

  // Selected items text
  selectedText: {
    fontSize: 16,
  },

  // Backdrop overlay
  backdrop: {
    flex: 1,
  },

  // Floating dropdown container
  floatingDropdown: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    overflow: 'hidden',
  },

  // Search input container
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 10,
  },

  // Search text input
  searchInput: {
    flex: 1,
    fontSize: 17,
    height: 44,
  },

  // Individual list item
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // List item text
  itemText: {
    fontSize: 16,
  },

  // Empty state container
  noResults: {
    padding: 30,
    alignItems: 'center',
  },

  // Empty state text
  noResultsText: {
    fontSize: 15,
  },
});
