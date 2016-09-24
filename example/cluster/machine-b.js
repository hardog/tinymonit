'use strict';

const Part = require('../../lib').part;

let pt = new Part(3001, {
	timeout: 100, // custom return timeout
	pid: process.pid // process.pid is default
});