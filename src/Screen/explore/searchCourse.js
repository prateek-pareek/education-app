import React, {useState} from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FilterModal from './filterCourse'

const coursesData = [
  {
    id: '1',
    category: 'Graphic Design',
    title: 'Graphic Design Advanced',
    price: '89/-',
    oldPrice: '499',
    rating: 4.2,
    students: '7830 Std',
    bookmarked: true,
  },
  {
    id: '2',
    category: 'Graphic Design',
    title: 'Advance Diploma in Gra..',
    price: '800/-',
    rating: 4.0,
    students: '12680 Std',
    bookmarked: false,
  },
  {
    id: '3',
    category: 'Graphic Design',
    title: 'Graphic Design Advanced',
    price: '799/-',
    rating: 4.2,
    students: '990 Std',
    bookmarked: true,
  },
  {
    id: '4',
    category: 'Web Development',
    title: 'Web Developer conce..',
    price: '999/-',
    rating: 4.9,
    students: '14580 Std',
    bookmarked: false,
  },
]

const SearchCoursesScreen = () => {
  const [activeTab, setActiveTab] = useState('Courses')
  const [searchText, setSearchText] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const toggleBookmark = id => {
    // Logic to toggle bookmarks for each course
    const updatedCourses = coursesData.map(course =>
      course.id === id ? {...course, bookmarked: !course.bookmarked} : course,
    )
    return updatedCourses
  }

  const renderCourseCard = ({item}) => (
    <View style={styles.courseCard}>
      {/* Placeholder for course image */}
      <View style={styles.courseImagePlaceholder} />

      {/* Course Details */}
      <View style={styles.courseContent}>
        <Text style={styles.courseCategory}>{item.category}</Text>
        <Text style={styles.courseTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.coursePrice}>
          {item.price}
          {item.oldPrice && (
            <Text style={styles.oldPrice}> {item.oldPrice}</Text>
          )}
        </Text>
        <View style={styles.courseMeta}>
          <Icon name='star' size={16} color='#FFC107' />
          <Text style={styles.courseRating}>{item.rating}</Text>
          <Text style={styles.courseStudents}>| {item.students}</Text>
        </View>
      </View>

      {/* Bookmark Button */}
      <TouchableOpacity
        onPress={() => toggleBookmark(item.id)}
        style={styles.bookmarkButton}>
        <Icon
          name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={item.bookmarked ? '#0047FF' : '#7D7D7D'}
        />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name='arrow-left' size={28} color='#000' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Online Courses</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder='Graphic Design'
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchIconContainer} onPress={()=>{setIsVisible(true)}}>
          <Icon name='tune' size={24} color='#FFFFFF' />
        </TouchableOpacity>
      </View>

      {/* Tabs (Courses/Mentors) */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Courses' && styles.activeTab]}
          onPress={() => setActiveTab('Courses')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Courses' && styles.activeTabText,
            ]}>
            Courses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Mentors' && styles.activeTab]}
          onPress={() => setActiveTab('Mentors')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Mentors' && styles.activeTabText,
            ]}>
            Mentors
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultText}>
          Result for "<Text style={styles.highlightedText}>Graphic Design</Text>
          "
        </Text>
        <TouchableOpacity>
          <Text style={styles.foundText}>2480 FOUND</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={coursesData}
        keyExtractor={item => item.id}
        renderItem={renderCourseCard}
        contentContainerStyle={styles.courseList}
        showsVerticalScrollIndicator={false}
      />

      {isVisible && <FilterModal isVisible={isVisible} onClose={setIsVisible}/>}
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
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  resultText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  highlightedText: {
    color: '#0047FF',
    fontWeight: 'bold',
  },
  foundText: {
    fontSize: 14,
    color: '#0047FF',
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
  coursePrice: {
    fontSize: 16,
    color: '#0047FF',
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 14,
    color: '#7D7D7D',
    textDecorationLine: 'line-through',
    marginLeft: 8,
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
  courseStudents: {
    fontSize: 12,
    marginLeft: 8,
    color: '#7D7D7D',
  },
  bookmarkButton: {
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

export default SearchCoursesScreen
