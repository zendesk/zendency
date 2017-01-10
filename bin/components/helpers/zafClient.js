// Create timestamp
const timestamp = () =>
  (new Date).getTime()

// Module definition
const create = (manifest, port, id = 0) =>
  `(function() {
    var app = ZendeskApps.defineApp();

    app.reopenClass({
      "location": ${ JSON.stringify(manifest.location) },
      "noTemplate": ${ JSON.stringify(manifest.noTemplate || []) },
      "singleInstall": false,
      "signedUrls": false
    })

    app.reopen({
      appName: "${ manifest.name }",
      appVersion: "${ manifest.version }",
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
        "title": "${ manifest.name }"
      },
      "updated_at": "${ timestamp() }",
      "created_at": "${ timestamp() }"
    });
  }());

  ZendeskApps.trigger && ZendeskApps.trigger('ready');`

// Export module
module.exports = { create }
