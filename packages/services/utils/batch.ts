export function batch<T>(arr: T[], numberOfBatches: number, numberOfCurrentBatch: number | false = false): T[any] | T[any][any] | any {
  const size = Math.ceil(arr.length / numberOfBatches)
  const result = Array.from({ length: numberOfBatches }, (_, i) => arr.slice(i * size, (i + 1) * size))
  return numberOfCurrentBatch !== false ? result[numberOfCurrentBatch] : result
}
