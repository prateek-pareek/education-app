import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import {Button,Card} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GetPremiumScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Close Icon */}
      <TouchableOpacity style={styles.closeIcon}>
        <Icon name="close" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Get Premium</Text>
        <Text style={styles.headerSubtitle}>
          Unlock all the power of this mobile tool and enjoy digital experience like never before!
        </Text>
        <View style={styles.imageContainer}>
          <Icon name="gift" size={80} color="#ffffff" style={styles.giftIcon} />
        </View>
      </View>

      {/* Pricing Options */}
      <View style={styles.pricingContainer}>
        {/* Annual Plan */}
        <Card style={styles.pricingCard}>
          <View style={styles.pricingContent}>
            <Text style={styles.planTitle}>Annual</Text>
            <Text style={styles.planDescription}>First 30 days free – Then $999/Year</Text>
            <View style={styles.bestValueBadge}>
              <Text style={styles.bestValueText}>Best Value</Text>
            </View>
          </View>
        </Card>

        {/* Monthly Plan */}
        <Card style={[styles.pricingCard, styles.monthlyCard]}>
          <View style={styles.pricingContent}>
            <Text style={styles.planTitle}>Monthly</Text>
            <Text style={styles.planDescription}>First 7 days free – Then $99/Month</Text>
          </View>
        </Card>
      </View>

      {/* Trial Button */}
      <Button mode="contained" style={styles.trialButton} onPress={() => {}}>
        Start 7-day free trial
      </Button>

      {/* Terms and Conditions */}
      <Text style={styles.termsText}>
        By placing this order, you agree to the{' '}
        <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>. Subscription automatically renews unless
        auto-renew is turned off at least 24-hours before the end of the current period.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0D47A1',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  imageContainer: {
    backgroundColor: '#FFC107',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  giftIcon: {
    color: '#0D47A1',
  },
  pricingContainer: {
    marginBottom: 24,
  },
  pricingCard: {
    backgroundColor: '#1A237E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
  },
  pricingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  planDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
  },
  bestValueBadge: {
    backgroundColor: '#00C853',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    position: 'absolute',
    top: -8,
    right: -8,
  },
  bestValueText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  monthlyCard: {
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  trialButton: {
    backgroundColor: '#FFCA28',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  termsText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
    color: '#FFC107',
  },
});

export default GetPremiumScreen;