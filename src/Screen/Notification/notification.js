// NotificationsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { myCourseData } from '../../data/MyCourseData';

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.courseItem} onPress={() => navigation.navigate('CourseDetailScreen', { courseId: item.id })}>
      <Image source={item.image} style={styles.courseImage} />
      <View style={styles.courseDetails}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseTutor}>{item.tutor}</Text>
        <Text style={styles.startButtonText}>Start course</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My learning</Text> 
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Search</Text>
      </View>


      {/* buttons */}
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Downloaded</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Favorited</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Archived</Text>
        </TouchableOpacity>
      </View>

      {/* list */}
      <FlatList
        data={myCourseData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  searchText: {
    color: 'black',
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  filterText: {
    color: 'black',
    fontWeight: 'bold',
  },
  courseItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  courseImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  courseTutor: {
    fontSize: 14,
    color: 'black',
    marginVertical: 5,
  },
  startButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default NotificationsScreen;























// import React, {useState} from 'react'
// import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
// import {Card} from 'react-native-elements'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import ChatListScreen from './chat'

// const notifications = [
//   {
//     id: '1',
//     icon: 'email-open',
//     title: 'Successful purchase!',
//     time: 'Just now',
//     iconColor: '#FF7043',
//   },
//   {
//     id: '2',
//     icon: 'book-check',
//     title: 'Congratulations on completing the course!',
//     time: 'Just now',
//     iconColor: '#5C6BC0',
//   },
//   {
//     id: '3',
//     icon: 'book-refresh',
//     title: 'Your course has been updated, check it out!',
//     time: 'Just now',
//     iconColor: '#5C6BC0',
//   },
//   {
//     id: '4',
//     icon: 'book-check',
//     title: 'Congratulations, you have achieved a milestone!',
//     time: 'Just now',
//     iconColor: '#5C6BC0',
//   },
// ]

// const NotificationsScreen = () => {
//   const [activeTab, setActiveTab] = useState('notification') // Default active tab is 'notification'

//   const renderNotification = ({item}) => (
//     <TouchableOpacity onPress={() => console.log('Notification Pressed')}>
//       <Card style={styles.notificationCard}>
//         <View style={styles.cardContent}>
//           <View
//             style={[
//               styles.iconContainer,
//               {backgroundColor: `${item.iconColor}20`},
//             ]}>
//             <Icon name={item.icon} size={24} color={item.iconColor} />
//           </View>
//           <View style={styles.textContainer}>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.time}>{item.time}</Text>
//           </View>
//         </View>
//       </Card>
//     </TouchableOpacity>
//   )

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Notifications</Text>

//       {/* Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity onPress={() => setActiveTab('message')}>
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === 'message' && styles.activeTabText,
//             ]}>
//             Message
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setActiveTab('notification')}>
//           <View
//             style={[
//               styles.activeTab,
//               activeTab === 'notification' && styles.activeTabActive,
//             ]}>
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === 'notification' && styles.activeTabText,
//               ]}>
//               Notification
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       {/* Content based on the active tab */}
//       {activeTab === 'notification' ? (
//         <FlatList
//           data={notifications}
//           keyExtractor={item => item.id}
//           renderItem={renderNotification}
//           contentContainerStyle={styles.listContainer}
//         />
//       ) : (
//         <ChatListScreen />
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFA',
//     paddingHorizontal: 16,
//     paddingTop: 40,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#222B45',
//     marginBottom: 16,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16, // Reduced bottom margin to bring the tabs closer to content
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#C5CEE0',
//     marginHorizontal: 8, // Reduced horizontal space to bring tabs closer
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//     paddingBottom: 4,
//   },
//   activeTabActive: {
//     borderBottomColor: '#3366FF',
//   },
//   activeTabText: {
//     fontSize: 16,
//     color: '#3366FF',
//     fontWeight: 'bold',
//   },
//   listContainer: {
//     paddingBottom: 16,
//   },
//   notificationCard: {
//     marginBottom: 12,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },
//   iconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#222B45',
//     marginBottom: 4,
//   },
//   time: {
//     fontSize: 14,
//     color: '#8F9BB3',
//   },
//   messageContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '80%',
//   },
//   noMessages: {
//     fontSize: 18,
//     color: '#8F9BB3',
//   },
// })

// export default NotificationsScreen




