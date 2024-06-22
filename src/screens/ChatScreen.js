import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import 'core-js/stable/atob';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import axios from 'axios';
import {useState} from 'react';

const ChatScreen = () => {
  const navigation = useNavigation();

  const {setToken, userId} = useContext(AuthContext);
  const [options, setOptions] = useState(['Chats']);
  const [requests, setRequests] = useState([]);
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

  const chooseOption = useCallback(option => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getRequests(userId);
    }
  }, [userId]);

  const getRequests = async () => {
    try {
      const response = await axios.get(
        `http:192.168.0.100:4000/getRequests/${userId}`,
      );
      console.log(response.data);
      setRequests(response.data);
    } catch (error) {
      console.log('error while getting request,', error);
    }
  };
  const acceptRequest = async requestId => {
    try {
      const response = await axios.post(
        'http:192.168.0.100:4000/acceptRequest',
        {userId: userId, requestId: requestId},
      );
      if (response.status === 200) {
        await getRequests();
      }
    } catch (error) {
      console.log('accept error', error);
    }
  };
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

      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => chooseOption('Chats')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>Chats</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => chooseOption('Requests')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>Requests</Text>
          </View>
          <Entypo name="chevron-small-down" size={26} color="black" />
        </TouchableOpacity>

        <View style={{flex: 1}}>
          {options.includes('Requests') && (
            <View>
              <Text style={{fontSize: 15, fontWeight: 500}}>
                Checkout all the requests
              </Text>
              {requests.map((item, index) => {
                return (
                  <TouchableOpacity style={{marginVertical: 12}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <TouchableOpacity>
                        <Image
                          source={{uri: item?.from?.image}}
                          style={{width: 40, height: 40, borderRadius: 20}}
                        />
                      </TouchableOpacity>

                      <View style={{flex: 1}}>
                        <Text style={{fontSize: 15, fontWeight: 500}}>
                          {item?.from?.name}
                        </Text>
                        <Text style={{marginTop: 4, color: 'gray'}}>
                          {item?.message}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => acceptRequest(item?.from?._id)}
                        style={{
                          padding: 8,
                          backgroundColor: '#005187',
                          widht: 75,
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'white',
                            textAlign: 'center',
                          }}>
                          Accept
                        </Text>
                      </TouchableOpacity>

                      <AntDesign name="delete" size={26} color="red" />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
