import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {LoginManager, AccessToken} from 'react-native-fbsdk-next'
import {
  auth,
  googleProvider,
  facebookProvider,
} from '../../../../firebaseConfig'
import {signInWithEmailAndPassword, signInWithCredential} from 'firebase/auth'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '477322964738-t8f6a1l19m9nnvmcjvv8mra2uo1ughs1.apps.googleusercontent.com',
    })
  }, [])

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      Alert.alert('Login Success', `Logged in with email: ${email}`)
    } catch (error) {
      Alert.alert('Login Failed', error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn()
      const googleCredential = googleProvider.credential(idToken) 
      await signInWithCredential(auth, googleCredential) 
      Alert.alert('Google Login', 'Logged in successfully via Google')
    } catch (error) {
      Alert.alert('Google Login Failed', error.message)
    }
  }

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ])
      if (result.isCancelled) {
        Alert.alert('Login Canceled', 'User canceled the login process.')
        return
      }

      const accessToken = await AccessToken.getCurrentAccessToken()
      if (!accessToken) {
        Alert.alert('Error', 'Could not obtain access token.')
        return
      }
      const facebookCredential = facebookProvider.credential(
        accessToken.accessToken,
      )
      await signInWithCredential(auth, facebookCredential)
      Alert.alert('Login Success', 'Logged in successfully via Facebook!')
    } catch (error) {
      console.error('Facebook Login Error:', error)
      Alert.alert(
        'Facebook Login Failed',
        error.message || 'Something went wrong.',
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your email'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your password'
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}>
          <Icon
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={20}
            color='#aaa'
          />
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
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('SignUp')}>
          Sign up
        </Text>
      </Text>

      {/* Social Login Section */}
      <Text style={styles.orText}>Or login with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleGoogleLogin}>
          <Icon name='google' size={20} color='#EA4335' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleFacebookLogin}>
          <Icon name='facebook' size={20} color='#1877F2' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleFacebookLogin}>
          <Icon name='linkedin' size={20} color='#1877F2' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

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
})

export default LoginScreen
