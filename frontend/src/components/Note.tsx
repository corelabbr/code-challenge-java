import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Textarea,
  Text,
  Spinner,
} from '@chakra-ui/react'
import { IoStarOutline, IoStarSharp } from 'react-icons/io5'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import { MdOutlineFormatColorFill } from 'react-icons/md'
import { IoMdClose, IoMdCheckmark } from 'react-icons/io'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { noteSchema } from '../utils/schema/noteSchema'
import { INote, NoteFormPayload } from '../interfaces/note'
import { useNote } from '../hooks/useNote'
import { useToast } from '../hooks/useToast'

interface Props {
  note: INote
}

const getContrastingColor = (hexColor: string) => {
  // Remove o símbolo '#' caso ele esteja presente
  const color = hexColor.replace('#', '')

  // Converte a cor de hexadecimal para valores RGB
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  // Calcula a luminosidade relativa
  const brightness = r * 0.299 + g * 0.587 + b * 0.114

  // Se a luminosidade for alta, retorna preto, caso contrário, retorna branco
  return brightness > 186 ? '#000000' : '#FFFFFF'
}

export function Note({ note }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NoteFormPayload>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note.title,
      description: note.description,
    },
  })
  const { updateNote, deleteNote, favoriteNote } = useNote()
  const { success, error } = useToast()
  const [color, setColor] = useState(note.color)
  const [isEdition, setIsEdition] = useState(false)
  const [isFavorite, setIsFavorite] = useState(note.isFavorite)
  const ref = useRef({} as HTMLDivElement)
  const fontColor = getContrastingColor(note.color)

  const handleToggleFavorite = () => setIsFavorite(!isFavorite)

  const onUpdate = async (data: NoteFormPayload) => {
    try {
      const payload = {
        id: note.id,
        note: {
          ...data,
          color,
          isFavorite,
        },
      }
      await updateNote(payload)
      success({
        title: 'Yay!',
        description: 'Nota atualizada com sucesso!',
      })
      setIsEdition(false)
    } catch (e: any) {
      console.log(e)
      error({ title: 'Erro...', description: 'Algum erro ocorreu.' })
    }
  }

  const handleFavoriteNote = async () => {
    if (isEdition) return setIsFavorite(!note.isFavorite)

    try {
      await favoriteNote(note.id)
    } catch (e: any) {
      console.log(e)
      error({ title: 'Erro...', description: 'Algum erro ocorreu.' })
    }
  }

  const handleDeleteNote = async () => {
    try {
      await deleteNote(note.id)
      success({
        title: 'Yay!',
        description: 'Nota excluída com sucesso!',
      })
    } catch (e: any) {
      console.log(e)
      error({ title: 'Erro...', description: 'Algum erro ocorreu.' })
    }
  }

  return (
    <Flex
      direction="column"
      w={['95%', '80%', '390px']}
      h="437.59px"
      p="10px"
      m="20px auto"
      borderRadius="2xl"
      boxShadow="2xl"
      bgColor={note.color}
      overflowY="auto"
    >
      <Flex alignItems="center" p="10px" justifyContent="space-between">
        <FormControl isInvalid={!!errors.title}>
          {!isEdition && (
            <Text color={fontColor} fontWeight="500">
              {note.title}
            </Text>
          )}
          {isEdition && (
            <Input
              {...register('title')}
              bgColor="transparent"
              placeholder="Título"
              variant="ghost"
              color={fontColor}
            />
          )}
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <Box onClick={handleFavoriteNote}>
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
              color={fontColor}
              cursor="pointer"
            />
          )}
        </Box>
      </Flex>
      <hr />
      <Box p={isEdition ? '10px' : '0px'}>
        <FormControl isInvalid={!!errors.description}>
          {!isEdition && (
            <Text p="10px" color={fontColor}>
              {note.description}
            </Text>
          )}
          {isEdition && (
            <Textarea
              {...register('description')}
              color={fontColor}
              bgColor="transparent"
              w="100%"
              resize="none"
              placeholder="Criar nota..."
              variant="ghost"
            />
          )}
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Flex
        alignItems="center"
        id="row-options"
        justifyContent="space-between"
        mt="auto"
      >
        <HStack spacing={2}>
          {!isEdition && (
            <Box borderRadius="50%" p="5px">
              <FaPen
                onClick={() => setIsEdition(true)}
                size={18}
                title="Editar nota."
                cursor="pointer"
                color={fontColor}
              />
            </Box>
          )}
          {isEdition && !isSubmitting && (
            <>
              <Box borderRadius="50%" p="5px">
                <IoMdCheckmark
                  onClick={handleSubmit(onUpdate)}
                  color={fontColor}
                  cursor="pointer"
                  size={20}
                  title="Confirmar alteração."
                />
              </Box>
              <Box borderRadius="50%" p="5px">
                <IoMdClose
                  onClick={() => {
                    setIsEdition(false)
                    reset()
                  }}
                  color={fontColor}
                  cursor="pointer"
                  size={20}
                  title="Cancelar."
                />
              </Box>
              <Box ref={ref} position="relative" borderRadius="50%" p="5px">
                <label htmlFor="color-input" style={{ zIndex: 1 }}>
                  <MdOutlineFormatColorFill
                    cursor="pointer"
                    size={20}
                    color={fontColor}
                  />
                </label>
                <Input
                  onFocus={() => (ref.current.style.backgroundColor = 'yellow')}
                  onBlur={() =>
                    (ref.current.style.backgroundColor = 'transparent')
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setColor(e.target.value)
                  }
                  type="color"
                  position="absolute"
                  opacity="0"
                  size="xs"
                  cursor="pointer"
                  top="0"
                  id="color-input"
                />
              </Box>
            </>
          )}
          {isSubmitting && <Spinner color={fontColor} size="md" />}
        </HStack>
        <Flex>
          {!isSubmitting && (
            <FaTrashAlt
              onClick={handleDeleteNote}
              color={fontColor}
              size={20}
              title="Excluir nota."
              cursor="pointer"
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
