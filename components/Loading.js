import { View, Text } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');
export default function Loading() {
  return (
    <View
      style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading</Text>
    </View>
  );
}
