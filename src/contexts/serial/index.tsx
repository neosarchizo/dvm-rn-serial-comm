import {FC, createContext, useContext, useRef, useMemo, useEffect, useCallback} from 'react'
import {Subject, Subscription} from 'rxjs'
import {DeviceEventEmitter} from 'react-native'
import {actions, RNSerialport, definitions, ReturnedDataTypes} from 'react-native-serialport'

import {SerialManager, Props, SerialEvent} from './types'
import {BAUD_RATE, INTERFACE} from './constants'

const SerialContext = createContext<SerialManager>({
  subscribe: () => {
    return {} as Subscription
  },
})

export const SerialProvider: FC<Props> = (props) => {
  const {children} = props

  const serviceStarted = useRef<boolean>(false)
  const usbAttached = useRef<boolean>(false)
  const connected = useRef<boolean>(false)
  const subject = useRef<Subject<SerialEvent>>(new Subject())

  const manager = useMemo<SerialManager>(() => {
    return {
      subscribe: (callback) => {
        return subject.current.subscribe(callback)
      },
    }
  }, [])

  const handleOnDeviceAttached = useCallback<() => void>(() => {
    usbAttached.current = true
  }, [])

  const handleOnDeviceDetached = useCallback<() => void>(() => {
    usbAttached.current = false
  }, [])

  const handleOnServiceStarted = useCallback<(res: {deviceAttached: boolean}) => void>(
    (res) => {
      const {deviceAttached} = res

      serviceStarted.current = true

      if (deviceAttached) {
        handleOnDeviceAttached()
      }
    },
    [handleOnDeviceAttached],
  )

  const handleOnServiceStopped = useCallback<() => void>(() => {
    serviceStarted.current = false
  }, [])

  const handleOnError = useCallback<(err: Error) => void>((err) => {
    console.log(err)
  }, [])

  const handleOnConnected = useCallback<() => void>(() => {
    connected.current = true
  }, [])

  const handleOnDisconnected = useCallback<() => void>(() => {
    connected.current = false
  }, [])

  const handleOnReadData = useCallback<(data: {payload: number[]}) => void>((data) => {
    const {payload} = data

    const event: SerialEvent = {
      type: 'ON_READ_DATA',
      payload,
    }

    subject.current.next(event)
  }, [])

  useEffect(() => {
    DeviceEventEmitter.addListener(actions.ON_SERVICE_STARTED, handleOnServiceStarted)
    DeviceEventEmitter.addListener(actions.ON_SERVICE_STOPPED, handleOnServiceStopped)
    DeviceEventEmitter.addListener(actions.ON_DEVICE_ATTACHED, handleOnDeviceAttached)
    DeviceEventEmitter.addListener(actions.ON_DEVICE_DETACHED, handleOnDeviceDetached)
    DeviceEventEmitter.addListener(actions.ON_ERROR, handleOnError)
    DeviceEventEmitter.addListener(actions.ON_CONNECTED, handleOnConnected)
    DeviceEventEmitter.addListener(actions.ON_DISCONNECTED, handleOnDisconnected)
    DeviceEventEmitter.addListener(actions.ON_READ_DATA, handleOnReadData)

    return () => {
      DeviceEventEmitter.removeAllListeners()
    }
  }, [
    handleOnServiceStarted,
    handleOnServiceStopped,
    handleOnDeviceAttached,
    handleOnDeviceDetached,
    handleOnError,
    handleOnConnected,
    handleOnDisconnected,
    handleOnReadData,
  ])

  useEffect(() => {
    RNSerialport.setReturnedDataType(definitions.RETURNED_DATA_TYPES.INTARRAY as ReturnedDataTypes)
    RNSerialport.setAutoConnectBaudRate(BAUD_RATE)
    RNSerialport.setInterface(INTERFACE)
    RNSerialport.setAutoConnect(true)
    RNSerialport.startUsbService()

    return () => {
      RNSerialport.isOpen()
        .then((opened) => {
          if (opened) {
            RNSerialport.disconnect()
          }
          RNSerialport.stopUsbService()
        })
        .catch((e) => {
          console.log('RNSerialport isOpen failed', e)
        })
    }
  }, [])

  return <SerialContext.Provider value={manager}>{children}</SerialContext.Provider>
}

export const useSerial: () => SerialManager = () => useContext(SerialContext)
