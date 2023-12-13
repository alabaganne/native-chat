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
  where,
} from 'firebase/firestore';
import { useAuthContext } from '../context/auth-context';

interface Message {
  content: string;
  senderEmail: string;
  receiverEmail: string;
  createdAt: Date;
}

const Chat = () => {
  const { activeChat } = useActiveChatContext();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuthContext();
  function sendMessage() {
    const newMessageData = {
      senderEmail: user.email,
      receiverEmail: activeChat.email, // Use the user object from the auth context
      content: newMessage,
      createdAt: new Date(),
    };
    console.log('newMessageData', newMessageData);

    setMessages([...messages, newMessageData]);

    // Add the new message to Firebase
    addMessageToFirebase(newMessageData);

    setNewMessage('');
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
    const q = query(
      collectionRef,
      orderBy('createdAt', 'asc')
      // or(
      //   and(
      //     or(
      //       where('senderEmail', '==', user.email),
      //       where('receiverEmail', '==', user.email)
      //     ),
      //     or(
      //       where('senderEmail', '==', activeChat.email),
      //       where('receiverEmail', '==', activeChat.email)
      //     )
      //   )
      // )
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          (data.senderEmail == user.email &&
            data.receiverEmail == activeChat.email) ||
          (data.senderEmail == activeChat.email &&
            data.receiverEmail == user.email)
        ) {
          updatedMessages.push({
            senderEmail: data.senderEmail,
            receiverEmail: data.receiverEmail,
            content: data.content,
            createdAt: new Date(data.createdAt.seconds * 1000),
          });
        }
      });
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []); // Include activeChat in the dependency array

  return (
    <ScreenContainer>
      <Text size="sm" color="$white">
        Chatting with{' '}
        <Text size="sm" fontWeight="bold" color="$indigo200">
          {activeChat.email}
        </Text>
      </Text>
      <ScrollView gap={10} mt="$4">
        {messages.map((message) => (
          <Text
            key={message.createdAt.getTime()}
            color="$white"
            fontWeight="700"
          >
            {message.senderEmail}:{' '}
            <Text color="$textDark300" size="sm">
              {message.content}
            </Text>
          </Text>
        ))}
      </ScrollView>
      <Box
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
