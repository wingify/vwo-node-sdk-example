const vwoSDK = require('vwo-node-sdk');

let userData = {};
let userIds = [];
// Sample user profile service implementation
const userStorageService = {
  get: (userId, campaignKey) => {
    // Perform user profile lookup
    // returns an object like:

    /* return {
      userId: 'user-identifier',
      campaignKey: 'campaign unique key,
      variationName: 'Variation-2'
    } */

    // Example code which retrieves data from object. This object will reset on server restart.
    let data = {};

    if (userData[campaignKey]) {
      for (let i = 0; i < userData[campaignKey].length; i++) {
        if (userId === userData[campaignKey][i].userId) {
          data = userData[campaignKey][i];
          break;
        }
      }
    }

    return data;
  },
  set: userStorageData => {
    const { campaignKey, userId } = userStorageData;
    // Persist user profile based on userStorageData

    // Example code which saves data in object. This object will reset on server restart.
    if (userIds.indexOf(userId) === -1) {
      userData[campaignKey] = userData[campaignKey] || [];
      userData[campaignKey].push(userStorageData);

      userIds.push(userId);
    } else {
      for (let i = 0; i < userData[campaignKey].length; i++) {
        if (userId === userData[campaignKey][i].userId) {
          userData[campaignKey][i] = userStorageData;
          break;
        }
      }
    }
  }
};

// Sample Custom Logger implementation
const logging = {
  // logger: {
  //   // Custom method to log errors your own way
  //   // You can write these logs to a file or send them to any other service
  log: function(level, message) {
    // Write to file, when required
    // const fs = require('fs');
    // const levelToString = vwoSDK.logging.LogNumberLevel['_' + level];
    // const levelAndMessage = `[${levelToString}] ${new Date().toISOString()} ${message} \n`
    // let stream = fs.createWriteStream('logs.txt', {flags:'a'});
    // stream.write(levelAndMessage);
    // console.log(level, message);
  },
  // },
  level: vwoSDK.logging.LogLevelEnum.DEBUG, // set level - DEBUG, INFO, WARN, ERROR
  haveColoredLogs: true // true by default when isDevelopment:true
};

const vwoHelper = {
  getSettingsFile: function(accountId, sdkKey, config) {
    // Only for debugging and development
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

    return vwoSDK.getSettingsFile(accountId, sdkKey, config);
  },
  initVWOSdk: function(settingsFile) {
    let vwoClientInstance = vwoSDK.launch({
      isDevelopmentMode: false,
      settingsFile,
      userStorageService,
      logging
      // pollingInterval: 5000,
      // sdkKey: sdkKey
    });

    vwoHelper.vwoClientInstance = vwoClientInstance;
    return vwoClientInstance;
  }
};

module.exports = vwoHelper;
