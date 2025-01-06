// import {ChannelList} from 'stream-chat-react-native'
// import {chatApiKey, chatUserId} from '../../config/chatConfig'
// import {useAppContext} from '../../../appContext'
// import { useNavigation } from '@react-navigation/native';
// const filters = {
//   members: {
//     $in: [chatUserId],
//   },
// }

// const sort = {
//   last_message_at: -1,
// }

// const ChatListScreen =() => {
//   const {setChannel} = useAppContext()
//   const navigation = useNavigation();
//   return (
//     <ChannelList
//       filters={filters}
//       sort={sort}
//       onSelect={channel => {
//         setChannel(channel)
//         navigation.navigate('ChatScreen', { channel });
//       }}
//     />
//   )
// }
// export default ChatListScreen
