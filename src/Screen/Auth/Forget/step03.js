import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateNewPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleContinue = () => {
    if (password === confirmPassword && password.length >= 6) {
      console.log('Password successfully updated!');
      // Perform further actions, such as navigating to another screen
    } else {
      console.log('Passwords do not match or are too short!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Password</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Create Your New Password</Text>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#7D7D7D" />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Icon
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#7D7D7D"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#7D7D7D" />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          secureTextEntry={!isConfirmPasswordVisible}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          onPress={() =>
            setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
          }
        >
          <Icon
            name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#7D7D7D"
          />
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
        <Icon name="arrow-right" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0047FF',
    paddingVertical: 16,
    borderRadius: 50,
    marginTop: 32,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default CreateNewPasswordScreen;