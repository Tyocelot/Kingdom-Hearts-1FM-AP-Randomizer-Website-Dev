# Kingdom Hearts 1FM AP Randomizer Website (Dev)

Staging site for [kh1fmrando.com](https://kh1fmrando.com), served at [dev.kh1fmrando.com](https://dev.kh1fmrando.com) via GitHub Pages. Used to try out content/layout changes before they go live on the main site.

This repo was split out from a `dev/` subfolder of the [main site repo](https://github.com/gaithern/Kingdom-Hearts-1FM-AP-Randomizer-Website) so it could be served on its own subdomain — GitHub Pages only supports one custom domain per repo, so the dev content needed a repo of its own. History was preserved during the split.

## Structure

Same plain static HTML/CSS structure as the main repo: per-world guide pages, `header.html` fetched client-side on every page for shared nav, `style.css` for styling, `images/` for assets.

## Workflow

Push changes here first, verify on `dev.kh1fmrando.com`, then port the changes over to the main repo to publish on `kh1fmrando.com`.

## Locations Page Generation
This entire section can be updated and cleaned up after if it's decided to keep these changes or not. I kind of just typed up as much as came to mind.

### Overview
The idea is to streamline content updates for worlds listed as locations, and to organize location related files by grouping them.

### Breakdown
Within the locations directory are additional directories for each location. Each location will include all relevant files to that location. All location data, the locations html page, and any images strictly related to that location would all be included. Routing to a location like so `/locations/100-acre-wood/` would then use that locations `index.html` page with the routing showing as the url path. If needing to access a root page from a location ( or from any nested html page ), the forward slash would be necessary like so `/traverse_town` to indicate that page starts at root. 

Each locations `data.json` file includes all information related to that location. This data is then used in generating a locations `index.html` page. To generate the pages run the `generateLocationsHtml.js` file.

Running `generateLocationsHtml.js` will:
- Parse through the locations directory
- Grab each location directories name
- Grab the data and images in that locations directory
- Use the `locationsTemplate.html` file as a template page per location
- Generate an `index.html` for each location with updated data

With this process there is no need to hard code values directly in a locations html page. 
Updates can be made to the `data.json` file directly.

The `data.json` file structure:
- Title is the name of the location
- Entries is an object where each entry is one row of the location's table
- The entry name, area, requirements, and description are string values
- The entry images array lists object(s) of relevant element data to generate each img element
- Objects with divider set to true are used as row dividers, with the full divider element defined

Notes about `data.json`:
- The entries object is ONLY used for the location page table data
- Entries are added to the table in order of how they are listed
- Dividers can be added anywhere between entries to create new dividers
- The entry requirements included some color styling, which has been streamlined
- Any number of entries, or images, can be added and will update appropriately

Styling updates:
- The `style.css` file has been updated to include global color variables for each difficulty
- The `constants.js` file has been created with values to replace string placeholders for each difficulty
- In `data.json` requirements, placeholders have been added for each difficulty for the values to replace

### Location Directory Structure
```
root
├── locations
│   └── 100-acre-wood
│       ├── data.json
│       ├── index.html
│       └── images
│           └── image.webp
└── utils
    ├── constants.js
    ├── generateLocationsHtml.js
    └── locationsTemplate.html
```

### Notes
Some temporary notes, questions, thoughts about this change. We can remove this section later.

In `header.html` I included two additional locations under `locations_guide` as examples of this change. 
One is root pathing for `/traverse_town` and the other is pathing for the `/locations/100-acre-wood` example.

<!-- 
<a href="/traverse_town">Traverse Town ( With Gen Page Ex )</a>
<a href="/locations/100-acre-wood">100 Acre Wood ( Gen Page Ex )</a> 
-->

#### Questions:
- I changed the name of `100_acre_wood` to `100-acre-wood` because that's my understanding of naming conventions, should this be kept or reverted?
- This changes the url path shown in browser, and will require updates across board for accessing root pages, is this ok?
- Should we keep the directory name `locations` to be consistent with `locations_guide` or rename it to `worlds`?
- The styling update removes the color from the entire text section, and only colors the name of each difficulty, should it be kept this way or reverted?

#### Thoughts
- This is a POC. If we like this I can get started on building out other location directories.
- I just copied the text from `100_acre_wood.html` and added it into `100-acre-wood/data.json`.
- Based on the question answers above I can make changes accordingly. Some might require additional logic.
- Updates to `header.html`, `locations_guide.html`, and other files requiring path updates would be done after all locations are built to avoid breaking site routes.

To generate the location html files, node would need to be installed globally on your machine. I considered adding node here, with a package.json, but I didn't want to overhaul this entire project. I want to keep it as simple, consistant, and close to the source as possible. Not trying to take over anymore than I already have.

I ran `python serve.py` to spin up a local server.
Running `node ./utils/generateLocationsHtml.js` will generate the location html files.
