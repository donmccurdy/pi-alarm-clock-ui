module.exports = function (grunt) {

	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'src/app.js',
				options: {
					nodeArgs: ['--harmony'],
					env: {PORT: 3000},
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
