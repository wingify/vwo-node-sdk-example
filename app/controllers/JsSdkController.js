const util = require('../util');
const vwoHelper = require('../vwo-helper');

function JsSdkController(req, res) {
  let userId = req.query.userId || util.getRandomUser();

  res.render('js-sdk', {
    title: `VWO | A/B | Node-sdk example`,
    userId,
    vwoServerSettingsFile: JSON.stringify(vwoHelper.currentSettingsFile),
    vwoServeruserId: userId
    // currentSettingsFile: util.prettyPrint(vwoHelper.currentSettingsFile, null, 2)
  });
}

module.exports = JsSdkController;
