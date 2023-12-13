import { Text } from '@gluestack-ui/themed';
import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import FeatureCard from '../components/FeatureCard';
import { Pressable } from 'react-native';

const users = [
  { id: 1, username: 'alabaganne', email: 'alabaganne9@gmail.com' },
];

// select * from messages where sender_id = {MY ID} and receiver_id = {USER ID}

const Users = ({ navigation }: any) => {
  return (
    // TODO: will display list of users
    // When a user is clicked, you'll be redirected to the chat screen where you can chat with him
    <ScreenContainer>
      {users.map((user) => (
        <Pressable key={user.id} onPress={() => navigation.navigate('Chat')}>
          <FeatureCard name={user.username} desc={user.email} />
        </Pressable>
      ))}
    </ScreenContainer>
  );
};

export default Users;
