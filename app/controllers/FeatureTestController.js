const util = require('../util');
const vwoHelper = require('../vwo-helper');

const { featureTestCampaignKey, customVariables, variationTargetingVariables } = require('../config');

function FeatureTestController(req, res) {
  const campaignKey = featureTestCampaignKey;
  let stringVariable;
  let intVariable;
  let boolVariable;
  let doubleVariable;

  let userId = req.query.userId || util.getRandomUser();
  let isEnabled = vwoHelper.vwoClientInstance.isFeatureEnabled(campaignKey, userId, {
    customVariables,
    variationTargetingVariables
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
    currentSettingsFile: util.prettyPrint(vwoHelper.currentSettingsFile, null, 2)
  });
}

module.exports = FeatureTestController;
