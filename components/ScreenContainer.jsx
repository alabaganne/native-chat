import React, { useEffect } from 'react';
import {
  Box,
  Button,
  ButtonText,
  CopyIcon,
  ExternalLinkIcon,
  GripVerticalIcon,
  Icon,
  MessageCircleIcon,
  SettingsIcon,
  Text,
} from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import Gradient from '../assets/Icons/Gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthContext } from '../context/auth-context';
import { firebase } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

const auth = firebase.auth();

const CustomButton = ({ onPress, icon }) => {
  return (
    <Button
      w="$12"
      h="$12"
      borderRadius="$full"
      justifyContent="center"
      alignItems="center"
      bgColor="$indigo600"
      onPress={onPress}
    >
      <Icon as={icon} color="$white" />
    </Button>
  );
};

const ScreenContainer = ({ children }) => {
  const { user, setUser } = useAuthContext();
  const navigation = useNavigation();

  function logout() {
    auth.signOut();
    setUser(null);
    navigation.navigate('Login');
  }
  return (
    <Box flex={1} backgroundColor="$black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box
          position="absolute"
          sx={{
            '@base': {
              h: 500,
              w: 500,
            },
            '@lg': {
              h: 700,
              w: 700,
            },
          }}
        >
          <Gradient />
        </Box>
        <Box px="$4" py="$4" flexGrow={1} flex={1} flexDirection="column">
          {children}
        </Box>
        {user && (
          <Box
            backgroundColor="$black"
            alignItems="center"
            justifyContent="center"
            p="$4"
          >
            <Text color="$white" size="sm">
              Logged in as{' '}
              <Text fontWeight="bold" color="$indigo300">
                {user.email}
              </Text>
            </Text>
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              w="50%"
              pb="$4"
              pt="$4"
              mb="$16"
              gap="$4"
            >
              <CustomButton
                onPress={() => navigation.navigate('Home')}
                icon={GripVerticalIcon}
              />
              <CustomButton
                onPress={() => navigation.navigate('Users')}
                icon={MessageCircleIcon}
              />
              <CustomButton
                onPress={() => navigation.navigate('Profile')}
                icon={SettingsIcon}
              />
              <CustomButton onPress={() => logout()} icon={ExternalLinkIcon} />
            </Box>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};

export default ScreenContainer;
