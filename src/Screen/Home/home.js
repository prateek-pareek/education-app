import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Video from 'react-native-video'; // For video rendering

// A simple PostCard component
const PostCard = ({ post }) => {
  return (
    <View style={styles.postCard}>
      {/* Profile and User Info */}
      <View style={styles.header}>
        <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
      </View>

      {/* Post Content */}
      <Text style={styles.postText}>{post.text}</Text>

      {/* Post Media - Image, Video or Document */}
      {post.mediaType === 'image' && post.mediaUri && (
        <Image source={{ uri: post.mediaUri }} style={styles.postMedia} />
      )}

      {post.mediaType === 'video' && post.mediaUri && (
        <Video
          source={{ uri: post.mediaUri }}
          style={styles.postMedia}
          resizeMode="contain"
          controls
        />
      )}

      {post.mediaType === 'document' && post.mediaUri && (
        <View style={styles.documentPreview}>
          <Icon name="file-document" size={30} color="#3b5998" />
          <Text style={styles.documentText}>Document: {post.mediaName}</Text>
        </View>
      )}

      {/* Action Buttons: Like, Comment, Share */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="thumb-up" size={24} color="#3b5998" />
          <Text style={styles.actionText}>{post.likes} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="comment-outline" size={24} color="#3b5998" />
          <Text style={styles.actionText}>{post.comments} Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-outline" size={24} color="#3b5998" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FeedScreen = () => {
  const [postText, setPostText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  // Sample posts data
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: 'John Doe',
      text: 'Check out my new post!',
      time: '2 hours ago',
      profilePic: 'https://randomuser.me/api/portraits/men/0.jpg',
      likes: 10,
      comments: 5,
      mediaType: 'image', // 'image', 'video', or 'document'
      mediaUri: 'https://source.unsplash.com/random/800x600', // or URI for video/document
      mediaName: null,
    },
  ]);

  // Select Image/Video from Gallery
  const selectMedia = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'mixed', // Allow images and videos to be picked
        quality: 1,
      });

      if (result.didCancel) return;

      const { assets } = result;

      if (assets && assets.length > 0) {
        const media = assets[0];
        const fileType = media.type.split('/')[0]; // 'image', 'video', or 'application'
        const fileUri = media.uri;

        setSelectedMedia(fileUri);
        setMediaType(fileType);

        // Display a post with media
        setPosts([
          ...posts,
          {
            id: String(posts.length + 1),
            user: 'Jane Smith',
            text: postText,
            time: 'Just now',
            profilePic: 'https://randomuser.me/api/portraits/women/0.jpg',
            likes: 0,
            comments: 0,
            mediaType: fileType,
            mediaUri: fileUri,
            mediaName: fileType === 'application' ? media.fileName : null,
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select media');
    }
  };

  // Select Document
  const selectDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedMedia(res.uri);
      setMediaType('document');

      // Display a post with document
      setPosts([
        ...posts,
        {
          id: String(posts.length + 1),
          user: 'Jane Smith',
          text: postText,
          time: 'Just now',
          profilePic: 'https://randomuser.me/api/portraits/women/0.jpg',
          likes: 0,
          comments: 0,
          mediaType: 'document',
          mediaUri: res.uri,
          mediaName: res.name,
        },
      ]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the document picker');
      } else {
        Alert.alert('Error', 'Failed to select document');
      }
    }
  };

  return (
    <View style={styles.feedContainer}>
      {/* Post Input Area */}
      <View style={styles.postInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={postText}
          onChangeText={setPostText}
          multiline
        />
        <View style={styles.mediaButtons}>
          <TouchableOpacity onPress={selectMedia} style={styles.mediaButton}>
            <Icon name="camera" size={25} color="#3b5998" />
            <Text style={styles.buttonText}>Media</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={selectDocument} style={styles.mediaButton}>
            <Icon name="file-document" size={25} color="#3b5998" />
            <Text style={styles.buttonText}>Document</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.postButton} onPress={selectMedia}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Post List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  postInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    paddingTop: 10,
    fontSize: 16,
    color: '#333',
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    marginRight: 10,
    width: '45%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#3b5998',
    marginLeft: 5,
    fontSize: 14,
  },
  postButton: {
    backgroundColor: '#4E68E8',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  postCard: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#aaa',
  },
  postText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  postMedia: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  documentPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  documentText: {
    fontSize: 14,
    color: '#3b5998',
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: '#3b5998',
    fontSize: 14,
  },
});

export default FeedScreen;
