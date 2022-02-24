const request = require('request');
const fs = require('fs');
const readline = require('readline');



const fetcher = function(url,path) {
  

  request(url, (error, response, body) => {
    
    // URL results in an error or non-200 result
    if (response.statusCode !== 200) {
      console.log('URL is invalid');
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
          fs.writeFile(path,body,err => {
            if (err) {
              console.log(err);
              return;
            }
            console.log('overwrite done');
            return;
          });
        } else {
          console.log('see you next time!');
          return;
        }
      });
    
    } else {
      fs.writeFile(path,body,err => {
        // Path is not valid
        if (err.errno === -2) {
          console.log('Path not found');
          return;
        }
        //file written successfully
        console.log('done');
        return;
      });
    }
  });
};

fetcher('http://www.example.edu','./index.txt');
// fetcher('http://www.example.edu','./a/index.txt');
// fetcher('https://www.google.com/fdsafsafsa.html','./index.txt');
