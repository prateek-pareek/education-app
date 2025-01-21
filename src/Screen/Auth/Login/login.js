import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {LoginManager, AccessToken} from 'react-native-fbsdk-next'
import {
  auth,
  googleProvider,
  facebookProvider,
} from '../../../../firebaseConfig'
import {signInWithEmailAndPassword, signInWithCredential} from 'firebase/auth'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '477322964738-t8f6a1l19m9nnvmcjvv8mra2uo1ughs1.apps.googleusercontent.com',
    })
  }, [])



  // commonApi
  const API_URL = 'https://education-backend-jade.vercel.app/api/auth/login'
  const loginUser = async (email, password, provider, token) => {
    try {
      const data = { email, password, provider }
      if (token) {
        data.providerToken = token
      }
      const response = await axios.post(`${API_URL}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const authToken = response.data?.token || null
      const userDetails = response.data?.user || null

      if (!authToken || !userDetails) {
        console.error('Missing required fields in API response')
        return
      }
      AsyncStorage.clear()
      AsyncStorage.setItem('authToken', authToken)
      AsyncStorage.setItem('userDetails', JSON.stringify(userDetails))
      AsyncStorage.setItem('isLoggedIn', 'true')
      navigation.navigate("MainScreen")

      // return response.data
    } catch (error) {
      console.error(
        'Login API Error:',
        error.response ? error.response.data : error.message
      )
      toast.error('You have not signed up, please sign up first')
      if (error.response.data.message === 'User does not exist.') {
        navigate('/signup')
      }
      throw error
    }
  }

  const handleSignIn = () => {
    console.log('Signing In with:', {email, password, rememberMe})
  }

  const handleLogin = async () => {
    try {
      const userCredential= await signInWithEmailAndPassword(auth, email, password)
      const User = userCredential.user


      const loginResponse = await loginUser(
        User.email,
        password,
        'email',
        User.accessToken
      )
           

      Alert.alert('Login Success', `Logged in with email: ${email}`)
    } catch (error) {
      Alert.alert('Login Failed', error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn()
      const googleCredential = googleProvider.credential(idToken)
      const response= await  signInWithCredential(auth, googleCredential)
      console.log("response:", response)
      const loginResponse = await loginUser(
        googleCredential.email,
        null,
        'google',
        User.accessToken
        // idToken
      )
      Alert.alert('Google Login', 'Logged in successfully via Google')
      navigation.navigate("MainScreen")
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
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>EDUPRO</Text>
        <Text style={styles.logoSubText}>LEARN FROM HOME</Text>
      </View>

      <Text style={styles.title}>Let's Sign In.!</Text>
      <Text style={styles.subtitle}>
        Login to Your Account to Continue your Courses
      </Text>

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

      {/* Remember Me and Forgot Password */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.rememberMeContainer}
          onPress={() => setRememberMe(!rememberMe)}>
          <View style={styles.checkbox}>
            {rememberMe && <Icon name='check' size={16} color='#0047FF' />}
          </View>
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Sign In</Text>
        <Icon name='arrow-right' size={24} color='#FFFFFF' />
      </TouchableOpacity>

      {/* Or Continue With */}
      <Text style={styles.orText}>Or Continue With</Text>
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

      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp2')}>
          <Text style={styles.signUpLink}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

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
  logo: {
    width: 100,
    height: 100,
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
  forgotPasswordText: {
    fontSize: 14,
    color: '#0047FF',
  },
  signInButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0047FF',
    paddingVertical: 14,
    borderRadius: 50,
    marginBottom: 16,
  },
  signInButtonText: {
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
  socialIcon: {
    width: 24,
    height: 24,
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
})

export default SignInScreen
