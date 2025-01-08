import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = () => {
    // Handle sign-in logic
    console.log('Signing In with:', {email, password, rememberMe})
  }

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        {/* <Image
          source={require('./path-to-your-logo.png')} // Replace with your logo path
          style={styles.logo}
        /> */}
        <Text style={styles.logoText}>EDUPRO</Text>
        <Text style={styles.logoSubText}>LEARN FROM HOME</Text>
      </View>

      {/* Title Section */}
      <Text style={styles.title}>Let's Sign In.!</Text>
      <Text style={styles.subtitle}>
        Login to Your Account to Continue your Courses
      </Text>

      {/* Email Input */}
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

      {/* Password Input */}
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
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
        <Icon name='arrow-right' size={24} color='#FFFFFF' />
      </TouchableOpacity>

      {/* Or Continue With */}
      <Text style={styles.orText}>Or Continue With</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png',
            }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
            }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an Account? </Text>
        <TouchableOpacity>
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
