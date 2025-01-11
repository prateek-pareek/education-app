import {View, StyleSheet, Image, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import {Colors} from '../utils/Colors'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import {PostData} from '../data/PostData'
import CommentSection from './commentSection'
import axios from 'axios'

const Post = ({posts}) => {
  const [loading, setLoading] = useState(false)
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
  return (
    <View style={styles.postContainer}>
      {posts.map(item => (
        <View key={item.id}>
          <PostHeader data={item} />
          <Image source={{uri: item?.mediaUrl}} style={styles.postImg} />
          <PostFooter data={item} />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.white,
    marginTop: 8,
  },
  postImg: {
    width: '100%',
    height: 250,
  },
})

export default Post
