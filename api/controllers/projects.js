const path = require('path');
const AppEvents = require(path.join(__dirname, '../events'));
try {
    var db = require(path.join(__dirname, '../db'));
}
catch (error) {
    AppEvents.emit('error', req, res, { error: error });
}

const Joi = require('@hapi/joi');

class Service {
    async listProjects(req, res) {
        // save new project to DB
        try {
            const projectsList = await db.findProject(req.params.title);
            return AppEvents.emit('success', req, res, { result: projectsList });
        } catch (error) {
            return AppEvents.emit('error', req, res, { message: error });
        }
    }
    async saveProject(req, res) {
        // validate input
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required()
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            return AppEvents.emit('error', req, res, { message: error });
        }
        // save new project to DB
        try {
            const saveResult = await db.saveProject(value);
            return AppEvents.emit('success', req, res, { result: saveResult });
        } catch (error) {
            return AppEvents.emit('error', req, res, { message: error });
        }
    }
    updateProject(req, res){
        req.body.title = req.params.title;
        return this.saveProject(req, res);
    }
    findProject(req, res){
        const schema = Joi.object().keys({
            title: Joi.string().required()
        });
        const { error, value } = schema.validate(req.params);
        if (error) {
            return AppEvents.emit('error', req, res, { message: error });
        }
        return this.listProjects(req, res);
    }
}
module.exports = new Service();