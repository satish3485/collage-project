/**
  @fileoverview main Grunt task file
**/
'use strict';

var fs = require("fs")
  , path = require("path");

module.exports = function (grunt) {

  grunt.initConfig({
    
    dust: {
      options: {
        helper: "dust",
        dependencies: {
          dust: "dust"
        }
      },
      compile: {
          files: [
            {
              expand: true,
              cwd: "./views",
              src: "*.dust",
              dest: "public/views",
              ext: ".js"
            }
          ]
        }
    }

  });

  grunt.loadNpmTasks("grunt-dustjs-linkedin");

   // Default task(s).
  grunt.registerTask('default', ['dust']);


};
