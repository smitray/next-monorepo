Object.defineProperty(exports, '__esModule', { value: true });
const next = require('next');

const nextApp = next.default({
  dev: process.env.NODE_ENV !== 'production',
  dir: __dirname,
});
exports.default = nextApp;
