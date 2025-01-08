import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WriteReviewScreen = () => {
  const [reviewText, setReviewText] = useState('');
  const maxCharacters = 250;

  const handleUpload = () => {
    // Handle photo/video upload
    console.log('Upload button clicked');
  };

  const handleSubmit = () => {
    // Handle review submission
    console.log('Review submitted:', reviewText);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Write a Review</Text>
      </View>

      {/* Course Information */}
      <View style={styles.courseInfo}>
        <View style={styles.courseImagePlaceholder} />
        <View style={styles.courseDetails}>
          <Text style={styles.courseCategory}>Graphic Design</Text>
          <Text style={styles.courseTitle}>Setup your Graphic Design..</Text>
        </View>
      </View>

      {/* Upload Section */}
      <Text style={styles.sectionTitle}>Add Photo (or) Video</Text>
      <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
        <Icon name="cloud-upload-outline" size={40} color="#0047FF" />
        <Text style={styles.uploadText}>Click here to Upload</Text>
      </TouchableOpacity>

      {/* Write a Review Section */}
      <Text style={styles.sectionTitle}>Write your Review</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Would you like to write anything about this Product?"
        placeholderTextColor="#7D7D7D"
        multiline
        value={reviewText}
        onChangeText={(text) => setReviewText(text)}
        maxLength={maxCharacters}
      />
      <Text style={styles.characterCount}>
        *{maxCharacters - reviewText.length} Characters Remaining
      </Text>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Review</Text>
        <Icon name="arrow-right" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#000',
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    marginBottom: 16,
  },
  courseImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    borderRadius: 8,
    marginRight: 16,
  },
  courseDetails: {
    flex: 1,
  },
  courseCategory: {
    fontSize: 14,
    color: '#FF7A00',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1D',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 16,
  },
  uploadBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  uploadText: {
    fontSize: 14,
    color: '#7D7D7D',
    marginTop: 8,
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#1D1D1D',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  characterCount: {
    fontSize: 12,
    color: '#7D7D7D',
    marginTop: 8,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0047FF',
    padding: 16,
    borderRadius: 50,
    marginTop: 32,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
});

export default WriteReviewScreen;