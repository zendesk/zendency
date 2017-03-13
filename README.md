# zendency
Handy executables to install into the PATH<br>
Needs at least `NPM@1.1.65` and `Node V6`<br>


---

###### Options

```shell
# Run project on localhost:4567 
zendency development

# Compile project
zendency compile {optional filename}

# Bundle project for Zendesk Marketplace
zendency bundle {optional filename}

# Change version attribute in json files
zendency version {filename.json}

# Create a changelog since last version
zendency changelog
```

--

###### Create a new release

`package.json`
```json
...

"devDependencies": {
    "zendency": "zendesk/zendency#v3.2.2"
},

"scripts": {
    "version": "zendency version manifest.json && git add -A",
    "postversion": "zendency changelog && git push"
}

...
```


You'll update your package version as before by doing `npm version minor`<br>
`postversion` will create a new release with release notes and push

**Example:** https://github.com/zendesk/zendency/releases

---

###### Develop App for Zendesk Marketplace

`package.json`
```json
...

"devDependencies": {
    "zendency": "zendesk/zendency#v3.2.2"
},

"scripts": {
    "start": "zendency development",
    "bundle": "zendency bundle $1",
},

"main": "./src/",

"compiler": [
  {
    "from": "./src/javascript/main.js",
    "to": "./javascript/main.js"
  }
],

"files": [
  "./src/images/logo.png",
  "./src/images/logo-small.png",
  "./src/images/icon_ticket_editor.svg",
  "./src/index.html",
  "./src/stylesheet/"
],

"directories": {
  "translations": "./src/translations"
},

...
```

```Shell
npm install
npm start
npm bundle app.zip
```

---

`main`<br>
Entry point for app<br>
<br>
`compiler`<br>
Javascript file to compile this is not required, but you'll need to have the attribute with an empty array<br>
<br>
`files`<br>
Files to copy over to your bundle<br>
<br>
`directories`<br>
Path to translation file needed for Zendesk App

---

###### Demo App

https://github.com/zendesk/zendency-demo-app
