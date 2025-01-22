import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native'
import React, {useState} from 'react'
import Profile from '../../public/images/img1.jpeg'
import {launchImageLibrary} from 'react-native-image-picker'
import {Colors} from '../utils/Colors'
import axios from 'axios'
import storage from '@react-native-firebase/storage'

const SubHeader = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [media, setMedia] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [mediaUrl, setMediaUrl] = useState(null)

  const handleMediaUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 1,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setMedia(response.assets[0])
        }
      },
    )
  }

  // Upload the selected media to Firebase Storage
  const uploadMedia = async () => {
    if (!media) {
      Alert.alert('No media selected')
      return
    }

    const fileName = media.fileName || media.uri.split('/').pop()
    const storageRef = storage().ref(`images/${fileName}`)

    try {
      setUploading(true)
      const task = storageRef.putFile(media.uri)

      task.on('state_changed', taskSnapshot => {
        const progress =
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
        setProgress(progress) // Update progress state
      })

      await task

      // Once upload is complete, get the download URL
      const downloadURL = await storageRef.getDownloadURL()
      setMediaUrl(downloadURL) /

      setUploading(false)
      Alert.alert('Upload successful!', 'Your media has been uploaded.')
      return downloadURL // Return the download URL for use in submission
    } catch (error) {
      setUploading(false)
      console.error('Error uploading media:', error)
      Alert.alert('Upload failed', 'There was an issue uploading your media.')
    }
  }

  // Handle the post submission
  const handleSubmit = async () => {
    try {
      // if (!postContent || !mediaUrl) {
      //   Alert.alert('Please fill out all fields');
      //   return;
      // }
      const config = {
        method: 'post',
        url: 'https://education-backend-jade.vercel.app/api/posts/create',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ6WkdPakhkTmJQVDcyUEJYdlRxY0ZoZ0RrT1AyIiwiZW1haWwiOiJhbnVqdGl3YXJpMzExMzVAZ21haWwuY29tIiwiaWF0IjoxNzM3NTI3NjMwLCJleHAiOjE3Mzc2MTQwMzB9.uCRtdYglTseu4FqFZYxK9g03w_VDlE0hSFU23YydmcY`,
        },
        data: {
          content:postContent,
          mediaUrl:"https://loremflickr.com/cache/resized/defaultImage.small_320_240_nofilter.jpg" 
        }
      };

      const response = await axios.request(config);
      console.log('response:',response)
      setModalVisible(false)
    } catch (error) {
      console.error('Error creating post:', error)
      Alert.alert(
        'Post creation failed',
        'There was an issue creating your post.',
      )
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.triggerContainer}>
        <Image source={Profile} style={styles.profileStyle} />
        <Text style={styles.placeholderText}>What's on your mind?</Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Post</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View> 

            <View style={styles.inputArea}>
              <Image source={Profile} style={styles.modalProfileStyle} />
              <TextInput
                style={styles.textInput}
                multiline
                placeholder="What's on your mind?"
                value={postContent}
                onChangeText={setPostContent}
              />
            </View>

            {media && (
              <View style={styles.mediaPreviewContainer}>
                {media.type.startsWith('image') ? (
                  <Image
                    source={{uri: media.uri}}
                    style={styles.mediaPreview}
                  />
                ) : (
                  <Text style={styles.videoPreviewText}>
                    Video Selected: {media.fileName}
                  </Text>
                )}
              </View>
            )}

            <TouchableOpacity
              style={styles.addMediaButton}
              onPress={handleMediaUpload}>
              <Text style={styles.addMediaText}>Upload Media</Text>
            </TouchableOpacity>

            {uploading && (
              <Text style={styles.uploadProgressText}>
                Uploading: {Math.round(progress)}%
              </Text>
            )}

            <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: Colors.white,
    paddingTop: 40,
  },
  triggerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 30,
  },
  profileStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.grey,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGrey,
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 16,
    color: Colors.grey,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15,
  },
  modalProfileStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'top',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 10,
    backgroundColor: Colors.lightGrey,
  },
  mediaPreviewContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  mediaPreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  videoPreviewText: {
    fontSize: 14,
    color: Colors.grey,
    textAlign: 'center',
  },
  addMediaButton: {
    padding: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    // color: Colors.black,
  },
  addMediaText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  postButton: {
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadProgressText: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 10,
  },
})

export default SubHeader
