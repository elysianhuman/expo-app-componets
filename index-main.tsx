import BackgroundImage from '@/assets/focuserp/background.png';
import FallbackImage from '@/assets/focuserp/focushd.png';
import InputText from '@/constants/InputText';
import SelectModal from '@/constants/selectModal';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COMPANY_LIST = [
  { id: '1', name: 'Focus ERP' },
  { id: '2', name: 'Focus Retail' },
  { id: '3', name: 'Focus Manufacturing' },
  { id: '4', name: 'Focus Distribution' },
];

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [hostname, setHostname] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.root}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <KeyboardAvoidingView
          style={styles.root}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          {/* HEADER IMAGE */}
          {/* HEADER IMAGE WITH CENTER LOGO */}
          <View style={styles.headerContainer}>
            <Image
              source={BackgroundImage}
              style={styles.headerBackground}
              resizeMode="cover"
            />

            <Image
              source={FallbackImage}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </View>


          {/* FORM OVER IMAGE */}
          <View style={styles.formCard}>
            {/* Hostname */}
            <View style={styles.inputRow}>
              <Ionicons name="globe-outline" size={22} color="#666" />
              <View style={styles.inputFlex}>
                <InputText
                  label="Hostname"
                  value={hostname}
                  onChangeText={setHostname}
                  placeholder="Enter hostname"
                />
              </View>
            </View>

            {/* Username */}
            <View style={styles.inputRow}>
              <Ionicons name="person-outline" size={22} color="#666" />
              <View style={styles.inputFlex}>
                <InputText
                  label="Username"
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter username"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputRow}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color="#666"
              />
              <View style={styles.inputFlex}>
                <InputText
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  mode="password"
                />
              </View>
            </View>

            {/* Company */}
            <View style={styles.inputRow}>
              <Ionicons
                name="business-outline"
                size={22}
                color="#666"
              />
              <View style={styles.inputFlex}>
                <SelectModal listData={COMPANY_LIST} />
              </View>
            </View>

            {/* Login Button */}
            <View style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* HEADER IMAGE */
  headerImage: {
    height: '35%',
    width: '100%',
  },
  headerContainer: {
    height: '35%',
    width: '100%',
    position: 'relative',
  },

  headerBackground: {
    height: '100%',
    width: '100%',
  },

  headerLogo: {
    position: 'absolute',
    alignSelf: 'center',
    top: '20%',          // vertical centering inside header
    width: '55%',        // responsive for tablets
    maxWidth: 320,       // prevents over-scaling on large screens
    height: 100,
  },

  /* FORM CARD OVER IMAGE */
  formCard: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: 10,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },

  inputFlex: {
    flex: 1,
  },

  loginButton: {
    marginTop: 24,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
