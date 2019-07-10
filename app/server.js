const express = require('express');
const vwoHelper = require('./vwo-helper');
const util = require('./util');
const assert = require('assert');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

const {
  accountId,
  sdkKey,
  campaignTestKey,
  goalIdentifeir
} = require('./config');

let currentSettingsFile = {};
let vwoClientInstance;
const pollTime = 1000;

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

app.get('/', (req, res) => {
  const userId = req.query.userId || util.getRandomUser();
  let isPartOfCampaign;

  if (vwoClientInstance) {
    let variation = vwoClientInstance.activate(campaignTestKey, userId);

    if (variation) {
      isPartOfCampaign = true;
    } else {
      isPartOfCampaign = false;
    }

    vwoClientInstance.track(campaignTestKey, userId, goalIdentifeir);
  }

  res.render('index', {
    title: `VWO | Node-sdk example | ${variation}`,
    userId,
    isPartOfCampaign,
    variation,
    campaignTestKey,
    goalIdentifeir,
    currentSettingsFile: util.prettyPrint(currentSettingsFile, null, 2)
  });
});

app.listen(3000, function() {});
