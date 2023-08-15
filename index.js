const inquirer = require('inquirer');
const fs = require('fs');  // Import the 'fs' module

// Prompt the user for input using inquirer
inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the project title:',
      
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter project description:',
      
    },
    {
      type: 'input',
      name:'installation',
      message:'What is the installation instructions?',
      
    },
    {
      type: 'input',
      name:'usage',
      message:'Type the usage information',
      
    },
    {
      type: 'input',
      name:'contribute',
      message:'Type the contribution guidelines',
    },
    {
      type: 'input',
      name:'tests',
      message:'Type the test instructions',
    },
    // use list type for license
    {
      type: 'list',
      name:'license',
      message:'Which license you use?',
      choices:['MIT','GPL','Apache License','N/A'],
      
    },
    {
      type: 'input',
      name:'username',
      message:'What is your github user name?',
      
    },
    {
      type: 'input',
      name:'email',
      message:'What is your email address?',
      
    },
])
//log the response and creating a template for a README file and using the title property from the response
  .then((response) =>{
    console.log(response)
    let template = 

`# ${response.title}

## Description
${response.description}
    
## Table of Contents
    
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contribute](#contribute)
- [Tests](#tests)
- [Username](#username)
- [Email](#email)

## Installation
${response.installation}

## Usage
${response.usage}


## License
${getBadge(response.license)}

## Contribute
${response.contribute}

## Tests
${response.tests}

## Username
${response.username}

## Email
${response.email}
`
    writeToFile(template);
  }
  //  response.title === response.description
  //  ? console.log("Success!")
  //  : console.log("Failed!")
  )

function writeToFile(template){
// Write the 'template' content to the './output/README.md' file   
fs.writeFile('./output/README.md', template, (err) => {  
 if (err) throw err; // If there's an error, throw it
      
});
  }
//getBadge function takes a license parameter and returns a badge image URL based on the provided license
function getBadge(license){
switch(license){
  //the switch statement is working for, If the license is "MIT", it returns a badge for the MIT license.
  case "MIT":{return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"}
  //If the license is "Apache License", it returns a badge for the Apache License version 2.0.
  case "Apache License":{return "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"}
  //If the license is "GPL", it returns a badge for the GNU General Public License version 3.
  case "GPL": {return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"}
  //If the license doesn't match any of the above cases, it returns the string "N/A".
  default: {return "N/A"}
}
}