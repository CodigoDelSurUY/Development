function FileReader_(){};

FileReader_.prototype = {
    fileSystem : null,
    path : null,
    eventonSuccess : null,
    eventOnFail : null,   
    fileSystemNotAvailableMessage : "File System isn't available",        
    readFile : function(){
        if(this.fileSystem!=null){
            this.fileSystem.root.getFile(
                this.path, 
                {},
                this.gotFileEntrySuccess(this),
                this.gotFileError(this)                
            );
        }
        else{
            console.log(this.fileSystemNotAvailableMessage);
        }
    },
    getSize : function(){
    	console.log("lets get size");
    	if(this.fileSystem!=null){
            this.fileSystem.root.getFile(
                this.path, 
                {},
                this.gotFileEntryForGetSizeSuccess(this),
                this.gotFileError(this)                
            );
        }
        else{
            console.log(this.fileSystemNotAvailableMessage);
        }
    },
    
	gotFileError : function(context){		
		return function(evt){
			console.log("Reading file error");
					
            FWS.app.fireEvent(context.eventOnFail);
         }	
	},
	gotFileEntryForGetSizeSuccess : function(context){	
		return function(fileEntry){			
        	return fileEntry.file( context.gotFileForGettingSize(context),context.gotFileError(context));
        }	
	},
	gotFileEntrySuccess : function(context){	
		return function(fileEntry){
        	return fileEntry.file( context.gotFile(context),context.gotFileError(context));
        }	
	},
	gotFileForGettingSize : function(context){
		return function(file){
			
			FWS.app.fireEvent("gotSizeOfFile",file.size);
		}
	
	},
	gotFile : function(context){
		return function(file){
			
			context.readContentFile(file);
		}
	
	},
	readContentFile : function(file){
		var reader = new FileReader();
		console.log("reading content");
		var context = this;
		reader.onloadend = function(evt){			
			var fileContent = new Object();
			fileContent = evt.target.result;
			console.log("read");				
			var params = context.args;
			context.args.contentRead = fileContent;
			FWS.app.fireEvent(context.eventOnSuccess,params);			
		};
		
		reader.readAsText(file);
	},

    
}
