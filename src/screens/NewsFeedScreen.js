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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCityNews } from '../utils/newsApi';

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
            onPress={() => navigation.navigate('Bookmarks', { city })}
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
  }, [navigation, city]);

  const fetchNews = async () => {
    try {
      const articles = await fetchCityNews(city);
      setNews(articles);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
      setRefreshing(false);
      Alert.alert('Error', 'Failed to fetch news. Showing sample data.');
    }
  };

  const loadBookmarks = async () => {
    try {
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

  const toggleBookmark = async (article) => {
    try {
      const isBookmarked = bookmarks.some((b) => b.url === article.url);
      let updatedBookmarks;

      if (isBookmarked) {
        updatedBookmarks = bookmarks.filter((b) => b.url !== article.url);
        Alert.alert('Removed', 'Article removed from bookmarks');
      } else {
        updatedBookmarks = [...bookmarks, { ...article, city }];
        Alert.alert('Saved', 'Article saved to bookmarks');
      }

      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem(`bookmarks_${city}`, JSON.stringify(updatedBookmarks));
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
    const days = Math.floor(diffHours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() => navigation.navigate('NewsWebView', { article: item })}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.newsImage}
        resizeMode="cover"
      />
      <View style={styles.newsContent}>
        <View style={styles.newsHeader}>
          <Text style={styles.newsSource}>{item.source || 'News Source'}</Text>
          <Text style={styles.newsDate}>{formatDate(item.publishedAt)}</Text>
        </View>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.newsDescription} numberOfLines={3}>
          {item.description}
        </Text>
        <View style={styles.newsFooter}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewsWebView', { article: item })}
            style={styles.readMoreButton}
          >
            <Text style={styles.readMoreText}>Read More →</Text>
          </TouchableOpacity>
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
        <Text style={styles.articleCount}>{news.length} articles</Text>
      </View>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#1e40af']}
            tintColor="#1e40af"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📰</Text>
            <Text style={styles.emptyText}>No news available</Text>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#93c5fd',
  },
  cityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
  },
  articleCount: {
    fontSize: 12,
    color: '#6b7280',
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
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsSource: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
    textTransform: 'uppercase',
  },
  newsDate: {
    fontSize: 11,
    color: '#9ca3af',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 24,
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
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  readMoreButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  readMoreText: {
    fontSize: 14,
    color: '#1e40af',
    fontWeight: '600',
  },
  bookmarkButton: {
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 24,
  },
  emptyContainer: {
    paddingVertical: 64,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
  },
});
