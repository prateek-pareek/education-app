import {StyleSheet, ScrollView, View, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import SubHeader from '../../components/SubHeader'
import Stories from '../../components/Stories'
import {Colors} from '../../utils/Colors'
import Post from '../../components/Post'
import axios from 'axios'

const HomeScreen = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.baseUrl}api/posts/all`)
        setPosts(response.data)
        setLoading(false)
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
    <ScrollView style={styles.homeContainer}>
      <SubHeader />
      <Stories />
      <Post posts={posts} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: Colors.background,
  },
})

export default HomeScreen
