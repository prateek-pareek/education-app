import {StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import {Colors} from '../../utils/Colors'
import CommentSection from '../../components/commentSection'

const CommentScreen = () => {
  return (
    <ScrollView style={styles.homeContainer}>
      <CommentSection />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: Colors.background,
  },
})

export default CommentScreen
