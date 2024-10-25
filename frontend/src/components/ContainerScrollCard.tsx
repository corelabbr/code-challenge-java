import { Box, Flex } from '@chakra-ui/react'
import { ContainerScrollCardProps } from '../interfaces/pageProps'

export function ContainerScrollCard({ children }: ContainerScrollCardProps) {
  return (
    <Box w="100%" overflowX={{ base: 'scroll', md: 'auto' }}>
      <Flex
        w={{ base: 'auto', md: 'max-content' }}
        gap={{ base: 2, md: 4 }}
        p={4}
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
      >
        {children}
      </Flex>
    </Box>
  )
}
