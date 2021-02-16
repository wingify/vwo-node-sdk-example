const express = require('express');
const vwoHelper = require('./vwo-helper');
const util = require('./util');
const AbController = require('./controllers/AbController');
const FeatureRolloutController = require('./controllers/FeatureRolloutController');
const FeatureTestController = require('./controllers/FeatureTestController');
const PushController = require('./controllers/PushController');
const JsSdkController = require('./controllers/JsSdkController');

const { accountId, sdkKey, webhookAuthKey } = require('./config');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use('/public', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(express.json());

let currentSettingsFile = {};

function getSettingsFile() {
  vwoHelper
    .getSettingsFile(accountId, sdkKey)
    .then(latestSettingsFile => {
      currentSettingsFile = latestSettingsFile;
      vwoHelper.currentSettingsFile = latestSettingsFile;
      vwoHelper.initVWOSdk(latestSettingsFile);
    })
    .catch(err => {
      console.error('Something went wrong in fetching account settings.', err);
    });
}

getSettingsFile();

app.get('/settings', (req, res) => {
  res.json(vwoHelper.vwoClientInstance.SettingsFileManager.getSettingsFile());
});
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

app.post('/webhook', (req, res) => {
  console.log('\nWEBHOOK TRIGGERED', req.body, '\nWebhook Auth Key:', req.headers['x-vwo-auth']);

  if (webhookAuthKey && req.headers['x-vwo-auth']) {
    if (req.headers['x-vwo-auth'] !== webhookAuthKey) {
      console.error('\nVWO webhook authentication failed. Please check.\n');

      return;
    } else {
      console.log('\nVWO webhook authenticated successfully.\n');
    }
  } else {
    console.log('\nSkipping Webhook Authentication as webhookAuthKey is not provided in config.js\n')
  }

  if (vwoHelper.vwoClientInstance) {
    vwoHelper.vwoClientInstance.getAndUpdateSettingsFile().then(_updatedSettings => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: 'success', message: 'settings updated successfully' }));
    });
  }
});

app.listen(process.env.PORT || 4000, () => {});

// UNCOMMENT below lines in case of using event batching for demo purpose

// process.on('SIGINT', async () => {
//   console.log('SIGINT signal received.');
//   vwoHelper.vwoClientInstance.flushEvents().then(data => {
//     console.log('data', data);
//     process.exit(0);
//   });
// });
