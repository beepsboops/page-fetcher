// REQUIRE

const request = require('request');
const fs = require('fs');
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
const fileToDownload = input[1];

// console.log("-------------")
// console.log("CLI input:", input);
// console.log('url', url)
// console.log('file to download', fileToDownload)
// console.log("-------------")

const fetcher = function() {
  
  request(`${url}`, (error, response, body) => {
    
    console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
  
    fs.writeFile('myDownload.txt', body, err => {
    
      if (err) {
        console.error(err);
        return;
      }
    
      const stats = fs.statSync("myDownload.txt");
      const fileSizeInBytes = stats.size;
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${fileToDownload}`);

    });
  });
};

fetcher();

/* OLD NON WORKING CODE

const fetcher = function(input) {
  const url = input[0];
  const fileToDownload = input[1];
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
      path: fileToDownload,
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