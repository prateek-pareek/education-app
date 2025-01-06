import HomeScreen from '../Screen/Home/home'
import AccountScreen from "../Screen/accounts/accounts"
import CourseScreen from "../Screen/myCourse/myCourse"
import NotificationsScreen from "../Screen/Notification/notification"

export const TabData = [
  {
    id: 1,
    route: HomeScreen,
    name: 'Home',
    activeIconName: 'home',
    activeiconType: 'Entypo',
    inactiveIconName: 'home-outline',
    inactiveIconType: 'MaterialCommunityIcons',
    size: 25,
    unFocusSize: 28,
  },
  // {
  //   id: 2,
  //   route: HomeScreen,
  //   name: 'Friends',
  //   activeIconName: 'people-sharp',
  //   activeiconType: 'Ionicons',
  //   inactiveIconName: 'people-outline',
  //   inactiveIconType: 'Ionicons',
  //   size: 25,
  //   unFocusSize: 25,
  // },
  {
    id: 3,
    route: HomeScreen,
    name: 'Watch',
    activeIconName: 'youtube-tv',
    activeiconType: 'MaterialCommunityIcons',
    inactiveIconName: 'television-play',
    inactiveIconType: 'MaterialCommunityIcons',
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 4,
    route: CourseScreen,
    name: 'MarketPlace',
    activeIconName: 'shop',
    activeiconType: 'Entypo',
    inactiveIconName: 'storefront-outline',
    inactiveIconType: 'MaterialCommunityIcons',
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 5,
    route: NotificationsScreen,
    name: 'Notification',
    activeIconName: 'notifications',
    activeiconType: 'Ionicons',
    inactiveIconName: 'notifications-outline',
    inactiveIconType: 'Ionicons',
    size: 25,
    unFocusSize: 25,
  },
  {
    id: 6,
    route: AccountScreen,
    name: 'Profile',
    activeIconName: 'person',
    activeiconType: 'Ionicons',
    inactiveIconName: 'person-outline',
    inactiveIconType: 'Ionicons',
    size: 24,
    unFocusSize: 24,
  },
]