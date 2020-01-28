const util = require('../util');
const vwoHelper = require('../vwo-helper');

function PushController(req, res) {
  const userId = req.query.userId || util.getRandomUser();

  const tagKey = 'hello2';
  const tagValue = 'b';

  const result = vwoHelper.vwoClientInstance.push(tagKey, tagValue, userId);

  res.render('push', {
    title: `VWO | Node-sdk example`,
    userId,
    tagKey,
    tagValue,
    result,
    currentSettingsFile: util.prettyPrint(vwoHelper.currentSettingsFile, null, 2)
  });
}
module.exports = PushController;
