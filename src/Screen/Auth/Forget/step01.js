import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPasswordScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleContinue = () => {
    if (selectedOption) {
      // Handle navigation to OTP or Reset Password Screen
      console.log('Selected Option:', selectedOption);
    } else {
      alert('Please select a contact method to continue.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
      </View>

      {/* Instruction */}
      <Text style={styles.instruction}>
        Select which contact details should we use to Reset Your Password
      </Text>

      {/* Options */}
      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === 'email' && styles.selectedOption,
        ]}
        onPress={() => setSelectedOption('email')}
      >
        <View style={styles.optionContent}>
          <Icon name="email-outline" size={24} color="#0047FF" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Via Email</Text>
            <Text style={styles.optionSubtitle}>
              priscilla.frank26@gmail.com
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedOption === 'sms' && styles.selectedOption,
        ]}
        onPress={() => setSelectedOption('sms')}
      >
        <View style={styles.optionContent}>
          <Icon name="cellphone-message" size={24} color="#0047FF" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Via SMS</Text>
            <Text style={styles.optionSubtitle}>( +91 ) 958-894-5529</Text>
          </View>
        </View>
      </TouchableOpacity>

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
  instruction: {
    fontSize: 14,
    color: '#7D7D7D',
    textAlign: 'center',
    marginBottom: 24,
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedOption: {
    borderColor: '#0047FF',
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTextContainer: {
    marginLeft: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0047FF',
    paddingVertical: 16,
    borderRadius: 50,
    marginTop: 16,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default ForgotPasswordScreen;