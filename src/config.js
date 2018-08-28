const testConfig = {
    env: 'test',
    port: 5000
}

const productionConfig =  {
    env: 'prod',
    port: process.env.port
};

module.exports = (process.env.NODE_ENV == 'prod' ? productionConfig : testConfig); 