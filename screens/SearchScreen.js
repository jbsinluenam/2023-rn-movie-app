import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import debounce from 'lodash.debounce';
import { searchMovies } from '../api/Moviedb';
import { fallbackMoviePoster, image342 } from '../api/Moviedb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const paddingTop = ios ? '' : 'pt-3';

export default function SearchScreen() {
  let movieName = 'Ant man and the wasp: Quantumania';
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);

  const handleSearch = (value) => {
    // console.log('searching for', text);
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: false,
        language: 'en-US',
        page: 1,
      }).then((data) => {
        setLoading(false);
        console.log('search results', data);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1000), []);

  return (
    <SafeAreaView className={'bg-neutral-800 flex-1 ' + paddingTop}>
      <View className='flex-row justify-between items-center border border-neutral-500 rounded-full mx-4 mb-3'>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Search Movie'
          placeholderTextColor='#9CA3AF'
          className='pb-1 pl-6 flex-1 text-base font-semibold text-white  tracking-wider'
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HOME');
          }}
          className=' rounded-full p-3 m-1 bg-neutral-500'>
          <XMarkIcon size='25' color='#fff' />
        </TouchableOpacity>
      </View>

      {/* results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className='space-y-3'>
          <Text className='text-white ml-1 font-semibold'>
            Results ({results.length})
          </Text>
          <View className='flex-row justify-between flex-wrap'>
            {results.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.push('MOVIE', item)}>
                  <View className='space-y-2 mb-6'>
                    <Image
                      className='rounded-3xl'
                      // source={require('../assets/images/moviePoster2.png')}
                      source={{
                        uri: image342(item.poster_path) || fallbackMoviePoster,
                      }}
                      style={{ width: width * 0.44, height: height * 0.33 }}
                    />
                    <Text className='text-neutral-300 ml-1'>
                      {item.title.length > 12
                        ? item.title.slice(0, 12) + '...'
                        : item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className='flex-row justify-center'>
          <Image
            source={require('../assets/images/movieTime.png')}
            style={{ width: width * 0.8, height: height * 0.4 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
