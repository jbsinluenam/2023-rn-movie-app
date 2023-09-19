import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen() {
  let movieName = 'Ant-Man and the Wasp: Quantumania';

  //params from the route so we can use useRoute hook to get the params
  const { params: item } = useRoute();

  //declare the navigation object so we can use it to navigate back
  const navigation = useNavigation();

  //isFavorite state to check if the movie is in the favorite list
  const [isFavorite, toggleIsFavorite] = React.useState(false);

  //cast state to store the cast of the movie
  const [cast, setCast] = React.useState([1, 2, 3, 4, 5]);

  //similarMovies state to store the similar movies
  const [similarMovies, setSimilarMovies] = React.useState([1, 2, 3, 4, 5]);

  //useEffect to call the API to get the movie details
  useEffect(() => {
    //call the API to get the movie details
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className='flex-1 bg-neutral-900'>
      {/* back button and movie poster */}
      <View className='w-full'>
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row justify-between items-center px-4 ' +
            topMargin
            //absolute
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
              color={isFavorite ? theme.background : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={require('../assets/images/moviePoster2.png')}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className='absolute bottom-0'></LinearGradient>
        </View>
      </View>

      {/* movies detail */}
      <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
        <Text className='text-white text-center text-3xl font-bold tracking-wider'>
          {movieName}
        </Text>
        {/* status, release date, runtime */}
        <Text className='text-neutral-400 font-semibold text-center text-base'>
          Released • 2020 • 170 min
        </Text>

        {/* genres */}
        <View className='flex-row justify-center mx-4 space-x-2'>
          <Text className='text-neutral-400 font-semibold text-center text-base'>
            Action •
          </Text>
          <Text className='text-neutral-400 font-semibold text-center text-base'>
            Adventure •
          </Text>
          <Text className='text-neutral-400 font-semibold text-center text-base'>
            Comedy
          </Text>
        </View>

        {/* description */}
        <Text className='text-neutral-400  mx-4 tracking-wider'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptas, quos, quae voluptate, voluptatem quia quibusdam doloremque
          doloribus quod quas fugit. Quisquam voluptas, quos, quae voluptate,
          voluptatem quia quibusdam doloremque doloribus quod quas fugit.
        </Text>
      </View>

      {/* cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies */}
      <MovieList
        title='Similar Movies'
        hideSeeAll={true}
        data={similarMovies}
      />
    </ScrollView>
  );
}

// onPress={() => navigation.goBack()}
// style={styles.background}

// className = 'absolute z-20 w-full flex-row justify-between items-center px-4';
