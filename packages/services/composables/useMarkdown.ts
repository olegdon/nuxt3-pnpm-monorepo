import { micromark } from 'micromark'

function asHtml(input: string = ''): string {
  input = input || ''
  input = input.replace(/\n/g, '\n\n')
  input = input.replace(/^\n\n\n/gm, '\n&nbsp;\n\n')
  input = input.replace(/# \*\*([^*]+)\*\*/g, '# $1')
  input = input.replace(/ \*\* ([^*]+) \*\* /g, '**$1**')
  input = input.replace(/\*\*([^*]+) \*\*/g, '**$1**')
  input = micromark(input)
  input = input.replace(/(https:\/\/cdn-assets-cms.imgix.net[^"]+)g/, (result) => {
    const url = new URL(result)

    return `${url.origin}${encodeURIComponent(url.pathname).replace(
      /%2F/g,
      '/',
    )}${url.search}`
  })

  return input
}

function asPlain(input: string): string {
  return asHtml(input).replace(/<[^>]+(>|$)/g, '')
}

export function useMarkdown() {
  return { asHtml, asPlain }
}
