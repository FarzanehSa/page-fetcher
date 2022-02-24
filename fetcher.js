const request = require('request');
const fs = require('fs');
const readline = require('readline');

// write function
const writeBody = (path,body) => {
  fs.writeFile(path,body,err => {
    // Path is not valid
    if (err && err.code === 'ENOENT') {
      console.log('Path not found');
      return;
    }
    //file written successfully
    console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
  });
};

// ---------------------------------------------------

const fetcher = function(url,path) {
  
  request(url, (error, response, body) => {
    
    // URL results in an error or non-200 result
    if (error) {
      console.log("Can't download URL");
      return;
    }
    
    // file path already exists
    if (fs.existsSync(path)) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('Path already exit! Want to over-write? y / anyother key    ', (answer) => {
        rl.close();
        if (answer === 'y') {
          writeBody(path,body);
        } else {
          console.log('see you next time!');
          return;
        }
      });
      
    } else {
      writeBody(path,body);
    }
  });
};

// ------------------------------------------

const input = process.argv.slice(2);
if (input.length !== 2) {
  console.log('\nWe are going to Download and Save');
  console.log('After app name, insert URL & Path \n');
  return;
}

const url = input[0];   //  http://www.example.edu 
const path = input[1];  //  ./index.txt

fetcher(url,path);



