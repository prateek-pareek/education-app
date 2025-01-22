import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import {
  auth,
  googleProvider,
  facebookProvider,
} from '../../../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithCredential,
} from 'firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen2 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '77322964738-t8f6a1l19m9nnvmcjvv8mra2uo1ughs1.apps.googleusercontent.com',
    });
  }, []);

  const API_URL = 'https://education-backend-jade.vercel.app/api/auth/signup';
  const signupUser = async (email, password, role, provider, token, displayName, profileImage) => {
    try {
      const data = JSON.stringify({
        email: email,
        password: password,
        role: role,
        provider: provider,
        providerToken: token,
        displayName: displayName,
        profileImage: profileImage,
      });
      const response = await axios.post(`${API_URL}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        maxBodyLength: Infinity,
      });
      console.log('response backend', response);
      return response.data;
    } catch (error) {
      console.error('Signup API Error:', error);
      Alert.alert('Error', error?.response?.data?.message || 'Signup failed. Please try again.');
      if (error?.response?.data?.message === 'User already exists.') {
        navigation.navigate('Login');
      }
      return { error: true, message: error?.response?.data?.message || 'Signup failed.' };
    }
  };

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
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const User = result.user;
      const role = 'user';
      const displayName = User.displayName;
      const profileImage = User.photoURL;
      const response = await signupUser(
        email,
        password,
        'user',
        'email',
        User.accessToken,
        displayName,
        profileImage
      );
      if (response?.user?.uid) {
        AsyncStorage.setItem('isLoggedIn', 'true');
        AsyncStorage.setItem('userToken', response.token);
        navigation.navigate('MainScreen');
      } else {
        console.log('Error in response: ', response);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = googleProvider.credential(idToken);
      const result = await signInWithCredential(auth, googleCredential);
      const User = result.user;
      const role = 'user';
      const displayName = User.displayName;
      const profileImage = User.photoURL;
      const response = await signupUser(
        User.email,
        null,
        'user',
        'google',
        User.accessToken,
        displayName,
        profileImage
      );
      if (response?.user?.uid) {
        AsyncStorage.setItem('isLoggedIn', 'true');
        AsyncStorage.setItem('userToken', response.token);
        navigation.navigate('MainScreen');
      } else {
        console.log('Error in response: ', response);
      }
    } catch (error) {
      Alert.alert('Google Sign-Up Failed', error.message);
    }
  };

  const handleFacebookSignUp = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        Alert.alert('Login Canceled', 'User canceled the login process.');
        return;
      }

      const accessToken = await AccessToken.getCurrentAccessToken();
      if (!accessToken) {
        Alert.alert('Error', 'Could not obtain access token.');
        return;
      }
      const facebookCredential = facebookProvider.credential(accessToken.accessToken);
      await signInWithCredential(auth, facebookCredential);
      Alert.alert('Login Success', 'Logged in successfully via Facebook!');
    } catch (error) {
      console.error('Facebook Login Error:', error);
      Alert.alert('Facebook Login Failed', error.message || 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>EDUPRO</Text>
        <Text style={styles.logoSubText}>LEARN FROM HOME</Text>
      </View>

      <Text style={styles.title}>Getting Started.!</Text>
      <Text style={styles.subtitle}>Create an Account to Continue your allCourses</Text>

      <View style={styles.inputContainer}>
        <Icon name='email-outline' size={20} color='#7D7D7D' />
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          placeholderTextColor='#7D7D7D'
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name='lock-outline' size={20} color='#7D7D7D' />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor='#7D7D7D'
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color='#7D7D7D'
          />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.rememberMeContainer} onPress={() => setIsChecked(!isChecked)}>
          <View style={styles.checkbox}>
            {isChecked && <Icon name='check' size={16} color='#0047FF' />}
          </View>
          <Text style={styles.rememberMeText}>Agree to Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
        <Icon name='arrow-right' size={24} color='#FFFFFF' />
      </TouchableOpacity>

      <Text style={styles.orText}>Or Continue With</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignUp}>
          <Icon name='google' size={20} color='#EA4335' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignUp}>
          <Icon name='facebook' size={20} color='#1877F2' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignUp}>
          <Icon name='linkedin' size={20} color='#0077B5' />
        </TouchableOpacity>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Already have an Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpLink}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
    paddingHorizontal: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0047FF',
    marginTop: 8,
  },
  logoSubText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1D',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7D7D7D',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1D1D1D',
    marginLeft: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  signUpButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0047FF',
    paddingVertical: 14,
    borderRadius: 50,
    marginBottom: 16,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  orText: {
    fontSize: 14,
    color: '#7D7D7D',
    textAlign: 'center',
    marginVertical: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 2,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0047FF',
  },
});

export default SignUpScreen2;
