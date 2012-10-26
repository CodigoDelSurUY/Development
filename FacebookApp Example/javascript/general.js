/**
* FacebookApp.General namespace.
*
* @class FacebookApp.General
*/

var General = FacebookApp.namespace("General");
	
	/**
	* Logs in the console.
	*
	* @namespace FacebookApp.General
	* @method log
	* @param {String} message Message to log.
	*/
	General.log = function (message) {
	    if (console && console.log) {
	        console.log(message);
	    }
	}