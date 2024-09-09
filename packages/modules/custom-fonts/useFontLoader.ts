import fg from 'fast-glob'
import { basename as _basename, extname } from 'pathe'

export function useFontLoader(family: any, options = { display: 'swap', rel: '', assetDir: '/_nuxt' }) {
  const sources = Array.isArray(family) ? family : [family]

  const name = 'virtual-fontface-css'
  const fonts = fontLoader(sources, options)
  const styles = createFontFaceStyles(fonts)
  const fontVitePlugin = createVitePlugin(styles, name, options.assetDir)
  const fontAssetCssName = `virtual:${name}/font-face.css`
  const fontTailwindConfig = createTailwindConfig(sources)
  const fontHeaderLinks = createHeaderLinks(fonts)

  return {
    fontVitePlugin,
    fontAssetCssName,
    fontTailwindConfig,
    fontHeaderLinks,
  }
}

function createTailwindConfig(sources: any) {
  const tailwindConfig: any = {}

  for (const source of sources)
    tailwindConfig[source.type] = source.local || source.name

  return tailwindConfig
}

function createVitePlugin(styles: string, name: string, assetDir: string) {
  return {
    name,
    outputOptions(options: any) {
      options.assetFileNames = (assetInfo: any) => ['ttf', 'woff', 'woff2', 'otf', 'svg'].some(font => assetInfo.name.includes(font)) ? `${`${assetDir}/` || ''}[name][extname]` : `${`${assetDir}/` || ''}[name].[hash][extname]`
      return options
    },
    resolveId(id: string) {
      if (id.includes(`virtual:${name}/font-face.css`))
        return id
    },
    load(id: string) {
      if (id.includes(`virtual:${name}/font-face.css`)) {
        return {
          code: styles,
          map: null,
        }
      }
    },
  }
}

function createHeaderLinks(fonts: Array<any>) {
  const headerLinks: Array<any> = []
  for (const font of fonts) {
    if (!font.rel)
      return

    headerLinks.push({
      rel: font.rel,
      href: font.asset,
      as: 'font',
      type: `font/${font.format}`,
      crossorigin: '',
    })
  }

  return headerLinks
}

function createFontFaceStyles(fonts: Array<any>) {
  let styles = ''
  for (const font of fonts) {
    styles += `
@font-face {
  font-family: '${font.name}';
  src: url('${font.url}') format('${font.format}'), local('${font.local}');
  font-weight: ${font.weight};
  font-style: ${font.style};
  font-display: ${font.display};
}`
  }

  return styles
}

function fontLoader(sources: Array<{ rel: string, display: string, src: string | string[], name: string, local?: string, dst?: string }>, options: any) {
  const fonts: Array<any> = []
  for (const source of sources) {
    const results = fg.sync(source.src, { absolute: true, onlyFiles: true })
    for (const file of results) {
      const ext = extname(file)
      const basename = _basename(file, ext)

      const format = {
        '.woff': 'woff',
        '.woff2': 'woff2',
        '.ttf': 'truetype',
        '.otf': 'opentype',
        '.svg': 'svg',
      }[ext] || ext.replace('.', '')

      const weight = extractWeight(basename)
      const style = extractStyle(basename)
      const local = source.local || source.name

      fonts.push({
        format,
        weight,
        style,
        local,
        name: source.name,
        display: source.display || options.display,
        rel: source.rel || options.rel,
        url: `${source.dst}${basename}${ext}`,
        asset: `${options.assetDir}/${basename}${ext}`,
      })
    }
  }

  return fonts
}

function extractWeight(filename?: string): number {
  if (!filename)
    return 400

  filename = filename.toLowerCase()

  const weights: Record<string, number> = {
    'thin': 100,
    'extralight': 200,
    'ultralight': 200,
    'extra-light': 200,
    'ultra-light': 200,
    'light': 300,
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'demibold': 600,
    'extrabold': 800,
    'ultrabold': 800,
    'semi-bold': 600,
    'demi-bold': 600,
    'extra-bold': 800,
    'ultra-bold': 800,
    'bold': 700,
    'black': 900,
    'heavy': 900,
  }

  for (const key in weights) {
    if (filename.includes(key))
      return weights[key]
  }

  return 400
}

function extractStyle(filename?: string): 'normal' | 'italic' | 'oblique' {
  if (!filename)
    return 'normal'

  const lowerFilename = filename.toLowerCase()

  for (const style of ['normal', 'italic', 'oblique']) {
    if (lowerFilename.includes(style))
      return style as 'normal' | 'italic' | 'oblique'
  }

  return 'normal'
}
