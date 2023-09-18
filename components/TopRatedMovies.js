import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';

var { width, height } = Dimensions.get('window');

export default function TopRatedMovies({ title, data }) {
  return (
    <View className='mb-8'>
      <Text className='text-white text-xl mx-4 mb-5'>Top Rated</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard item={item} />}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}
