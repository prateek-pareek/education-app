import React from 'react';
import { View, StyleSheet, TouchableOpacity , Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ContactUsScreen = () => {
  const contactOptions = [
    { icon: 'headphones', label: 'Customer Services', onPress: () => {} },
    { icon: 'whatsapp', label: 'WhatsApp', onPress: () => {} },
    { icon: 'web', label: 'Website', onPress: () => {} },
    { icon: 'facebook', label: 'Facebook', onPress: () => {} },
    { icon: 'twitter', label: 'Twitter', onPress: () => {} },
    { icon: 'instagram', label: 'Instagram', onPress: () => {} },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name='arrow-left' size={28} color='#000' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View>

      

      {/* Contact Options */}
      <View style={styles.contactList}>
        {contactOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactItem}
            onPress={item.onPress}>
            <Icon name={item.icon} size={24} style={styles.contactIcon} />
            <Text style={styles.contactLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 4,
  },
  inactiveTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#aaa',
    paddingBottom: 4,
  },
  contactList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  contactIcon: {
    marginRight: 12,
    color: '#000',
  },
  contactLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
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
});

export default ContactUsScreen;