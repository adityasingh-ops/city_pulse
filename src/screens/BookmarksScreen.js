import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookmarksScreen({ navigation, route }) {
  const [bookmarks, setBookmarks] = useState([]);
  const city = route.params?.city || 'New York';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadBookmarks();
    });
    return unsubscribe;
  }, [navigation, city]);

  useEffect(() => {
    loadBookmarks();
  }, [city]);

  const loadBookmarks = async () => {
    try {
      // Load bookmarks specific to the current city
      const saved = await AsyncStorage.getItem(`bookmarks_${city}`);
      if (saved) {
        setBookmarks(JSON.parse(saved));
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const removeBookmark = async (article) => {
    try {
      const updatedBookmarks = bookmarks.filter((b) => b.url !== article.url);
      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem(`bookmarks_${city}`, JSON.stringify(updatedBookmarks));
      Alert.alert('Removed', 'Article removed from bookmarks');
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const renderBookmark = ({ item }) => (
    <TouchableOpacity
      style={styles.bookmarkCard}
      onPress={() => navigation.navigate('NewsWebView', { article: item })}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.bookmarkImage} />
      <View style={styles.bookmarkContent}>
        <Text style={styles.bookmarkTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.bookmarkDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <TouchableOpacity
          onPress={() => removeBookmark(item)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>🗑️ Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (bookmarks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📚</Text>
        <Text style={styles.emptyTitle}>No Saved Articles</Text>
        <Text style={styles.emptyText}>
          Articles you bookmark in {city} will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cityBanner}>
        <Text style={styles.cityText}>📍 {city} Bookmarks</Text>
      </View>
      <FlatList
        data={bookmarks}
        renderItem={renderBookmark}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  cityBanner: {
    backgroundColor: '#dbeafe',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#93c5fd',
  },
  cityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  bookmarkCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookmarkImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#e5e7eb',
  },
  bookmarkContent: {
    padding: 16,
  },
  bookmarkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  bookmarkDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  removeButton: {
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 14,
  },
});
