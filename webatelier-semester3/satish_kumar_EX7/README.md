## Getting Started
### Install dependencies
To install the dependencies for the exercise (express.js, mongoose, testing framework, etc.) type:

    npm install && bower install

## Client side
### Dependencies
#### Installing and Saving
Install and save (in `bower.json`) a bower dependency using:

```bash
bower install --save
```

__Important Note__: If there are bower dependencies in your code that are not saved in `bower.json` we will __deduct__ points. 

#### Location
By default bower install dependencies in a `./bower_components`, but in this exercise bower dependencies are installed in `app/components` as instructed by the `.bowerrc` in the root dir of the skeleton (for more on that have a look here [bowerrc docs](http://bower.io/docs/config/)). The reason for changing the directory is simple: we want it to be in the same folder as the app to serve the files using the static middleware.

### Third-party elements
Feel free to use other elements if you want to. The only restriction is that for `<ab-menu>` you cannot use `<iron-selector>`, `paper-menu` or other menu-focused menus. You __have to__ apply the [IronMenuBehavior](https://elements.polymer-project.org/elements/iron-menu-behavior?active=Polymer.IronMenuBehavior) behavior.
You can have a look at the following links to get inspired:

* [Polymer Elements](https://elements.polymer-project.org/)
* [Custom Elements](https://customelements.io/)

### Routing
For routing we are using [page.js](https://visionmedia.github.io/page.js/). The basic functionality is preconfigured for you in `routing.html`. It has hash-based routing (`#!`) enabled.
Feel free to change it to add more features if you need to (for example for the playlists redirect in case the `playlistid` doesn't exist).

_Tip_: You can use middleware functions in your routes, like in `express.js`. This would allow you for example to make sure that your model is loaded before performing any rendering. 

#### Routes from anchor (`<a>`) elements
By default `page.js` tries to intercept clicks on an anchor element and route them based on it's `href` attribute. However since the anchors in your application are going to be inside the shadow DOM, `page.js` __cannot__ intercept them. To make your links work with the routing, you can explicitly call the `page.show` method of page.js, for example `page.show("/artists")`. 

Here's an example of a click handler you can attach to your internal `<a>`elements.
```js
onClick: function(event, detail){
    event.preventDefault()
    //strip url
    var resource = event.currentTarget.href.replace(/^http:\/\/localhost:[0-9]{1,4}/,"")
    page.show(resource)
  }
```

## Server

### Note
The server is almost identical to the server used in Exercise 6 which was building on the server used in Exercise 5. For differences scroll down to the [REST API](#rest-api) and [Static assets](#static-assets)

### Run the server
`app.js` is exported as a module so that we can  `require()` it from other modules, eg. out tests. For this reason the server does not `listen()` from within `app.js`. The initialization of the server is carried out with `./bin/www`, an executable file the _requires_ `app.js` calls `listen()`. To start:

    npm start
or

    DEBUG='atelierbeats-server' node ./bin/www
The `DEBUG` environmental variable is read by the excellent [debug](https://github.com/visionmedia/debug) module which allows to isolate debug messages output per module.

### Anatomy of the skeleton

    |-- README.html //What you're reading right now
    |-- README.md // Source for what you're reading right now
    |-- app.js //main file
    |-- bin
    |   `-- www //starts app.js
    |   `-- installSeleniumAndChromeWebDriver //installs selenium and chrome driver
    |-- config.js  //configuration like mongodb url
    |-- models //models go here
    |   |-- Album.js
    |   |-- Artist.js
    |   |-- Playlist.js
    |   |-- Track.js
    |   |-- User.js
    |   `-- index.js //lists all models so we can register the mongoose models with one `require()`
    |-- node_modules //npm packages
    |-- package.json
    |-- app // the client side app. All the polymer stuff go there
    |   |-- css
    |   |-- elements
    |   |-- fonts
    |   |-- images
    |   |-- js
    |   |-- resources
    |   |-- styles
    |   |-- test
    |   `-- index.html //entry for the polymer app 
    |-- routes  //routers go here
    |-- seed.js //executed it to seed the database
    |-- test
    |   |-- seedData.js //used by seedDb.js
    |   |-- seedDb.js //seeds the database
    |   `-- utils.js //various utils for the tests
    `-- views
        `-- index.dust //template for GET /

### Differences from Exercise 6
####Templates
`Dust.js` templates have been removed, as have the related grunt tasks.

####REST API
 `GET /user/:userid/playlists` returns the tracks of the playlists prepopulated.

####Static assets
The static assets for this exercise are served from within the `app` directory (in the previous exercises the were served from `public`). `GET /` renders `app/index.html`.
