## Install

You will need npm and node to build and develop this from source.
You can install npm from [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

In the project directory, run
#### `npm install`
to install the dependencies.\
A full list of dependencies can be found [here](DEPENDENCIES.md).

## Available Scripts
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

To learn React, check out the [React documentation](https://reactjs.org/).

## Run on Chrome 

You must have already run `npm install` begin working on the extension.\
Once you have done that, you can run `npm build` to build the extension to the build directory.\
After this, on chrome: 
- Navigate to `chrome://extensions`
- Enable "Developer mode" in the top right corner of the page
- Click on the "Load unpacked" button
- Navigate to the build directory and open the `build/` folder

Once you have done this, you will see the Advanced Browser History extension appear in the list of extensions.\
You can enable and disable it with the toggle. 
You can also reload the extension by clicking the reload button instead of removing it and loading it back from unpacked.\
You can see the logs from the background process in the console by clicking on "Inspect view service worker" on this screen.\
When you are done with development, you can uninstall the extension by clicking the "Uninstall" button.

## Developement

Before committing please read through the format specifications [here](FORMAT.md).
