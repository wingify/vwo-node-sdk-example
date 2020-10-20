const express = require('express');
const vwoHelper = require('./vwo-helper');
const util = require('./util');
const assert = require('assert');
const AbController = require('./controllers/AbController');
const FeatureRolloutController = require('./controllers/FeatureRolloutController');
const FeatureTestController = require('./controllers/FeatureTestController');
const PushController = require('./controllers/PushController');
const JsSdkController = require('./controllers/JsSdkController');

const { accountId, sdkKey, pollTime } = require('./config');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use('/public', express.static('public'));
app.use('/node_modules', express.static('node_modules'));

let currentSettingsFile = {};

function pollSettingsFile() {
  vwoHelper
    .getSettingsFile(accountId, sdkKey)
    .then(latestSettingsFile => {
      try {
        // If SettingsFile not changed, do not re-initialize
        assert.deepEqual(currentSettingsFile, latestSettingsFile);
      } catch (err) {
        currentSettingsFile = latestSettingsFile;
        vwoHelper.currentSettingsFile = currentSettingsFile;
        vwoHelper.initVWOSdk(currentSettingsFile);
      }
    })
    .catch(err => {
      console.error('Something went wrong in fetching account settings.', err);
    });
}

pollSettingsFile();
setInterval(pollSettingsFile, pollTime);

app.get('/feature-rollout', FeatureRolloutController);
app.get('/feature-test', FeatureTestController);
app.get('/ab', AbController);
app.get('/push', PushController);
app.get('/js-sdk', JsSdkController);

app.get('/', (_req, res) => {
  res.render('index', {
    title: `VWO | Node-sdk example`,
    currentSettingsFile: util.prettyPrint(currentSettingsFile, null, 2)
  });
});

app.listen(4000, () => {});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received.');
  vwoHelper.vwoClientInstance.flushEvents().then(data => {
    console.log('data', data)
    process.exit(0)
  });
});
