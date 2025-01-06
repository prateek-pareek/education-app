import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const CourseCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Product Design v1.0</Text>
        <Text style={styles.price}>$74.00</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium,
        </Text>
      </View>
      <View style={styles.lessons}>
        <View style={styles.lesson}>
          <Text style={styles.lessonNumber}>01</Text>
          <Text style={styles.lessonTitle}>Welcome to the Course</Text>
          <Text style={styles.lessonDuration}>6:10 mins</Text>
          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playButtonText}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lesson}>
          <Text style={styles.lessonNumber}>02</Text>
          <Text style={styles.lessonTitle}>Process overview</Text>
          <Text style={styles.lessonDuration}>6:10 mins</Text>
          <TouchableOpacity style={styles.pauseButton}>
            <Text style={styles.pauseButtonText}>||</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lesson}>
          <Text style={styles.lessonNumber}>03</Text>
          <Text style={styles.lessonTitle}>Discovery</Text>
          <Text style={styles.lessonDuration}>6:10 mins</Text>
          <TouchableOpacity style={styles.lockButton}>
            <Text style={styles.lockButtonText}>🔒</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.starButton}>
          <Text style={styles.starButtonText}>⭐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
  },
  description: {
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
  },
  lessons: {
    marginVertical: 10,
  },
  lesson: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  lessonNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonTitle: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  lessonDuration: {
    fontSize: 14,
    color: '#999',
  },
  playButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 5,
  },
  pauseButton: {
    backgroundColor: '#FF9800',
    borderRadius: 5,
    padding: 5,
  },
  lockButton: {
    backgroundColor: '#9E9E9E',
    borderRadius: 5,
    padding: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  starButton: {
    backgroundColor: '#FFD700',
    borderRadius: 5,
    padding: 10,
  },
  enrollButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
  },
  starButtonText: {
    color: '#fff',
  },
  enrollButtonText: {
    color: '#fff',
  },
})

export default CourseCard
