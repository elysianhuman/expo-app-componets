import * as React from 'react';
import {
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const COMPANY_LIST = [
  { id: '1', name: 'Focus ERP' },
  { id: '2', name: 'Focus Retail' },
  { id: '3', name: 'Focus Manufacturing' },
  { id: '4', name: 'Focus Distribution' },
];

export default function LoginScreen() {
  const [hostname, setHostname] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [company, setCompany] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const filteredCompanies = COMPANY_LIST.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* Background Image */}
      <Image
        source={require('@/assets/focuserp/background_img.png')}
        style={styles.fullImage}
        resizeMode="cover"
      />

      {/* Overlay */}
      <SafeAreaView style={styles.safeOverlay}>
        <View style={styles.formContainer}>
          <TextInput
            label="Hostname"
            value={hostname}
            onChangeText={setHostname}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
          />

          {/* Modal Trigger */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownText}>
              {company || 'Select Company'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Centered Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalCard}>
            <TextInput
              placeholder="Search company"
              value={search}
              onChangeText={setSearch}
              mode="outlined"
              style={styles.input}
            />

            <FlatList
              data={filteredCompanies}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    setCompany(item.name);
                    setModalVisible(false);
                    setSearch('');
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  fullImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  safeOverlay: {
    flex: 1,
  },

  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  dropdown: {
    height: 56,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  dropdownText: {
    color: '#555',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },

  item: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
