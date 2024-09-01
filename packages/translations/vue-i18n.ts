const baseNumbers = {
  decimal: {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  percent: {
    style: 'percent',
    useGrouping: false,
  },
}

const europeanNumbers = {
  ...{
    currency: {
      style: 'currency',
      currency: 'EUR',
      notation: 'standard',
    },
  },
  ...baseNumbers,
}

const swissNumbers = {
  ...{
    currency: {
      style: 'currency',
      currency: 'CHF',
    },
  },
  ...baseNumbers,
}

const europeanDatetimeFormats = {
  month: {
    year: 'numeric',
    month: 'long',
  },
  short: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
  time: {
    hour: '2-digit',
    minute: '2-digit',
  },
}

export default {
  datetimeFormats: {
    'de-DE': europeanDatetimeFormats,
    'es-ES': europeanDatetimeFormats,
    'it-IT': europeanDatetimeFormats,
    'pl-PL': europeanDatetimeFormats,
    'de-AT': europeanDatetimeFormats,
    'de-CH': europeanDatetimeFormats,
  },
  numberFormats: {
    'de-DE': europeanNumbers,
    'es-ES': europeanNumbers,
    'it-IT': europeanNumbers,
    'pl-PL': europeanNumbers,
    'de-AT': europeanNumbers,
    'de-CH': swissNumbers,
  },
}
