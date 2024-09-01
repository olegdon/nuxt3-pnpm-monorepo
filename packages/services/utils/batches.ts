import { batch } from './batch'

export function batches<T>(arr: T[], numberOfBatches: number): T[any] | T[any][any] | any {
  return Array.from({ length: numberOfBatches }).map((value, numberOfCurrentBatch) => batch(arr, numberOfBatches, numberOfCurrentBatch))
}
