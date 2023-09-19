import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name='HOME'
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='MOVIE'
          component={MovieScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='PERSON'
          component={PersonScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
