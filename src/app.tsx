import React, {VFC} from 'react'

import {Container} from './styles'
import Main from './screens/main'
import {SerialProvider} from './contexts/serial'

const App: VFC = () => {
  return (
    <SerialProvider>
      <Container>
        <Main />
      </Container>
    </SerialProvider>
  )
}

export default App
