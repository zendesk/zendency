# zenpm
Handy executables to install into the PATH

---

###### Options

```shell
zenpm --version
zenpm --help
zenpm --changelog
```

---

###### Usage

`package.json`
```json
...

"devDependencies": {
    "zenpm": "zendesk/zenpm#v0.3.0"
},

"scripts": {
    "postversion": "zenpm --changelog"
}

...
```

--

Needs at least `NPM@1.1.65` and `Node V6`<br>
Then you can update your package version as before by doing `npm version minor`

---

###### Example

https://github.com/zendesk/zenpm/releases
