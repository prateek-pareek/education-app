import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const {width} = Dimensions.get('window')

const FilterModal = ({isVisible, onClose}) => {
  const [filters, setFilters] = useState({
    subcategories: {
      '3D Design': false,
      'Web Development': true,
      '3D Animation': true,
      'Graphic Design': false,
      'SEO & Marketing': false,
      'Arts & Humanities': false,
    },
    levels: {
      'All Levels': false,
      Beginners: true,
      Intermediate: true,
      Expert: false,
    },
    price: {
      Paid: true,
      Free: false,
    },
    features: {
      'All Caption': false,
      Quizzes: false,
      'Coding Exercise': false,
      'Practice Tests': false,
    },
    rating: {
      '4.5 & Up Above': false,
      '4.0 & Up Above': false,
      '3.5 & Up Above': false,
    },
    videoDuration: {
      '0-2 Hours': false,
      '3-6 Hours': false,
      '7-16 Hours': false,
      '17+ Hours': false,
    },
  })

  const toggleCheckbox = (section, key) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [section]: {
        ...prevFilters[section],
        [key]: !prevFilters[section][key],
      },
    }))
  }

  const clearFilters = () => {
    const clearedFilters = {}
    for (const section in filters) {
      clearedFilters[section] = {}
      for (const key in filters[section]) {
        clearedFilters[section][key] = false
      }
    }
    setFilters(clearedFilters)
  }

  const applyFilters = () => {
    console.log('Applied Filters:', filters)
    onClose() // Close the modal after applying filters
  }

  return (
    <Modal
      visible={isVisible}
      animationType='slide'
      transparent
      onDismiss={() => {
        onClose(false)
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Icon name='arrow-left' size={28} color='#000' />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filter</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Options */}
          <ScrollView>
            {/* SubCategories */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>SubCategories:</Text>
              {Object.keys(filters.subcategories).map(key => (
                <TouchableOpacity
                  key={key}
                  style={styles.checkboxContainer}
                  onPress={() => toggleCheckbox('subcategories', key)}>
                  <View
                    style={[
                      styles.checkbox,
                      filters.subcategories[key] && styles.checkboxSelected,
                    ]}>
                    {filters.subcategories[key] && (
                      <Icon name='check' size={16} color='#FFFFFF' />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Levels */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Levels:</Text>
              {Object.keys(filters.levels).map(key => (
                <TouchableOpacity
                  key={key}
                  style={styles.checkboxContainer}
                  onPress={() => toggleCheckbox('levels', key)}>
                  <View
                    style={[
                      styles.checkbox,
                      filters.levels[key] && styles.checkboxSelected,
                    ]}>
                    {filters.levels[key] && (
                      <Icon name='check' size={16} color='#FFFFFF' />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Price */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Price:</Text>
              {Object.keys(filters.price).map(key => (
                <TouchableOpacity
                  key={key}
                  style={styles.checkboxContainer}
                  onPress={() => toggleCheckbox('price', key)}>
                  <View
                    style={[
                      styles.checkbox,
                      filters.price[key] && styles.checkboxSelected,
                    ]}>
                    {filters.price[key] && (
                      <Icon name='check' size={16} color='#FFFFFF' />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Features */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Features:</Text>
              {Object.keys(filters.features).map(key => (
                <TouchableOpacity
                  key={key}
                  style={styles.checkboxContainer}
                  onPress={() => toggleCheckbox('features', key)}>
                  <View
                    style={[
                      styles.checkbox,
                      filters.features[key] && styles.checkboxSelected,
                    ]}>
                    {filters.features[key] && (
                      <Icon name='check' size={16} color='#FFFFFF' />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Rating */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Rating:</Text>
              {Object.keys(filters.rating).map(key => (
                <TouchableOpacity
                  key={key}
                  style={styles.checkboxContainer}
                  onPress={() => toggleCheckbox('rating', key)}>
                  <View
                    style={[
                      styles.checkbox,
                      filters.rating[key] && styles.checkboxSelected,
                    ]}>
                    {filters.rating[key] && (
                      <Icon name='check' size={16} color='#FFFFFF' />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Video Duration */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Video Durations:</Text>
              {Object.keys(filters.videoDuration).map(key => (
                <TouchableOpacity
                  key={key}
                  style={styles.checkboxContainer}
                  onPress={() => toggleCheckbox('videoDuration', key)}>
                  <View
                    style={[
                      styles.checkbox,
                      filters.videoDuration[key] && styles.checkboxSelected,
                    ]}>
                    {filters.videoDuration[key] && (
                      <Icon name='check' size={16} color='#FFFFFF' />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Apply Button */}
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply</Text>
            <Icon name='arrow-right' size={20} color='#FFFFFF' />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#F6F9FC',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  clearText: {
    fontSize: 16,
    color: '#007AFF',
  },
  filterSection: {
    marginTop: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#7D7D7D',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: '#0047FF',
    borderColor: '#0047FF',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  applyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0047FF',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
})

export default FilterModal
