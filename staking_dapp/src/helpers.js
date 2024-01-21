export const feltToString = felt =>

    felt.toString(16).match(/.{2}/g).map(c => String.fromCharCode(parseInt(c, 16))).join("")
