const fs = require('fs');
const testFolder = './data';

fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);
})