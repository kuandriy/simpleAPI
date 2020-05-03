// Routers definition
'use strict'
const path = require('path');
const Projects = require(path.join(__dirname,'../controllers/projects.js'));

module.exports = function(server){
    server.route('/projects').get(Projects.listProjects);
    server.route('/projects/:title').get(Projects.findProject.bind(Projects));
    server.route('/projects').post(Projects.saveProject);
    server.route('/projects/:title').put(Projects.updateProject.bind(Projects));
    //server.route('/projects/:projectId').delete(projects.deleteProject);
};