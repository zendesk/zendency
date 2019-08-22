# zendency
Handy executables to install into the PATH<br>
Needs at least `NPM@1.1.65` and `Node V6`<br>


---

## Develop App for Zendesk Marketplace

##### Run Project
> port `4567` is used by Zendesk App Framwork in development and can be trigger by running Support with `?zat=true` and disabling cross domain security

```Shell
zendency development
```

---

##### Bundle project for Zendesk Marketplace
> Bundles project for being uploaded to Zendesk Marketplace or as private app

```Shell
zendency bundle {optional filename}
```

---

##### Example package.json file for Zendesk App

```javascript
{

"devDependencies": {
  "zendency": "zendesk/zendency#v3.2.2"
},

"scripts": {
  "start": "zendency development",
  "bundle": "zendency bundle $1",
},

// Entry point for app
"main": "./src/",

// Javascript file to compile. This is not required, but you'll need to add the attribute with an empty array
"compiler": [
  {
    "from": "./src/javascript/main.js", // Path from root
    "to": "./javascript/main.js" // Relative path from index.html
  }
],

// Files to copy over to your bundle
"files": [
  "./src/images/logo.png",
  "./src/images/logo-small.png",
  "./src/images/icon_ticket_editor.svg",
  "./src/index.html",
  "./src/stylesheet/"
],

// Parameters from manifest.json that we default to in development
"parameters": {
  "token": "..."
}

// Path to translation file needed for Zendesk App
"directories": {
  "translations": "./src/translations"
}
```

---

## Helpers

##### Change version attribute in json files

```shell
zendency version {filename.json}
```

---

##### Create a changelog since last version

```shell
zendency changelog
```



# Create a new Zendency release
To create a new release of zendency you need to run the following
```shell
$ npm run consume
$ npm version minor
```

