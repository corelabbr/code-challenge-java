import { createContext, useContext, useState } from 'react'
import { ContainerScrollCardProps as PageProps } from '../interfaces/pageProps'

interface ContextProps {
  setSearch: (value: string) => void
  search: string
}

export const SearchContext = createContext({} as ContextProps)

export function SearchContextComponent({ children }: PageProps) {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext)
