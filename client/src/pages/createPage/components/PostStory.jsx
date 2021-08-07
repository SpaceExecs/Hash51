/* eslint-disable camelcase */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Button,
  Flex,
  Textarea,
  Input,
  Stack,
} from '@chakra-ui/react';

import { EvidenceContext } from '../../../contexts/EvidenceContext';
import { UserContext } from '../../../contexts/UserContext';

const PostStory = () => {
  const {
    postStory,
    bodyText,
    handlePostTitle,
    handlePostBody,
    userTitle,
    nasa_id,
  } = useContext(EvidenceContext);
  const { storeEvidence, userObj } = useContext(UserContext);
  const { username } = userObj;

  return (
    <Stack>
      <Input
        placeholder="Your title here"
        fontSize="14px"
        color="black"
        bg="purple.200"
        mt="2vh"
        w="52vw"
        ml="2vw"
        value={userTitle}
        onChange={handlePostTitle}
      />
      <Flex
        mt="1.25vh"
      >
        <Box
          bg="purple.200"
          mb="1.25vh"
          w="52vw"
          ml="2vw"
          borderLeftRadius={10}
        >
          <Textarea
            placeholder="Tinfoil hat not included..."
            fontSize="14px"
            color="black"
            overflowY="scroll"
            h="5px"
            sx={{
              '&::-webkit-scrollbar': {
                width: '16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
            value={bodyText}
            onChange={handlePostBody}
          />
        </Box>
        <Link to="/userPage">
          <Button
            h="80px"
            w="4vw"
            color="white"
            borderLeftRadius={0}
            backgroundColor="#3a2a5e"
            onClick={async () => {
              await postStory(username);
              storeEvidence(nasa_id);
            }}
          >
            Post
          </Button>
        </Link>
      </Flex>
    </Stack>
  );
};

export default PostStory;
