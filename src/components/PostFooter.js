import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import Like from '../../public/images/like.jpeg'
import {Colors} from '../utils/Colors'
import VectorIcon from '../utils/VectorIcon'
import {useNavigation} from '@react-navigation/native'
import axios from 'axios'

const PostFooter = ({data}) => {
  const navigation = useNavigation()
  const [likesCount, setLikesCount] = useState(data?.likes?.length || 0)
  const [liked, setLiked] = useState(false)

  const handleLike = async () => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://education-backend-jade.vercel.app/api/posts/like/${data.id}`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ3cng5OHhlNkhxYlJVV1BzaGlTRUVWdmF4QzMyIiwiZW1haWwiOiJnb3ZpbmRzaGFybWEud2V2b2lzQGdtYWlsLmNvbSIsImlhdCI6MTczNjU5NjI4MiwiZXhwIjoxNzM2NjgyNjgyfQ.0Psvxvf8HXia8bjYHEYDXp2-Q3jI3kghFS2RAz2JfhA`,
      },
    }

    try {
      const response = await axios.request(config)
      if (response.data.message === 'Post liked') {
        setLikesCount(likesCount + 1)
        setLiked(true)
      } else if (response.data.message === 'Post unliked') {
        setLikesCount(likesCount - 1)
        setLiked(false)
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error)
    }
  }
  return (
    <View style={styles.postFotterContainer}>
      <View style={styles.footerReactionSec}>
        <View style={styles.row}>
          <Image source={Like} style={styles.reactionIcon} />
          <Text style={styles.reactionCount}>{data?.likes?.length}</Text>
        </View>
        <Text style={styles.reactionCount}>
          {data?.comments?.length} comments
        </Text>
      </View>
      <View style={styles.userActionSec}>
        <TouchableOpacity style={styles.row} onPress={handleLike}>
          <VectorIcon
            name='like2'
            type='AntDesign'
            size={25}
            color={Colors.grey}
          />
          <Text style={styles.reactionCount}>{liked ? 'UnLike' : 'Like'}</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <VectorIcon
            name='chatbox-outline'
            type='Ionicons'
            size={25}
            color={Colors.grey}
          />
          <Text
            style={styles.reactionCount}
            onPress={() => {
              navigation.navigate('CommentScreen',{
                data: data
              })
            }}>
            Comment
          </Text>
        </View>

        <View style={styles.row}>
          <VectorIcon
            name='arrow-redo-outline'
            type='Ionicons'
            size={25}
            color={Colors.grey}
          />
          <Text style={styles.reactionCount}>Share</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  reactionIcon: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postFotterContainer: {
    padding: 16,
  },
  reactionCount: {
    color: Colors.grey,
    fontSize: 14,
    paddingLeft: 5,
  },
  footerReactionSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgrey,
    paddingBottom: 15,
  },
  userActionSec: {
    marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default PostFooter
