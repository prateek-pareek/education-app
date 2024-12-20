import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginManager, AccessToken,Settings } from 'react-native-fbsdk-next';
import { auth, googleProvider, facebookProvider } from '../../../../firebaseConfig';  // import firebase config
import { signInWithEmailAndPassword, signInWithCredential } from 'firebase/auth';  // import firebase auth methods

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Configure Google Sign-In
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',  // Replace with your actual Web Client ID from Firebase Console
    });
  }, []);
  // useEffect(() => {
  //   Settings.initializeSDK(); // Ensure Facebook SDK is initialized
  // }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Success', `Logged in with email: ${email}`);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();  // Sign in with Google
      const googleCredential = googleProvider.credential(idToken);  // Get credential
      await signInWithCredential(auth, googleCredential);  // Firebase login
      Alert.alert("Google Login", "Logged in successfully via Google");
    } catch (error) {
      Alert.alert("Google Login Failed", error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);  // Facebook login
      if (result.isCancelled) {
        Alert.alert('Login canceled');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();  // Get Facebook access token
      if (!data) {
        Alert.alert('Error', 'Something went wrong obtaining access token');
        return;
      }

      const facebookCredential = facebookProvider.credential(data.accessToken);  // Get Facebook credential
      await signInWithCredential(auth, facebookCredential);  // Firebase login
      Alert.alert('Facebook Login', 'Logged in successfully via Facebook');
    } catch (error) {
      Alert.alert('Facebook Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Log In</Text>

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

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={styles.signupText}>
        Don’t have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
      </Text>

      {/* Social Login Section */}
      <Text style={styles.orText}>Or login with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Icon name="google" size={20} color="#EA4335" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
          <Icon name="facebook" size={20} color="#1877F2" />
        </TouchableOpacity>
      </View>
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
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#007BFF',
  },
  loginButton: {
    backgroundColor: '#4E68E8',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 14,
    color: '#1C1C1C',
    textAlign: 'center',
  },
  signupLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: '#1C1C1C',
    textAlign: 'center',
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default LoginScreen;
