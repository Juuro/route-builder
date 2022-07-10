**Note:** I did this project during the process of applying for the position of  React Developer at Komoot in 2020. It was the most intense thing I did to date and I can recommend it to everyone to do a programming excercise like this. I learnt so much about React.

# What I have learned
Despite the outcome of my application I have to say I already gained valuable insights from this challenge. Here is what I've learned:

Before this challenge I never worked with maps. I saw that the komoot app uses Leaflet so I also went for it. It was pretty straight forward and I had my first map after a couple of minutes so I was tempted to try out all the things you can do with Leaflet. Especially popups to be able to delete a marker on the map directly seemed to make sense in this case. But I sticked to the screenshot to stay in scope of the challenge.

The Drag and Drop API was also a first for me. It took me a while to get it dialed and look nice without any flickering in the different states. But the bigger challenge here was writing tests for it because I never simulated a drag in a test before. 
I learned that the Drag and Drop API is not fully supported by many mobile browsers. Writing a touch polyfill for the drag and drop API was not really within the scope of the challenge, but I still wanted it to work on touch devices. For this reason I used a small library that provides such a polyfill.

Although we used Content Security Policies in all of our apps in my current job, I never set it up from the ground up. I was surprised how easy it could be done and now I wonder why it is not used more often.

I also played around with the Geolocation API, but it didn't end up in the app eventually. Although I think it is a cool feature I found it a bit interrupting to get asked for the location on first page load. Later when I ran a Lighthouse check I found out that Google even recommends to hide the Geolocation API behind a user action. And because I didn't want to add a button to the given layout I didn't use it in the end. But now I know how it works!

I had to create a mobile style for this app. I think that smaller screen sizes and touch devices make up such a large part of the web that any web application should work on them. For this kind of app I think a PWA makes sense if there are no native mobile apps so I enabled it and configured it in the manifest.json.

Apart from the technical things, I was reminded that I can do a lot in a short time if it is important to me.

Now I am really excited to use some of those technologies in my side projects and maybe at komoot!

## Available Scripts

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn test:coverage`

Calculates test coverage.

### `yarn build`

Builds the app for production to the `build` folder.
