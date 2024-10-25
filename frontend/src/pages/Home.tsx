import { Header } from '../components/Header'
import { NewNoteForm } from '../components/NewNoteForm'
import { Note } from '../components/Note'
import { ContainerScrollCard } from '../components/ContainerScrollCard'
import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { useNote } from '../hooks/useNote'

export function Home() {
  const {
    notes: { data, isLoading },
  } = useNote()

  return (
    <main className="main-container-page">
      <Header />
      <NewNoteForm />
      {isLoading && (
        <Flex mt="30px" justifyContent="center">
          <Spinner color="black" size="lg" />
        </Flex>
      )}
      {data && (
        <>
          <Box w="90%" m="auto">
            <Text>Favoritas</Text>
            {data.favoriteNotes.length === 0 && (
              <Flex mt="20px" justifyContent="center">
                <Text textAlign="center">Nenhuma nota está favoritada.</Text>
              </Flex>
            )}
            {data.favoriteNotes.length > 0 && (
              <ContainerScrollCard>
                {data.favoriteNotes.map((item) => (
                  <Note key={`${item.createdAt}`} note={item} />
                ))}
              </ContainerScrollCard>
            )}
          </Box>
          <Box w="90%" m="30px auto">
            <Text>Outras</Text>
            {data.otherNotes.length === 0 && (
              <Flex mt="20px" justifyContent="center">
                <Text textAlign="center">Nenhuma nota para exibir.</Text>
              </Flex>
            )}
            {data.otherNotes.length > 0 && (
              <ContainerScrollCard>
                {data.otherNotes.map((item) => (
                  <Note key={`${item.createdAt}`} note={item} />
                ))}
              </ContainerScrollCard>
            )}
          </Box>
        </>
      )}
    </main>
  )
}
