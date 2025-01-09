import React, {useState} from 'react'
import {View, StyleSheet, ScrollView, TextInput,TouchableOpacity} from 'react-native'
import {Text, Button, Card, TouchableRipple} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HelpCenterScreen = () => {
  const [expanded, setExpanded] = useState(null)

  const handleAccordionToggle = index => {
    setExpanded(expanded === index ? null : index)
  }

  const questions = [
    {
      question: 'How do I manage my notifications?',
      answer:
        'To manage notifications, go to "Settings," select "Notification Settings," and customize your preferences.',
    },
    {question: 'How do I start a guided meditation session?', answer: ''},
    {question: 'How do I join a support group?', answer: ''},
    {question: 'Is my data safe and private?', answer: ''},
  ]

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name='arrow-left' size={28} color='#000' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Button
          mode='contained'
          style={styles.activeTab}
          labelStyle={styles.activeTabLabel}>
          General
        </Button>
        <Button
          mode='outlined'
          style={styles.inactiveTab}
          labelStyle={styles.inactiveTabLabel}>
          Account
        </Button>
        <Button
          mode='outlined'
          style={styles.inactiveTab}
          labelStyle={styles.inactiveTabLabel}>
          Payment
        </Button>
        <Button
          mode='outlined'
          style={styles.inactiveTab}
          labelStyle={styles.inactiveTabLabel}>
          Services
        </Button>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name='magnify' size={20} style={styles.searchIcon} />
        <TextInput
          placeholder='search for help'
          style={styles.searchInput}
          placeholderTextColor='#aaa'
        />
        <Icon name='tune' size={20} style={styles.filterIcon} />
      </View>

      {/* FAQ List */}
      <ScrollView style={styles.faqList}>
        {questions.map((item, index) => (
          <TouchableRipple
            key={index}
            onPress={() => handleAccordionToggle(index)}
            style={[
              styles.accordion,
              expanded === index && styles.accordionExpanded,
            ]}>
            <View>
              <View style={styles.accordionHeader}>
                <Text style={styles.accordionTitle}>{item.question}</Text>
                <Icon
                  name={expanded === index ? 'chevron-up' : 'chevron-down'}
                  size={20}
                />
              </View>
              {expanded === index && item.answer && (
                <Text style={styles.accordionContent}>{item.answer}</Text>
              )}
            </View>
          </TouchableRipple>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  activeTab: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#000',
  },
  activeTabLabel: {
    color: '#fff',
  },
  inactiveTab: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 20,
    borderColor: '#000',
  },
  inactiveTabLabel: {
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  filterIcon: {
    marginLeft: 8,
  },
  faqList: {
    flex: 1,
    marginHorizontal: 16,
  },
  accordion: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
    padding: 12,
  },
  accordionExpanded: {
    backgroundColor: '#f0f0f0',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionContent: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
})

export default HelpCenterScreen
