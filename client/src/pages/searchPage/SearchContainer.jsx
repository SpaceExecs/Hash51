import React from 'react';

import {
  Flex,
} from '@chakra-ui/react';

import Search from './components/Search';
import SearchResult from './components/SearchResult';

const SearchContainer = () => (
  <div>
    <Flex
      justifyContent="center"
      alignItems="center"
    >
      <Search />
    </Flex>
    <Flex
      justifyContent="center"
      alignItems="center"
    >
      <SearchResult />
    </Flex>
  </div>
);

export default SearchContainer;
