import {
  Stack,
  Flex,
  Box,
  Textarea,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { IoStarOutline, IoStarSharp } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NoteFormPayload } from '../interfaces/note'
import { noteSchema } from '../utils/schema/noteSchema'
import { useState } from 'react'
import { useNote } from '../hooks/useNote'
import { useToast } from '../hooks/useToast'

export function NewNoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<NoteFormPayload>({ 
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      description: ''
    } 
  });
  const { createNote } = useNote()
  const { success, error } = useToast()
  const [isFavorite, setIsFavorite] = useState(false)

  const onSubmit = async (data: NoteFormPayload) => {
    try {
      await createNote({ ...data, color: '#ffffff', isFavorite })
      success({ title: 'Yay!', description: 'Nota criada com sucesso!' })
      reset();
    } catch (e: any) {
      console.log(e)
      error({ title: 'Erro...', description: 'Algum erro ocorreu.' })
    }
  }

  const handleToggleFavorite = () => setIsFavorite(!isFavorite)

  return (
    <Stack
      w={['90%', '80%', '60%', '530.52px']}
      p={['10px', '20px']}
      m="20px auto"
      boxShadow="xl"
      spacing={4}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <FormControl isInvalid={!!errors.title}>
          <Input {...register('title')} placeholder="Título" variant="ghost" />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        {isFavorite ? (
          <IoStarSharp
            onClick={handleToggleFavorite}
            color="#996515"
            size={20}
            cursor="pointer"
          />
        ) : (
          <IoStarOutline
            onClick={handleToggleFavorite}
            size={20}
            cursor="pointer"
          />
        )}
      </Flex>
      <hr />
      <Box>
        <FormControl isInvalid={!!errors.description}>
          <Textarea
            {...register('description')}
            w="100%"
            resize="none"
            placeholder="Criar nota..."
            variant="ghost"
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Flex justifyContent="end">
        <Button
          colorScheme="green"
          onClick={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        >
          Criar nota
        </Button>
      </Flex>
    </Stack>
  )
}
