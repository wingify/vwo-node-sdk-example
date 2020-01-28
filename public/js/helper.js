const accountId = '';
const sdkKey = '';

const abCampaignKey = '';
const abCampaigngoalIdentifier = '';

const featureRolloutCampaignKey = '';
const featureTestCampaignKey = '';
const featureTestCampaigngoalIdentifier = '';

const featureVariable = '';

const tagKey = '';
const tagValue = '';

const customVariables = {};

screenLog.init();

console.warn('Click on buttons above and the logs will be printed here. Try it!');
const serverProvidedSettingsFile = ( document.querySelector('#server-settings-file') && document.querySelector('#server-settings-file').innerHTML) || '';
let settingsFile;// = JSON.parse(serverProvidedSettingsFile);
if (!settingsFile) {
  vwoSdk.getSettingsFile(accountId, sdkKey).then(data => {
    settingsFile = data;
    onSettingsFileFetched();
  });
} else {
  onSettingsFileFetched();
}

function onSettingsFileFetched() {
  const userId = document.querySelector('#server-user-id').innerHTML;

  const _vwoSdk = vwoSdk.launch({
    isDevelopmentMode: false,
    settingsFile,
    logging: {
    //   log: function(level, message) {
    //     console.log(level, message);
    //   },
    level: vwoSdk.logging.LogLevelEnum.DEBUG
    }
  });

  document.querySelectorAll('.js-userId').forEach(el => el.innerHTML = userId);

  document.querySelector('.js-ab-key').innerHTML = abCampaignKey;
  document.querySelector('.js-ab-goal-identifier').innerHTML = abCampaigngoalIdentifier;

  document.querySelector('.js-feature-rollout-key').innerHTML = featureRolloutCampaignKey;
  document.querySelector('.js-feature-variable-key').innerHTML = featureVariable;

  document.querySelector('.js-feature-test-key').innerHTML = featureVariable;
  document.querySelector('.js-feature-test-goal-identifier').innerHTML = featureTestCampaigngoalIdentifier;

  document.querySelector('.js-tag-key').innerHTML = tagKey;
  document.querySelector('.js-tag-value').innerHTML = tagValue;


  document.addEventListener('click', (ev) => {
    switch (ev.target.id) {
      case 'activate-btn':
        console.log(`activate result for: ${userId}: ${_vwoSdk.activate(abCampaignKey, userId)}`)
        break;
      case 'get-variation-btn':
        console.log(`getVariation result for: ${userId}: ${_vwoSdk.getVariation(abCampaignKey, userId)}`);
        break;
      case 'track-btn':
        console.log(`track result for: ${userId}: ${_vwoSdk.track(abCampaignKey, userId, abCampaigngoalIdentifier)}`);
        break;
      case 'is-feature-enabled-fr-btn':
        console.log(`isFeatureEnabled result for: ${userId}: ${_vwoSdk.isFeatureEnabled(featureRolloutCampaignKey, userId)}`);
        break;
      case 'get-feature-variable-fr-btn':
        console.log(`getFeatureVariablevalue result for: ${userId}: ${_vwoSdk.getFeatureVariableValue(featureRolloutCampaignKey, featureVariable, userId)}`);
        break;
      case 'is-feature-enabled-ft-btn':
        console.log(`isFeatureEnabled result for: ${userId}: ${_vwoSdk.isFeatureEnabled(featureTestCampaignKey, userId)}`);
        break;
      case 'get-feature-variable-ft-btn':
        console.log(`getFeatureVariablevalue result for: ${userId}: ${_vwoSdk.getFeatureVariableValue(featureTestCampaignKey, featureVariable, userId)}`);
        break;
      case 'get-variation-ft-btn':
        console.log(`getVariation ft result for: ${userId}: ${_vwoSdk.getVariation(featureTestCampaignKey, userId)}`);
        break;
      case 'track-ft-btn':
        console.log(`track ft result for: ${userId}: ${_vwoSdk.track(featureTestCampaignKey, userId, featureTestCampaigngoalIdentifier)}`);
        break;
      case 'push-api-btn':
        console.log(`push result for: ${userId}: ${_vwoSdk.push(tagKey, tagValue, userId)}`);
        break;
    }
  });
};
