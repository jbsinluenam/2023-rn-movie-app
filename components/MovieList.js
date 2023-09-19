import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');
export default function MovieList({ title, data, hideSeeAll }) {
  let movieName = 'Ant-Man and the Wasp: Quantumania';
  const navigation = useNavigation();
  return (
    <View className='mb-8 space-y-4'>
      <View className='flex-row justify-between items-center mx-4'>
        <Text className='text-white text-xl'>{title}</Text>
        {
          //hide the see all button if the hideSeeAll prop is true
          !hideSeeAll && (
            <TouchableOpacity>
              <Text style={styles.text} className='text-lg'>
                See all
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('MOVIE', item)}>
              <View className='space-y-1 mr-4'>
                <Image
                  source={require('../assets/images/moviePoster2.png')}
                  style={{ width: width * 0.33, height: height * 0.25 }}
                  className='rounded-2xl'
                />
                {/* //limit the number of characters to 14 and add '...' at the end */}
                <Text className=' text-neutral-300 ml-1'>
                  {movieName.length > 14
                    ? movieName.substring(0, 14 - 3) + '...'
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
