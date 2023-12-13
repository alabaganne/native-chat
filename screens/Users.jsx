import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { firebase } from '../config/firebase';
import { EditIcon, Text } from '@gluestack-ui/themed'; // Assuming Text is imported from '@gluestack-ui/themed'
import ScreenContainer from '../components/ScreenContainer';
import FeatureCard from '../components/FeatureCard';
import { useActiveChatContext } from '../context/active-chat-context';
import { useAuthContext } from '../context/auth-context';
import { collection, onSnapshot, query } from 'firebase/firestore';

// type User = {
//   id: string,
//   username: string,
//   email: string,
// };

const auth = firebase.auth();

const Users = ({ navigation }) => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]); // Change the state type to an array of User
  const { setActiveChat } = useActiveChatContext();
  useEffect(() => {
    const collectionRef = collection(firebase.firestore(), 'users');
    const q = query(collectionRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedUsers = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.email == user.email) return;

        updatedUsers.push({
          ...data,
        });
      });
      setUsers(updatedUsers);
      console.log('users', users);
    });

    return unsubscribe;
  }, []);

  const openChatHandler = (user) => {
    console.log('Open chat:', user);
    setActiveChat(user);
    navigation.navigate('Chat');
  };

  return (
    <ScreenContainer navigation={navigation}>
      {users.length === 0 && <Text>No users found.</Text>}
      {users.map((user) => (
        <Pressable
          key={user.email}
          onPress={() => {
            openChatHandler(user);
          }}
        >
          <FeatureCard icon={EditIcon} name={user.username} desc={user.email} />
        </Pressable>
      ))}
    </ScreenContainer>
  );
};

export default Users;
