# 🔌 API Setup Guide

## Option 1: GNews API (Recommended)

### Steps:
1. **Sign up for free:** https://gnews.io/
2. **Get your API key** from the dashboard
3. **Update the API key:**
   - Open `src/utils/newsApi.js`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key
   ```javascript
   const API_KEY = 'abc123xyz456'; // Your actual key
   ```

### Free Tier Limits:
- ✅ 100 requests/day
- ✅ 10 articles per request
- ✅ No credit card required

---

## Option 2: NewsAPI.org (Alternative)

### Steps:
1. **Sign up:** https://newsapi.org/register
2. **Get your API key**
3. **Update `src/utils/newsApi.js`:**

```javascript
// Comment out GNews config
// const API_KEY = 'YOUR_API_KEY_HERE';
// const BASE_URL = 'https://gnews.io/api/v4';

// Use NewsAPI instead
const API_KEY = 'YOUR_NEWSAPI_KEY';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchCityNews = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: city,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
        apiKey: API_KEY,
      },
    });

    return response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage || 'https://via.placeholder.com/400x250',
      publishedAt: article.publishedAt,
      source: article.source.name,
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return getSampleNews(city);
  }
};
```

### Free Tier Limits:
- ✅ 100 requests/day
- ✅ Development only
- ⚠️ Requires attribution

---

## Without API Key (Demo Mode)

If you don't add an API key, the app will automatically use sample data. This is perfect for:
- ✅ Testing the app
- ✅ Demonstrating functionality
- ✅ Development without API limits

The sample data includes:
- 8 articles per city
- Different timestamps
- Unique URLs per city
- Realistic content

---

## Testing the API Integration

### 1. With API Key:
```bash
# Start the app
npx expo start

# You should see:
# - Real news articles from the API
# - Actual publication dates
# - Real images from news sources
```

### 2. Without API Key (Sample Data):
```bash
# The app works immediately with sample data
# Each city gets unique articles
# Pull to refresh generates new timestamps
```

---

## Troubleshooting

### Error: "Failed to fetch news"
**Cause:** Invalid API key or network issue  
**Solution:** 
1. Check your API key is correct
2. Verify internet connection
3. Check API limits (100/day for free tier)

### Error: "API key is missing"
**Cause:** API key not configured  
**Solution:** App automatically falls back to sample data

### Images not loading
**Cause:** Some news sources don't provide images  
**Solution:** App uses placeholder images automatically

---

## API Response Format

Both APIs are normalized to this format:

```javascript
{
  title: string,        // Article headline
  description: string,  // Article summary
  url: string,          // Link to full article
  image: string,        // Article image URL
  publishedAt: string,  // ISO date string
  source: string        // News source name
}
```

---

## Best Practices

### 1. Rate Limiting
- Free tier: 100 requests/day
- Each city search = 1 request
- Pull-to-refresh = 1 request
- Cache results when possible

### 2. Error Handling
- ✅ Automatic fallback to sample data
- ✅ User-friendly error messages
- ✅ Retry mechanism on pull-to-refresh

### 3. Performance
- ✅ Loading states shown
- ✅ Images load progressively
- ✅ Smooth scrolling with FlatList

---

## Current Status

🟢 **Working Features (Without API Key):**
- City selection ✅
- Sample news per city ✅
- Bookmarking ✅
- WebView reading ✅
- Pull-to-refresh ✅
- Emergency alerts ✅

🔵 **Enhanced Features (With API Key):**
- Real news articles ✅
- Live updates ✅
- Actual sources ✅
- Real-time data ✅

---

## Next Steps

1. ✅ App works immediately with sample data
2. 🔄 Sign up for API key (optional)
3. ✅ Update `src/utils/newsApi.js`
4. ✅ Restart the app
5. ✅ Enjoy real news! 

**Note:** The app is fully functional without an API key. Sample data is provided for demonstration and testing purposes.
