# What I have learned
Despite the outcome of my application I have to say I already gained valuable insights from this challenge. Here is what I've learned:

Before this challenge I never worked with maps. Although I have a side project where I collect locations of concert venues I never finished my plan to show them on a map in the app. I saw that the komoot app uses Leaflet so I also went for it. It was pretty straight forward and I had my first map after a couple of minutes. I was tempted to try out all the things you can do with Leaflet. Especially popups to be able to delete a marker on the map directly seemed to make sense in this case. But I sticked to the screenshot to stay in scope of the challenge.

Especially interesting to me was the Geolocation API. I know this was not in the scope but I thought it would make sense here. It was not very difficult to get a location from the browser. I know that it is not good practice to ask for a location on the initial page load. But I didn't want to add an additional button to the layout and I think for this demonstration purposes it's ok. In a real app I would definately only ask for a location after a user action so the user knows better why he should give the app this private information.

I also never worked with the Drag and Drop API. It took me a while to get it dialed and look nice without any flickering in the different states. But the bigger challenge here was writing tests for it. I never simulated a drag in a test before. But in the end I got it all tested. I learned that the Drag and Drop API is not fully supported by many mobile browsers. As I looked into it I noticed that it could be a little tricky to fix that and because the mobile part was already not offcially a part of the challenge I didn't want to add more complexity here. That's why I used a small library in the app (the only one except from Leaflet) as a polyfill. 😬

Although we used Content Security Policies in all of our apps in my current job, I never set it up from the ground up. I was surprised how easy it could be done and now I ask myself why it is not used more often.

I had to create a mobile style for this app. I think smaller screensizes and touch devices such a big part of the web, every web app should work on them. For this kind of app I think a PWA makes sense if there are no native mobile apps so I enabled it and configured it in the manifest.json.

Now I have so many ideas where I could use some of those APIs and tools in my side projects.

## Available Scripts

### `yarn start`

Runs the app in the development mode.<br />
When the borswer asks for permission to use your location you should decline, because Geolocation API will only work with https in most browsers.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn test:coverage`

Calculates test coverage.

### `yarn build`

Builds the app for production to the `build` folder.