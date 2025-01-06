import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal ,

} from 'react-native';
// import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchFilterModal = ({ isVisible, onClose }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([90, 200]);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const categories = [
    'Design',
    'Painting',
    'Coding',
    'Music',
    'Visual identity',
    'Mathmatics',
  ];

  const durations = [
    '3-8 Hours',
    '8-14 Hours',
    '14-20 Hours',
    '20-24 Hours',
    '24-30 Hours',
  ];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const applyFilter = () => {
    console.log({
      selectedCategories,
      priceRange,
      selectedDuration,
    });
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Filter</Text>
          <View style={{ width: 24 }} /> {/* Placeholder for close alignment */}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Categories Section */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  selectedCategories.includes(category) && styles.selectedCategory,
                ]}
                onPress={() => toggleCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategories.includes(category) && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Section */}
          <Text style={styles.sectionTitle}>Price</Text>
          <View style={styles.sliderContainer}>
            {/* <Slider
              style={styles.slider}
              minimumValue={50}
              maximumValue={300}
              step={10}
              value={priceRange[0]}
              onValueChange={(value) =>
                setPriceRange([value, priceRange[1]])
              }
              minimumTrackTintColor="#4F63AC"
              thumbTintColor="#4F63AC"
            />
            <Slider
              style={styles.slider}
              minimumValue={50}
              maximumValue={300}
              step={10}
              value={priceRange[1]}
              onValueChange={(value) =>
                setPriceRange([priceRange[0], value])
              }
              minimumTrackTintColor="#4F63AC"
              thumbTintColor="#4F63AC"
            /> */}
            <View style={styles.priceLabels}>
              <Text style={styles.priceLabel}>${priceRange[0]}</Text>
              <Text style={styles.priceLabel}>${priceRange[1]}</Text>
            </View>
          </View>

          {/* Duration Section */}
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationContainer}>
            {durations.map((duration, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.durationButton,
                  selectedDuration === duration && styles.selectedDuration,
                ]}
                onPress={() => setSelectedDuration(duration)}
              >
                <Text
                  style={[
                    styles.durationText,
                    selectedDuration === duration && styles.selectedDurationText,
                  ]}
                >
                  {duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.clearButton} onPress={() => {}}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: '#4F63AC',
  },
  categoryText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  durationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  durationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedDuration: {
    backgroundColor: '#4F63AC',
  },
  durationText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  selectedDurationText: {
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    borderWidth: 1,
    borderColor: '#4F63AC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#4F63AC',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#4F63AC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SearchFilterModal;