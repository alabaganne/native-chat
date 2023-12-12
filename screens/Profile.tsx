import {
  Box,
  Text,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  FormControlErrorIcon,
  FormControlError,
  FormControlErrorText,
  AlertCircleIcon,
  FormControlHelper,
  EyeIcon,
  Icon,
  DownloadIcon,
} from '@gluestack-ui/themed';
import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import FeatureCard from '../components/FeatureCard';
import { FormControlHelperText } from '@gluestack-ui/themed';

const Profile = ({ navigation }: any) => {
  function handleSubmit() {
    console.log('submit');
  }

  return (
    <ScreenContainer>
      <Box height="100%" alignItems="center" justifyContent="center">
        <FeatureCard
          name="Profile"
          desc="Update your profile details easily for a personalized and accurate representation."
        >
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={false}
          >
            {/* Avatar Section */}
            <Box mb="$6">
              <FormControlLabel mb="$1">
                <FormControlLabelText>Avatar</FormControlLabelText>
              </FormControlLabel>
              <Box
                rounded="$full"
                justifyContent="center"
                alignItems="center"
                w={75}
                h={75}
                bg="$indigo600"
              >
                <Icon as={DownloadIcon} w={25} h={25} color="$indigo100" />
              </Box>
            </Box>
            {/* Username */}
            <FormControlLabel mb="$1">
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField type="text" defaultValue="" placeholder="johndoe" />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Must be at least 6 characters.
              </FormControlErrorText>
            </FormControlError>
            {/* Email */}
            <FormControlLabel mb="$1" mt="$6">
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
            <FormControlLabel mb="$1" mt="$6">
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

            {/* Submit */}
            <Button
              mt="$6"
              variant="solid"
              action="primary"
              bgColor="$indigo600"
              onPress={handleSubmit}
            >
              <ButtonText>Update</ButtonText>
            </Button>
          </FormControl>
        </FeatureCard>
      </Box>
    </ScreenContainer>
  );
};

export default Profile;
