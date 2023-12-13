import { config } from './config/gluestack-ui.config';
import {
  Box,
  Button,
  ButtonText,
  GluestackUIProvider,
  Icon,
  Text,
  LockIcon,
  GlobeIcon,
} from '@gluestack-ui/themed';
import Logo from './assets/Icons/Logo';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import FeatureCard from './components/FeatureCard';
import Users from './screens/Users';
import ScreenContainer from './components/ScreenContainer';
import Profile from './screens/Profile';
import Chat from './screens/Chat';
import { useEffect, useState } from 'react';
import { firebase } from './config/firebase';
import ActiveChatProvider from './context/active-chat-context';
import AuthContextProvider from './context/auth-context';
const Stack = createNativeStackNavigator();

interface HomeProps {
  navigation: NavigationProp<any>;
}

const Home = ({ navigation }: HomeProps) => {
  return (
    <ScreenContainer>
      <Box
        height="60%"
        sx={{
          '@base': {
            my: '$16',
            mx: '$5',
            height: '80%',
          },
          '@lg': {
            my: '$24',
            mx: '$32',
          },
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          bg="#64748B33"
          py="$2"
          px="$6"
          rounded="$full"
          alignItems="center"
          marginTop={20}
          sx={{
            '@base': {
              flexDirection: 'column',
            },
            '@sm': {
              flexDirection: 'row',
            },
            '@md': { alignSelf: 'flex-start' },
          }}
        >
          <Text color="$white" fontWeight="$normal">
            Welcome to our application.
          </Text>
          <Text color="$white" fontWeight="$medium" ml="$2">
            We're glad to have you here.
          </Text>
        </Box>
        <Box justifyContent="center" alignItems="center">
          <Logo />
          <Box
            mt="$4"
            sx={{
              '@base': {
                flexDirection: 'column',
              },
              '@md': {
                flexDirection: 'row',
              },
            }}
          >
            <FeatureCard
              icon={LockIcon}
              name="Secure"
              desc="Fortified for safety, our cards protect your transactions with advanced security features."
            />
            <FeatureCard
              icon={GlobeIcon}
              name="Fast"
              desc="Swift transactions define our cards, ensuring quick and seamless payment experiences."
            />
          </Box>
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          columnGap={8}
        >
          {/* Log In and Sign Up buttons */}
          <Button
            variant="solid"
            action="primary"
            bgColor="$indigo600"
            onPress={() => navigation.navigate('Login')}
          >
            <ButtonText>Log In</ButtonText>
          </Button>
          <Button
            mt={0}
            variant="outline"
            onPress={() => navigation.navigate('Register')}
            borderColor="white"
          >
            <ButtonText color="white">Sign Up</ButtonText>
          </Button>
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default function App() {
  const [initializing, setInitializing] = useState<Boolean>(true);
  const [user, setUser] = useState<any>();
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    console.log(subscriber);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <GluestackUIProvider colorMode="dark" config={config}>
        <AuthContextProvider>
          <ActiveChatProvider>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: 'Home', headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Users" component={Users} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
          </ActiveChatProvider>
        </AuthContextProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}
