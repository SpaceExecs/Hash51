import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  Box,
  Image,
  Flex,
  Heading,
  Grid, 
  useColorModeValue
} from "@chakra-ui/react";

import CommentList from './CommentList';
import { UserContext } from '../../../contexts/UserContext';


const Story = (props) => {
  const { story } = props;
  const { userName, nasaTitle, userTitle, href, bodyText, comments, _id } = story;

  const { addConspirator, userObj } = useContext(UserContext);

  const textColor = useColorModeValue("green.500", "green.300");
  const whiteColor = useColorModeValue("whiteAlpha.900" , "blackAlpha.900");
  const greyColor = useColorModeValue("gray.600" , "gray.300");
  
  return (
    <div>
      <Box 
        h="59vh"
        w="60vw" 
        bg={greyColor} 
        mb=".5vh" 
        borderTopRadius={10}
      >
        <Flex>
          <Image
            src={href}
            h="55vh" 
            w="45vw"
            bg="purple.100"
            fit="cover"
            borderTopLeftRadius={10}
          />
          <Box 
            w="17vw"
          >
            <Heading 
              mt="2vh"
              p={2}
              maxH="12vh"
              fontSize="19px"
              overflowY="scroll"
              color={whiteColor}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '16px',
                  borderRadius: '8px',
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: `rgba(0, 0, 0, 0.5)`,
                },
              }}
              
            >
              {userTitle}
            </Heading>
              
            <Text
              fontSize="10px"
              p={3}
              h="38vh"
              mt={3}
              color={textColor}
              overflowY="scroll"
              sx={{
                '&::-webkit-scrollbar': {
                  width: '16px',
                  borderRadius: '8px',
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: `rgba(0, 0, 0, 0.5)`,
                },
              }}
            >
              {bodyText}
              <Text
                ml="10px" 
                fontSize="10px"
                mt={1}
                as="u"
                color={whiteColor}
                // eslint-disable-next-line consistent-return
                onClick={() => {
                  if(userObj.username) {
                    return addConspirator(userName);
                  }
                }}
              >
                Created by {userName}
              </Text>
            </Text>
          </Box>
        </Flex>
        <Text 
          ml="10px" 
          fontSize="10px" 
          mb="1vh"
          color={whiteColor}
        >
          NASA image title: {nasaTitle}
        </Text>
      </Box>
      <CommentList comments={comments} post_id={_id}/>
    </div>
  );
};

// Story.propTypes = {
//   story: PropTypes.objectOf(PropTypes.object).isRequired,
// };

export default Story;
