# Flexible DropdownList - Complete Guide

## 🎯 What's New?

The DropdownList component now works with **ANY data structure**! No more being locked into specific object shapes.

### Key Changes:
1. ✅ **Works with any data structure** (no more required `name`, `id` properties)
2. ✅ **Custom render function** - YOU decide how items display
3. ✅ **Custom ID extractor** - YOU decide what makes items unique
4. ✅ **Optional custom search** - YOU can define search logic
5. ✅ **Complete object returned** - Get the whole object on selection

---

## 📋 New Required Props

### `renderItem: (item: T) => string`
**Required** - Defines how each item displays in the list

```tsx
// Example: Company data
renderItem={(company) => `${company.CompanyName} [${company.CompanyCode}]`}

// Example: User data
renderItem={(user) => `${user.firstName} ${user.lastName} (${user.role})`}

// Example: Product data
renderItem={(product) => `${product.productName} - $${product.price}`}
```

### `getItemId: (item: T) => string | number`
**Required** - Extracts unique identifier from each item

```tsx
// Example: Company data
getItemId={(company) => company.CompanyId}

// Example: User data
getItemId={(user) => user.userId}

// Example: Product data
getItemId={(product) => product.sku}
```

### `searchFilter?: (item: T, query: string) => boolean`
**Optional** - Custom search logic (defaults to searching in rendered text)

```tsx
// Search in multiple fields
searchFilter={(user, query) => {
  const lowerQuery = query.toLowerCase();
  return (
    user.firstName.toLowerCase().includes(lowerQuery) ||
    user.lastName.toLowerCase().includes(lowerQuery) ||
    user.email.toLowerCase().includes(lowerQuery)
  );
}}
```

---

## 🔄 Migration Examples

### Old Way (Limited Structure)

```tsx
// ❌ OLD - Required specific structure
interface Item {
  id: string | number;
  name: string;
  // ... other required fields
}

<DropdownList
  data={fruits}
  titleKey="name"  // Limited to object keys
  onSelectionChange={(selected) => console.log(selected)}
/>
```

### New Way (Any Structure)

```tsx
// ✅ NEW - Works with ANY structure
interface Company {
  CompanyCode: string;
  CompanyId: string;
  CompanyName: string;
}

<DropdownList<Company>
  data={companies}
  renderItem={(company) => `${company.CompanyName} [${company.CompanyCode}]`}
  getItemId={(company) => company.CompanyId}
  onSelectionChange={(selected) => console.log(selected)}
/>
```

---

## 💡 Real-World Examples

### Example 1: Company Dropdown (Your Use Case!)

```tsx
interface Company {
  CompanyCode: string;
  CompanyId: string;
  CompanyName: string;
}

const companies: Company[] = [
  { CompanyCode: "010", CompanyId: "36", CompanyName: "Focus Orders Demo" },
  { CompanyCode: "020", CompanyId: "37", CompanyName: "Tech Solutions Inc" },
];

<DropdownList<Company>
  label="Select Company"
  data={companies}
  renderItem={(company) => `${company.CompanyName} [${company.CompanyCode}]`}
  getItemId={(company) => company.CompanyId}
  leftIcon={<Ionicons name="business" size={22} color="#1976D2" />}
  onSelectionChange={(selected) => {
    // 'selected' is the complete Company object!
    console.log('Company ID:', selected.CompanyId);
    console.log('Company Name:', selected.CompanyName);
    console.log('Company Code:', selected.CompanyCode);
  }}
/>
```

**Display in list:** `Focus Orders Demo [010]`  
**Selected object:** `{CompanyCode: "010", CompanyId: "36", CompanyName: "Focus Orders Demo"}`

---

### Example 2: User Dropdown with Multiple Fields

```tsx
interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
}

<DropdownList<User>
  label="Select User"
  data={users}
  // Display: "John Doe (Admin)"
  renderItem={(user) => `${user.firstName} ${user.lastName} (${user.role})`}
  getItemId={(user) => user.userId}
  // Search in firstName, lastName, email, and role
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
    console.log('Selected user:', selected);
    // Access all user properties
    console.log(selected.email);
    console.log(selected.department);
  }}
/>
```

---

### Example 3: Product with Price and Stock

```tsx
interface Product {
  sku: string;
  productName: string;
  brand: string;
  price: number;
  inStock: boolean;
}

<DropdownList<Product>
  label="Select Product"
  data={products}
  // Display: "Laptop Pro 15 - TechBrand ($1299.99) ✓"
  renderItem={(product) => 
    `${product.productName} - ${product.brand} ($${product.price}) ${product.inStock ? '✓' : '✗'}`
  }
  getItemId={(product) => product.sku}
  onSelectionChange={(selected) => {
    if (!selected.inStock) {
      alert('This product is out of stock!');
    }
  }}
/>
```

---

### Example 4: Country with Flag Emoji

```tsx
interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

<DropdownList<Country>
  label="Select Country"
  data={countries}
  // Display: "🇺🇸 United States (+1)"
  renderItem={(country) => `${country.flag} ${country.name} (${country.dialCode})`}
  getItemId={(country) => country.code}
  leftIcon={<Ionicons name="earth" size={22} color="#ff9800" />}
  onSelectionChange={(selected) => {
    console.log('Country code:', selected.code);
    console.log('Dial code:', selected.dialCode);
  }}
/>
```

---

### Example 5: API Response Structure

