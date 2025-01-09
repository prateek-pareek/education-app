import React, {useState, useEffect} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
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
} from '../../../../firebaseConfig' // Firebase configuration

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '477322964738-t8f6a1l19m9nnvmcjvv8mra2uo1ughs1.apps.googleusercontent.com',
    })
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
      Alert.alert('Success', `Account created for: ${email}`)
      navigation.navigate('Login')
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

  const handleFacebookSignUp = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ])
      if (result.isCancelled) {
        Alert.alert('Sign-Up Canceled', 'User canceled the sign-up process.')
        return
      }

      const data = await AccessToken.getCurrentAccessToken()
      if (!data) {
        Alert.alert('Error', 'Could not obtain access token.')
        return
      }

      const facebookCredential = facebookProvider.credential(data.accessToken)
      await signInWithCredential(auth, facebookCredential)
      Alert.alert('Success', 'Account created using Facebook!')
      navigation.navigate('Login')
    } catch (error) {
      Alert.alert('Facebook Sign-Up Failed', error.message)
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subHeader}>
        Enter your details below & free sign up
      </Text>

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

      {/* Password Input */}
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

      {/* Terms & Conditions Checkbox */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
          <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
            {isChecked && <Icon name='check' size={16} color='white' />}
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
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}>
          Log in
        </Text>
      </Text>

      <Text style={styles.orText}>Or sign up with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleGoogleSignUp}>
          <Icon name='google' size={20} color='#EA4335' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleFacebookSignUp}>
          <Icon name='facebook' size={20} color='#1877F2' />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={handleFacebookSignUp}>
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

export default SignUpScreen
