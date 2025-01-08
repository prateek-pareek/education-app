import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReviewsScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Excellent');

  const reviews = [
    {
      id: '1',
      name: 'Heather S. McMullen',
      rating: 4.2,
      review:
        'The Course is Very Good dolor sit amet, con sect tur adipiscing elit. Naturales divitias dixit parab les esse..',
      likes: 760,
      time: '2 Weeks Ago',
    },
    {
      id: '2',
      name: 'Natasha B. Lambert',
      rating: 4.8,
      review:
        'The Course is Very Good dolor veterm, quo etiam utuntur hi capiamus..',
      likes: 918,
      time: '2 Weeks Ago',
    },
    {
      id: '3',
      name: 'Marshall A. Lester',
      rating: 4.6,
      review:
        'The Course is Very Good dolor sit amet, con sect tur adipiscing elit. Naturales divitias dixit parab les esse..',
      likes: 914,
      time: '2 Weeks Ago',
    },
    {
      id: '4',
      name: 'Frances D. Stanford',
      rating: 4.8,
      review:
        'The Course is Very Good dolor veterm, quo etiam utuntur hi capiamus.',
      likes: 877,
      time: '2 Weeks Ago',
    },
  ];

  const tabs = ['Excellent', 'Good', 'Average', 'Below Average'];

  const renderReviewCard = ({ item }) => (
    <View style={styles.reviewCard}>
      {/* Review Header */}
      <View style={styles.reviewHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.avatar}
        />
        <View style={styles.reviewerDetails}>
          <Text style={styles.reviewerName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFC107" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>

      {/* Review Text */}
      <Text style={styles.reviewText}>{item.review}</Text>

      {/* Review Footer */}
      <View style={styles.reviewFooter}>
        <Text style={styles.likes}>
          <Icon name="heart" size={16} color="#FF0000" /> {item.likes}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
      </View>

      {/* Overall Rating */}
      <View style={styles.ratingSection}>
        <Text style={styles.ratingValue}>4.8</Text>
        <View style={styles.starsContainer}>
          {Array(5)
            .fill()
            .map((_, index) => (
              <Icon
                key={index}
                name="star"
                size={20}
                color="#FFC107"
                style={{ marginRight: 4 }}
              />
            ))}
        </View>
        <Text style={styles.reviewCount}>Based on 448 Reviews</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Reviews List */}
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReviewCard}
        contentContainerStyle={styles.reviewsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Write a Review Button */}
      <TouchableOpacity style={styles.writeReviewButton}  onPress={() => {
            navigation.navigate('WriteReview')
          }}>
        <Text style={styles.writeReviewText}>Write a Review</Text>
        <Icon name="arrow-right" size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 16,
  },
  ratingSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  ratingValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E5E5E5',
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
  reviewsList: {
    paddingHorizontal: 16,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#E5E5E5',
  },
  reviewerDetails: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#1D1D1D',
    marginLeft: 4,
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
  likes: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  time: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0047FF',
    padding: 16,
    borderRadius: 50,
    margin: 16,
    elevation: 4,
  },
  writeReviewText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default ReviewsScreen;