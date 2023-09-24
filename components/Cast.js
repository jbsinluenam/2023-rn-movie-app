import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { fallbackPersonImage, image185 } from '../api/Moviedb';

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
                    source={{
                      uri: image185(person.profile_path) || fallbackPersonImage,
                    }}
                    className='rounded-xl h-24 w-20'
                  />
                </View>

                <Text className='text-white text-xs mt-1'>
                  {person.character.length > 10
                    ? person.character.substring(0, 14 - 3) + '...'
                    : person.character}
                </Text>
                <Text className='text-neutral-400 text-xs mt-1'>
                  {person.original_name.length > 10
                    ? person.original_name.substring(0, 14 - 3) + '...'
                    : person.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
