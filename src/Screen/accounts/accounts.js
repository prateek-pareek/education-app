import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Badge } from 'react-native-elements'; // Import Badge
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors } from '../../utils/Colors';
import { color } from 'react-native-elements/dist/helpers';

const AccountScreen = ({ navigation }) => {
  const [avatarSource, setAvatarSource] = useState(
    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
  );

  const handleEditImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && response.assets) {
        setAvatarSource(response.assets[0].uri); // Update avatar image
      }
    });
  };
  const handlePress = () => {
    navigation.navigate('explorer');  // Navigates to the Explore screen
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Account</Text>

      {/* Circular Buttons Section */}
      <View style={styles.circularButtonsContainer}>
        {/* Test Button */}
        <TouchableOpacity style={styles.circleButtonWrapper}>
          <View style={styles.circleButton}>
            <Text style={styles.buttonText}>T</Text>
          </View>
          <Text style={styles.buttonLabel}>test</Text>
        </TouchableOpacity>

        {/* Prateek Button */}
        <TouchableOpacity style={styles.circleButtonWrapper}>
          <Avatar
            size={50}
            rounded
            source={require('./../../../public/images/avatar.png')} // Import the local image
            containerStyle={styles.circleButton}
          />
          <Text style={styles.buttonLabel}>prateek</Text>
        </TouchableOpacity>
      </View>

      {/* Explorer Section */}
      <View style={styles.explorerContainer}>
        <ImageBackground
          source={require('./../../../public/images/explore.png')}
          style={styles.explorerBackground}
          resizeMode="cover"
        >
          {/* Badge */}
          {/* <Badge
            status="success"
            containerStyle={styles.badgeContainer}
            badgeStyle={styles.badge}
          /> */}


          {/* Explorer Button */}
          <TouchableOpacity style={styles.explorerButton} onPress={handlePress}>
            <Text style={styles.explorerButtonText}>Explorer</Text>
            <Icon name="chevron-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Profile Section */}


      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <MenuItem title="Favourite" />
        <MenuItem title="Edit Account" route="EditProfileScreen" navigation={navigation} />
        <MenuItem title="Payments" route="PaymentScreen" navigation={navigation} />
        <MenuItem title="Settings and Privacy" />
        <MenuItem title="Help" />
      </View>
    </View>
  );
};

// Menu Item Component
const MenuItem = ({ title, navigation, route }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() => {
      if (route && navigation) {
        navigation.navigate(route);
      }
    }}
  >
    <Text style={styles.menuText}>{title}</Text>
    <Icon name="chevron-right" size={24} color="#9E9E9E" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  // New styles for circular buttons
  circularButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
    justifyContent: 'center',
  },
  circleButtonWrapper: {
    alignItems: 'center',
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '49BBBD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderColor: Colors.blue,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    color: '#4F63AC',
    fontWeight: '500',
  },
  buttonLabel: {
    fontSize: 12,
    color: '#666666',
  },
  // Explorer Section
  explorerContainer: {
    marginBottom: 20,
    height: 200, // Set a fixed height for the container
  },
  explorerBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Set position relative
  },


  explorerButton: {
    backgroundColor: '#49BBBD',
    // backgroundColor: Colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute', // Set position absolute
    bottom: 20, // Adjust the position as needed
    left: '50%', // Center horizontally
    transform: [{ translateX: -50 }], // Center horizontally
  },
  explorerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  // Existing styles
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
    bottom: -10,
    right: -10,
    // backgroundColor: Colors.blue,

  },
  editImageButton: {
    marginTop: 12,
    backgroundColor: '#4F63AC',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
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
});

export default AccountScreen;
