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
import React, { useState } from 'react'
import Profile from '../../public/images/img1.jpeg'
import VectorIcon from '../utils/VectorIcon'
import { Colors } from '../utils/Colors'
import { launchImageLibrary } from 'react-native-image-picker'


const CreateStory = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [storyContent, setstoryContent] = useState('')
  const [media, setMedia] = useState(null)

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


  const handleSubmit = () => {
    setModalVisible(true)
  }

  return (
    <View style={styles.createStoryContainer}>
      <TouchableOpacity></TouchableOpacity>

      <Image source={Profile} style={styles.profileImg} />
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}

        >
          <VectorIcon
            name='circle-with-plus'
            type='Entypo'
            size={35}
            color={Colors.primaryColor}

          />

        </TouchableOpacity>
      </View>
      <Text style={styles.createStory}>Create story</Text>

      {/* modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Story</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputArea}>
              {/* <Image source={{ uri: media.uri }} style={styles.modalProfileStyle} /> */}

              <TouchableOpacity
                style={styles.addMediaButton}
                onPress={handleMediaUpload}>
                <Text style={styles.addMediaText}>Upload Media</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.textInput}
                multiline
                placeholder="What's on your mind?"
                value={storyContent}
                onChangeText={setstoryContent}
              />
            </View>

            {media && (
              <View style={styles.mediaPreviewContainer}>
                {media.type.startsWith('image') ? (
                  <Image
                    source={{ uri: media.uri }}
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

            {/* {uploading && (
                  <Text style={styles.uploadProgressText}>
                    Uploading: {Math.round(progress)}%
                  </Text>
                )} */}

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
  profileImg: {
    height: 110,
    width: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  createStoryContainer: {
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: 10,
    backgroundColor: Colors.storyImageBg,
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: '55%',
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
  createStory: {
    fontSize: 14,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 25,
    width: '50%',
  },

  // model
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

export default CreateStory
