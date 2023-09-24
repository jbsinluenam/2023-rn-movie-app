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
import Loading from '../components/Loading';
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
  fallbackMoviePoster,
} from '../api/Moviedb';
import { image500, image342, image185 } from '../api/Moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen() {
  // let movieName = 'Ant-Man and the Wasp: Quantumania';

  //set the loading state to true
  const [loading, setLoading] = React.useState(true);

  //params from the route so we can use useRoute hook to get the params
  const { params: item } = useRoute();

  //declare the navigation object so we can use it to navigate back
  const navigation = useNavigation();

  //isFavorite state to check if the movie is in the favorite list
  const [isFavorite, toggleIsFavorite] = React.useState(false);

  //cast state to store the cast of the movie
  const [cast, setCast] = React.useState([]);

  //similarMovies state to store the similar movies
  const [similarMovies, setSimilarMovies] = React.useState([]);

  //movie state to store the movie details
  const [movie, setMovie] = React.useState({});

  //useEffect to call the API to get the movie details
  useEffect(() => {
    console.log('item.id: ', item.id);

    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async () => {
    const data = await fetchMovieDetails(item.id);

    if (data) {
      setMovie(data);
    } else {
      console.log('error fetching movie details');
    }
    setLoading(false);

    // console.log('get movie details', data);
  };

  const getMovieCredits = async () => {
    const data = await fetchMovieCredits(item.id);
    // console.log('get movie credits', data);
    if (data && data.cast) {
      setCast(data.cast);
    }
  };

  const getSimilarMovies = async () => {
    const data = await fetchSimilarMovies(item.id);
    // console.log('get similar movies', data);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

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
            // source={require('../assets/images/moviePoster2.png')}
            source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
            style={{ width, height: height * 0.65 }}
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
          {movie?.title}
        </Text>
        {/* status, release date, runtime */}
        {movie?.id ? (
          <Text className='text-neutral-400 font-semibold text-center text-base'>
            {movie?.status} • {movie?.release_date?.split('-')[0]} •{' '}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        <View className='flex-row justify-center mx-4 space-x-2'>
          {movie?.genres?.map((genre, index) => {
            let showDot = index == movie?.genres?.length - 1 ? false : true;
            return (
              <Text
                key={index}
                className='text-neutral-400 font-semibold text-center text-base'>
                {genre.name} {showDot ? '•' : null}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <Text className='text-neutral-400  mx-4 tracking-wider'>
          {movie?.overview}
        </Text>
      </View>

      {/* cast */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* similar movies */}
      {similarMovies.length > 0 && (
        <MovieList
          title='Similar Movies'
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}
