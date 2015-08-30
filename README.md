
Used Angular-seed Project
Angular JS 1.4.0

### Install Dependencies
* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

npm install

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files


### Run the Application
Start Server : 

npm start
Now browse to the app at http://localhost:8000/app/index.html

------------------------------------------------------------------------------------------------
Application Overview : An application that fetches data from Open Weather API

Technologies Used :
-> Angular JS 1.4
-> Bootstrap
-> Firebase for user authentication
-> Used Open Weather API 'http://openweathermap.org/api' to get weather data of various places based on pincode.

Functionality :
Home Page : Describes the app
Weather Update : Lists down various cities. For demo purpose I have stored the city list in 'data/city.json' file. On clicking 'Show Report' button, weather data is fetched from the API based on city pincode and shown in a modal window. This window is accessible to all users.
Blog : This section is accessible only to authenticated users. If the user is not signed in, the user will be redirected to signup page. Once the user is authenticated, the blog section will be accessible.
Connect : The page is yet to be implemented.
Signup : Used Firebase for user authentication. There are a few glitches in this section.

Tested on Chrome.

