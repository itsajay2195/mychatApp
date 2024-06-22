import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const UserComponent = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={{padding: 10, marginTop: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TouchableOpacity>
          <Image
            source={{uri: item?.image}}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
        </TouchableOpacity>

        <View style={{flex: 1}}>
          <Text>{item?.name}</Text>
          <Text>{item?.email}</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Request', {
              name: item?.name,
              receiverId: item?._id,
            });
          }}
          style={{
            padding: 10,
            width: 80,
            backgroundColor: '#005187',
            borderRadius: 4,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserComponent;

const styles = StyleSheet.create({});
