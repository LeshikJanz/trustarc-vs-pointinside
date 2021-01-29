// Do not compile pointinside.js on SSR
module.exports = typeof window !== 'undefined' ? require('./pointinside') : {}
