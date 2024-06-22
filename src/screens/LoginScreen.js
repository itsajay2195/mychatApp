import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    console.log('tokenis', token);
    if (token) {
      navigation?.replace('MainStack', {screen: 'Main'});
    }
  }, [navigation, token]);

  const handleLogin = () => {
    const user = {email: email, password: password};
    axios
      .post('http:192.168.0.100:4000/login', user)
      .then(response => {
        const token = response?.data?.token;
        AsyncStorage.setItem('authToken', token);
        setToken(token);
      })
      .catch(error => {
        Alert.alert('login error', 'An error ocurred while loggin in!');
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        contentContainerStyle={{padding: 10, alignItems: 'center'}}
        keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView>
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 500, color: 'black'}}>
              Login to your account
            </Text>
            <View style={{marginTop: 50}}>
              <View>
                <Text style={{fontSize: 18, fontWeight: 600, color: 'gray'}}>
                  Email
                </Text>
                <View>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={'#BEBEBE'}
                    style={{
                      width: 320,
                      marginTop: 15,
                      borderBottomColor: '#BEBEBE',
                      borderBottomWidth: 1,
                      paddingBottom: 20,
                      fontSize: 15,
                    }}
                    placeholder="Enter your email"
                  />
                </View>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'gray',
                    marginTop: 25,
                  }}>
                  Password
                </Text>
                <View>
                  <TextInput
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={'#BEBEBE'}
                    style={{
                      width: 320,
                      marginTop: 15,
                      borderBottomColor: '#BEBEBE',
                      borderBottomWidth: 1,
                      paddingBottom: 20,
                      fontSize: 15,
                    }}
                    placeholder="Enter your password"
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              style={{
                width: 200,
                backgroundColor: '#4A5582',
                padding: 15,
                marginTop: 50,
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 6,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 16,
                  marginTop: 12,
                  textAlign: 'center',
                }}>
                Don't have an account? Sign up.
              </Text>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 140, height: 170}}
                source={{
                  uri: 'https://signal.org/assets/images/features/Media.png',
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
