// import {
//   useCall,
//   VideoRenderer,
//   ParticipantView,
//   useCallStateHooks,
// } from '@stream-io/video-react-native-sdk'
// import {View, Button, Text, StyleSheet} from 'react-native'
// import {useEffect} from 'react'
// import IncallManager from 'react-native-incall-manager'

// const LivestreamView = () => {
//   const {useParticipantCount,useParticipants, useLocalParticipant, useIsCallLive} =useCallStateHooks()
//   const participants = useParticipants();

//   useEffect(() => {
//     IncallManager.start({media: 'video'})
//     return () => IncallManager.stop()
//   }, [])

//   return (
//     <ParticipantView participant={participants[0]} />
//   )
// }

// const styles = StyleSheet.create({
//   flexed: {
//     flex: 1,
//   },
//   text: {
//     alignSelf: 'center',
//     color: 'white',
//     backgroundColor: 'blue',
//     padding: 6,
//     margin: 4,
//   },
//   bottomBar: {
//     alignSelf: 'center',
//     margin: 4,
//   },
// })
// export default LivestreamView
