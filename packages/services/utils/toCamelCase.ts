export function toCamelCase(str: string): string {
  return str.replace(/(?:^|_)(.)/g, (_, char) => char.toUpperCase())
}
