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

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const vertiCalMargin = ios ? '' : 'my-3';

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavorite, toggleIsFavorite] = React.useState(false);

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
      <View>
        <View className='flex-row justify-center'>
          <View className='items-center rounded-full overflow-hidden border-2 border-neutral-500 h-72 w-72'>
            <Image
              source={require('../assets/images/castImage2.png')}
              style={{ width: width * 0.74, height: height * 0.43 }}
            />
          </View>
        </View>
        <View>
          <View className='mt-6'>
            <Text className='text-white text-3xl font-bold text-center'>
              Keanu Reeves
            </Text>
            <Text className='text-neutral-500 text-base text-center'>
              London, United Kingdom
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
