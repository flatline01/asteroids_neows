# JavaScript Interview Test

## Backend 
We will be running a basic Node/Express backend for this project. We will use the backend to auth/key and pull from the nasa endpoint. While this particular API is fairly open, we should still protect our keys per best practice. This project will run `dotenv` so that we can adhere to the principles here: https://12factor.net/config. There is a `.env.example` file in the root of the folder. Copy this, rename it `.env` and add your key. On a server, these would be loaded from  `process.env` in a node enviroment, or `$_SERVER` on a php based back end.

We will add an `/api` endpoint and use the node server as middleware.

We will run the back end off of port 3001, so that we can run the react dev server off of port 3000. When put into production, the backend will serve the react production bundle off of the site root and/or port 3001.

## Front end

Images and video assets from https://www.pexels.com/

## Additional Notes:
Api returns absolute_magnitude_h, which is not `visual magnitude` requested below.

* https://www.universeguide.com/fact/absoluteapparentandvisualmagnitudes
* https://cneos.jpl.nasa.gov/glossary/h.html

Not sure how to derive this.

We will be deploying with the react app in dev mode.

## To Do
* More styling. Esp Mobile.
* more text formatting
* finish sorting buttons
* add date setting

## Assignment

Using any framework, resources, libraries, etc you'd like to use, we would like
for you to create an interactive HTML/JS table widget that shows the user data
from NASA's NeoWs.

Required columns:   
 - id
 - name
 - est diameter in meters
 - is potentially hazardous
 - is sentry object
 - velociy (km/h)
 - miss distance (km)
 - visual magnitude
 - close approach date / time

Brownie points:
 - Allow user to specify start / end times   
 - Allow user to free form text search
 - Allow user to sort
 - Anything else you may think the user would benefit from

## Get Started

Go to https://api.nasa.gov/

Click "Generate API Key", fill out form, copy your new key.

Then click "Browse APIs", then click "Asteroids NeoWs".

Using this documentation, complete the assignment above.