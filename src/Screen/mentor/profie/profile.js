import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InstructorProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Courses'); // Manage active tab state

  // Sample Course Data
  const courses = [
    {
      id: '1',
      title: 'Graphic Design Advanced',
      category: 'Graphic Design',
      price: '799',
      oldPrice: '42',
      rating: 4.2,
      students: 7830,
    },
    {
      id: '2',
      title: 'Graphic Design Basics',
      category: 'Graphic Design',
      price: '799',
      oldPrice: '41',
      rating: 4.2,
      students: 990,
    },
  ];

  // Render each course item
  const renderCourseItem = ({ item }) => (
    <View style={styles.courseCard}>
      <View style={styles.courseThumbnail}>
        <Icon name="image" size={50} color="#E0E0E0" />
      </View>
      <View style={styles.courseDetails}>
        <Text style={styles.courseCategory}>{item.category}</Text>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <View style={styles.courseMeta}>
          <Text style={styles.coursePrice}>${item.price}</Text>
          <Text style={styles.oldPrice}>${item.oldPrice}</Text>
        </View>
        <View style={styles.courseStats}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.divider}>|</Text>
          <Text style={styles.students}>{item.students} Std</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Icon name="bookmark-outline" size={24} color="#0047FF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImage}>
          <Icon name="account" size={60} color="#fff" />
        </View>
        <Text style={styles.instructorName}>Mary Jones</Text>
        <Text style={styles.instructorTitle}>Graphic Designer At Google</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>26</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>15800</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8750</Text>
            <Text style={styles.statLabel}>Ratings</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quote Section */}
      <Text style={styles.quote}>
        "But how much, or rather, can it now do as much as it did then? Nor am I
        unaware that there is utility in history, not only pleasure."
      </Text>

      {/* Tab Navigation */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Courses' && styles.activeTab]}
          onPress={() => setActiveTab('Courses')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Courses' && styles.activeTabText,
            ]}
          >
            Courses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Ratings' && styles.activeTab]}
          onPress={() => setActiveTab('Ratings')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Ratings' && styles.activeTabText,
            ]}
          >
            Ratings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Courses List */}
      {activeTab === 'Courses' && (
        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.courseList}
        />
      )}

      {/* Ratings Section */}
      {activeTab === 'Ratings' && (
        <View style={styles.ratingsSection}>
          <Text style={styles.noDataText}>Ratings Section Coming Soon...</Text>
        </View>
      )}
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
    alignItems: 'center',
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#7D7D7D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  instructorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  instructorTitle: {
    fontSize: 16,
    color: '#7D7D7D',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  actionButtons: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  followButton: {
    borderWidth: 1,
    borderColor: '#0047FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginRight: 8,
  },
  followButtonText: {
    fontSize: 16,
    color: '#0047FF',
  },
  messageButton: {
    backgroundColor: '#0047FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  messageButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  quote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7D7D7D',
    textAlign: 'center',
    marginVertical: 16,
    marginHorizontal: 24,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 8,
  },
  tab: {
    paddingVertical: 8,
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
  courseList: {
    paddingHorizontal: 16,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  courseThumbnail: {
    width: 60,
    height: 60,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  courseDetails: {
    flex: 1,
  },
  courseCategory: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 4,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0047FF',
  },
  oldPrice: {
    fontSize: 14,
    color: '#7D7D7D',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  courseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
    marginLeft: 4,
  },
  divider: {
    fontSize: 14,
    color: '#7D7D7D',
    marginHorizontal: 8,
  },
  students: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  ratingsSection: {
    alignItems: 'center',
    padding: 16,
  },
  noDataText: {
    fontSize: 16,
    color: '#7D7D7D',
  },
});

export default InstructorProfileScreen;