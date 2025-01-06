import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';

const PaymentScreen = () => {
  // Set the initial wallet balance (e.g., 100)
  const [walletBalance, setWalletBalance] = useState(100);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [amountToSpend, setAmountToSpend] = useState('');
  const [transactions, setTransactions] = useState([
    { type: 'Added', amount: 50, date: '2023-01-01 12:00:00' },
    { type: 'Spent', amount: 30, date: '2023-01-02 14:15:45' },
    { type: 'Added', amount: 100, date: '2023-01-03 09:30:00' },
    { type: 'Spent', amount: 20, date: '2023-01-04 18:10:30' },
    { type: 'Added', amount: 200, date: '2023-01-05 11:05:00' },
  ]);

  const handleAddMoney = () => {
    const amount = parseFloat(amountToAdd);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid amount to add.');
      return;
    }
    setWalletBalance(prevBalance => prevBalance + amount);
    setTransactions([
      ...transactions,
      { type: 'Added', amount, date: new Date().toLocaleString() },
    ]);
    setAmountToAdd('');
    Alert.alert('Success', `You have added $${amount} to your wallet.`);
  };

  const handleSpendMoney = () => {
    const amount = parseFloat(amountToSpend);
    if (isNaN(amount) || amount <= 0 || amount > walletBalance) {
      Alert.alert('Invalid Input', 'Please enter a valid amount to spend.');
      return;
    }
    setWalletBalance(prevBalance => prevBalance - amount);
    setTransactions([
      ...transactions,
      { type: 'Spent', amount, date: new Date().toLocaleString() },
    ]);
    setAmountToSpend('');
    Alert.alert('Success', `You have spent $${amount}.`);
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>
        {item.type} ${item.amount.toFixed(2)} - {item.date}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wallet</Text>

      {/* Display the wallet balance */}
      <View style={styles.walletBalanceContainer}>
        <Text style={styles.walletBalanceText}>Wallet Balance</Text>
        <Text style={styles.balanceAmount}>${walletBalance.toFixed(2)}</Text>
      </View>

      {/* Add Money Section */}
      <View style={styles.addMoneyContainer}>
        <Text style={styles.sectionHeader}>Add Money</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount to add"
          keyboardType="numeric"
          value={amountToAdd}
          onChangeText={setAmountToAdd}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddMoney}>
          <Text style={styles.buttonText}>Add Money</Text>
        </TouchableOpacity>
      </View>

      {/* Spend Money Section */}
     

      {/* Recent Transactions Section */}
      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionHeader}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  walletBalanceContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  walletBalanceText: {
    fontSize: 18,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sectionHeader: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addMoneyContainer: {
    marginBottom: 40,
  },
  spendMoneyContainer: {
    marginBottom: 40,
  },
  transactionsContainer: {
    marginTop: 20,
  },
  transactionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  transactionText: {
    fontSize: 16,
    color: '#555',
  },
});

export default PaymentScreen;
