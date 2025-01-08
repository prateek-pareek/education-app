// MoreScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { allCourseData } from '../../data/allCourseData';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const moreOptions = [
  { id: '1', title: 'About this Course', icon: 'information-circle-outline', type: 'Ionicons' },
  { id: '2', title: 'Share this Course', icon: 'share', type: 'MaterialIcons' },
  { id: '3', title: 'Notes', icon: 'note-text', type: 'MaterialIcons' },
  { id: '4', title: 'Resources', icon: 'folder-open', type: 'MaterialCommunityIcons' },
  { id: '5', title: 'Announcements', icon: 'bullhorn', type: 'FontAwesome' },
  { id: '6', title: 'Add course to favorites', icon: 'star', type: 'AntDesign' },
  { id: '7', title: 'Archive this course', icon: 'archive', type: 'MaterialIcons' },
];

const MoreScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { courseId } = route.params;
  const course = allCourseData.find(course => course.id === courseId);

  const renderItem = ({ item }) => {
    let IconComponent = Icon;
    if (item.type === 'Ionicons') IconComponent = Ionicons;
    else if (item.type === 'MaterialIcons') IconComponent = MaterialIcons;
    else if (item.type === 'MaterialCommunityIcons') IconComponent = MaterialCommunityIcons;
    else if (item.type === 'AntDesign') IconComponent = AntDesign;

    return (
      <TouchableOpacity style={styles.optionContainer}>
        <IconComponent name={item.icon} size={24} color="black" style={styles.icon} />
        <Text style={styles.optionText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

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
      <View style={styles.content}>
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('CourseDetailScreen', { courseId })}>
            <Text style={styles.tabText}>Lectures</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tabText}>More</Text>
            <View style={styles.purpleLine} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadButton}>
            <Icon name="download" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={moreOptions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
    height: 300,
    justifyContent: 'flex-end',
    padding: 20,
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height:250,

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
  purpleLine: {
    height: 2,
    width: 70,
    backgroundColor: '#8B00FF',
    marginTop: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  downloadButton: {
    padding: 10,
    borderRadius: 20,
  },
});

export default MoreScreen;
