const util = require('../util');
const vwoHelper = require('../vwo-helper');

const { featureTestCampaignKey, customVariables } = require('../config');

function FeatureTestController(req, res) {
  const campaignKey = featureTestCampaignKey;
  let stringVariable;
  let intVariable;
  let boolVariable;
  let doubleVariable;

  let userId = req.query.userId || util.getRandomUser();
  let isEnabled = vwoHelper.vwoClientInstance.isFeatureEnabled(campaignKey, userId, customVariables);

  let strValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, stringVariable, userId);
  let intValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, intVariable, userId);
  let boolValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, boolVariable, userId);
  let dubValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, doubleVariable, userId);
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
    currentSettingsFile: util.prettyPrint(vwoHelper.currentSettingsFile, null, 2)
  });
}

module.exports = FeatureTestController;
