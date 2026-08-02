const fs = require('fs');
const path = require('path');
const Constants = require('./constants.js');

// Generate all location html files based on directory names
function generateLocations() {
    const locationsPath = path.join(process.cwd(), '/locations');
    let directories = [];
    
    try {
        // Read folder contents and return directory entry objects
        directories = fs.readdirSync(locationsPath, { withFileTypes: true })
            .filter(directory => directory.isDirectory()) // Keep only directories
            .map(directory => directory.name);           // Extract the folder names
        
        console.log(`Successfully captured directory names.`);
    } 
    catch (error) {
        console.log(`Error capturing directory names:`, error.message);
    }

    for (let directory of directories) {
        generateLocationHtml(locationsPath, directory)
    };
}

// Generate and write individual location html files
function generateLocationHtml(locationsPath, directory) {

    try {
        // Read template and table files
        const template = fs.readFileSync(path.join(process.cwd(), '/utils/locationsTemplate.html'), 'utf8');
        const table = fs.readFileSync(path.join(process.cwd(), `locations/${directory}/tbody.html`), 'utf8');

        console.log(`Successfully read template and table files.`);

        // Set page title
        const title = directory.replace("_", " ").replace(/\b\w/g, char => char.toUpperCase());

        // Replace html title and table placeholders
        let page = template.replace(/{title}/g, title);
        page = page.replace(/{table}/g, table);

        // Replace difficulty styling placeholders in table
        page = page.replace(/{beginner}/g, Constants.BEGINNER);
        page = page.replace(/{normal}/g, Constants.NORMAL);
        page = page.replace(/{proud}/g, Constants.PROUD);
        page = page.replace(/{minimal}/g, Constants.MINIMAL);

        // Write page html file in specified directory
        fs.writeFileSync(`${locationsPath}/${directory}/index.html`, page, 'utf8');

        console.log(`Successfully created ${directory}/index.html file.`);
    } 
    catch (error) {
        console.error('Error processing files:', error.message);
    };
};

// Run script
generateLocations();
