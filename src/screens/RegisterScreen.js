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
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    console.log('test>>>>');
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };

    axios
      .post('http:192.168.0.100:4000/register', user)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Registration succesfull',
          'You have been registered succesfully!',
        );
        setName('');
        setEmail('');
        setPassword('');
        setImage('');
      })
      .catch(error => {
        console.log('error', error);
        Alert.alert(
          'Registration error',
          'An error ocurred while registering!',
        );
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
              Setup your profile
            </Text>

            <Text
              style={{
                marginTop: 10,
                marginHorizontal: 12,
                color: 'gray',
                textAlign: 'center',
              }}>
              Profiles are visible to your fiends and connections and groups.
            </Text>

            <Pressable style={{marginTop: 10}}>
              <Image
                source={{
                  uri: image
                    ? image
                    : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
                }}
                style={{width: 50, height: 50, borderRadius: 25}}
              />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 4,
                  color: 'gray',
                  fontSize: 12,
                  fontWeight: 600,
                }}>
                Add
              </Text>
            </Pressable>
          </View>
          <View style={{marginTop: 20}}>
            <View>
              <Text style={{fontSize: 18, fontWeight: 600, color: 'gray'}}>
                Name
              </Text>
              <View>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={'#BEBEBE'}
                  style={{
                    width: 320,
                    marginTop: 15,
                    borderBottomColor: '#BEBEBE',
                    borderBottomWidth: 1,
                    paddingBottom: 20,
                    fontSize: 15,
                    color: 'black',
                  }}
                  placeholder="Enter your name"
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
                    color: 'black',
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
                  secureTextEntry={true}
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
                    color: 'black',
                  }}
                  placeholder="Enter your password"
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
                Image
              </Text>
              <View>
                <TextInput
                  value={image}
                  onChangeText={setImage}
                  placeholderTextColor={'#BEBEBE'}
                  style={{
                    width: 320,
                    marginTop: 15,
                    borderBottomColor: '#BEBEBE',
                    borderBottomWidth: 1,
                    paddingBottom: 20,
                    fontSize: 15,
                    color: 'black',
                  }}
                  placeholder="Enter your image url"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleRegister()}
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
              Register
            </Text>
          </TouchableOpacity>

          <Pressable onPress={() => navigation?.navigate('Login')}>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
                marginTop: 12,
                textAlign: 'center',
              }}>
              Already have an account? Sign In.
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
