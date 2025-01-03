import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native'
import React, {useState} from 'react'
import Profile from '../../public/images/img1.jpeg'
import {launchImageLibrary} from 'react-native-image-picker'
import {Colors} from '../utils/Colors'

const SubHeader = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [media, setMedia] = useState(null)

  const handleMediaUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed', // Allows both images and videos
        selectionLimit: 1,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setMedia(response.assets[0])
        }
      },
    )
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

            <TouchableOpacity
              style={styles.postButton}
              onPress={() => {
                setModalVisible(false)
                console.log('Post Content:', postContent)
                console.log('Media:', media)
              }}>
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
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
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
})

export default SubHeader
