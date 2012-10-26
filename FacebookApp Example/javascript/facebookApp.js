/**
* FacebookApp global var.
*
* @class FacebookApp
*/
var FacebookApp = {

	/**
	* Creates new namespace inside FacebookApp global var.
	*
	* @namespace FacebookApp
	* @method namespace
	* @param {String} name Name of the namespace.
	* @return {Object} The new namespace.
	*/
	namespace: function(name) {
		var parts = name.split("."),
			object = this,
			i, length;

		for (i = 0, length = parts.length; i < length; i++) {
			object[parts[i]] = object[parts[i]] || {};
		}

		return object;
	}

}