import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication methods
import { auth } from '../../../../firebaseConfig'; // Firebase configuration

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!isChecked) {
      Alert.alert('Error', 'You must agree to the terms and conditions');
      return;
    }

    try {
      // Firebase sign-up logic
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', `Account created for: ${email}`);
      // Redirect to login screen after successful signup
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subHeader}>Enter your details below & free sign up</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        >
          <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Terms & Conditions Checkbox */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
          <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
            {isChecked && <Icon name="check" size={16} color="white" />}
          </View>
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          By creating an account you agree with our terms & conditions.
        </Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Create account</Text>
      </TouchableOpacity>

      {/* Log In Link */}
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1C',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#1C1C1C',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkedCheckbox: {
    backgroundColor: '#4E68E8',
    borderColor: '#4E68E8',
  },
  checkboxLabel: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#1C1C1C',
  },
  signUpButton: {
    backgroundColor: '#4E68E8',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loginText: {
    fontSize: 14,
    color: '#1C1C1C',
    textAlign: 'center',
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
