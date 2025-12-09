import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewsFeedScreen({ navigation, route }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const city = route.params?.city || 'New York';

  useEffect(() => {
    fetchNews();
    loadBookmarks();
  }, [city]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Bookmarks')}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>📚</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EmergencyAlerts')}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>🚨</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CitySelector')}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>🌍</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const fetchNews = async () => {
    try {
      // Using GNews API (you'll need to sign up for a free API key at gnews.io)
      // For demo purposes, using sample data
      const sampleNews = [
        {
          title: `${city} Announces Major Infrastructure Upgrades`,
          description: `The city council has approved a massive infrastructure project aimed at improving public transportation and road networks across ${city}.`,
          url: 'https://example.com/article1',
          image: 'https://picsum.photos/400/250?random=1',
          publishedAt: new Date().toISOString(),
        },
        {
          title: `Tech Giants Expand Operations in ${city}`,
          description: `Several major technology companies have announced plans to open new offices in ${city}, creating thousands of jobs.`,
          url: 'https://example.com/article2',
          image: 'https://picsum.photos/400/250?random=2',
          publishedAt: new Date().toISOString(),
        },
        {
          title: `${city}'s Tourism Industry Shows Record Growth`,
          description: `The tourism sector in ${city} has experienced unprecedented growth this quarter, with visitor numbers reaching all-time highs.`,
          url: 'https://example.com/article3',
          image: 'https://picsum.photos/400/250?random=3',
          publishedAt: new Date().toISOString(),
        },
        {
          title: `New Green Initiatives Launched in ${city}`,
          description: `The city has unveiled ambitious plans to become carbon neutral by 2030, including new renewable energy projects.`,
          url: 'https://example.com/article4',
          image: 'https://picsum.photos/400/250?random=4',
          publishedAt: new Date().toISOString(),
        },
        {
          title: `${city} Hosts International Cultural Festival`,
          description: `A week-long celebration of arts and culture brings together performers and artists from around the world.`,
          url: 'https://example.com/article5',
          image: 'https://picsum.photos/400/250?random=5',
          publishedAt: new Date().toISOString(),
        },
      ];

      setNews(sampleNews);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
      setRefreshing(false);
      Alert.alert('Error', 'Failed to fetch news. Please try again.');
    }
  };

  const loadBookmarks = async () => {
    try {
      const saved = await AsyncStorage.getItem('bookmarks');
      if (saved) {
        setBookmarks(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const toggleBookmark = async (article) => {
    try {
      const isBookmarked = bookmarks.some((b) => b.url === article.url);
      let updatedBookmarks;

      if (isBookmarked) {
        updatedBookmarks = bookmarks.filter((b) => b.url !== article.url);
        Alert.alert('Removed', 'Article removed from bookmarks');
      } else {
        updatedBookmarks = [...bookmarks, article];
        Alert.alert('Saved', 'Article saved to bookmarks');
      }

      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const isBookmarked = (article) => {
    return bookmarks.some((b) => b.url === article.url);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() => navigation.navigate('NewsWebView', { article: item })}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.newsDescription} numberOfLines={3}>
          {item.description}
        </Text>
        <View style={styles.newsFooter}>
          <Text style={styles.newsDate}>{formatDate(item.publishedAt)}</Text>
          <TouchableOpacity
            onPress={() => toggleBookmark(item)}
            style={styles.bookmarkButton}
          >
            <Text style={styles.bookmarkIcon}>
              {isBookmarked(item) ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e40af" />
        <Text style={styles.loadingText}>Loading news for {city}...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cityBanner}>
        <Text style={styles.cityText}>📍 {city}</Text>
      </View>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: 8,
  },
  headerButton: {
    marginLeft: 12,
  },
  headerButtonText: {
    fontSize: 24,
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
  listContainer: {
    padding: 16,
  },
  newsCard: {
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
  newsImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e5e7eb',
  },
  newsContent: {
    padding: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  bookmarkButton: {
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 24,
  },
});
