const util = require('../util');
const vwoHelper = require('../vwo-helper');

const { featureRolloutCampaignKey, customVariables } = require('../config');

function FeatureRolloutController(req, res) {
  const campaignKey = featureRolloutCampaignKey;
  let userId = req.query.userId || util.getRandomUser();

  const userAgent = req.headers['user-agent']; //optional parameter 
  const userIpAddress = req.ip; //optional parameter 

  let isEnabled;
  let featureVariables = [];
  let stringVariable;
  let intVariable;
  let boolVariable;
  let doubleVariable;

  if (vwoHelper.vwoClientInstance) {
    isEnabled = vwoHelper.vwoClientInstance.isFeatureEnabled(campaignKey, userId, { customVariables, userAgent, userIpAddress });
    let strValue, intValue, boolValue, dubValue;

    strValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, stringVariable, userId, {
      customVariables
    });
    intValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, intVariable, userId, {
      customVariables
    });
    boolValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, boolVariable, userId, {
      customVariables
    });
    dubValue = vwoHelper.vwoClientInstance.getFeatureVariableValue(campaignKey, doubleVariable, userId, {
      customVariables
    });

    featureVariables = [
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
  }

  res.render('feature-rollout', {
    title: `VWO | Feature Rollout | Node-sdk example`,
    userId,
    isEnabled,
    campaignKey,
    featureVariables,
    customVariables: JSON.stringify(customVariables),
    currentSettingsFile: util.prettyPrint(vwoHelper.vwoClientInstance.SettingsFileManager.getSettingsFile(), null, 2)
  });
}

module.exports = FeatureRolloutController;