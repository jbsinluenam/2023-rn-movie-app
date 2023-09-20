import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { DropShadow } from 'react-native-drop-shadow';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const vertiCalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavorite, toggleIsFavorite] = React.useState(false);
  const [personMovies, setPersonMovies] = React.useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = React.useState(false);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className='flex-1 bg-neutral-900'>
      {/* back button */}
      <SafeAreaView
        className={
          'z-20 w-full flex-row justify-between items-center px-4 ' +
          vertiCalMargin
        }>
        <TouchableOpacity
          className='rounded-xl p-1'
          onPress={() => navigation.goBack()}
          style={styles.background}>
          <ChevronLeftIcon size='28' strokeWidth={2} color='white' />
        </TouchableOpacity>

        <TouchableOpacity>
          <HeartIconSolid
            onPress={() => toggleIsFavorite(!isFavorite)}
            size='35'
            color={isFavorite ? 'red' : 'white'}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className='flex-row justify-center bg-neutral-800 w-72'
            style={{
              elevation: 20,
              alignSelf: 'center',
              shadowColor: 'grey',
              borderRadius: 200,
              shadowOpacity: 1,
              shadowOffset: { width: 0, height: 5 },
              shadowRadius: 200,
            }}>
            <View className='items-center rounded-full overflow-hidden border-2 border-neutral-500 h-72 w-72'>
              <Image
                source={require('../assets/images/castImage2.png')}
                style={{ width: width * 0.74, height: height * 0.43 }}
              />
            </View>
          </View>
          <View className='mt-6'>
            <Text className='text-white text-3xl font-bold text-center'>
              Keanu Reeves
            </Text>
            <Text className='text-neutral-500 text-base text-center'>
              London, United Kingdom
            </Text>
          </View>

          <View className='mt-6 mx-3 p-4 flex-row justify-between items-center bg-neutral-600 rounded-full'>
            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
              <Text className='text-white  font-semibold'>Gender</Text>
              <Text className='text-neutral-300 text-sm'>Male</Text>
            </View>
            <View className=' border-r-2 border-r-neutral-400 px-2 items-center'>
              <Text className='text-white  font-semibold'>Birthday</Text>
              <Text className='text-neutral-300 text-sm'>1982-09-05</Text>
            </View>
            <View className=' border-r-2 border-r-neutral-400 px-2 items-center'>
              <Text className='text-white  font-semibold'>Known For</Text>
              <Text className='text-neutral-300 text-sm'>Acting</Text>
            </View>
            <View className='px-2 items-center'>
              <Text className='text-white  font-semibold'>Popularity</Text>
              <Text className='text-neutral-300 text-sm'>80.91</Text>
            </View>
          </View>

          <View className='my-6 mx-4 space-y-2'>
            <Text className='text-white text-lg'>Biography</Text>
            <Text className='text-neutral-400  tracking-wide'>
              Keanu Reeves is a Canadian Actor. Reeves is know for his roles in
              Bill & Ted's Excellent Adventure, Speed, The Matrix, and John
              Wick. He has won several awards including a star on the Hollywood
              Walk of Fame.
            </Text>
          </View>

          {/* movies */}
          <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}
