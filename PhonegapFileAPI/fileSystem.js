Ext.define('FWS.controller.storage.fileSystem', {
    extend: 'Ext.app.Controller',
        
    init : function(){
        this.basePath = ""; 
        FWS.app.on({       
            //called to keep creating the subdirs of the path    
            appCacheSubdirCreated: function() {
                var subdir, index;                
                subdir = "";
                index = 0;
                this.basePathSubdirsCreated++;                
                if (this.basePathSubdirsCreated < (this.basePathArray.length-1)) {
                    for (index = 0; index <= (this.basePathSubdirsCreated); index++) {
                        if (index != 0) {
                            subdir = subdir + "/";
                        }
                        subdir = subdir + this.basePathArray[index];
                    }                    
                    this.createDir(subdir, "appCacheSubdirCreated");                    
                } else {
                    //all the folders of the path were created successfully 
                    //IMPORTANT : "structureInitialized" event is fired to let the app know of this success                    
                    FWS.app.fireEvent("structureInitialized");
                }
            },
            scope: this,
            appCacheSubdirCreateError: function() {
                console.log("appCacheSubdirCreateError");
            },
            scope: this,
        })
    },

    //try to get the device's File System
    initialize : function(params){   
        if (FWS.Context.usingDevice()){     
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.gotFS, this.generalFail);       
        }
        else{
            console.log("Error accessing FS");
            FWS.app.loadMainView(); 
        }
        
    },    
    
    createDir : function(name,eventToFire){
        console.log("creating dir " + name );
        var fileWriter = new FileWriter_();
        fileWriter.fileSystem = this.fileSystem;
        fileWriter.path = name;
        fileWriter.eventOnSuccess = eventToFire;
        fileWriter.eventOnFail = "FileCreationError";           
        fileWriter.createDir();
    },    
    deleteFile : function(eventOnSuccess){
        console.log("deletingFile: " + this.basePath + path);
        var fileWriter = new FileWriter_();
        fileWriter.fileSystem = this.fileSystem;
        fileWriter.path = this.basePath +  params.path;
        fileWriter.eventOnSuccess = params.eventOnSuccess;
        fileWriter.eventOnFail = params.eventOnFail;        
        fileWriter.dataToWrite = {};
        fileWriter.callbackEventArgs = {};
        fileWriter.removeFile();    
    },
    doesFileExist : function(elementType , uuid){
       //not implemented yet        
    },
    readFile : function (params){
        console.log("reading file " + this.basePath + params.path);
        var fileReader = new FileReader_();
        fileReader.fileSystem = this.fileSystem;
        fileReader.path = this.basePath + params.path;
        fileReader.eventOnSuccess = params.successEvent;
        fileReader.eventOnFail = params.errorEvent;        
        fileReader.args = params;
        fileReader.readFile();
    },

    writeFile : function(params){
        console.log("writing file " + this.basePath + params.path );
        var fileWriter = new FileWriter_();
        fileWriter.fileSystem = this.fileSystem;
        fileWriter.path = this.basePath + params.path;
        fileWriter.eventOnSuccess = params.eventOnSuccess;
        fileWriter.eventOnFail = params.eventOnFail;
        fileWriter.dataToWrite = params.content;
        fileWriter.params = params;
        fileWriter.writeFile();        
    },
   
    appendToFile : function (path,eventToFire, content){
        //not implemented yet
    },           
    
    /* callbacks called when the file system is go */
    gotFS : function(fileSystem){
        console.log("got File System");
        FWS.app.getController('storage.fileSystem').setFileSystem(fileSystem);
    },    
    generalFail : function(evt){
        console.log("File system error " + evt.target.error.code);
        FWS.Context.displayFatalError(); 
    },


    setFileSystem : function(fileSystem){
        this.fileSystem = fileSystem;
        FWS.app.getController("storage.StorageController").setFileSystemStructure();         
                      
    },

    //create the folders structure to store the data
    createAppCacheDir: function(path) {
        var subdir;        
        this.basePathArray = path.split("/");
        this.basePathSubdirsCreated = 0;
        subdir = this.basePathArray[0];     
        this.basePath = path;   
        //create the first subdirectory of the path , when it finishes fire "appCacheSubdirCreated" event
        this.createDir(subdir, "appCacheSubdirCreated");        
    },
           
        
})