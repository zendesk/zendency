const client = ({
    location, noTemplate, appName, appVersion, port,
    id, authorName, authorEmail, frameworkVersion,
    requirements, timestamp
}) => {

  // Create App
  const app = ZendeskApps.defineApp()

  // Ember function
  app.reopenClass({
    location, noTemplate,
    singleInstall: false,
    signedUrls:    false
  })

  // Ember function
  app.reopen({
    appName, appVersion, frameworkVersion,

    assetUrlPrefix: `http://localhost:${port}`,
    appClassName:   `app-${id}`,

    author: {
      name:  authorName,
      email: authorEmail
    }
  });

  // Install app
  app.install({
    id, requirements

    app_id:   id,
    app_name: appName,
    enabled:  true,

    settings: {
      title: name
    },

    updated_at: timestamp,
    created_at: timestamp
  });

  // Trigger app
  ZendeskApps.trigger && ZendeskApps.trigger('ready');

}
