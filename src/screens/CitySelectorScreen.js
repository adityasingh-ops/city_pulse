import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const CITIES = [
  { id: '1', name: 'New York', emoji: '🗽', country: 'USA' },
  { id: '2', name: 'London', emoji: '🇬🇧', country: 'UK' },
  { id: '3', name: 'Tokyo', emoji: '🗼', country: 'Japan' },
  { id: '4', name: 'Paris', emoji: '🗼', country: 'France' },
  { id: '5', name: 'Dubai', emoji: '🏙️', country: 'UAE' },
  { id: '6', name: 'Singapore', emoji: '🦁', country: 'Singapore' },
  { id: '7', name: 'Mumbai', emoji: '🇮🇳', country: 'India' },
  { id: '8', name: 'Sydney', emoji: '🦘', country: 'Australia' },
  { id: '9', name: 'Berlin', emoji: '🇩🇪', country: 'Germany' },
  { id: '10', name: 'Toronto', emoji: '🍁', country: 'Canada' },
  { id: '11', name: 'Barcelona', emoji: '🇪🇸', country: 'Spain' },
  { id: '12', name: 'Seoul', emoji: '🇰🇷', country: 'South Korea' },
];

export default function CitySelectorScreen({ navigation }) {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = async (city) => {
    setSelectedCity(city.name);
    try {
      await AsyncStorage.setItem('selectedCity', city.name);
      // Navigate to news feed after a short delay for visual feedback
      setTimeout(() => {
        navigation.replace('NewsFeed', { city: city.name });
      }, 300);
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  const renderCity = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.cityCard,
        selectedCity === item.name && styles.selectedCard,
      ]}
      onPress={() => handleCitySelect(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={styles.cityInfo}>
        <Text style={styles.cityName}>{item.name}</Text>
        <Text style={styles.countryName}>{item.country}</Text>
      </View>
      {selectedCity === item.name && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>City Pulse</Text>
        <Text style={styles.subtitle}>Select your city to get started</Text>
      </View>
      <FlatList
        data={CITIES}
        renderItem={renderCity}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    padding: 24,
    paddingTop: 40,
    backgroundColor: '#1e40af',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  cityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    width: (width - 48) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#dbeafe',
    borderWidth: 2,
    borderColor: '#1e40af',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  cityInfo: {
    alignItems: 'center',
  },
  cityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  countryName: {
    fontSize: 12,
    color: '#6b7280',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 20,
    color: '#1e40af',
  },
});
