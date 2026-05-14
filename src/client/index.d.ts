import { TrainSignboard } from "./ts/boards/TrainSignboard"

declare global {
  interface Window {
    clientVersion: string | undefined | null
    TrainSignboard: TrainSignboard | undefined
    // BusSignboard: BusSignboard | undefined
  }
}

export {}