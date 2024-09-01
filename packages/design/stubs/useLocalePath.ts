export function useLocalePath() {
  return (_args: any) => `#${JSON.stringify(_args)}`
}
