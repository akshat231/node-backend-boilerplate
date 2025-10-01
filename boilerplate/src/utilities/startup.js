const logger = require('./logger');
const { initializeMongo } = require('../databases/mongo/startup');
const { initPostgres } = require('../databases/postgres/startup')
const app = require('express')();

const initializeServices = async (options) => {
    const response = {};
    logger.info('Initializing services');
    if (options && options.mongo) {
        logger.info('Initializing MongoDB service');
        await initializeMongo();
    }

    if (options && options.postgres) {
        logger.info('Initializing Postgres service');
        await initPostgres();
    }

    response.app = app;
    logger.info('BoilerPlate Initialized')
    return response;
}

module.exports = {
    initializeServices
}