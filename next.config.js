/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')();

module.exports = withTM({
  eslint: {
    ignoreDuringBuilds: true,
  },
});
