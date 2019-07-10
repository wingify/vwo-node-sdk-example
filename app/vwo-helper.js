const vwoSDK = require('vwo-node-sdk');

// Sample user profile service implementation
const userProfileService = {
  lookup: (userId, campaignTestKey) => {
    // Perform user profile lookup
    // return an object like:
    /* return {
      userId: userId,
      campaignBucketMap: {
        'CAMPAIGN_TEST_KEY': {
          variationName: 'Control'
        }
      }
    } */
  },
  save: userProfileMap => {
    // Persist user profile based on userProfileMap
  }
};

// Sample Custom Logger implementation
const logging = {
  /* logger: {
    // Custom method to log errors your own way
    // You can write these logs to a file or send them to any other service
    log: (level, message) => {
      switch (level) {
        case vwoSDK.logging.LogLevelEnum.DEBUG:
          console.debug(message);
          break;
        case vwoSDK.logging.LogLevelEnum.INFO:
          console.info(message);
          break;
        case vwoSDK.logging.LogLevelEnum.ERROR:
          console.error(message);
          break;
        case vwoSDK.logging.LogLevelEnum.WARN:
          console.warn(message);
          break;
      }

      // Write to file, when required
      // const fs = require('fs');
      // const levelToString = vwoSDK.logging.LogNumberLevel['_' + level];
      // const levelAndMessage = `[${levelToString}] ${new Date().toISOString()} ${message} \n`
      // let stream = fs.createWriteStream('logs.txt', {flags:'a'});

      // stream.write(levelAndMessage);
    }
  }, */
  level: vwoSDK.logging.LogLevelEnum.DEBUG, // set level - DEBUG, INFO, WARNING, ERROR
  haveColoredLogs: true // true by default when isDevelopment:true
};

function getSettingsFile(accountId, sdkKey) {
  // Only for debugging and development
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

  return vwoSDK.getSettingsFile(accountId, sdkKey);
}

function initVWOSdk(settingsFile) {
  let vwoClientInstance = vwoSDK.createInstance({
    isDevelopmentMode: false,
    settingsFile,
    userProfileService,
    logging
  });

  return vwoClientInstance;
}

module.exports = {
  getSettingsFile,
  initVWOSdk
};
