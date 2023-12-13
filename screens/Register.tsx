import {
  AlertCircleIcon,
  Box,
  Button,
  ButtonText,
  EditIcon,
  FormControl,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  Input,
  InputField,
  Text,
} from '@gluestack-ui/themed';
import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import FeatureCard from '../components/FeatureCard';
import { FormControlError } from '@gluestack-ui/themed';
import { FormControlLabelText } from '@gluestack-ui/themed';
import { firebase } from '../config/firebase';

const Register = ({ navigation }: any) => {
  const [userData, setUserData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleOnchange = (text: string, input: any) => {
    setUserData((prevState) => ({ ...prevState, [input]: text }));
  };

  async function handleSubmit() {
    if (!userData.username || !userData.email || !userData.password) {
      alert('Please fill out all fields.');
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          userData.email.toLowerCase(),
          userData.password
        );
      await firebase.firestore().collection('users').add({
        username: userData.username.toLowerCase(),
        email: userData.email.toLowerCase(),
        password: userData.password,
      });

      alert('Account created');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      alert('Email already exists.');
    }
  }

  return (
    <ScreenContainer>
      <Box alignItems="center" justifyContent="center" flex={1}>
        <FeatureCard
          icon={EditIcon}
          name="Register"
          desc="Fill out the form below to create a new account."
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
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                defaultValue=""
                onChangeText={(text) => handleOnchange(text, 'username')}
                placeholder="johndoe"
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
                Must be at least 6 characters.
              </FormControlErrorText>
            </FormControlError>
            {/* Email */}
            <FormControlLabel mb="$1" mt="$4">
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                defaultValue=""
                placeholder="johndoe@example.com"
                onChangeText={(text) => handleOnchange(text, 'email')}
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Must be a valid email address.
              </FormControlErrorText>
            </FormControlError>

            {/* Password */}
            <FormControlLabel mb="$1" mt="$4">
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                onChangeText={(text) => handleOnchange(text, 'password')}
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

            {/* Confirm Password */}
            <FormControlLabel mb="$1" mt="$4">
              <FormControlLabelText>Confirm Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="password"
                onChangeText={(text) => handleOnchange(text, 'confirmPassword')}
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Re-enter your password.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>Passwords must match.</FormControlErrorText>
            </FormControlError>

            {/* Submit */}
            <Button
              mt="$6"
              variant="solid"
              action="primary"
              bgColor="$indigo600"
              onPress={handleSubmit}
            >
              <ButtonText>Register</ButtonText>
            </Button>
            <Text size="sm" color="$textDark400" mt="$2" textAlign="center">
              You already have an account?{' '}
              <Text
                onPress={() => navigation.navigate('Login')}
                size="sm"
                color="$indigo400"
                underline
              >
                Login here
              </Text>
            </Text>
          </FormControl>
        </FeatureCard>
      </Box>
    </ScreenContainer>
  );
};

export default Register;
