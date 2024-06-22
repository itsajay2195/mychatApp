import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {useEffect} from 'react';
import {AuthContext} from '../AuthContext';
import UserComponent from '../components/UserComponent';

const PeopleScreen = () => {
  const [users, setUsers] = useState([]);
  const {token, userId} = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http:192.168.0.100:4000/users/${userId}`);
        const data = await response.json();
        console.log('in>>>', JSON.stringify(data, null, 3));
        setUsers(data);
      } catch (error) {
        console.log('errr>>>', error);
      }
    };

    fetchUsers();
  }, []);

  const renderItem = ({item, index}) => <UserComponent item={item} />;
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 500,
            marginTop: 12,
            color: 'black',
          }}>
          People using signal
        </Text>

        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => item?._id?.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default PeopleScreen;

const styles = StyleSheet.create({});
