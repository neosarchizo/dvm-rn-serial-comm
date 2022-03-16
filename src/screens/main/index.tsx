import React, {VFC, useEffect, useCallback, useState} from 'react'

import {Container, Text} from './styles'
import {useSerial} from '../../contexts/serial'
import {SerialEventCallback} from '../../contexts/serial/types'

const Main: VFC = () => {
  const [isA, setIsA] = useState<boolean>(true)
  const serialManager = useSerial()

  const handleOnSerialEvent = useCallback<SerialEventCallback>((event) => {
    const {type, payload} = event

    switch (type) {
      case 'ON_READ_DATA': {
        const value = payload as number[]

        value.forEach((v) => {
          switch (v) {
            case 97: {
              // a
              setIsA(true)
              break
            }
            case 98: {
              // b
              setIsA(false)
              break
            }

            default:
              break
          }
        })
        break
      }
      default:
        break
    }
  }, [])

  useEffect(() => {
    const sub = serialManager.subscribe(handleOnSerialEvent)

    return () => {
      sub.unsubscribe()
    }
  }, [serialManager, handleOnSerialEvent])

  return (
    <Container>
      <Text>{isA ? 'A' : 'B'}</Text>
    </Container>
  )
}

export default Main
