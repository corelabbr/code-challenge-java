import { z } from 'zod'
import { noteSchema } from '../utils/schema/noteSchema'

export interface INote {
  id: number
  title: string
  description: string
  color: string
  isFavorite: boolean
  createdAt: Date
}

export type NoteFormPayload = z.infer<typeof noteSchema>
export type Note = NoteFormPayload & Pick<INote, 'isFavorite' | 'color'>
export type GetNoteResponse = {
  favoriteNotes: INote[]
  otherNotes: INote[]
}
