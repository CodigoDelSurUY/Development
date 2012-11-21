function FileWriter_(){};

FileWriter_.prototype = {
    fileSystem : null,
    path : null,
    eventonSuccess : null,
    eventOnFail : null,   
    fileSystemNotAvailableMessage : "File System isn't available",  
    dataToWrite : "",
	params : null,
    writeFile : function(){
		if(this.fileSystem!=null){
            
        	this.fileSystem.root.getFile(this.path, {create: true, exclusive: false},this.gotFileEntrySuccess(this) ,this.gotFileEntryError(this) );
		}
        else{
            
            FWS.app.fireEvent(this.eventOnFail,this.params);
            console.log(this.fileSystemNotAvailableMessage);
        }
    },
	createDir : function(){
		if(this.fileSystem!=null){
        	this.fileSystem.root.getDirectory(this.path, {create: true, exclusive: false},this.gotDirectoryEntrySuccess(this) ,this.gotDirectoryEntryError(this) );
		}
        else{
            console.log(this.fileSystemNotAvailableMessage);
        }
    },
	removeFile : function(){
		if(this.fileSystem!=null){
        	this.fileSystem.root.getFile(this.path, {},this.gotFileEntryToRemoveSuccess(this) ,this.gotFileEntryError(this) );
		}
        else{
            
            FWS.app.fireEvent(this.eventOnFail);
            console.log(this.fileSystemNotAvailableMessage);
        }
    },
	
	gotFileEntryToRemoveSuccess : function(context){
		return function (fileEntry){
			fileEntry.remove(context.fileRemovedSuccessfully,context.fileRemovedWithError);
		}
	
	
	},
	
    gotFileEntrySuccess : function(context){
        return function (fileEntry){        
           
            fileEntry.createWriter(context.gotFileWriterSuccess(context),context.gotFileWriterError(context));
        }
    },
    gotFileWriterSuccess : function(context){
        return function (writer){            
            writer.onwrite = function(evt) {
		        console.log("written");
                FWS.app.fireEvent(context.eventOnSuccess,context.params);
                delete context.dataToWrite;
            };	        
            
            console.log("writing");            
            writer.write(context.dataToWrite);
        }
    },
	gotFileEntryError : function(context){
        return function (evt){        
            FWS.app.fireEvent(context.eventOnFail,this.dataToWrite);
        }
    },
    gotFileWriterError : function(context){
        return function (evt){        
            FWS.app.fireEvent(context.eventOnFail,this.dataToWrite);
        }
    },
	gotDirectoryEntrySuccess : function(context){
        return function (dirEntry){        
            console.log("directory created");
            FWS.app.fireEvent(context.eventOnSuccess);
        }
    },
	gotDirectoryEntryError : function(context){
        return function (evt){        
            FWS.app.fireEvent(context.eventOnFail,this.dataToWrite);
        }
    },
	fileRemovedSuccessfully : function(){
		console.log("file removed successfully");
	},
	fileRemovedWithError : function(){
		console.log("error removing file");
	}

    
    
}
