import { useId } from 'vue'

export default function useUid() {
  return { uid: useId(), generateUid: useId }
}
