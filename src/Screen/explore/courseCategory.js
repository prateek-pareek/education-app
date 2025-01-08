import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const {width} = Dimensions.get('window') // Screen width for responsive layout

// Dummy category data
const categories = [
  {id: 1, title: '3D Design', icon: 'cube'},
  {id: 2, title: 'Graphic Design', icon: 'palette'},
  {id: 3, title: 'Web Development', icon: 'web'},
  {id: 4, title: 'SEO & Marketing', icon: 'chart-line'},
  {id: 5, title: 'Finance & Accounting', icon: 'currency-usd'},
  {id: 6, title: 'Personal Development', icon: 'account-heart'},
  {id: 7, title: 'Office Productivity', icon: 'briefcase'},
  {id: 8, title: 'HR Management', icon: 'account-multiple'},
]
const CategoryScreen = ({navigation}) => {
  // Render each category item
  const renderCategoryItem = ({item}) => (
    <View style={styles.categoryItem}>
      <Icon
        name={item.icon}
        size={48}
        color='#0047FF'
        style={styles.categoryIcon}
      />
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name='arrow-left' size={28} color='#000' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Category</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput placeholder='Search for..' style={styles.searchInput} />
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={() => {
            navigation.goBack()
          }}>
          <Icon name='magnify' size={24} color='#FFFFFF' />
        </TouchableOpacity>
      </View>

      {/* Categories Grid */}
      <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCategoryItem}
        numColumns={2} // Display categories in 2 columns
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 1,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#7D7D7D',
  },
  searchIconContainer: {
    backgroundColor: '#0047FF',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#7D7D7D',
    fontWeight: '500',
    textAlign: 'center',
  },
})

export default CategoryScreen
