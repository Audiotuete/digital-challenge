export const dictionary = { 
  de: { 
    messages: {
    _default: (field) => `${field} ist ungültig.`,
    after: (field, [target]) => `${field} muss nach ${target} liegen.`,
    alpha_dash: (field) => `${field} darf nur Buchstaben, Zahlen sowie Striche und Unterstriche enthalten.`,
    alpha_num: (field) => `${field} darf nur Buchstaben und Zahlen enthalten.`,
    alpha: (field) => `${field} darf nur alphabetische Zeichen enthalten.`,
    before: (field, [target]) => `${field} muss vor ${target} liegen.`,
    between: (field, [min, max]) => `${field} muss zwischen ${min} und ${max} liegen.`,
    confirmed: (field, [confirmedField]) => `${confirmedField} und ${field} sind nicht identisch.`,
    date_between: (field, [min, max]) => `${field} muss zwischen ${min} und ${max} liegen.`,
    date_format: (field, [format]) => `${field} muss das Format ${format} haben.`,
    decimal: (field, [decimals = '*'] = []) => `${field} muss numerisch sein und darf ${decimals === '*' ? '' : decimals} Dezimalpunkte enthalten.`,
    digits: (field, [length]) => `${field} muss numerisch sein und exakt ${length} Ziffern enthalten.`,
    dimensions: (field, [width, height]) => `${field} muss ${width} x ${height} Bildpunkte groß sein.`,
    email: (field) => `${field} ist keine gültige Adresse.`,
    ext: (field) => `${field} muss eine gültige Datei sein.`,
    image: (field) => `${field} muss eine Grafik sein.`,
    included: (field) => `${field} muss ein gültiger Wert sein.`,
    ip: (field) => `${field} muss eine gültige IP-Adresse sein.`,
    max: (field, [length]) => `${field} darf nicht länger als ${length} Zeichen sein.`,
    mimes: (field) => `${field} muss einen gültigen Dateityp haben.`,
    min: (field, [length]) => `${field} muss min. ${length} Zeichen haben.`,
    excluded: (field) => `${field} muss ein gültiger Wert sein.`,
    numeric: (field) => `${field} darf nur numerische Zeichen enthalten.`,
    regex: (field) => `Das Format von ${field} ist ungültig.`,
    required: (field) => `${field} ist ein Pflichtfeld.`,
    size: (field, [size]) => `${field} muss kleiner als ${formatFileSize(size)} sein.`,
    url: (field) => `${field} ist keine gültige URL.`,
    }
  }
}
/**
 * Formates file size.
 *
 * @param {Number|String} size
 */
export const formatFileSize = (size) => {
  const units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const threshold = 1024;
  size = Number(size) * threshold;
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
  return `${(size / Math.pow(threshold, i)).toFixed(2) * 1} ${units[i]}`;
};