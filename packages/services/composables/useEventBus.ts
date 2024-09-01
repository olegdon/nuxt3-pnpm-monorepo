import mitt from 'mitt'

// eslint-disable-next-line ts/consistent-type-definitions
type ApplicationEvents = {
  'user:login': any
}

const emitter = mitt<ApplicationEvents >()

export const useEvent = emitter.emit
export const useListen = emitter.on
