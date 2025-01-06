import React, {useState} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native'
import {Avatar, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {launchImageLibrary} from 'react-native-image-picker' 

const EditProfileScreen = () => {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [phone, setPhone] = useState('123-456-7890')
  const [profileImage, setProfileImage] = useState(
    'https://www.example.com/default-avatar.jpg',
  )

  // Function to handle image change
  const handleImageChange = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.5}, response => {
      if (!response.didCancel && response.assets && response.assets[0].uri) {
        setProfileImage(response.assets[0].uri)
      }
    })
  }

  // Function to handle form submission (e.g., save data)
  const handleSave = () => {
    // Here you can handle saving the data (e.g., send to backend)
    Alert.alert(
      'Profile Updated',
      'Your profile information has been updated successfully!',
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Profile Image Section */}
      <View style={styles.profileImageContainer}>
        <Avatar
          size={120}
          source={{uri: profileImage}}
          rounded
          containerStyle={styles.avatar}
        />
        <TouchableOpacity
          onPress={handleImageChange}
          style={styles.editImageButton}>
          <Icon name='camera' size={24} color='#fff' />
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder='Full Name'
      />

      {/* Email Input */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
      />

      {/* Phone Input */}
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        placeholder='Phone Number'
        keyboardType='phone-pad'
      />

      {/* Save Button */}
      <Button
        title='Save'
        buttonStyle={styles.saveButton}
        onPress={handleSave}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  avatar: {
    marginBottom: 10,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4F63AC',
    padding: 8,
    borderRadius: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4F63AC',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
})

export default EditProfileScreen
