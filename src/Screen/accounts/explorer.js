import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const Explorer = () => {
  const navigation = useNavigation(); // Initialize the navigation object

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./../../../public/images/explore.png')} style={styles.backgroundImage}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.circleButton}>
            <Text style={styles.buttonText}>T</Text>
            <Text style={styles.buttonSubText}>test</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Keep it up test! 🎉</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statText}>2</Text>
            <Text style={styles.statLabel}>Stories read!</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statText}>26 sec</Text>
            <Text style={styles.statLabel}>Reading Time</Text>
          </View>
        </View>
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Your most read categories</Text>
          <View style={styles.categoriesList}>
            <View style={styles.categoryItem}>
              <Image source={require('./../../../public/images/learn&grow.png')} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>learn & grow</Text>
              <View style={styles.categoryRank}>
                <Text style={styles.rankNumber}>1</Text>
              </View>
            </View>
            <View style={styles.categoryItem}>
              <Image source={require('./../../../public/images/friends&family.png')} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>friends & Family</Text>
              <View style={styles.categoryRank}>
                <Text style={styles.rankNumber}>2</Text>
              </View>
            </View>
            <View style={styles.categoryItem}>
              <Image source={require('./../../../public/images/rhymes&songs.png')} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>rhymes & songs</Text>
              <View style={styles.categoryRank}>
                <Text style={styles.rankNumber}>3</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonSubText: {
    fontSize: 14,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  divider: {
    height: 40,
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 20,
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 14,
    flex: 1,
  },
  categoryRank: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 15,
    marginLeft: 10,
  },
  rankNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Explorer;
