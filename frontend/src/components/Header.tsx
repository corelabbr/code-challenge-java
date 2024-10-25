import {
  Box,
  Flex,
  Text,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import logoHeader from '/logo-header.png'
import { useSearchContext } from '../context/SearchContext'

export function Header() {
  const { setSearch } = useSearchContext()

  return (
    <Flex
      h={{ base: '90px', md: '70px' }}
      w="100%"
      boxShadow="lg"
      alignItems="center"
      p={{ base: '0 10px', md: '0 20px' }}
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Flex h="100%" w={{ base: '100%', md: 'auto' }} alignItems="center">
        <Box>
          <img src={logoHeader} alt="Logo" style={{ maxWidth: '100px' }} />
        </Box>
        <Text ml="10px" color="#455A64" fontSize={{ base: 'lg', md: 'xl' }}>
          CoreNotes
        </Text>
      </Flex>

      <Box
        w={{ base: '100%', md: '530.17px' }}
        mt={{ base: '10px', md: '0' }}
        ml={{ base: 0, md: '10px' }}
      >
        <InputGroup size="md">
          <Input
            p="10px"
            pr="2.5rem"
            placeholder="Pesquisar..."
            w="100%"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  )
}
