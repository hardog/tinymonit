# tinymonit

[![Build Status](https://travis-ci.org/hardog/tinymonit.svg?branch=master)](https://travis-ci.org/hardog/tinymonit)
[![Coverage Status](https://img.shields.io/codecov/c/github/hardog/tinymonit.svg)](https://codecov.io/github/hardog/tinymonit?branch=master)
[![License](https://img.shields.io/npm/l/tinymonit.svg)](https://www.npmjs.com/package/tinymonit)
[![npm Version](https://img.shields.io/npm/v/tinymonit.svg)](https://www.npmjs.com/package/tinymonit)

collect the cpu & mem information from the specified machine(remote or local), supports cluster mode which gather all stats from config list!

# Feature list

- gather system cpu usage
- gather system mem usage
- gather specified process cpu & mem usage
- judge if over the threshold
- support cluster mode

# Install

`$ npm install tinymonit -g`

# Usage

## Get system stat

## Examples

- [get process stat](./example/proc_stat.js)
- [get system stat](./example/sys_stat.js)
- [how to use alarm](./example/threshold.js)
- [single mode](./example/single)
- [cluster mode](./example/cluster)

## License

MIT