```tsx
// Common API response format
interface ApiCategory {
  category_id: number;
  category_name: string;
  parent_id: number | null;
  is_active: boolean;
}

<DropdownList<ApiCategory>
  label="Select Category"
  data={categoriesFromApi}
  renderItem={(cat) => cat.category_name}
  getItemId={(cat) => cat.category_id}
  // Filter only active categories during search
  searchFilter={(cat, query) => {
    return cat.is_active && 
           cat.category_name.toLowerCase().includes(query.toLowerCase());
  }}
  onSelectionChange={(selected) => {
    console.log('Selected category:', selected);
  }}
/>
```

---

## 🎨 Advanced Customization

### Complex Display Format

```tsx
interface Employee {
  empId: string;
  name: string;
  designation: string;
  salary: number;
  joinDate: string;
}

<DropdownList<Employee>
  data={employees}
  renderItem={(emp) => {
    const years = new Date().getFullYear() - new Date(emp.joinDate).getFullYear();
    return `${emp.name} • ${emp.designation} • ${years}y exp`;
  }}
  getItemId={(emp) => emp.empId}
  onSelectionChange={(selected) => {
    console.log(`Selected: ${selected.name} earning $${selected.salary}`);
  }}
/>
```

---

### Conditional Rendering

```tsx
interface Account {
  accountId: string;
  accountName: string;
  balance: number;
  isActive: boolean;
  isPremium: boolean;
}

<DropdownList<Account>
  data={accounts}
  renderItem={(acc) => {
    const status = acc.isActive ? '✓' : '✗';
    const badge = acc.isPremium ? ' ⭐' : '';
    return `${acc.accountName}${badge} (${status}) - $${acc.balance}`;
  }}
  getItemId={(acc) => acc.accountId}
  onSelectionChange={(selected) => {
    if (!selected.isActive) {
      alert('This account is inactive');
    }
  }}
/>
```

---

## 🔍 Search Examples

### Default Search (Searches in rendered text)

```tsx
<DropdownList<Company>
  data={companies}
  renderItem={(c) => `${c.CompanyName} [${c.CompanyCode}]`}
  getItemId={(c) => c.CompanyId}
  // Searches automatically in "CompanyName [CompanyCode]"
/>
```

### Custom Multi-Field Search

```tsx
<DropdownList<User>
  data={users}
  renderItem={(u) => `${u.firstName} ${u.lastName}`}
  getItemId={(u) => u.userId}
  searchFilter={(user, query) => {
    const q = query.toLowerCase();
    // Search in firstName, lastName, email, phone
    return (
      user.firstName.toLowerCase().includes(q) ||
      user.lastName.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.phone.includes(query) // Exact phone search
    );
  }}
/>
```

### Search with Filtering

```tsx
<DropdownList<Product>
  data={products}
  renderItem={(p) => p.productName}
  getItemId={(p) => p.sku}
  searchFilter={(product, query) => {
    // Only show in-stock items in search results
    return product.inStock && 
           product.productName.toLowerCase().includes(query.toLowerCase());
  }}
/>
```

---

## 📦 Complete Working Example

```tsx
import { Ionicons } from '@expo/vector-icons';
import { DropdownList } from '@/constants/DropdownList';
import { useState } from 'react';

interface Company {
  CompanyCode: string;
  CompanyId: string;
  CompanyName: string;
}

function MyForm() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const companies: Company[] = [
    { CompanyCode: "010", CompanyId: "36", CompanyName: "Focus Orders Demo" },
    { CompanyCode: "020", CompanyId: "37", CompanyName: "Tech Solutions Inc" },
    { CompanyCode: "030", CompanyId: "38", CompanyName: "Global Trading Co" },
  ];

  return (
    <View>
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
          console.log('Full company object:', selected);
        }}
      />

      {selectedCompany && (
        <View style={{ padding: 16, backgroundColor: '#f0f8ff' }}>
          <Text>Company Name: {selectedCompany.CompanyName}</Text>
          <Text>Company Code: {selectedCompany.CompanyCode}</Text>
          <Text>Company ID: {selectedCompany.CompanyId}</Text>
        </View>
      )}
    </View>
  );
}
```

---

## ✅ Benefits of This Approach

1. **Flexible** - Works with any data structure from any API
2. **Type-Safe** - Full TypeScript support with generics
3. **Clean** - No need to transform your data
4. **Powerful** - Complete object returned on selection
5. **Searchable** - Custom search logic for your use case
6. **Maintainable** - Clear separation of display vs data

---

## 🚀 Quick Reference

### Minimum Required Props

```tsx
<DropdownList<YourType>
  data={yourData}
  renderItem={(item) => "how to display item"}
  getItemId={(item) => item.uniqueId}
  onSelectionChange={(selected) => console.log(selected)}
/>
```

### Common Pattern

```tsx
<DropdownList<Company>
  label="Label"
  data={companies}
  renderItem={(c) => `${c.CompanyName} [${c.CompanyCode}]`}
  getItemId={(c) => c.CompanyId}
  placeholder="Choose..."
  leftIcon={<Icon />}
  onSelectionChange={(selected) => {
    // 'selected' is the full Company object
  }}
/>
```

---

## 💡 Pro Tips

1. **Use TypeScript generics** for type safety: `<DropdownList<YourType>>`
2. **renderItem controls display** - make it informative but concise
3. **getItemId must be unique** - use primary keys from your data
4. **The entire object is returned** - no need to look it up again
5. **Custom search is optional** - default searches in rendered text

---

That's it! Your dropdown now works with **any data structure**! 🎉