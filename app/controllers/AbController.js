const util = require('../util');
const vwoHelper = require('../vwo-helper');

const { abCampaignKey, abCampaigngoalIdentifier, customVariables, variationTargetingVariables } = require('../config');

function AbController(req, res) {
  let campaignKey = abCampaignKey;
  let variationName;
  let userId;
  let isPartOfCampaign;

  userId = req.query.userId || util.getRandomUser();

  if (vwoHelper.vwoClientInstance) {
    variationName = vwoHelper.vwoClientInstance.activate(campaignKey, userId, {
      customVariables,
      variationTargetingVariables
    });

    if (variationName) {
      isPartOfCampaign = true;
    } else {
      isPartOfCampaign = false;
    }

    vwoHelper.vwoClientInstance.track(campaignKey, userId, abCampaigngoalIdentifier, {
      customVariables,
      variationTargetingVariables
    });
  }

  res.render('ab', {
    title: `VWO | A/B | Node-sdk example | ${variationName}`,
    userId,
    isPartOfCampaign,
    variationName,
    campaignKey,
    abCampaigngoalIdentifier,
    customVariables: JSON.stringify(customVariables),
    variationTargetingVariables: JSON.stringify(variationTargetingVariables),
    currentSettingsFile: util.prettyPrint(vwoHelper.currentSettingsFile, null, 2)
  });
}

module.exports = AbController;
