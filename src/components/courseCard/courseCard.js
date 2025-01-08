import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {ProgressBar} from 'react-native-paper'

const CourseCard = ({course}) => {
  const {category, title, rating, duration, progress, total} = course

  return (
    <View style={styles.cardContainer}>
      {/* Placeholder for Image */}
      <View style={styles.imagePlaceholder} />

      {/* Course Details */}
      <View style={styles.courseContent}>
        {/* Course Category */}
        <Text style={styles.courseCategory}>{category}</Text>

        {/* Course Title */}
        <Text style={styles.courseTitle} numberOfLines={1}>
          {title}
        </Text>

        {/* Rating and Duration */}
        <View style={styles.metaContainer}>
          <Icon name='star' size={16} color='#FFC107' />
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.durationText}>| {duration}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={progress / total} // Progress percentage
            color='#00A37A'
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {progress}/{total}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    marginRight: 16,
  },
  courseContent: {
    flex: 1,
    justifyContent: 'center',
  },
  courseCategory: {
    fontSize: 12,
    color: '#FF7A00',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1D',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#1D1D1D',
    marginLeft: 4,
  },
  durationText: {
    fontSize: 14,
    color: '#7D7D7D',
    marginLeft: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E5E5',
    marginRight: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#7D7D7D',
  },
})

export default CourseCard
