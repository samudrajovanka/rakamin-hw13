import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider toastOptions={{
      defaultOptions: {
        position: 'top',
        isClosable: true,
        duration: 5000
      }
    }}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
