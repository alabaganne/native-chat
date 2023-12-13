import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { firebase } from '../config/firebase';
import { Text } from '@gluestack-ui/themed'; // Assuming Text is imported from '@gluestack-ui/themed'
import ScreenContainer from '../components/ScreenContainer';
import FeatureCard from '../components/FeatureCard';
import { useActiveChatContext } from '../context/active-chat-context';

type User = {
  id: string;
  username: string;
  email: string;
};

const Users = ({ navigation }: { navigation: any }) => {
  const [users, setUsers] = useState<User[]>([]); // Change the state type to an array of User
  const { setActiveChat } = useActiveChatContext();
  useEffect(() => {
    async function getUsers() {
      const usersSnapshot = await firebase
        .firestore()
        .collection('users')
        .get();
      const usersData = usersSnapshot.docs.map((doc) => doc.data() as User);
      setUsers(usersData);
      console.log('User data', usersData);
    }
    getUsers();
  }, []);

  const openChatHandler = (user: User) => {
    console.log('Open chat:', user);
    setActiveChat(user);
    navigation.navigate('Chat');
  };
  return (
    <ScreenContainer>
      {users.map((user) => (
        <Pressable
          key={user.id}
          onPress={() => {
            openChatHandler(user);
          }}
        >
          <FeatureCard name={user.username} desc={user.email} />
        </Pressable>
      ))}
    </ScreenContainer>
  );
};

export default Users;
