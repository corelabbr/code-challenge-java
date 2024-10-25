import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../main'
import {
  getNotes,
  createNote as createNoteRequest,
  favoriteNote as favoriteNoteRequest,
  updateNote as updateNoteRequest,
  deleteNote as deleteNoteRequest,
} from '../api/notes'
import { Note } from '../interfaces/note'
import { useSearchContext } from '../context/SearchContext'

interface IUpdateNote {
  id: number
  note: Note
}

export const useNote = () => {
  const { search } = useSearchContext()

  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => await getNotes(search),
    queryKey: ['notes', search],
  })

  const { mutateAsync: createNote } = useMutation({
    mutationFn: async (body: Note) => await createNoteRequest(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  const { mutateAsync: updateNote } = useMutation({
    mutationFn: async ({ id, note }: IUpdateNote) =>
      await updateNoteRequest(id, note),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  const { mutateAsync: favoriteNote } = useMutation({
    mutationFn: async (id: number) => await favoriteNoteRequest(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  const { mutateAsync: deleteNote } = useMutation({
    mutationFn: async (id: number) => await deleteNoteRequest(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  return {
    notes: { data, isLoading, refetch },
    createNote,
    favoriteNote,
    updateNote,
    deleteNote,
  }
}
