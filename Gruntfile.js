module.exports = function (grunt) {

	grunt.initConfig({
		nodemon: {
			dev: {
				script: 'src/app.js',
				options: {
					nodeArgs: [
						'--harmony'
					],
					env: {
						PORT: 3000
					},
					ignore: [
						'node_modules/**',
						'bower_components/**'
					],
					watch: [
						'src',
						'public'
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('default', ['nodemon']);

};
