import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PostCard = ({ post }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.userName}>{post.user}</Text>
      <Text style={styles.postText}>{post.text}</Text>
      <Text style={styles.timeText}>{post.time}</Text>

      {/* Actions: Like and Comment */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="thumb-up" size={20} color="#4E68E8" />
          <Text style={styles.actionText}>{post.likes} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="comment" size={20} color="#4E68E8" />
          <Text style={styles.actionText}>{post.comments} Comments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postText: {
    marginVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#4E68E8',
  },
});

export default PostCard;
