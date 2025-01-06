import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SearchFilterModal from './filter'


const CourseScreen = ({navigation}) => {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false) //
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Course</Text>
        <TouchableOpacity>
          <Icon name='account-circle' size={40} color='#4F63AC' />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name='magnify' size={24} color='#9E9E9E' />
          <TextInput
            placeholder='Find Course'
            style={styles.searchInput}
            placeholderTextColor='#9E9E9E'
          />
        </View>
        <TouchableOpacity
          style={styles.filterIcon}
          onPress={() => setFilterModalVisible(true)}>
          <Icon name='filter-variant' size={24} color='#FFFFFF' />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}>
        <CategoryCard
          title='Language'
          imageUri='https://via.placeholder.com/100'
        />
        <CategoryCard
          title='Painting'
          imageUri='https://via.placeholder.com/100'
        />
        {/* Add more categories as needed */}
      </ScrollView>

      {/* Course Section */}
      <Text style={styles.sectionTitle}>Choice your course</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TabButton title='All' active />
        <TabButton title='Popular' />
        <TabButton title='New' />
      </View>

      {/* Course List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <CourseCard
          title='Product Design v1.0'
          instructor='Robertson Connie'
          price='$190'
          duration='16 hours'
          navigation={navigation}
        />
        <CourseCard
          title='Java Development'
          instructor='Nguyen Shane'
          price='$190'
          duration='16 hours'
          navigation={navigation}
        />
        <CourseCard
          title='Visual Design'
          instructor='Bert Pullman'
          price='$250'
          duration='14 hours'
          navigation={navigation}
        />
      </ScrollView>

      {/* Bottom Navigation */}

      {isFilterModalVisible && (
        <SearchFilterModal
          isVisible={isFilterModalVisible}
          onClose={() => {
            setFilterModalVisible(false)
          }}
        />
      )}
    </View>
  )
}

// Reusable Components

// Category Card
const CategoryCard = ({title, imageUri}) => (
  <TouchableOpacity style={styles.categoryCard}>
    <Image source={{uri: imageUri}} style={styles.categoryImage} />
    <Text style={styles.categoryText}>{title}</Text>
  </TouchableOpacity>
)

// Tab Button
const TabButton = ({title, active}) => (
  <TouchableOpacity style={[styles.tabButton, active && styles.activeTab]}>
    <Text style={[styles.tabText, active && styles.activeTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
)

// Course Card
const CourseCard = ({title, instructor, price, duration,navigation}) => (
  <TouchableOpacity style={styles.courseCard} onPress={()=>{navigation.navigate("CourseCard")}}>
    <View style={styles.courseImagePlaceholder} />
    <View style={styles.courseInfo}>
      <Text style={styles.courseTitle}>{title}</Text>
      <Text style={styles.courseInstructor}>
        <Icon name='account-outline' size={16} color='#9E9E9E' /> {instructor}
      </Text>
      <View style={styles.courseFooter}>
        <Text style={styles.coursePrice}>{price}</Text>
        <Text style={styles.courseDuration}>{duration}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#1A1A1A',
  },
  filterIcon: {
    marginLeft: 10,
    backgroundColor: '#4F63AC',
    borderRadius: 8,
    padding: 12,
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#4F63AC',
  },
  tabText: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  courseImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 5,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F63AC',
  },
  courseDuration: {
    fontSize: 14,
    color: '#FF6D6D',
    backgroundColor: '#FFF1F1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginTop: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#B0B0B0',
    marginTop: 5,
  },
})

export default CourseScreen
