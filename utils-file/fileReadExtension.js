const fs = require('fs')
const path = require('path')
const extensionWithoutDot = require('./extensionWithoutDot')

module.exports = function(folderPath, fileBaseName) {
    const filePrefix = `${fileBaseName}.`
    
    const folderFiles = fs.readdirSync( folderPath );
    const file = folderFiles.find( function( file ) {return file.startsWith(filePrefix);});
    
    return file ? extensionWithoutDot(file) : undefined;
}