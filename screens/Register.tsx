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

const Register = ({ navigation }: any) => {
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleSubmit() {
    if (!user.email || !user.password) {
      alert('Please fill out all fields.');
      return;
    }
    console.log('submit');
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
              <InputField type="text" defaultValue="" placeholder="johndoe" />
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
              <InputField type="password" />
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
              <InputField type="password" />
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
