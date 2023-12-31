import { HStack, Icon, MessageCircleIcon, Text } from '@gluestack-ui/themed';
import React from 'react';
import { Svg, Path, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const YourSvgComponent = () => {
  return (
    <HStack flexWrap="wrap" alignItems="center">
      <Icon as={MessageCircleIcon} m="$2" w="$6" h="$6" color="white" />
      <Text color="white" fontWeight="bold" size="2xl">
        Native{' '}
        <Text size="2xl" color="$indigo400" fontWeight="bold">
          Chat
        </Text>
      </Text>
    </HStack>
  );
};

export default YourSvgComponent;
