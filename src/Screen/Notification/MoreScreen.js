import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const moreOptions = [
  { id: '1', title: 'About this Course', icon: 'information-circle-outline', type: 'Ionicons' },
  { id: '2', title: 'Share this Course', icon: 'share', type: 'MaterialIcons' },
  { id: '3', title: 'Notes', icon: 'note-text', type: 'MaterialIcons' },
  { id: '4', title: 'Resources', icon: 'folder-open', type: 'MaterialCommunityIcons' },
  { id: '5', title: 'Announcements', icon: 'bullhorn', type: 'FontAwesome' },
  { id: '6', title: 'Add course to favorites', icon: 'star', type: 'AntDesign' },
  { id: '7', title: 'Archive this course', icon: 'archive', type: 'MaterialIcons' },
];

const MoreScreen = () => {
  const renderItem = ({ item }) => {
    let IconComponent = Icon;
    if (item.type === 'Ionicons') IconComponent = Ionicons;
    else if (item.type === 'MaterialIcons') IconComponent = MaterialIcons;
    else if (item.type === 'MaterialCommunityIcons') IconComponent = MaterialCommunityIcons;
    else if (item.type === 'AntDesign') IconComponent = AntDesign;

    return (
      <TouchableOpacity style={styles.optionContainer}>
        <IconComponent name={item.icon} size={24} color="white" style={styles.icon} />
        <Text style={styles.optionText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={moreOptions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: 'white',
  },
});

export default MoreScreen;
