# Building

## Changing index.html

The index.html file is rebuilt every time you start grunt. To make changes to your index.html change the template at ```build/index.html```

## Adding a new bower component to requirejs

Since the index.html file is rebuilt every time you start grunt you should change the requirejs configuration template at ```build/requirejs.json```

**Please add <%= path %> to the start of every path to make sure the configuration file works in different environments / builds **


## Configuring application settings
-------------

All the settings at ```build/config/config.json``` are passed to the application as options.

### Development settings

All the settings at ```build/config/development.json``` overwrite the general configuration settings. Set your development specific settings here.

### Production settings

All the settings at ```build/config/production.json``` overwrite the general configuration settings. Set your production specific settings here.

## Building for production

Simply run

```
grunt --target=production
```

We'll build an optimized site and store it in the ```build/dist/``` folder. We'll also start a webserver and serve the optimized site from [http://localhost:9001](http://localhost:9001). Now all you need to do is deploy your application somewhere.