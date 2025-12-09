import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import CitySelectorScreen from './src/screens/CitySelectorScreen';
import NewsFeedScreen from './src/screens/NewsFeedScreen';
import NewsWebViewScreen from './src/screens/NewsWebViewScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';
import EmergencyAlertsScreen from './src/screens/EmergencyAlertsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    loadSelectedCity();
  }, []);

  const loadSelectedCity = async () => {
    try {
      const city = await AsyncStorage.getItem('selectedCity');
      if (city) {
        setSelectedCity(city);
      }
    } catch (error) {
      console.error('Error loading city:', error);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={selectedCity ? "NewsFeed" : "CitySelector"}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1e40af',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="CitySelector" 
            component={CitySelectorScreen}
            options={{ title: 'Select Your City', headerShown: false }}
          />
          <Stack.Screen 
            name="NewsFeed" 
            component={NewsFeedScreen}
            options={{ title: 'City Pulse' }}
          />
          <Stack.Screen 
            name="NewsWebView" 
            component={NewsWebViewScreen}
            options={{ title: 'Read Article' }}
          />
          <Stack.Screen 
            name="Bookmarks" 
            component={BookmarksScreen}
            options={{ title: 'Saved Articles' }}
          />
          <Stack.Screen 
            name="EmergencyAlerts" 
            component={EmergencyAlertsScreen}
            options={{ title: 'Emergency Alerts' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
