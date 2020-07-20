const util = require('../util');
const vwoHelper = require('../vwo-helper');
const { customDimensionKey, customDimensionValue } = require('../config');

function PushController(req, res) {
  const userId = req.query.userId || util.getRandomUser();

  const result = vwoHelper.vwoClientInstance.push(customDimensionKey, customDimensionValue, userId);

  res.render('push', {
    title: `VWO | Node-sdk example`,
    userId,
    customDimensionKey,
    customDimensionValue,
    result,
    currentSettingsFile: util.prettyPrint(vwoHelper.currentSettingsFile, null, 2)
  });
}
module.exports = PushController;
