import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DropShadow } from 'react-native-drop-shadow';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
} from '../api/Moviedb';
import { image500, image342, image185 } from '../api/Moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const vertiCalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {
  //params from the route so we can use useRoute hook to get the params
  //which is the person object from the PersonList component of the movie item
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleIsFavorite] = React.useState(false);
  const [person, setPerson] = React.useState({});
  const [personMovies, setPersonMovies] = React.useState([]);
  const [personDetails, setPersonDetails] = React.useState([]); //[
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    // console.log('person details: ', data);
    if (data) {
      setPerson(data);
      setLoading(false);
    }
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    // console.log('person movies: ', data);
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

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
                // source={require('../assets/images/castImage2.png')}
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                style={{ width: width * 0.74, height: height * 0.43 }}
              />
            </View>
          </View>
          <View className='mt-6'>
            <Text className='text-white text-3xl font-bold text-center'>
              {person?.name}
            </Text>
            <Text className='text-neutral-500 text-base text-center'>
              {person?.place_of_birth}
            </Text>
          </View>

          <View className='mt-6 mx-3 p-4 flex-row justify-between items-center bg-neutral-600 rounded-full'>
            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
              <Text className='text-white  font-semibold'>Gender</Text>
              <Text className='text-neutral-300 text-sm'>
                {person?.gender == 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className=' border-r-2 border-r-neutral-400 px-2 items-center'>
              <Text className='text-white  font-semibold'>Birthday</Text>
              <Text className='text-neutral-300 text-sm'>
                {person?.birthday}
              </Text>
            </View>
            <View className=' border-r-2 border-r-neutral-400 px-2 items-center'>
              <Text className='text-white  font-semibold'>Known For</Text>
              <Text className='text-neutral-300 text-sm'>
                {person?.known_for_department}
              </Text>
            </View>
            <View className='px-2 items-center'>
              <Text className='text-white  font-semibold'>Popularity</Text>
              <Text className='text-neutral-300 text-sm'>
                {person?.popularity}
              </Text>
            </View>
          </View>

          <View className='my-6 mx-4 space-y-2'>
            <Text className='text-white text-lg'>Biography</Text>
            <Text className='text-neutral-400  tracking-wide'>
              {/* Keanu Reeves is a Canadian Actor. Reeves is know for his roles in
              Bill & Ted's Excellent Adventure, Speed, The Matrix, and John
              Wick. He has won several awards including a star on the Hollywood
              Walk of Fame. */}
              {person?.biography || 'N/A'}
            </Text>
          </View>

          {/* movies */}
          <MovieList title={'Movies'} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}
