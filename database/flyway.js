module.exports = function() {
  return {
    flywayArgs: {
      url: 'jdbc:postgresql://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME,
      schemas: process.env.DB_SCHEMA,
      locations: 'filesystem:database/migration',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    version: '8.3.0',
    downloads: {
      storageDirectory: '/tmp',
      expirationTimeInMs: -1
    }
  };
};