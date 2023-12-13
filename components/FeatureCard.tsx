import { Box, Icon, Text } from '@gluestack-ui/themed';
import React from 'react';

interface Props {
  icon?: any;
  name: string;
  desc?: string;
  children?: React.ReactNode;
}

const FeatureCard = ({ icon, name, desc, children }: Props) => {
  return (
    <Box
      flexDirection="column"
      borderWidth={1}
      borderColor="$borderDark700"
      sx={{
        _web: {
          flex: 1,
        },
      }}
      m="$2"
      p="$4"
      rounded="$md"
    >
      <Box alignItems="center" display="flex" flexDirection="row">
        {/* <Image source={iconSvg} alt="document" width={22} height={22} /> */}
        {icon && <Icon as={icon} color="white" />}
        <Text
          fontSize={22}
          color="$white"
          fontWeight="700"
          ml={icon ? '$2' : '$0'}
        >
          {name}
        </Text>
      </Box>
      {desc && (
        <Text color="$textDark300" size="sm" mt="$2">
          {desc}
        </Text>
      )}
      {children && <Box mt="$8">{children}</Box>}
    </Box>
  );
};

export default FeatureCard;
