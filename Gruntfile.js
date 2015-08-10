module.exports = function (grunt) {

	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'src/app.js',
				options: {
					nodeArgs: ['--harmony'],
					watch: ['src'],
					ignore: [
						'node_modules/**',
						'bower_components/**'
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('default', ['nodemon']);

};
