import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CourseDetailsScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('about')
  const [expandedSections, setExpandedSections] = useState([])

  const curriculumData = [
    {
      sectionId: '1',
      sectionTitle: 'Introduction',
      totalDuration: '25 Mins',
      lessons: [
        {
          id: '1',
          title: 'Why Using Graphic Design?',
          duration: '15 Mins',
          unlocked: true,
        },
        {
          id: '2',
          title: 'Setup Your Graphic Design',
          duration: '10 Mins',
          unlocked: true,
        },
      ],
    },
    {
      sectionId: '2',
      sectionTitle: 'Graphic Design',
      totalDuration: '55 Mins',
      lessons: [
        {
          id: '3',
          title: 'Take a Look Graphic Design',
          duration: '08 Mins',
          unlocked: false,
        },
        {
          id: '4',
          title: 'Working with Graphic Design',
          duration: '25 Mins',
          unlocked: false,
        },
        {
          id: '5',
          title: 'Working with Frame & Layouts',
          duration: '12 Mins',
          unlocked: false,
        },
        {
          id: '6',
          title: 'Using Graphic Plugins',
          duration: '10 Mins',
          unlocked: false,
        },
      ],
    },
    {
      sectionId: '3',
      sectionTitle: 'Let’s Practice',
      totalDuration: '35 Mins',
      lessons: [
        {
          id: '7',
          title: 'Let’s Design a Sign-Up Form',
          duration: '15 Mins',
          unlocked: false,
        },
        {
          id: '8',
          title: 'Sharing work with Team',
          duration: '20 Mins',
          unlocked: false,
        },
      ],
    },
  ]
  const reviews = [
    {
      id: '1',
      name: 'Will',
      review:
        'This course has been very useful. Mentor was well spoken totally loved it.',
      rating: 4.5,
      likes: 578,
      time: '2 Weeks Ago',
    },
    {
      id: '2',
      name: 'Martha E. Thompson',
      review:
        'This course has been very useful. Mentor was well spoken totally loved it. It had fun sessions as well.',
      rating: 4.5,
      likes: 578,
      time: '2 Weeks Ago',
    },
  ]

  const features = [
    {id: '1', icon: 'file-document-outline', text: '25 Lessons'},
    {id: '2', icon: 'monitor', text: 'Access Mobile, Desktop & TV'},
    {id: '3', icon: 'chart-bar', text: 'Beginner Level'},
    {id: '4', icon: 'headphones', text: 'Audio Book'},
    {id: '5', icon: 'infinity', text: 'Lifetime Access'},
    {id: '6', icon: 'book-open-variant', text: '100 Quizzes'},
    {id: '7', icon: 'certificate', text: 'Certificate of Completion'},
  ]

  const toggleSection = sectionId => {
    setExpandedSections(prevSections =>
      prevSections.includes(sectionId)
        ? prevSections.filter(id => id !== sectionId)
        : [...prevSections, sectionId],
    )
  }
  const renderLesson = lesson => (
    <View style={styles.lessonContainer} key={lesson.id}>
      <View style={styles.lessonLeft}>
        <View style={styles.lessonNumberContainer}>
          <Text style={styles.lessonNumber}>{lesson.id}</Text>
        </View>
        <View>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonDuration}>{lesson.duration}</Text>
        </View>
      </View>
      <Icon
        name={lesson.unlocked ? 'play-circle-outline' : 'lock'}
        size={24}
        color={lesson.unlocked ? '#0047FF' : '#7D7D7D'}
      />
    </View>
  )
  const renderSection = ({item: section}) => (
    <View style={styles.sectionContainer} key={section.sectionId}>
      {/* Section Header */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection(section.sectionId)}>
        <Text style={styles.sectionTitle}>
          Section {section.sectionId} -{' '}
          <Text style={styles.highlightText}>{section.sectionTitle}</Text>
        </Text>
        <Text style={styles.sectionDuration}>{section.totalDuration}</Text>
      </TouchableOpacity>

      {/* Section Lessons */}
      {expandedSections.includes(section.sectionId) &&
        section.lessons.map(lesson => renderLesson(lesson))}
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.courseHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.goBack()
            }}>
            <Icon name='arrow-left' size={28} color='#FFFFFF' />
          </TouchableOpacity>
        </View>

        <View style={styles.headerOverlay}>
          <Text style={styles.courseCategory}>Graphic Design</Text>
          <Text style={styles.courseTitle}>
            Design Principles: Organizing ..
          </Text>
          <View style={styles.metaContainer}>
            <Icon name='star' size={16} color='#FFC107' />
            <Text style={styles.ratingText}>4.2</Text>
            <Text style={styles.metaText}>| 21 Class | 42 Hours</Text>
          </View>
          <Text style={styles.coursePrice}>499/-</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={styles.activeTab}
            onPress={() => setActiveTab('about')}>
            <Text style={styles.activeTabText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inactiveTab}
            onPress={() => setActiveTab('curriculum')}>
            <Text style={styles.inactiveTabText}>Curriculum</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'about' && (
          <View>
            <View style={styles.aboutSection}>
              <Text style={styles.aboutText}>
                Graphic Design now a popular profession graphic design by off
                your career about tantas regiones barbarorum pedibus obiit
                {'\n\n'}
                Graphic Design n a popular profession l Cur tantas regiones
                barbarorum pedibus obiit, maria transmi Et ne minium beatus est;
                Addidisti ad extremum etiam{' '}
                <Text style={styles.readMoreText}>Read More</Text>
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Instructor</Text>
              <View style={styles.instructorContainer}>
                <Image
                  source={{uri: 'https://via.placeholder.com/60'}}
                  style={styles.instructorImage}
                />
                <View>
                  <Text style={styles.instructorName}>Robert jr</Text>
                  <Text style={styles.instructorProfession}>
                    Graphic Design
                  </Text>
                </View>
              </View>
            </View>

            {/* What You'll Get Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What You’ll Get</Text>
              <FlatList
                data={features}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View style={styles.featureItem}>
                    <Icon
                      name={item.icon}
                      size={20}
                      color='#0047FF'
                      style={styles.featureIcon}
                    />
                    <Text style={styles.featureText}>{item.text}</Text>
                  </View>
                )}
                numColumns={2}
              />
            </View>

            {/* Reviews Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Review')
                  }}>
                  <Text style={styles.seeAllText}>SEE ALL</Text>
                </TouchableOpacity>
              </View>
              {reviews.map(review => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewerDetails}>
                      <Image
                        source={{uri: 'https://via.placeholder.com/40'}}
                        style={styles.reviewerImage}
                      />
                      <Text style={styles.reviewerName}>{review.name}</Text>
                    </View>
                    <View style={styles.ratingBadge}>
                      <Icon name='star' size={16} color='#FFC107' />
                      <Text style={styles.reviewRating}>{review.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.review}</Text>
                  <View style={styles.reviewFooter}>
                    <Text style={styles.reviewLikes}>
                      <Icon name='heart' size={16} color='#FF0000' />{' '}
                      {review.likes}
                    </Text>
                    <Text style={styles.reviewTime}>{review.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'curriculum' && (
          <View style={styles.container}>
            <FlatList
              data={curriculumData}
              keyExtractor={item => item.sectionId}
              renderItem={renderSection}
              contentContainerStyle={styles.curriculumList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </ScrollView>

      {/* Enroll Button */}
      <TouchableOpacity style={styles.enrollButton}>
        <Text style={styles.enrollButtonText}>Enroll Course - 499/-</Text>
        <Icon name='arrow-right' size={24} color='#FFFFFF' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
  },
  courseHeader: {
    height: 220,
    backgroundColor: '#000',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
  },
  headerOverlay: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  courseCategory: {
    fontSize: 14,
    color: '#FF7A00',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginTop: 16,
  },
  activeTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#0047FF',
  },
  inactiveTab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
  },
  activeTabText: {
    color: '#0047FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#7D7D7D',
    fontSize: 16,
  },
  aboutSection: {
    padding: 16,
  },
  aboutText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  readMoreText: {
    color: '#0047FF',
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  instructorProfession: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  featureIcon: {
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#0047FF',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F9FC',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  reviewRating: {
    fontSize: 14,
    marginLeft: 4,
    color: '#1D1D1D',
  },
  reviewText: {
    fontSize: 14,
    color: '#7D7D7D',
    marginBottom: 8,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewLikes: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  reviewTime: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0047FF',
    padding: 16,
    borderRadius: 50,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    elevation: 4,
  },
  enrollButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 8,
  },

  curriculumList: {
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1D',
  },
  highlightText: {
    color: '#0047FF',
  },
  sectionDuration: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  lessonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7D7D7D',
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1D1D1D',
  },
  lessonDuration: {
    fontSize: 12,
    color: '#7D7D7D',
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0047FF',
    padding: 16,
    borderRadius: 50,
    margin: 16,
    elevation: 4,
  },
  enrollButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 8,
  },
})

export default CourseDetailsScreen
