import { CapagScreen } from './views/CapagScreen'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/query_client_config'  

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CapagScreen />
      </QueryClientProvider>
    </div>
  )
}

export default App
