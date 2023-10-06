const util = require('../util');
const vwoHelper = require('../vwo-helper');

const { featureTestCampaignKey, customVariables, variationTargetingVariables } = require('../config');

function FeatureTestController(req, res) {
  const campaignKey = featureTestCampaignKey;
  let stringVariable;
  let intVariable;
  let boolVariable;
  let doubleVariable;

  const userAgent = req.headers['user-agent']; //optional parameter 
  const userIpAddress = req.ip; //optional parameter 

  let userId = req.query.userId || util.getRandomUser();
  let isEnabled = vwoHelper.vwoClientInstance.isFeatureEnabled(campaignKey, userId, {
    customVariables,
    variationTargetingVariables,
    userAgent,
    userIpAddress
  });

  let strValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, stringVariable, userId, {
    customVariables,
    variationTargetingVariables
  });
  let intValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, intVariable, userId, {
    customVariables,
    variationTargetingVariables
  });
  let boolValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, boolVariable, userId, {
    customVariables,
    variationTargetingVariables
  });
  let dubValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, doubleVariable, userId, {
    customVariables,
    variationTargetingVariables
  });
  const featureVariables = [
    {
      key: stringVariable,
      value: strValue
    },
    {
      key: intVariable,
      value: intValue
    },
    {
      key: boolVariable,
      value: boolValue
    },
    {
      key: doubleVariable,
      value: dubValue
    }
  ];

  res.render('feature-test', {
    title: `VWO | Feature Test | Node-sdk example`,
    userId,
    isEnabled,
    campaignKey,
    featureVariables,
    customVariables: JSON.stringify(customVariables),
    variationTargetingVariables: JSON.stringify(variationTargetingVariables),
    currentSettingsFile: util.prettyPrint(vwoHelper.vwoClientInstance.SettingsFileManager.getSettingsFile(), null, 2)
  });
}

module.exports = FeatureTestController;
