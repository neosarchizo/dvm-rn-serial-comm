import React, {VFC, useCallback} from 'react'

import {Container, Text, Button} from './styles'
import {useSerial} from '../../contexts/serial'

const Main: VFC = () => {
  const serialManager = useSerial()

  const handleOnOnPress = useCallback<() => void>(() => {
    serialManager.write([97])
  }, [serialManager])

  const handleOnOffPress = useCallback<() => void>(() => {
    serialManager.write([98])
  }, [serialManager])

  return (
    <Container>
      <Button onPress={handleOnOnPress}>
        <Text>ON</Text>
      </Button>
      <Button onPress={handleOnOffPress}>
        <Text>OFF</Text>
      </Button>
    </Container>
  )
}

export default Main
