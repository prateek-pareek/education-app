import {View, StyleSheet, Image, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import {Colors} from '../utils/Colors'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import {PostData} from '../data/PostData'
import CommentSection from './commentSection'
import axios from 'axios'

const Post = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.baseUrl}api/posts/getPosts`,
        )
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }
  return (
    <View style={styles.postContainer}>
      {PostData.map(item => (
        <View key={item.id}>
          <PostHeader data={item} />
          <Image source={item?.mediaUrl} style={styles.postImg} />
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
