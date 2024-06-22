import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import 'core-js/stable/atob';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';

const ChatScreen = () => {
  const navigation = useNavigation();

  const {setToken} = useContext(AuthContext);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setToken('');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('something went wrong');
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={{width: 30, height: 30, borderRadius: 15}}
            source={{
              uri: 'https://lh3.googleusercontent.com/ogw/AF2bZyi09EC0vkA0pKVqrtBq0Y-SLxZc0ynGmNrVKjvV66i3Yg=s64-c-mo',
            }}
          />
        </TouchableOpacity>

        <Text style={{fontSize: 15, fontWeight: '500'}}>Chats</Text>

        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <AntDesign name="camerao" size={26} color="black" />
            <MaterialIcons
              onPress={() => navigation.navigate('People')}
              name="person-outline"
              size={26}
              color="black"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
