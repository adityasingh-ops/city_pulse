# 🌆 City Pulse - Smart City News & Alerts App

A beautiful and intuitive React Native app that keeps you connected with your city through real-time news updates, emergency alerts, and important civic information.

## ✨ Features

### 📍 City Selection
- Choose from 12 major cities worldwide
- Beautiful card-based interface with emoji icons
- Persistent city selection using AsyncStorage

### 📰 News Feed
- City-specific news articles
- Beautiful card layouts with images
- Pull-to-refresh functionality
- Bookmark articles for later reading
- Time-based article timestamps

### 🔖 Bookmarks
- Save articles for offline reading
- Easy management and removal of saved articles
- Persistent storage using AsyncStorage

### 🚨 Emergency Alerts
- Color-coded alert system (Critical, Warning, Info)
- Quick access to emergency contacts
- Real-time city alerts and notifications
- Weather, traffic, and public health updates

### 🌐 Full Article View
- Integrated WebView for reading complete articles
- Smooth loading experience
- Native navigation controls

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd city-pulse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on your device:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## 📱 Screens

### 1. City Selector Screen
Beautiful grid layout with city cards. Select your city to personalize your news feed.

### 2. News Feed Screen
- Displays city-specific news articles
- Header buttons for quick navigation:
  - 📚 Bookmarks
  - 🚨 Emergency Alerts
  - 🌍 Change City
- Pull down to refresh news
- Tap articles to read full content
- Bookmark articles with heart icon

### 3. News WebView Screen
View full articles in an integrated web browser with native navigation.

### 4. Bookmarks Screen
Access all your saved articles in one place. Remove bookmarks with a single tap.

### 5. Emergency Alerts Screen
- Emergency contact cards (Police, Fire, Ambulance, City Helpline)
- Color-coded active alerts
- Critical, Warning, and Info badges

## �� Design Features

- **Modern UI**: Clean, card-based design with smooth shadows
- **Color Scheme**: Professional blue theme (#1e40af)
- **Typography**: Clear hierarchy with bold headings
- **Responsive**: Works on all screen sizes
- **Native Feel**: Platform-specific navigation patterns

## 🛠️ Tech Stack

- **React Native**: Core framework
- **Expo**: Development platform
- **React Navigation**: Navigation library
- **AsyncStorage**: Local data persistence
- **Axios**: HTTP client (ready for API integration)
- **React Native WebView**: In-app browser

## 📦 Dependencies

```json
{
  "axios": "^1.x",
  "react-native-webview": "latest",
  "@react-navigation/native": "^6.x",
  "@react-navigation/native-stack": "^6.x",
  "@react-native-async-storage/async-storage": "latest",
  "react-native-screens": "latest",
  "react-native-safe-area-context": "latest"
}
```

## 🔄 Future Enhancements

- [ ] Real API integration (NewsAPI.org or GNews API)
- [ ] Push notifications for emergency alerts
- [ ] Dark mode support
- [ ] Multiple language support
- [ ] Sharing articles on social media
- [ ] Search functionality
- [ ] Filter news by category
- [ ] User authentication
- [ ] Personalized news preferences

## 📝 API Integration Guide

To integrate a real news API:

1. Sign up for a free API key at [NewsAPI.org](https://newsapi.org/) or [GNews.io](https://gnews.io/)

2. Update `src/screens/NewsFeedScreen.js`:
   ```javascript
   const API_KEY = 'your_api_key_here';
   const response = await axios.get(
     `https://newsapi.org/v2/everything?q=${city}&apiKey=${API_KEY}`
   );
   ```

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## �� License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using React Native and Expo

## 🐛 Known Issues

- Sample news data is used for demonstration
- WebView requires internet connection
- Some emojis may not render on all devices

## 💡 Tips

- Pull down on the news feed to refresh articles
- Tap the 🌍 icon to change your city anytime
- Save articles you want to read later
- Check emergency alerts regularly for important updates

---

**Enjoy staying connected with your city! 🌆**
