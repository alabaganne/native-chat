import React from 'react';
import { Box, ButtonText } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import Gradient from '../assets/Icons/Gradient';

const ScreenContainer = ({ children }) => {
  return (
    <Box flex={1} backgroundColor="$black">
      <ScrollView
        style={{ height: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ButtonText
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
        </ButtonText>
        <Box p="$2">{children}</Box>
      </ScrollView>
    </Box>
  );
};

export default ScreenContainer;
