import {
  AlertCircleIcon,
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  Icon,
  Input,
  InputField,
  Text,
  UnlockIcon,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import FeatureCard from '../components/FeatureCard';
import { FormControlError } from '@gluestack-ui/themed';
import { FormControlLabelText } from '@gluestack-ui/themed';
import { firebase } from '../config/firebase';
import { useAuthContext } from '../context/auth-context';
import { useNavigation } from '@react-navigation/native';

const auth = firebase.auth();

const Login = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  let { setUser } = useAuthContext();

  async function handleSubmit() {
    if (!email || !password) {
      alert('Please fill out all fields.');
      return;
    }
    auth
      .signInWithEmailAndPassword(email.toLowerCase(), password)
      .then(async function (res) {
        console.log('uid', res.user?.uid);
        const u = await firebase
          .firestore()
          .collection('users')
          .doc(res.user?.uid)
          .get();
        console.log('u', u.data());
        setUser(auth.currentUser);
        navigation.navigate('Users');
      })
      .catch(function (error) {
        console.log('error', error);
        alert('Invalid credentials.');
      });
  }

  return (
    <ScreenContainer>
      <Box h="$full" alignItems="center" justifyContent="center" flex={1}>
        <FeatureCard
          icon={UnlockIcon}
          name="Log In"
          desc="Fill out the form below to log in to your account."
        >
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}
          >
            {/* Email */}
            <FormControlLabel mb="$1">
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="johndoe@example.com"
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Must be a valid email address.
              </FormControlErrorText>
            </FormControlError>

            {/* Password */}
            <FormControlLabel mb="$1" mt="$6">
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                At least 6 characters are required.
              </FormControlErrorText>
            </FormControlError>

            {/* Submit */}
            <Button
              mt="$6"
              variant="solid"
              action="primary"
              bgColor="$indigo600"
              onPress={handleSubmit}
            >
              <ButtonText>Login</ButtonText>
            </Button>
            <Text size="sm" color="$textDark400" mt="$2" textAlign="center">
              You don't have an account?{' '}
              <Text
                onPress={() => navigation.navigate('Register')}
                size="sm"
                underline
              >
                Sign up here
              </Text>
            </Text>
          </FormControl>
        </FeatureCard>
      </Box>
    </ScreenContainer>
  );
};

export default Login;
