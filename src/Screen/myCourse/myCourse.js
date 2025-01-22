import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native'
import { Image } from 'react-native-svg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const completedCoursesData = [
  {
    id: '1',
    category: 'Graphic Design',
    title: 'Graphic Design Advanced',
    duration: '2 Hrs 36 Mins',
    rating: 4.2,
    certificate: true,
  },
  {
    id: '2',
    category: 'Graphic Design',
    title: 'Advance Diploma in Gra..',
    duration: '3 Hrs 28 Mins',
    rating: 4.7,
    certificate: true,
  },
  {
    id: '3',
    category: 'Digital Marketing',
    title: 'Setup your Graphic Des..',
    duration: '4 Hrs 05 Mins',
    rating: 4.2,
    certificate: true,
  },
  {
    id: '4',
    category: 'Web Development',
    title: 'Web Developer conce..',
    duration: '4 Hrs 05 Mins',
    rating: 4.6,
    certificate: true,
  },
]

const ongoingCoursesData = [
  {
    id: '1',
    category: 'Graphic Design',
    title: 'Graphic Design Basics',
    duration: '1 Hrs 30 Mins',
    rating: 4.0,
  },
  {
    id: '2',
    category: 'Programming',
    title: 'Python for Beginners',
    duration: '5 Hrs 10 Mins',
    rating: 4.8,
  },
]



const MyCoursesScreen = ({ navigation }) => {

  const [activeTab, setActiveTab] = useState('Completed')
  const [searchText, setSearchText] = useState('')
  const [courses, setCourses] = useState([]);


  

  useEffect(() => {
    const fetchCourses = async () => {
      const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ6WkdPakhkTmJQVDcyUEJYdlRxY0ZoZ0RrT1AyIiwiZW1haWwiOiJhbnVqdGl3YXJpMzExMzVAZ21haWwuY29tIiwiaWF0IjoxNzM3NTQ2NTQ3LCJleHAiOjE3Mzc2MzI5NDd9.8VpzcEto2UVAbusutKoC5DStnedWfEcc3FebsThXyOM";
      try {
        const response = await axios.get('https://education-backend-jade.vercel.app/api/course', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        console.log("responfdbrg",response.data);
        // Add static data for ratings and reviews
        const coursesWithStaticData = response.data.map(course => ({
          ...course,
          rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
          students: '1000 Std', // Static students count
          bookmarked: false, // Static bookmarked status
        }));
        setCourses(coursesWithStaticData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, []);

  const renderCourseCard = ({ item, navigations }) => (
    <View style={styles.courseCard}>
      <View style={styles.courseImagePlaceholder} />
      <View style={styles.courseContent}>
        <Text style={styles.courseCategory}>{item.category}</Text>
        <Text style={styles.courseTitle} numberOfLines={1}>
          {item?.title}
        </Text>
        <View style={styles.courseMeta}>
          <Icon name='star' size={16} color='#FFC107' />
          <Text style={styles.courseRating}>{item.rating}</Text>
          <Text style={styles.courseDuration}>| {item.duration}</Text>
        </View>
        {activeTab === 'Completed' && item.certificate && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CourseDetailsScreen')
            }}>
            <Text style={styles.certificateText}>VIEW CERTIFICATE</Text>
          </TouchableOpacity>
        )}
      </View>
      {activeTab === 'Completed' && (
        <View style={styles.completionBadge}>
          <Icon name='check' size={18} color='#FFFFFF' />
        </View>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Coursess</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder='Search for ...'
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <Icon name='magnify' size={24} color='#FFFFFF' />
        </TouchableOpacity>
      </View>

      {/* Tabs (Completed/Ongoing) */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Completed' && styles.activeTab]}
          onPress={() => setActiveTab('Completed')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Completed' && styles.activeTabText,
            ]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Ongoing' && styles.activeTab]}
          onPress={() => setActiveTab('Ongoing')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Ongoing' && styles.activeTabText,
            ]}>
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'UpComing' && styles.activeTab]}
          onPress={() => setActiveTab('UpComing')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'UpComing' && styles.activeTabText,
            ]}>
            UpComing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Live' && styles.activeTab]}
          onPress={() => setActiveTab('Live')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Live' && styles.activeTabText,
            ]}>
            Live
          </Text>
        </TouchableOpacity>
      </View>

      {/* list */}
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={item => renderCourseCard(item, navigation)}
        contentContainerStyle={styles.courseList}
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
    textAlign: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#000',

  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#7D7D7D',
  },
  searchIconContainer: {
    backgroundColor: '#0047FF',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#E5E5E5',
    borderRadius: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#0047FF',
  },
  tabText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  courseList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
  },
  courseImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    marginRight: 16,
  },
  courseContent: {
    flex: 1,
  },
  courseCategory: {
    fontSize: 12,
    color: '#FF7A00',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  courseRating: {
    fontSize: 14,
    marginLeft: 4,
    color: '#000',
  },
  courseDuration: {
    fontSize: 12,
    marginLeft: 8,
    color: '#7D7D7D',
  },
  certificateText: {
    fontSize: 14,
    color: '#0047FF',
    marginTop: 8,
    fontWeight: 'bold',
  },
  completionBadge: {
    backgroundColor: '#00A37A',
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 12,
    right: 12,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#7D7D7D',
  },
  navTextActive: {
    fontSize: 12,
    color: '#0047FF',
  },
})

export default MyCoursesScreen
