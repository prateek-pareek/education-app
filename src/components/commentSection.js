import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import { PostData } from '../data/PostData';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [inputText, setInputText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [replyTexts, setReplyTexts] = useState({});
  const [showAllReplies, setShowAllReplies] = useState({});

  const profilePictures = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
  ];

  const getRandomProfilePicture = () => {
    return profilePictures[Math.floor(Math.random() * profilePictures.length)];
  };

  const handleAddComment = () => {
    if (inputText.trim()) {
      if (editingCommentId) {
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.id === editingCommentId
              ? { ...comment, text: inputText }
              : comment,
          ),
        );
        setEditingCommentId(null);
      } else {
        setComments([
          ...comments,
          {
            id: Date.now().toString(),
            text: inputText,
            likes: 0,
            replies: [],
            profilePicture: getRandomProfilePicture(),
          },
        ]);
      }
      setInputText('');
    }
  };

  const handleLikeComment = id => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment,
      ),
    );
  };

  const handleDeleteComment = id => {
    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setComments(prevComments =>
              prevComments.filter(comment => comment.id !== id),
            ),
        },
      ],
    );
  };

  const handleEditComment = (id, text) => {
    setInputText(text);
    setEditingCommentId(id);
  };

  const handleReplyTextChange = (id, text) => {
    setReplyTexts(prev => ({ ...prev, [id]: text }));
  };

  const handleReplyToComment = (id, replyText) => {
    if (replyText.trim()) {
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === id
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now().toString(),
                    text: replyText,
                    likes: 0,
                    profilePicture: getRandomProfilePicture(),
                  },
                ],
              }
            : comment,
        ),
      );
    }
  };

  const renderReply = ({ item }) => (
    <View style={styles.replyContainer}>
      <Image
        source={{ uri: item.profilePicture }}
        style={styles.profilePicture}
      />
      <View style={styles.replyContent}>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity
            onPress={() => handleLikeComment(item.id)}
            style={styles.likeButton}>
            <Text style={styles.likeText}>👍 {item.likes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderComment = ({ item }) => {
    const showReplies = showAllReplies[item.id] || false;
    const visibleReplies = showReplies ? item.replies : item.replies.slice(0, 2);

    return (
      <View style={styles.commentContainer}>
        <Image
          source={{ uri: item.profilePicture }}
          style={styles.profilePicture}
        />
        <View style={styles.commentContent}>
          <Text style={styles.commentText}>{item.text}</Text>
          <View style={styles.commentActions}>
            <TouchableOpacity
              onPress={() => handleLikeComment(item.id)}
              style={styles.likeButton}>
              <Text style={styles.likeText}>👍 {item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEditComment(item.id, item.text)}
              style={styles.editButton}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteComment(item.id)}
              style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={visibleReplies}
            renderItem={renderReply}
            keyExtractor={reply => reply.id}
            contentContainerStyle={styles.replyList}
          />
          {/* Show "Show More" button only when there are more than 2 replies */}
          {item.replies.length > 2 && (
            <TouchableOpacity
              onPress={() =>
                setShowAllReplies(prev => ({
                  ...prev,
                  [item.id]: !prev[item.id],
                }))
              }
              style={styles.showRepliesButton}>
              <Text style={styles.showRepliesButtonText}>
                {showReplies ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.replyInputContainer}>
            <TextInput
              style={styles.replyInput}
              value={replyTexts[item.id] || ''}
              onChangeText={text => handleReplyTextChange(item.id, text)}
              placeholder='Write a reply...'
            />
            <TouchableOpacity
              onPress={() => {
                handleReplyToComment(item.id, replyTexts[item.id] || '');
                handleReplyTextChange(item.id, ''); // Clear input after posting
              }}
              style={styles.replyButton}>
              <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={() => (
              <>
                <PostHeader data={PostData[0]} />
                <Image source={PostData[0].postImg} style={styles.postImg} />
                <PostFooter data={PostData[0]} />
              </>
            )}
            data={comments}
            renderItem={renderComment}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.commentList}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder={
                editingCommentId ? 'Edit your comment...' : 'Write a comment...'
              }
            />
            <TouchableOpacity
              onPress={handleAddComment}
              style={styles.sendButton}>
              <Text style={styles.sendButtonText}>
                {editingCommentId ? 'Update' : 'Post'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  postImg: {
    width: '100%',
    height: 200,
  },
  commentList: {
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentText: {
    fontSize: 16,
    color: '#333',
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  likeButton: {
    marginRight: 10,
  },
  likeText: {
    color: '#007BFF',
    fontSize: 14,
  },
  editButton: {
    marginRight: 10,
  },
  editText: {
    color: '#FFA500',
    fontSize: 14,
  },
  deleteButton: {
    marginRight: 10,
  },
  deleteText: {
    color: '#FF0000',
    fontSize: 14,
  },
  replyContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 8,
  },
  replyContent: {
    flex: 1,
  },
  replyList: {
    marginTop: 10,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  replyInput: {
    flex: 1,
    height: 35,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  replyButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  showRepliesButton: {
    marginTop: 5,
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  showRepliesButtonText: {
    color: '#007BFF',
    fontSize: 14,
  },
});

export default CommentSection;
