import React, { useLayoutEffect, useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import {
  Box,
  Button,
  ButtonIcon,
  Input,
  InputField,
  MessageCircleIcon,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { useActiveChatContext } from '../context/active-chat-context';
import { firebase } from '../config/firebase';
import {
  query,
  collection,
  onSnapshot,
  orderBy,
  getDocs,
  where,
} from 'firebase/firestore';
import { useAuthContext } from '../context/auth-context';

interface Message {
  email: string;
  content: string;
  sender: string;
  createdAt: Date;
}

const Chat = () => {
  const { activeChat } = useActiveChatContext();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuthContext();
  function sendMessage() {
    const newMessageData = {
      email: activeChat.email,
      content: newMessage,
      sender: user, // Use the user object from the auth context
      createdAt: new Date(),
    };

    setMessages([...messages, newMessageData]);

    // Add the new message to Firebase
    addMessageToFirebase(newMessageData);
  }

  const addMessageToFirebase = async (messageData: Message) => {
    try {
      await firebase.firestore().collection('messages').add(messageData);
      console.log('message sent');
    } catch (error) {
      console.error('Error adding message to Firebase:', error);
    }
  };

  useLayoutEffect(() => {
    const collectionRef = collection(firebase.firestore(), 'messages');
    const q = query(collectionRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        updatedMessages.push({
          email: data.email,
          content: data.content,
          createdAt: new Date(data.createdAt.seconds * 1000), // Convert Firestore timestamp to JavaScript Date
          sender: data.sender,
        });
      });
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []); // Include activeChat in the dependency array

  return (
    <ScreenContainer>
      <ScrollView h="90%" gap={10}>
        {messages.map((message) => (
          <Text
            key={message.createdAt.getTime()}
            color="$white"
            fontWeight="700"
          >
            {message.sender}:{' '}
            <Text color="$textDark300" size="sm">
              {message.content}
            </Text>
          </Text>
        ))}
      </ScrollView>
      <Box
        flex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={10}
      >
        <Input flexGrow={1}>
          <InputField
            placeholder="Write something..."
            value={newMessage}
            onChangeText={(t) => setNewMessage(t)}
          />
        </Input>
        <Button
          variant="solid"
          action="primary"
          bgColor="$indigo600"
          onPress={sendMessage}
        >
          <ButtonIcon>
            <MessageCircleIcon color="$white" />
          </ButtonIcon>
        </Button>
      </Box>
    </ScreenContainer>
  );
};

export default Chat;
