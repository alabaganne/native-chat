import React, { useState } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Input,
  InputField,
  MessageCircleIcon,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import FeatureCard from '../components/FeatureCard';

interface Message {
  id: number;
  content: string;
  sender: string;
}

const fakeMessages: Message[] = [
  { id: 1, content: 'Hello', sender: 'Ala Baganne' },
  { id: 2, content: 'Hi mate!', sender: 'You' },
  { id: 3, content: 'How are you man?', sender: 'Ala Baganne' },
];

const Chat = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(fakeMessages);
  function sendMessage() {
    console.log('send message');
    setMessages([
      ...messages,
      { id: messages.length + 1, content: newMessage, sender: 'You' },
    ]);
    setNewMessage('');
  }

  return (
    <ScreenContainer>
      <ScrollView h="90%" gap={10}>
        {messages.map((message) => (
          <Text key={message.id} color="$white" fontWeight="700">
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
