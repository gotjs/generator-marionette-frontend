module.exports = {
    scripts: {
        files: ['build/index.html', 'build/requirejs.json'],
        tasks: ['build'],
        options: {
            spawn: false
        }
    },
    tests: {
        files: ['build/test-main.js', 'build/requirejs.json'],
        tasks: ['buildTest'],
        options: {
            spawn: false
        }
    }
};