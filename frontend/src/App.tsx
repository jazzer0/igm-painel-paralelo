import { useState } from 'react'
import { CapagScreen } from './views/CapagScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-[red] inset-0 absolute'>
      <div className='max-w-[1200px] mx-auto flex bg-white'>
        <CapagScreen />
      </div>
    </div>
  )
}

export default App
