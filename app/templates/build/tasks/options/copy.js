module.exports = {
    production: {
        files: [
            { expand: true, src: ['static_files/**/*'], dest: 'build/dist/' }, // includes files in path and its subdirs
        ]
    }
};