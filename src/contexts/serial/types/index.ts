import {ReactNode} from 'react'
import {Subscription} from 'rxjs'

export interface Props {
  children: ReactNode
}

export type SerialEventType = 'ON_READ_DATA' | 'SOMETHING'

export interface SerialEvent {
  type: SerialEventType
  payload
}

export type SerialEventCallback = (event: SerialEvent) => void

export interface SerialManager {
  subscribe: (callback: SerialEventCallback) => Subscription
  write: (value: number[]) => void
}
