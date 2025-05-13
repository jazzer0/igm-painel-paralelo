import { CapagScreen } from './views/CapagScreen'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/query_client_config'  
import { ThemeProvider } from './components/ui/ThemeProvider'

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <CapagScreen />
        </ThemeProvider>
      </QueryClientProvider>
  )
}

export default App
