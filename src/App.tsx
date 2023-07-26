import { ReactElement, useEffect } from 'react'
import Menu from './components/Menu/Menu'

function App (): ReactElement {
  useEffect(() => {
    const handleMessage = (event: any): void => {
      if (event?.data?.sender === 'menu-component') {
        console.log('Mensaje recibido:', event.data)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <Menu />
  )
}

export default App
