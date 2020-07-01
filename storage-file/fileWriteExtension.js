const fs = require('fs')
const path = require('path')

module.exports = function(folderPath, fileBaseName, fileExtension) {
    const newFile = `${fileBaseName}.${fileExtension}`;

    const filePrefix = `${fileBaseName}.`    
    const folderFiles = fs.readdirSync( folderPath );
    const file = folderFiles.find( function( file ) {return file.startsWith(filePrefix);});
    
    if(file){
        fs.renameSync(
            path.join(folderPath, file),
            path.join(folderPath, newFile)
        )
    }
    else{
        fs.writeFileSync(path.join(folderPath, newFile), "")
    }
}