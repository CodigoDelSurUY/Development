Sencha Command:

	Creating Controller:

		sencha generate controller --name ControllerName

		example: sencha generate controller --name HomeViewController

	Creating Model:

		sencha generate view --name ModelName

		example: sencha generate model --name UserModel

	Creating Builds:

		sencha app build package|testing|production

		example: sencha app build package

	Adding external .js to project:

		Add paths inside "js" array in app.json file situated at the project root folder.
		For example to include cordova.js just include: "path": "./cordova-2.1.0.js"

		"js": [
	        {
	            "path": "./cordova-2.1.0.js"
	        },
	        {
	        	"path": "sdk/sencha-touch.js"
	        },
	        {
	            "path": "app.js",
	            "bundle": true,  /* Indicates that all class dependencies are concatenated into this file when build */
	            "update": "delta"
	        }
	    ],