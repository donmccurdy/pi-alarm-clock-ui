module.exports = function (grunt) {

	var DATABASE = '../data/alarms.sqlite3';

	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'src/app.js',
				options: {
					nodeArgs: ['--harmony'],
					env: {PORT: 3000, DATABASE: DATABASE},
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
