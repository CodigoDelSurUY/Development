CDS FILE API

Esta API , provee la funcionalidad de acceder al File System de dispositivos utilizando Phonegap.
El codigo escrito hasta el momento es para una app que usa Sencha pero muy facilmente se puede modificar para que funcione con Javascript puro.

Consta de 3 archivos :

-FileWriter.class.js
-FileReader.class.js 
-fileSystem.js


FileWriter y FileReader son clases de Javascript que agrupan codigo "de mas bajo nivel" pues es quien invoca la API de Phonegap. Estos archivos se incluyen como cualquier javascript normal.
'fileSystem' es un controlador de Sencha que es quien implementa las operaciones "write","read"..etc invocando a FileWriter y FileReader

Si simplemente queremos llamar funciones sobre el sistema de archivos y no preocuparnos por su implementacion enfoquemonos en el controlador 'fileSystem'.


Este nos ofrece de las siguientes funciones : 

-createAppCacheDir(path)
-readFile(params)
-writeFile(params)
-deleteFile(params)

----------------------------------------------

createAppCacheDir :
	Esta funcion se invoca al iniciar la aplicacion para generar la estructura de directorios que queremos utilizar.
	El motivo de querer hacer esto es que en Android el directorio de trabajo sera el "/" de la sdcard, entonces tendras por ahi flotando todos los archivos que cree tu aplicacion.
	Entonces si queremos tener nuestros archivos dentro de /myApp/cache/topSecretFolder , debes invocar 
	fileSystem.createAppCacheDir("/myApp/cache/topSecretFolder").
	Es importante que desarrolles un funcion para escuchar el evento "structureInitialized" el cual es disparado cuando los directorios se crearon correctamente. 

---------------------------------------------------------------

readFile : 
	Esta funcion lee el contenido de un archivo.
	Parametros : para invocar esta funcion es necesario proveerle el siguiente objeto como parametro ( los values del json son ejemplos ) 	
	
	params : {
		path : "relativePathToFile"
		successEvent : "readFileOk"
		errorEvent : "errorReadingFile"
	}

	si usamos estos parametros estaremos leyendo el archivo que se encuentra en /myApp/cache/topSecretFolder/relativePathToFile
	y cuando lo lea se disparara el evento "readFileOk" que recibira en un objeto 'params' como parametro, para acceder al contenido debemos hacer 'params.contentRead'.
	En caso de error se disparara "errorReadingFile"

--------------------------------------------------------------------
writeFile : 
	Esta funcion escribe un archivo completamente con el contenido pasado por parametro , si el archivo no existe lo crea y si existe lo sobreescribe

	Parametros : para invocar esta funcion es necesario proveerle el siguiente objeto como parametro ( los values del json son ejemplos ) 	
	
	params : {
		path : "relativePathToFile"
		content : "the content to write in the file"
		eventOnSuccess : "writeFileOk"
		eventOnFail : "errorWritingFile"
	}
	si usamos estos parametros estaremos escribiendo el archivo que se encuentra en /myApp/cache/topSecretFolder/relativePathToFile
	y cuando lo escriba  se disparara el evento "writeFileOk". 
	En caso de error se disparara "errorWritingFile"

--------------------------------------------------------------------------

deleteFile : 
	Esta funcion borra un archivo del file system.
	Parametros : para invocar esta funcion es necesario proveerle el siguiente objeto como parametro ( los values del json son ejemplos ) 	
	
	params : {
		path : "relativePathToFile"		
		eventOnSuccess : "deleteFileOk"
		eventOnFail : "errorDeletingFile"
	}

-------------------------------------------------------------------------- 	

Mejoras.

-Estaria bueno implementar las funciones "doesFileExist" y "appendContentToFile".
-El codigo provisto no funcionara por si solo, pues contiene invocaciones a un objeto que depende de la app donde se usa esta api

Observaciones :
	-Dado el problema "El codigo provisto no funcionara por si solo, pues contiene invocaciones a un objeto que depende de la app donde se usa esta api".

	Solucion : 
		Modificar todas las llamadas al objeto "FWS" a que sean llamadas al objeto que representa tu aplicacion de sencha.
		Por ejemplo si tu aplicacion se llama TuApp tenes que cambiar : 
		FWS.app.fireEvent("structureInitialized");
		por 
		TuApp.app.fireEvent("structureInitialized");















