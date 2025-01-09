import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useNavigation} from '@react-navigation/native'

const ProfileScreen = () => {
  const navigation = useNavigation()
  const menuOptions = [
    {
      id: '1',
      title: 'Edit Profile',
      icon: 'account-edit-outline',
      route: 'editProfile',
    },
    {
      id: '1',
      title: 'Achivements',
      icon: 'account-edit-outline',
      route: 'explorer',
    },
    {
      id: '2',
      title: 'Payment',
      icon: 'credit-card-outline',
      route: 'payment',
    },
    {
      id: '3',
      title: 'SubsCription',
      icon: 'shield-outline',
      route: 'GetPremiumScreen',
    },
    // {
    //   id: '4',
    //   title: 'Notifications',
    //   icon: 'bell-outline',
    //   route: 'editProfile',
    // },
    {
      id: '7',
      title: 'Terms & Conditions',
      icon: 'file-document-outline',
      route: 'term',
    },
    {
      id: '8',
      title: 'Help Center',
      icon: 'help-circle-outline',
      route: 'HelpCenterScreen',
    },
    {
      id: '9',
      title: 'Contact Us',
      icon: 'account-multiple-plus-outline',
      route: 'Contact',
    },
  ]

  const renderMenuItem = ({item}) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.route)}>
      <View style={styles.menuItemLeft}>
        <Icon name={item.icon} size={24} color='#1D1D1D' />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {item.rightText && (
          <Text style={styles.menuItemRightText}>{item.rightText}</Text>
        )}
        <Icon name='chevron-right' size={24} color='#7D7D7D' />
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name='arrow-left' size={28} color='#000' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Icon name='image-edit-outline' size={20} color='#0047FF' />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Alex</Text>
        <Text style={styles.profileEmail}>hernandex.redial@gmail.ac.in</Text>
      </View>

      {/* Menu Options */}
      <FlatList
        data={menuOptions}
        keyExtractor={item => item.id}
        renderItem={renderMenuItem}
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
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
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 12,
  },
  profileEmail: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 4,
  },
  menuList: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1D1D1D',
    marginLeft: 12,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemRightText: {
    fontSize: 14,
    color: '#0047FF',
    marginRight: 8,
  },
})

export default ProfileScreen
