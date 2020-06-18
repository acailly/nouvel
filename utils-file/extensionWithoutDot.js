const path = require('path');

module.exports = function(fileName){
    const extensionWithDotOrEmpty = path.extname(fileName)
    return extensionWithDotOrEmpty === "" ? extensionWithDotOrEmpty : extensionWithDotOrEmpty.substr(1);
}