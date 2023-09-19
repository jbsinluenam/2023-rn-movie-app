import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Cast({ cast, navigation }) {
  let personName = 'Keanu Reeves';
  let charactersName = 'John Wick';
  return (
    <View className='my-6'>
      <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className='items-center mr-4'
                onPress={() => navigation.navigate('PERSON', person)}>
                <View className=' overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
                  <Image
                    source={require('../assets/images/castImage1.png')}
                    // style={{ width: 80, height: 80 }}
                    className='rounded-xl h-24 w-20'
                  />
                </View>

                <Text className='text-white text-xs mt-1'>
                  {charactersName.length > 10
                    ? charactersName.substring(0, 14 - 3) + '...'
                    : charactersName}
                </Text>
                <Text className='text-neutral-400 text-xs mt-1'>
                  {personName.length > 10
                    ? personName.substring(0, 14 - 3) + '...'
                    : personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
