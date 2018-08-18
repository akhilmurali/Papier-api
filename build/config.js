'use strict';

var testConfig = {
    env: 'test',
    port: 5000
};

var productionConfig = {
    env: 'prod'
};

module.exports = process.env.NODE_ENV == 'prod' ? productionConfig : testConfig;
//# sourceMappingURL=config.js.map