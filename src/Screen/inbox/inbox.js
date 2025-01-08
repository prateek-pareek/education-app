import React, {useState} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const InboxScreen = () => {
  const [activeTab, setActiveTab] = useState('Calls') // State for active tab
  const [search, setSearch] = useState('')

  // Sample Data
  const callData = [
    {
      id: '1',
      name: 'Johan',
      status: 'Incoming',
      date: 'Nov 03, 202X',
      icon: 'plus',
    },
    {
      id: '2',
      name: 'Timothee Mathew',
      status: 'Incoming',
      date: 'Nov 05, 202X',
      icon: 'plus',
    },
    {
      id: '3',
      name: 'Amanriya',
      status: 'Outgoing',
      date: 'Nov 06, 202X',
      icon: 'minus',
    },
    {
      id: '4',
      name: 'Tanisha',
      status: 'Missed',
      date: 'Nov 15, 202X',
      icon: 'close',
    },
    {
      id: '5',
      name: 'Shravya',
      status: 'Outgoing',
      date: 'Nov 17, 202X',
      icon: 'minus',
    },
    {
      id: '6',
      name: 'Tamanha',
      status: 'Missed',
      date: 'Nov 18, 202X',
      icon: 'close',
    },
    {
      id: '7',
      name: 'Hilda M. Hernandez',
      status: 'Outgoing',
      date: 'Nov 19, 202X',
      icon: 'minus',
    },
  ]

  const filteredData = callData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  )

  // Render each call item
  const renderCallItem = ({item}) => (
    <View style={styles.callItem}>
      {/* Profile Image */}
      <View style={styles.avatar}>
        <Icon name='account' size={24} color='#fff' />
      </View>
      {/* Name and Status */}
      <View style={styles.callDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIcon,
              item.status === 'Incoming'
                ? styles.incoming
                : item.status === 'Outgoing'
                ? styles.outgoing
                : styles.missed,
            ]}>
            <Icon
              name={item.icon}
              size={12}
              color={
                item.status === 'Missed'
                  ? '#FF3A3A'
                  : item.status === 'Outgoing'
                  ? '#00CC66'
                  : '#0066FF'
              }
            />
          </View>
          <Text
            style={[
              styles.statusText,
              item.status === 'Missed'
                ? styles.missedText
                : item.status === 'Outgoing'
                ? styles.outgoingText
                : styles.incomingText,
            ]}>
            {item.status}
          </Text>
          <Text style={styles.date}>| {item.date}</Text>
        </View>
      </View>
      {/* Call Icon */}
      <TouchableOpacity>
        <Icon name='phone' size={24} color='#0066FF' />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name='arrow-left' size={24} color='#000' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Indox</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Chat' && styles.activeTab]}
          onPress={() => setActiveTab('Chat')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Chat' && styles.activeTabText,
            ]}>
            Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Calls' && styles.activeTab]}
          onPress={() => setActiveTab('Calls')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Calls' && styles.activeTabText,
            ]}>
           Notifications
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search'
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
          <Icon name='magnify' size={24} color='#7D7D7D' />
        </TouchableOpacity>
      </View> */}

      {/* Call List */}
      <FlatList
        data={filteredData}
        renderItem={renderCallItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.callList}
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
    padding: 16,
    backgroundColor: '#F6F9FC',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0047FF',
  },
  tabText: {
    fontSize: 16,
    color: '#7D7D7D',
  },
  activeTabText: {
    color: '#0047FF',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  callList: {
    paddingHorizontal: 16,
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7D7D7D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  callDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  incoming: {
    backgroundColor: '#0066FF',
  },
  outgoing: {
    backgroundColor: '#00CC66',
  },
  missed: {
    backgroundColor: '#FF3A3A',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  incomingText: {
    color: '#0066FF',
  },
  outgoingText: {
    color: '#00CC66',
  },
  missedText: {
    color: '#FF3A3A',
  },
  date: {
    fontSize: 14,
    color: '#7D7D7D',
    marginLeft: 8,
  },
})

export default InboxScreen
