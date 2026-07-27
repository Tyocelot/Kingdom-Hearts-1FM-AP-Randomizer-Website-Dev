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

// Genereate and write individual location html files
function generateLocationHtml(locationsPath, directory) {

    try {
        // Read data and template files
        const data = JSON.parse(fs.readFileSync(`${locationsPath}/${directory}/data.json`, 'utf8'));
        const template = fs.readFileSync(path.join(process.cwd(), '/utils/locationsTemplate.html'), 'utf8');

        console.log(`Successfully read data and template files.`);

        // Build table from data
        const table = buildTable(data.entries);

        // Replace html title and table placeholders
        let page = template.replace(/{title}/g, data.title);
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

// Build the location table
function buildTable(entries) {
    let table = "";

    for (let entry of entries) {
        // Account for a divider element
        if (entry.hasOwnProperty('divider') && entry.divider) {
            table += `
                    <tr>
                        <td ${entry.elementData}</td>
                    </tr>
            `;
        }

        // Build table rows from entry data, if not a divider
        else {
            table += `
                    <tr>
                        <td>${entry.name}</td>
                        <td>${entry.area}</td>
                        <td>${entry.requirements}</td>
                        <td>${entry.description}</td>
                        <td>${buildImage(entry.images)}</td>
                    </tr>
            `;
        };
    };

    return table;
};

// Build the image cell
function buildImage(entryImages) {
    let image = "";

    // Account for only 1 image entry
    if (entryImages.length === 1) {
        let imageElement = "";
        for (const [key, value] of Object.entries(entryImages[0])) {
            imageElement += ` ${key}="${value}"`;
        };
        image += `<img${imageElement}>`;
    }

    // Account for multiple image entries
    else if (entryImages.length > 1) {
        const lastEntry = entryImages.at(-1);

        for (let entryImage of entryImages) {
            let imageElement = "";
            for (const [key, value] of Object.entries(entryImage)) {
                imageElement += ` ${key}="${value}"`;
            };
            image += `<img${imageElement}>`;

            if (entryImage != lastEntry) {
                image += "<br>"
            };
        };
    };

    return image;
};

// Run script
generateLocations();
