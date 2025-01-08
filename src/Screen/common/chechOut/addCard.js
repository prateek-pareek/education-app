import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddNewCardScreen = () => {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleAddCard = () => {
    // Handle adding the new card logic
    console.log('Card Added:', {
      cardName,
      cardNumber,
      expiryDate,
      cvv,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Card</Text>
      </View>

      {/* Card Preview */}
      <View style={styles.cardPreview}>
        <Text style={styles.cardNumber}>1234 5678 8765 0876</Text>
        <View style={styles.cardDetails}>
          <View>
            <Text style={styles.cardLabel}>VALID THRU</Text>
            <Text style={styles.cardValue}>12/28</Text>
          </View>
          <Text style={styles.cardHolderName}>ALEX</Text>
        </View>
      </View>

      {/* Card Details Form */}
      <View style={styles.form}>
        {/* Card Name */}
        <Text style={styles.inputLabel}>Card Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter cardholder name"
          value={cardName}
          onChangeText={setCardName}
          placeholderTextColor="#7D7D7D"
        />

        {/* Card Number */}
        <Text style={styles.inputLabel}>Card Number*</Text>
        <TextInput
          style={styles.input}
          placeholder="**** **** **** ****"
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholderTextColor="#7D7D7D"
          keyboardType="numeric"
        />

        {/* Expiry Date and CVV */}
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.inputLabel}>Expiry Date*</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholderTextColor="#7D7D7D"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.inputLabel}>CVV*</Text>
            <TextInput
              style={styles.input}
              placeholder="***"
              value={cvv}
              onChangeText={setCvv}
              placeholderTextColor="#7D7D7D"
              secureTextEntry
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Add New Card Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>Add New Card</Text>
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
  cardPreview: {
    backgroundColor: '#0047FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    elevation: 4,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 16,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardHolderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  form: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0047FF',
    padding: 16,
    borderRadius: 50,
    elevation: 4,
    marginTop: 16,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default AddNewCardScreen;