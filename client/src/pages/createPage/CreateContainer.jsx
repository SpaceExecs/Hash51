import React from 'react';

import {
  Flex,
  Box,
} from '@chakra-ui/react';

import NewStory from './components/NewStory';

const CreatePageContainer = () => (
  <Flex>
    <Box
      maxH="89vh"
      minW="50vw"
      verticalAlign="top"
    >
      <NewStory />
    </Box>
  </Flex>
);

export default CreatePageContainer;
