const uid = ref(0)

function generateUid() {
  // @ts-expect-error useId is global
  if (typeof useId !== 'undefined')
    // @ts-expect-error useId is global
    return useId()
  else
    return `uid_${String(uid.value++)}`
}

export default function useUid() {
  return {
    uid: generateUid(),
    generateUid,
  }
}
