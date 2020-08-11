## What I have learned
Despite the outcome of my application I have to say I already gained valuable insights from this challenge. I worked with several Browser APIs and tools I never worked with or never did so in this extent.

Before this challenge I never worked with maps. Although I have a side project where I collect locations of concert venues I never finished my plan to show them on a map in the app. I saw that the komoot app uses Leaflet so I also went for it. It was pretty straight forward and I had my first map after a couple of minutes. I was tempted to try out all the things you can do with Leaflet. Especially popups to be able to delete a marker on the map directly seemed to make sense in this case. But I sticked to the screenshot to stay in scope of the challenge.

Especially interesting to me was the Geolocation API. I know this was not in the scope but I thought it would make sense here. It was not very difficult to get a location from the browser. I know that it is not good practice to ask for a location on the initial page load. But I didn't want to add an additional button to the layout and I think for this demonstration purposes it's ok. In a real app I would definately only ask for a location after a user action so the user knows better why he should give the app this private information.

I also never worked with the Drag and Drop API. It took me a while to get it dialed and look nice without any flickering in the different states. But the bigger challenge here was writing tests for it. I never simulated a drag somehow. But in the end I got it all tested.

Although we used Content Security Policies in all of our apps in my current job, I never set it up from the ground up. I was surprised how easy it could be done and now I ask myself why it is not used more often.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:coverage`

Calculates test coverage.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

