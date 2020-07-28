const { v4: uuidv4 } = require('uuid');

module.exports = function(){
    return {
        id: uuidv4()
    };
}