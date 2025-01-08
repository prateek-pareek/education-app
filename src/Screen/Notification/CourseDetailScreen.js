import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { allCourseData } from '../../data/allCourseData';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

const CourseDetailScreen = () => {
  const route = useRoute();
  const { courseId } = route.params;
  const course = allCourseData.find(course => course.id === courseId);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text>Course not found</Text>
      </View>
    );
  }

  const renderSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      {item.videos.map((video, index) => (
        <View key={video.id} style={styles.videoItem}>
          <Text style={styles.videoNumber}>{index + 1}</Text>
          <View style={styles.videoDetails}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.videoDuration}>{video.duration}</Text>
          </View>
          <TouchableOpacity style={styles.downloadButton}>
            <Icon name="download" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={{ uri: course.bgImage }} style={styles.bgImage}>
        <View style={styles.header}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseTutor}>by {course.tutor}</Text>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* tabs */}
      <View style={styles.content}>
        <View style={styles.tabs}>
          <View style={styles.tabContainer}>
            <Text style={styles.tabText}>Lectures</Text>
            <View style={styles.purpleLine} />
          </View>
          <Text style={styles.tabTextMore}>More</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Icon name="download" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={course.sections}
          renderItem={renderSection}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  bgImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    padding: 20,
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  courseTutor: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#8B00FF',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  getStartedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 20,
  },
  tabTextMore:{
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: -120,
  },
  purpleLine: {
    height: 2,
    width: 70,
    backgroundColor: '#8B00FF',
    marginTop: 5,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  videoNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  videoDetails: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
  },
  videoDuration: {
    fontSize: 16,
    color: 'gray',
  },
  downloadButton: {
    padding: 10,
    borderRadius: 20,
  },
});

export default CourseDetailScreen;
