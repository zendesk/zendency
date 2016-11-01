# zendency
Handy executables to install into the PATH

---

###### Options

```shell
zendency --version
zendency --help
zendency --changelog
```

---

###### Usage

`package.json`
```json
...

"devDependencies": {
    "zendency": "zendesk/zendency#v0.3.0"
},

"scripts": {
    "postversion": "zendency --changelog"
}

...
```

--

Needs at least `NPM@1.1.65` and `Node V6`<br>
Then you can update your package version as before by doing `npm version minor`

---

###### Example

https://github.com/zendesk/zendency/releases
