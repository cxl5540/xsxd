/*import axios from "axios"*/

const config = {
    Ticket:'7a814a4d38d01a4fa65f77dc416bd27a',
    EMPUID:'',
    SYSTEMID:'',
}

let bindToGlobal=function(obj, key){
	  if (typeof window[key] === 'undefined') {
         window[key] = {};
     }

     for (let i in obj) {
         window[key][i] = obj[i]
     }
} 

bindToGlobal(config,'_const')







