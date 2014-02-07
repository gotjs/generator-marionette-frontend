generator-opus
==============

### Requierments

1. Node installed
2. Yeoman installed (http://yeoman.io/)
3. Grunt installed (http://gruntjs.com/)
4. Bower installed (http://bower.io/)

### Setup

```
npm install -g yo
git clone https://github.com/opus-online/generator-opus.git
npm link
```

### Creating a new project

```
mkdir example && cd example
yo opus
grunt
```

> Now go to http://localhost:9001/development/

### Creating a new plugin

```
yo opus:plugin
```

### Creating a new module

```
yo opus:module
```

### Want to see how your site looks like in production?
```
grunt --target=staging
```
> Now go to http://localhost:9001/staging/


