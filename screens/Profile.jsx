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
import React, { useEffect } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import FeatureCard from '../components/FeatureCard';
import { FormControlHelperText } from '@gluestack-ui/themed';

import * as ImagePicker from 'expo-image-picker';
import { Image, Pressable } from 'react-native';
import { useAuthContext } from '../context/auth-context';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config/firebase';

const Profile = () => {
  const { user, setUser } = useAuthContext();
  const navigation = useNavigation();
  const [userData, setUserData] = React.useState({
    username: '',
    email: '',
    password: '',
  });
  async function handleSubmit() {
    let userCollection = firebase.firestore().collection('users');

    let data = {
      username: userData.username,
      email: userData.email,
    };
    if (userData.password && userData.password.length > 8) {
      data.password = userData.password;
    }
    if (userData.password && userData.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    console.log('user.uid', user.uid);
    // await userCollection.doc(user.uid).set(data);
    // setUser({ ...user, ...data });
    alert('Profile updated successfully!');
  }

  useEffect(() => {
    setUserData({
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }, []);

  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScreenContainer navigation={navigation}>
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
              <Pressable onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 75, height: 75, borderRadius: 75 }}
                  />
                ) : (
                  <Box
                    rounded="$full"
                    justifyContent="center"
                    alignItems="center"
                    w={75}
                    h={75}
                    bg="$indigo600"
                    onPress={pickImage}
                  >
                    <Icon as={DownloadIcon} w={25} h={25} color="$indigo100" />
                  </Box>
                )}
              </Pressable>
            </Box>
            {/* Username */}
            <FormControlLabel mb="$1">
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                value={userData.username}
                onChangeText={(text) => {
                  setUserData({ ...userData, username: text });
                }}
                placeholder="johndoe"
              />
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
                value={userData.email}
                placeholder="johndoe@example.com"
                onChangeText={(text) => {
                  setUserData({ ...userData, email: text });
                }}
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
                value={userData.password}
                onChangeText={(text) =>
                  setUserData({
                    ...userData,
                    password: text,
                  })
                }
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
              <ButtonText>Update</ButtonText>
            </Button>
          </FormControl>
        </FeatureCard>
      </Box>
    </ScreenContainer>
  );
};

export default Profile;
