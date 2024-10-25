import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

type ToastProps = Pick<UseToastOptions, 'title' | 'description'>

export const useToast = () => {
  const toast = useChakraToast()
  const defaultOptions = {
    duration: 3000,
    isClosable: true,
  }

  const success = (body: ToastProps) =>
    toast({
      ...defaultOptions,
      ...body,
      status: 'success',
    })

  const error = (body: ToastProps) =>
    toast({
      ...defaultOptions,
      ...body,
      status: 'error',
    })

  return {
    success,
    error,
  }
}
