const express = require('express');
const vwoHelper = require('./vwo-helper');
const util = require('./util');
const assert = require('assert');
const customVariables = require('./customVariables');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

const {
  accountId,
  sdkKey,
  abcampaignKey,
  abCampaigngoalIdentifier,
  featureRolloutCampaignKey,
  featureTestCampaignKey
} = require('./config');

let currentSettingsFile = {};
let vwoClientInstance;
const pollTime = 10000;

function pollSettingsFile() {
  vwoHelper
    .getSettingsFile(accountId, sdkKey)
    .then(latestSettingsFile => {
      try {
        // If SettingsFile not changed, do not re-initialize
        assert.deepEqual(currentSettingsFile, latestSettingsFile);
      } catch (err) {
        currentSettingsFile = latestSettingsFile;
        vwoClientInstance = vwoHelper.initVWOSdk(currentSettingsFile);
      }
    })
    .catch(err => {
      console.error('Something went wrong in fetching account settings.', err);
    });
}

pollSettingsFile();
setInterval(pollSettingsFile, pollTime);

app.get('/feature-rollout', (req, res) => {
  const campaignKey = featureRolloutCampaignKey;
  let userId = req.query.userId || util.getRandomUser();

  let isEnabled;
  let featureVariables = [];

  if (vwoClientInstance) {
    isEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, userId, customVariables);
    let strValue, intValue, boolValue, dubValue;

    strValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'str', userId, customVariables);
    intValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'int', userId, customVariables);
    boolValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'bool', userId, customVariables);
    dubValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'dub', userId, customVariables);

    featureVariables = [
      {
        key: 'str',
        value: strValue
      },
      {
        key: 'int',
        value: intValue
      },
      {
        key: 'bool',
        value: boolValue
      },
      {
        key: 'dub',
        value: dubValue
      }
    ];
  }

  res.render('feature-rollout', {
    title: `VWO | Node-sdk example`,
    userId,
    isEnabled,
    campaignKey,
    featureVariables,
    customVariables: JSON.stringify(customVariables),
    currentSettingsFile: util.prettyPrint(currentSettingsFile, null, 2)
  });
});

app.get('/feature-test', (req, res) => {
  const campaignKey = featureTestCampaignKey;
  let userId = req.query.userId || util.getRandomUser();
  let isEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, userId, customVariables);

  let strValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'str', userId, customVariables);
  let intValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'int', userId, customVariables);
  let boolValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'bool', userId, customVariables);
  let dubValue = vwoClientInstance.getFeatureVariableValue(campaignKey, 'dub', userId, customVariables);
  const featureVariables = [
    {
      key: 'str',
      value: strValue
    },
    {
      key: 'int',
      value: intValue
    },
    {
      key: 'bool',
      value: boolValue
    },
    {
      key: 'dub',
      value: dubValue
    }
  ];

  res.render('feature-test', {
    title: `VWO | Node-sdk example`,
    userId,
    isEnabled,
    campaignKey,
    featureVariables,
    customVariables: JSON.stringify(customVariables),
    currentSettingsFile: util.prettyPrint(currentSettingsFile, null, 2)
  });
});

// curl "http://127.0.0.1:3000/ab?userId="
app.get('/ab', (req, res) => {
  let campaignKey = abcampaignKey;
  let variationName;
  let userId;
  let isPartOfCampaign;

  userId = req.query.userId || util.getRandomUser();

  if (vwoClientInstance) {
    variationName = vwoClientInstance.activate(campaignKey, userId, customVariables);

    if (variationName) {
      isPartOfCampaign = true;
    } else {
      isPartOfCampaign = false;
    }

    vwoClientInstance.track(campaignKey, userId, abCampaigngoalIdentifier, customVariables);
  }

  res.render('ab', {
    title: `VWO | Node-sdk example | ${variationName}`,
    userId,
    isPartOfCampaign,
    variationName,
    campaignKey,
    abCampaigngoalIdentifier,
    customVariables: JSON.stringify(customVariables),
    currentSettingsFile: util.prettyPrint(currentSettingsFile, null, 2)
  });
});

app.get('/push', (req, res) => {
  const campaignKey = featureRolloutCampaignKey;
  const userId = req.query.userId || util.getRandomUser();

  const tagKey = 'random_tag_key';
  const tagValue = 'random_tag_value';

  const result = vwoClientInstance.push(tagKey, tagValue, userId);

  res.render('push', {
    title: `VWO | Node-sdk example`,
    userId,
    tagKey,
    tagValue,
    result,
    campaignKey,
    currentSettingsFile: util.prettyPrint(currentSettingsFile, null, 2)
  });
});

app.get('/', (_req, res) => {
  res.render('index', {
    title: `VWO | Node-sdk example`,
    currentSettingsFile: util.prettyPrint(currentSettingsFile, null, 2)
  });
});

app.listen(3000, function() {});
