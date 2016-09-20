'use strict';

const tm = require('../lib');
const pid = process.pid;

const osstat = tm.osstat;

// pass single pid, following `percent` is mean usage percent
/**
{ 
 	sys:{ 
		hostname: 'localhost.localdomain',
 		uptime: '00:03:00',
 		load: [ '0.01', '0.03', '0.02' ],
 		cpu: { 
 			list: [ 
	 			{ 
	 				model: 'Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz',
	    			free: 3665900,
	    			total: 3735700,
	    			percent: '2%' 
	    		} 
    		],
 			percent: '4%' 
 		},
 		mem: { free: '769Mb', total: '993Mb', percent: '23%' } 
 	},
  	procs:[ 
  		{ cpu: 40.740740740741344, memory: 22777856 } 
  	] 
}
 */
Promise.resolve()
.then(() => osstat(pid))
.then((r) => console.log('single', r))
.catch((e) => console.error(e));

// pass multi pid, following `percent` is mean usage percent
/**
{ 
	sys:{ 
		hostname: 'localhost.localdomain',
 		uptime: '00:03:00',
 		load: [ '0.01', '0.03', '0.02' ],
 		cpu: { 
 			list: [ 
	 			{ 
	 				model: 'Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz',
	    			free: 3665900,
	    			total: 3735700,
	    			percent: '2%' 
	    		} 
    		], 
 			percent: '4%' 
 		},
 		mem: { free: '769Mb', total: '993Mb', percent: '23%' } 
 	},
  	procs:[ 
   		{ cpu: 40.740740740741344, memory: 22777856 },
     	{ cpu: 10, memory: 24809472 } 
    ] 
}
 */
Promise.resolve()
.then(() => osstat([pid, pid]))
.then((r) => console.log('multi', r.sys.cpu.list))
.catch((e) => console.error(e));