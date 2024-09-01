/**
 * polyfill for the graphql-tag, we don't use it since it doesn't provide us any
 * benefit and blows up the build size.
 *
 * This has to be a regular function, for arguments to work as expected
 */
export default function (strings: TemplateStringsArray, ...values: any[]): string {
  return strings.map((string, i) => `${string}${values[i] || ''}`).join('')
}
