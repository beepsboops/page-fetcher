// REQUIRE

const request = require('request');
const fs = require('fs');
const readline = require('readline');
// const https = require('https');


/* REQUEST SAMPLE

const request = require('request');
request('http://www.google.com', (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

*/

// FETCHER FUNCTION

const input = process.argv.slice(2);
const url = input[0];
const pathToFile = input[1];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// console.log("-------------")
// console.log("CLI input:", input);
// console.log('url', url)
// console.log('file to download', pathToFile)
// console.log("-------------")

const fetcher = function() {
  
  request(`${url}`, (error, response, body) => {

    if (error) {
      console.log(`An error occured making a request to ${url}. Go do something else.`);
      return;
    }

    if (response.statusCode < 200 || response.statusCode >= 300) {
      console.log("No bueno. Status code no good. Status code: ", response.statusCode);
      return;
    }

    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
  
    fs.writeFile(pathToFile, body, err => {
    
      if (err) {
        console.error("Some kind of writeFile error.", err);
        return;
      }
    
      const stats = fs.statSync(pathToFile);
      const fileSizeInBytes = stats.size;
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${pathToFile}`);
      // exit(0)

    });
  });
};

// fetcher();

try {
  console.log(pathToFile);
  if (fs.existsSync(pathToFile)) {
    //file exists
    rl.question('File already exists. Do you want to overwite? ', (answer) => {
      
      if (answer === "Y") {
        fetcher();
      }
      
      rl.close();
    });
  } else {
    fetcher();
    rl.close();
  }
} catch (err) {
  console.error("Some error");
}

/* OLD NON WORKING CODE

const fetcher = function(input) {
  const url = input[0];
  const pathToFile = input[1];
  let fileToWrite;

  request(`${url}`, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
  });


  const downloadFile = function() {

    const options = {
      hostname: url,
      port: 443,
      path: pathToFile,
      method: 'GET'
    }
  
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
    
      res.on('data', d => {
        fs.writeFile('myDownload.txt', d, (err) => {
          if (err) throw err;
            console.log("Success!")
        })
      })
    })
    
    req.on('error', error => {
      console.error(error)
    })
    
    req.end()
  };

  downloadFile()



    // fs.writeFile('myDownload.txt', fileToWrite, (err) => {
    //   if (err) throw err;
    //     console.log("Success!")
    // })
    


};


fetcher(input);

*/