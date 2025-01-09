import React, {useState, useEffect} from 'react'
// import WebView from 'react-native-webview';
import {OAuthProvider} from 'firebase/auth'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithCredential,
} from 'firebase/auth'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {LoginManager, AccessToken} from 'react-native-fbsdk-next'

import {
  auth,
  googleProvider,
  facebookProvider,
} from '../../../../firebaseConfig'
import axios from 'axios'

const SignUpScreen2 = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  // const [showLinkedInModal, setShowLinkedInModal] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '477322964738-t8f6a1l19m9nnvmcjvv8mra2uo1ughs1.apps.googleusercontent.com',
    })
  }, [])

  useEffect(() => {
    const handleDeepLink = ({url}) => {
      if (url && url.includes('code=')) {
        const code = url.split('code=')[1].split('&')[0]
        handleLinkedInCode(code)
      }
    }

    Linking.addEventListener('url', handleDeepLink)

    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink({url})
      }
    })

    return () => {
      // Clean up
      Linking.removeEventListener('url', handleDeepLink)
    }
  }, [])

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }
    if (!isChecked) {
      Alert.alert('Error', 'You must agree to the terms and conditions')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)

      let data = JSON.stringify({
        email: email,
        password: password,
        role: 'Learner',
        provider: 'email',
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://education-backend-jade.vercel.app/api/auth/signup',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios
        .request(config)
        .then(response => {
          console.log(JSON.stringify(response.data))
          navigation.navigate('Login')
        })
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn() // Google sign-in
      const googleCredential = googleProvider.credential(idToken) // Firebase credential
      await signInWithCredential(auth, googleCredential) // Firebase sign-up
      Alert.alert('Success', 'Account created using Google!')
      navigation.navigate('Login')
    } catch (error) {
      Alert.alert('Google Sign-Up Failed', error.message)
    }
  }

  const handleLinkedInSignUp = async () => {
    try {
      const linkedInAuthUrl = 'https://www.linkedin.com/oauth/v2/authorization'
      const clientId = '78888qogxla3v4'
      const redirectUri = 'edupro://callback'
      const scope = 'r_liteprofile r_emailaddress'

      const authUrl = `${linkedInAuthUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}&scope=${scope}`

      const supported = await Linking.canOpenURL(authUrl)
      if (supported) {
        await Linking.openURL(authUrl)
      } else {
        Alert.alert('Error', 'Cannot open LinkedIn authentication')
      }
    } catch (error) {
      Alert.alert('LinkedIn Sign-Up Failed', error.message)
    }
  }

  //   linked in signup
  const handleLinkedInCode = async code => {
    try {
      const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken'
      const clientId = '78888qogxla3v4'
      const clientSecret = 'WPL_AP1.xt5nASWM5rB1pxVb.q+JmqA=='
      const redirectUri = 'edupro://callback' // Make sure this matches

      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      })

      const response = await fetch(tokenUrl, {
        method: 'POST',
        body: params.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      const data = await response.json()

      if (data.access_token) {
        const linkedInProvider = new OAuthProvider('linkedin.com')
        const credential = linkedInProvider.credential(data.access_token)
        await signInWithCredential(auth, credential)
        navigation.navigate('MainScreen')
      } else {
        throw new Error('Failed to get access token')
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to complete LinkedIn sign-up: ' + error.message,
      )
    }
  }

  const handleWebViewNavigationStateChange = newNavState => {
    const {url} = newNavState
    if (url && url.includes('code=')) {
      const code = url.split('code=')[1].split('&')[0]
      if (code) {
        handleLinkedInCode(code)
      }
    }
  }

  return (
    <View style={styles.container}>
      {/* Logo and Title Section */}
      <View style={styles.logoContainer}>
        <Image
          //   source={require('./assets/edupro-logo.png')}
          source={require('../../../../public/images/edupro-logo.png')}
          style={styles.logo}
          resizeMode='contain'
        />
        {/* <Text style={styles.appName}>EDUPRO</Text> */}
        {/* <Text style={styles.subtitle}>LEARN FROM HOME</Text> */}
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Getting Started.!</Text>
        <Text style={styles.description}>
          Create an Account to Continue your allCourses
        </Text>

        {/* Form Fields */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon
              name='email-outline'
              size={24}
              color='#666'
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon
              name='lock-outline'
              size={24}
              color='#666'
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}>
              <Icon
                name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color='#666'
              />
            </TouchableOpacity>
          </View>

          {/* Terms and Conditions */}
          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setIsChecked(!isChecked)}>
            <View style={styles.checkbox}>
              {isChecked && <Icon name='check' size={16} color='#fff' />}
            </View>
            <Text style={styles.termsText}>Agree to Terms & Conditions</Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
            <Icon name='arrow-right' size={24} color='#fff' />
          </TouchableOpacity>

          {/* Or Continue With */}
          <View style={styles.dividerContainer}>
            <Text style={styles.dividerText}>Or Continue With</Text>
          </View>

          {/* Social Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignUp}>
              <Image
                source={require('../../../../public/images/google-icon.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../../../../public/images/fb-icon.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleLinkedInSignUp}>
              <Image
                source={require('../../../../public/images/linkdin-logo.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInLink}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* {showLinkedInModal && (
                <View style={styles.webviewContainer}>
                    <WebView
                        source={{ uri: handleLinkedInSignUp() }}
                        onNavigationStateChange={handleWebViewNavigationStateChange}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setShowLinkedInModal(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            )} */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000080',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000080',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    gap: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 60,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  termsText: {
    fontSize: 16,
    color: '#666',
  },
  signUpButton: {
    backgroundColor: '#0066ff',
    borderRadius: 30,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  dividerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    color: '#666',
    fontSize: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  signInText: {
    fontSize: 16,
    color: '#666',
  },
  signInLink: {
    fontSize: 16,
    color: '#0066ff',
    fontWeight: 'bold',
  },

  // new
  // webviewContainer: {
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     right: 0,
  //     bottom: 0,
  //     backgroundColor: 'white',
  //     zIndex: 999,
  //   },
  //   closeButton: {
  //     position: 'absolute',
  //     top: 40,
  //     right: 20,
  //     padding: 10,
  //     backgroundColor: '#0066ff',
  //     borderRadius: 5,
  //   },
  //   closeButtonText: {
  //     color: 'white',
  //     fontWeight: 'bold',
  //   },
})

export default SignUpScreen2
