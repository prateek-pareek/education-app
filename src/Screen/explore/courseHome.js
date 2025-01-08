import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import {Text, Card, Chip, Avatar, Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const {width} = Dimensions.get('window') // For responsive design

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>
            Hi, <Text style={styles.greetingName}>ALEX</Text>
          </Text>
          <Text style={styles.subText}>
            What Would you like to learn Today?{'\n'}Search Below.
          </Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput placeholder='Graphic Design' style={styles.searchInput} />
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={() => {
            navigation.navigate('SearchCoursesScreen')
          }}>
          <Icon name='Magnifier' size={24} color='#FFFFFF' />
        </TouchableOpacity>
      </View>

      {/* Today's Special */}
      {/* <Card style={styles.specialCard}>
        <Card.Content>
          <Text style={styles.specialOfferText}>25% OFF*</Text>
          <Text style={styles.specialTitle}>Today's Special</Text>
          <Text style={styles.specialDescription}>
            Get a Discount for Every Course Order only Valid for Today.!
          </Text>
        </Card.Content>
      </Card> */}

      {/* Categories Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Button
          uppercase={false}
          textColor='#007AFF'
          compact
          onPress={() => {
            navigation.navigate('CategoryScreen')
          }}>
          SEE ALL
        </Button>
      </View>
      <View style={styles.categories}>
        <Chip style={styles.categoryChip} textStyle={styles.categoryText}>
          3D Design
        </Chip>
        <Chip
          style={styles.categoryChipSelected}
          textStyle={styles.categorySelectedText}>
          Arts & Humanities
        </Chip>
        <Chip style={styles.categoryChip} textStyle={styles.categoryText}>
          Graphic Design
        </Chip>
      </View>

      {/* Popular Courses - Horizontal Scroll */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Courses</Text>
        <Button
          uppercase={false}
          textColor='#007AFF'
          compact
          onPress={() => {
            navigation.navigate('CourseCard')
          }}>
          SEE ALL
        </Button>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}>
        {Array.from({length: 12}).map((_, index) => (
          <Card key={index} style={styles.courseCard}>
            <Card.Cover
              source={{
                uri: 'https://via.placeholder.com/300x200.png?text=Course+Image',
              }}
              style={styles.cardImage}
            />
            <Card.Content>
              <Text style={styles.courseCategory}>Graphic Design</Text>
              <Text style={styles.courseTitle}>Graphic Design Advanced</Text>
              <View style={styles.courseDetails}>
                <Text style={styles.coursePrice}>850/-</Text>
                <Icon
                  name='star'
                  color='#FFC107'
                  size={16}
                  style={styles.starIcon}
                />
                <Text style={styles.courseRating}>4.2</Text>
                <Text style={styles.courseStudents}>| 7830 Std</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* Top Mentor */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Mentor</Text>
        <Button uppercase={false} textColor='#007AFF' compact>
          SEE ALL
        </Button>
      </View>
      <View style={styles.mentors}>
        <Avatar.Text size={64} label='J' style={styles.mentorAvatar} />
        <Avatar.Text size={64} label='A' style={styles.mentorAvatar} />
        <Avatar.Text size={64} label='R' style={styles.mentorAvatar} />
        <Avatar.Text size={64} label='M' style={styles.mentorAvatar} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  greetingName: {
    color: '#003366',
  },
  subText: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 4,
  },
  notificationIcon: {
    marginTop: -30,
  },
  searchBar: {
    marginBottom: 16,
  },
  searchInput: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    height: 50,
  },
  specialCard: {
    backgroundColor: '#0047FF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  specialOfferText: {
    fontSize: 14,
    color: '#FFC107',
    fontWeight: 'bold',
  },
  specialTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  specialDescription: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderRadius: 24,
  },
  categoryChipSelected: {
    backgroundColor: '#0047FF',
    marginRight: 8,
    borderRadius: 24,
  },
  categoryText: {
    color: '#000',
  },
  categorySelectedText: {
    color: '#FFFFFF',
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  courseCard: {
    width: width * 0.7, // 70% of screen width
    marginRight: 16,
    borderRadius: 12,
  },
  cardImage: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
  courseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  coursePrice: {
    fontSize: 14,
    color: '#0047FF',
    fontWeight: 'bold',
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
  mentors: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  mentorAvatar: {
    backgroundColor: '#E0E0E0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 1,
    marginBottom: 16,
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
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#7D7D7D',
  },
})

export default HomeScreen
