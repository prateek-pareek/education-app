import React, {useState} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Avatar, Badge} from 'react-native-elements' // Import Badge
import {launchImageLibrary} from 'react-native-image-picker'

const AccountScreen = ({navigation}) => {
  const [avatarSource, setAvatarSource] = useState(
    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
  )

  // Function to handle image change (in a real app, you could open a file picker or camera)

  const handleEditImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && response.assets) {
        setAvatarSource(response.assets[0].uri) // Update avatar image
      }
    })
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Account</Text>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Avatar size={80} source={{uri: avatarSource}} />
          <View style={styles.notificationIcon}>
            <Icon name='shield-check' size={18} color='#FFFFFF' />
          </View>
        </View>

        {/* Level Badge */}
        <Badge
          status='success'
          value='Level 2'
          containerStyle={styles.levelBadge}
        />

        {/* Edit Image Button */}
        <TouchableOpacity
          onPress={handleEditImage}
          style={styles.editImageButton}>
          <Text style={styles.editImageText}>Edit Image</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <MenuItem title='Favourite' />
        <MenuItem
          title='Edit Account'
          route='EditProfileScreen'
          navigation={navigation}
        />
        <MenuItem title='Payments'  route='PaymentScreen'
          navigation={navigation}/>
        <MenuItem title='Settings and Privacy' />
        <MenuItem title='Help' />
      </View>
    </View>
  )
}

// Menu Item Component
const MenuItem = ({title, navigation, route}) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() => {
      navigation.navigate(route)
    }}>
    <Text style={styles.menuText}>{title}</Text>
    <Icon name='chevron-right' size={24} color='#9E9E9E' />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  notificationIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#4F63AC',
    borderRadius: 12,
    padding: 4,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -10, // Adjust badge position below the avatar
    right: -10, // Adjust badge position
    backgroundColor: '#4F63AC',
  },
  editImageButton: {
    marginTop: 12,
    backgroundColor: '#4F63AC',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  editImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#B0B0B0',
    marginTop: 5,
  },
})

export default AccountScreen
