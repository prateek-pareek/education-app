import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const categories = ['All', 'Graphic Design', '3D Design', 'Arts & Humanities'];

const PopularCoursesScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ6WkdPakhkTmJQVDcyUEJYdlRxY0ZoZ0RrT1AyIiwiZW1haWwiOiJhbnVqdGl3YXJpMzExMzVAZ21haWwuY29tIiwiaWF0IjoxNzM3NTQ2NTQ3LCJleHAiOjE3Mzc2MzI5NDd9.8VpzcEto2UVAbusutKoC5DStnedWfEcc3FebsThXyOM";
      try {
        const response = await axios.get('https://education-backend-jade.vercel.app/api/course', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
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

  // Filter courses based on selected category
  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter(course => course.category === selectedCategory);

  const toggleBookmark = id => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === id ? { ...course, bookmarked: !course.bookmarked } : course,
      ),
    );
  };

  const renderCourseCard = ({ item }) => {
    console.log('Course Title:', item.title); // Log the title of the course
    return (
      <View style={styles.courseCard}>
        <Image source={{ uri: item.mediaUrl }} style={styles.courseImagePlaceholder} />
        <View style={styles.courseContent}>
          <Text style={styles.courseCategory}>{item?.category}</Text>
          <Text style={styles.courseTitle} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.coursePrice}>{item?.price}</Text>
          <View style={styles.courseMeta}>
            <Icon name='star' size={16} color='#FFC107' />
            <Text style={styles.courseRating}>{item.rating}</Text>
            <Text style={styles.courseStudents}>| {item.students}</Text>
          </View>
        </View>
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
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name='arrow-left' size={28} color='#000' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Popular Courses</Text>
        <TouchableOpacity>
          <Icon name='magnify' size={28} color='#000' />
        </TouchableOpacity>
      </View>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilters}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.filterChip,
              selectedCategory === category && styles.filterChipSelected,
            ]}>
            <Text
              style={[
                styles.filterText,
                selectedCategory === category && styles.filterTextSelected,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={courses}
        keyExtractor={item => item.id}
        renderItem={renderCourseCard}
        contentContainerStyle={styles.courseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  categoryFilters: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 24,
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: '#0047FF',
  },
  filterText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  filterTextSelected: {
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
    elevation: 2,
    padding: 12,
  },
  courseImagePlaceholder: {
    width: 80,
    height: 80,
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
    marginVertical: 4,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseRating: {
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
  },
  courseStudents: {
    fontSize: 12,
    color: '#7D7D7D',
    marginLeft: 8,
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
});

export default PopularCoursesScreen;
