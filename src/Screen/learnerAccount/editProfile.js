import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfileScreen = () => {
  const [fullName, setFullName] = useState('');
  const [nickName, setNickName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');

  const handleUpdate = () => {
    // Handle profile update logic
    console.log('Profile Updated:', {
      fullName,
      nickName,
      dateOfBirth,
      email,
      phoneNumber,
      gender,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Profile Image Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage} />
          <TouchableOpacity style={styles.editImageButton}>
            <Icon name="image-edit-outline" size={20} color="#0047FF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        {/* Full Name */}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#7D7D7D"
        />

        {/* Nick Name */}
        <TextInput
          style={styles.input}
          placeholder="Nick Name"
          value={nickName}
          onChangeText={setNickName}
          placeholderTextColor="#7D7D7D"
        />

        {/* Date of Birth */}
        <View style={styles.inputWithIcon}>
          <Icon name="calendar-outline" size={20} color="#7D7D7D" />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholderTextColor="#7D7D7D"
          />
        </View>

        {/* Email */}
        <View style={styles.inputWithIcon}>
          <Icon name="email-outline" size={20} color="#7D7D7D" />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#7D7D7D"
            keyboardType="email-address"
          />
        </View>

        {/* Phone Number */}
        <View style={styles.inputWithIcon}>
          <Icon name="phone-outline" size={20} color="#7D7D7D" />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor="#7D7D7D"
            keyboardType="phone-pad"
          />
        </View>

        {/* Gender */}
        <TouchableOpacity style={styles.inputWithIcon}>
          <Icon name="account-outline" size={20} color="#7D7D7D" />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
            placeholderTextColor="#7D7D7D"
            editable={false} // Gender can be selected via a dropdown in real implementation
          />
          <Icon name="chevron-down" size={20} color="#7D7D7D" />
        </TouchableOpacity>
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E5E5',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 6,
    borderWidth: 2,
    borderColor: '#0047FF',
  },
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#1D1D1D',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0047FF',
    padding: 16,
    borderRadius: 50,
    marginTop: 16,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default EditProfileScreen;