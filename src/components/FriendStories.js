import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../utils/Colors';
import { StoryData } from '../data/StoryData';
import axios from 'axios';

const FriendStories = () => {
  const [stories, setStories] = useState([]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ6WkdPakhkTmJQVDcyUEJYdlRxY0ZoZ0RrT1AyIiwiZW1haWwiOiJhbnVqdGl3YXJpMzExMzVAZ21haWwuY29tIiwiaWF0IjoxNzM3NTI3NjMwLCJleHAiOjE3Mzc2MTQwMzB9.uCRtdYglTseu4FqFZYxK9g03w_VDlE0hSFU23YydmcY";

  // Fetch all stories
  useEffect(() => {
    const getStories = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://education-backend-jade.vercel.app/api/story/display',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      axios
        .request(config)
        .then(response => {
          console.log('Fetched stories:', response.data); // Inspect the structure here
          // Adjust based on the actual structure
          setStories(response.data.stories || response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getStories();
  }, [token]);

  return (
    <>
      {stories.map((item, index) => (
        <View key={item.id || index} style={styles.friendStoryContainer}>
          <Image source={{ uri: item.user.profileImageURL }} style={styles.storyImg} />
          <View style={styles.profileImgContainer}>
            <Image source={{ uri: item.user.profileImageURL }} style={styles.profileImg} />
          </View>
          <View style={styles.friendNameContainer}>
            <Text style={styles.friendName}>{item?.user.name}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  friendStoryContainer: {
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 10,
    marginLeft: 5,
    position: 'relative',
  },
  storyImg: {
    height: 180,
    width: 110,
    borderRadius: 10,
  },
  profileImg: {
    height: 35,
    width: 35,
    borderRadius: 50,
  },
  profileImgContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    borderRadius: 50,
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendNameContainer: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    backgroundColor: Colors.white,
  },
  friendName: {
    color: Colors.black,
    fontSize: 14,
  },
});

export default FriendStories;
