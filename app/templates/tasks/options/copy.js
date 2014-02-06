module.exports = {
    production: {
        files: [
            { expand: true, src: ['static_files/**/*'], dest: '<%- target %>/' }, // includes files in path and its subdirs
        ]
    }
};