import { InputProps, Box, Text, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';
import React from 'react';

export const ContractAddressInput: React.FC<InputProps> = (props) => (
  <Box w="full">
    <Text size="sm" align="left" marginBottom="2">Contract address:</Text>
    <InputGroup>
      <InputLeftElement children={<AtSignIcon />} />
      <Input {...props} />
    </InputGroup>
  </Box>
)