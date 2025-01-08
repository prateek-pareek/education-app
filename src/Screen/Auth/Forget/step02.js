import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // Four OTP boxes
  const [timer, setTimer] = useState(59); // Countdown timer for resend
  const [selectedBox, setSelectedBox] = useState(0);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleOtpChange = (digit, index) => {
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Automatically move to the next box
    if (digit && index < otp.length - 1) {
      setSelectedBox(index + 1);
    }
  };

  const handleKeyPress = (key) => {
    const newOtp = [...otp];
    if (key === 'backspace') {
      if (otp[selectedBox]) {
        newOtp[selectedBox] = ''; // Clear the current box
      } else if (selectedBox > 0) {
        newOtp[selectedBox - 1] = ''; // Move to previous box
        setSelectedBox(selectedBox - 1);
      }
    } else {
      newOtp[selectedBox] = key;
      if (selectedBox < otp.length - 1) {
        setSelectedBox(selectedBox + 1);
      }
    }
    setOtp(newOtp);
  };

  const handleVerify = () => {
    console.log('OTP entered:', otp.join(''));
    // Verify OTP logic here
  };

  const handleResend = () => {
    setTimer(59);
    console.log('Resending OTP...');
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

      {/* OTP Instruction */}
      <Text style={styles.instruction}>
        Code has been sent to ( +1 ) ***-***-529
      </Text>

      {/* OTP Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.otpBox,
              selectedBox === index && styles.selectedOtpBox,
            ]}
            onPress={() => setSelectedBox(index)}
          >
            <Text style={styles.otpText}>{digit || '*'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Resend Timer */}
      {timer > 0 ? (
        <Text style={styles.timerText}>
          Resend Code in <Text style={styles.timerNumber}>{timer}s</Text>
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      )}

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
        <Icon name="arrow-right" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Custom Keypad */}
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, 'backspace'].map((key, index) => (
          <TouchableOpacity
            key={index}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            {key === 'backspace' ? (
              <Icon name="backspace-outline" size={24} color="#000" />
            ) : (
              <Text style={styles.keyText}>{key}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpBox: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectedOtpBox: {
    borderColor: '#0047FF',
  },
  otpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  timerText: {
    fontSize: 14,
    color: '#7D7D7D',
    textAlign: 'center',
    marginBottom: 24,
  },
  timerNumber: {
    color: '#0047FF',
  },
  resendText: {
    fontSize: 14,
    color: '#0047FF',
    textAlign: 'center',
    marginBottom: 24,
  },
  verifyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0047FF',
    paddingVertical: 16,
    borderRadius: 50,
    marginBottom: 24,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    margin: 8,
    elevation: 2,
  },
  keyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default OTPVerificationScreen;