// Dependencies
const Asset = require('../asset')

// Get callee assets
const package = new Asset('package.json')

// Get parameters from package.json as fallback for app settings
const parameters = package.parameters || []

// Read environment variables from parameters
const parsedParameters = Object.keys(parameters).map(key => {
  const value = parameters[key]
  const envValue = process.env[value.slice(1)]

  return key + ':' + (envValue || value)
}).join(',')

// Create timestamp
const timestamp = () =>
  (new Date).getTime()

// Module definition
const create = (manifest, port, id = 0) =>
  `(function() {
    var app = ZendeskApps.defineApp();

    app.reopenClass({
      "experiments": ${ JSON.stringify(manifest.experiments) },
      "location": ${ JSON.stringify(manifest.location) },
      "noTemplate": ${ JSON.stringify(manifest.noTemplate || []) },
      "singleInstall": false,
      "signedUrls": false
    })

    app.reopen({
      appName: "${ manifest.name }",
      appVersion: "${ manifest.version }",
      locationIcons: {
        "support":{
          "nav_bar": {
            "svg": "icon_nav_bar.svg",
            "inactive": "icon_nav_bar_inactive.png",
            "active": "icon_nav_bar_active.png",
            "hover": "icon_nav_bar_hover.png"
          },
          "top_bar": {
            "svg": "icon_top_bar.svg",
            "inactive": "icon_top_bar_inactive.png",
            "active": "icon_top_bar_active.png",
            "hover": "icon_top_bar_hover.png"
          },
          "ticket_editor": {
            "svg": "icon_ticket_editor.svg?${ timestamp() }"
          }
        }
      },
      assetUrlPrefix: "http://localhost:${ port }/",
      appClassName: "app-${ id }",
      author: {
        name: "${ manifest.author.name }",
        email: "${ manifest.author.email }"
      },
      frameworkVersion: "${ manifest.frameworkVersion }"
    });

    app.install({
      "id": ${ id },
      "app_id": ${ id },
      "app_name": "${ manifest.name }",
      "enabled": true,
      "requirements": ${ JSON.stringify(manifest.requirements || null) },
      "settings": {
        "title": "${ manifest.name }",
        ${parsedParameters}
      },
      "updated_at": "${ timestamp() }",
      "created_at": "${ timestamp() }"
    });
  }());

  ZendeskApps.trigger && ZendeskApps.trigger('ready');`

// Export module
module.exports = { create }
