# 🚀 City Pulse - Quick Start Guide

## Get Running in 3 Steps

### 1️⃣ Navigate & Install
```bash
cd city-pulse
npm install
```

### 2️⃣ Start the App
```bash
npx expo start
```

### 3️⃣ Open on Device
- **iOS**: Press `i` or scan QR code with Camera
- **Android**: Press `a` or scan QR with Expo Go
- **Web**: Press `w`

---

## ✅ What You Get

### 5 Complete Screens:
1. **City Selector** - Choose from 12 cities
2. **News Feed** - 8 articles per city
3. **Article Reader** - WebView integration
4. **Bookmarks** - Save articles (city-specific)
5. **Emergency Alerts** - Color-coded alerts

### Key Features:
- ✅ Pull to refresh
- ✅ Bookmark articles
- ✅ City-specific content
- ✅ Emergency contacts
- ✅ Beautiful UI

---

## 📝 Optional: Add Real News API

### Want real news instead of sample data?

1. **Sign up**: https://gnews.io/ (free)
2. **Get API key** from dashboard
3. **Edit** `src/utils/newsApi.js`:
   ```javascript
   const API_KEY = 'your_api_key_here';
   ```
4. **Restart** the app

**Note:** App works perfectly without API key using sample data!

---

## 🎯 Quick Test

1. Launch app → Select a city
2. Scroll through news → Tap heart to bookmark
3. Tap 📚 to see bookmarks
4. Tap 🚨 for emergency alerts
5. Tap 🌍 to change city

---

## 📚 More Info

- **Full docs**: See `README.md`
- **API setup**: See `API_SETUP.md`
- **Complete checklist**: See `FINAL_CHECKLIST.md`

---

**That's it! Your app is ready to use! 🎉**
