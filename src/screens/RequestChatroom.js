import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

const RequestChatroom = props => {
  const navigation = useNavigation();
  const [msg, setMsg] = useState('');
  const {token, userId, setToken, setUserId} = useContext(AuthContext);
  const route = useRoute();

  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <View>
            <Text>{props.route?.params?.name}</Text>
          </View>
        </View>
      ),
    });
  }, []);

  const sendMessage = async () => {
    try {
      const userdata = {
        senderId: userId,
        receiverId: route?.params?.receiverId,
        message: msg,
      };

      const response = await axios.post(
        'http:192.168.0.100:4000/sendRequest',
        userdata,
      );
      if (response.status === 200) {
        setMsg('');
        Alert.alert(
          'your request has been sent',
          'wait for the user to accept',
        );
      }
    } catch (error) {}
  };
  console.log(userId, route?.params?.receiverId);
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      <ScrollView></ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Entypo name="emoji-happy" size={24} color="gray" />
        <TextInput
          value={msg}
          onChangeText={setMsg}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: 'ddddd',
            borderRadius: 20,
            paddingHorizontal: 10,
            borderTopWidth: 1,
            borderTopColor: '#ddddd',
            marginLeft: 8,
          }}
          placeholder={'Enter your message'}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginHorizontal: 8,
          }}>
          <Entypo name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: '#0066b2',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RequestChatroom;

const styles = StyleSheet.create({});
