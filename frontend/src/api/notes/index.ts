import { api } from '..'
import { GetNoteResponse, Note } from '../../interfaces/note'

export const getNotes = async (search: string) => {
  const endpoint = search.length > 0 ? `/notes?search=${search}` : '/notes'
  const { data } = await api.get<GetNoteResponse>(endpoint)
  return data
}

export const createNote = async (body: Note) => {
  const { data } = await api.post('/notes', body)
  return data
}

export const updateNote = async (id: number, body: Note) => {
  const { data } = await api.put(`/notes/${id}`, body)
  return data
}

export const favoriteNote = async (id: number) => {
  const { data } = await api.patch(`/notes/${id}/favorite`)
  return data
}

export const deleteNote = async (id: number) => {
  const { data } = await api.delete(`/notes/${id}`)
  return data
}
