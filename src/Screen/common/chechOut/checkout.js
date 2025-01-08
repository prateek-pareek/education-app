import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentMethodsScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('**** **** **76 3054');

  const paymentMethods = [
    { id: '1', method: 'Paypal' },
    { id: '2', method: 'Google Pay' },
    { id: '3', method: 'Apple Pay' },
    { id: '4', method: '**** **** **76 3054' },
  ];

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  const renderPaymentMethod = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.paymentOption,
        selectedMethod === item.method && styles.selectedOption,
      ]}
      onPress={() => handleSelectMethod(item.method)}
    >
      <Text style={styles.paymentText}>{item.method}</Text>
      <Icon
        name={
          selectedMethod === item.method
            ? 'radiobox-marked'
            : 'radiobox-blank'
        }
        size={24}
        color={selectedMethod === item.method ? '#0047FF' : '#7D7D7D'}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>

      {/* Course Information */}
      <View style={styles.courseInfo}>
        <View style={styles.courseImagePlaceholder} />
        <View style={styles.courseDetails}>
          <Text style={styles.courseCategory}>Graphic Design</Text>
          <Text style={styles.courseTitle}>Setup your Graphic Design..</Text>
        </View>
      </View>

      {/* Payment Methods */}
      <Text style={styles.sectionTitle}>
        Select the Payment Methods you Want to Use
      </Text>
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentMethod}
        contentContainerStyle={styles.paymentList}
      />

      {/* Add Payment Method Button */}
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Enroll Button */}
      <TouchableOpacity style={styles.enrollButton}>
        <Text style={styles.enrollButtonText}>Enroll Course - $55</Text>
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
    marginLeft: 16,
    color: '#000',
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginBottom: 16,
  },
  courseImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    borderRadius: 8,
    marginRight: 16,
  },
  courseDetails: {
    flex: 1,
  },
  courseCategory: {
    fontSize: 14,
    color: '#FF7A00',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1D',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 16,
  },
  paymentList: {
    paddingBottom: 80, // To avoid overlap with the enroll button
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  paymentText: {
    fontSize: 16,
    color: '#1D1D1D',
  },
  selectedOption: {
    borderColor: '#0047FF',
    borderWidth: 1.5,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#0047FF',
    borderRadius: 50,
    padding: 16,
    elevation: 4,
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0047FF',
    padding: 16,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    elevation: 4,
  },
  enrollButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default PaymentMethodsScreen;