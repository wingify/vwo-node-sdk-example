## VWO NodeJs SDK Example

[vwo-node-sdk](https://github.com/wingify/vwo-node-sdk) allows you to A/B Test your application at server-side and other capabilities like feature rollout, feature testing, etc.

This repository provides a basic demo of how server-side works with VWO NodeJs SDK.

### Requirements

- Node 6.10.0 onwards

### Documentation

Refer [VWO Official Server-side Documentation](https://developers.vwo.com/reference#fullstack-introduction)

### Scripts

1. Install dependencies

```bash
yarn install
```

2. For NodeJs, update your app configuration inside `config.js`

```js
// Only if settings-file is fetched from browser, otherwise pass settings-file from server to client
const accountId = '';
const sdkKey = '';

// AB Test
const abCampaignKey = '';
const abCampaigngoalIdentifier = '';

// Feature Rollout
const featureRolloutCampaignKey = '';
const featureTestCampaignKey = '';
const featureTestCampaigngoalIdentifier = '';

const featureVariable = '';

// Push API i.e. Custom Dimension for post-segmentation
const tagKey = '';
const tagValue = '';

// Pre-segmentation variables
const customVariables = {};

```

3. For JavaScript i.e. browser, update your app configuration inside `public/js/helper.js`

```js
// Only if settings-file is fetched from browser, otherwise pass settings-file from server to client
const accountId = '';
const sdkKey = '';

// AB Test
const abCampaignKey = '';
const abCampaigngoalIdentifier = '';

// Feature Rollout
const featureRolloutCampaignKey = '';
const featureTestCampaignKey = '';
const featureTestCampaigngoalIdentifier = '';

const featureVariable = '';

// Push API i.e. Custom Dimension for post-segmentation
const tagKey = '';
const tagValue = '';

// Pre-segmentation variables
const customVariables = {};
```

4. Run application

```bash
yarn dev-app
```

## License

[Apache License, Version 2.0](https://github.com/wingify/vwo-node-sdk-example/blob/master/LICENSE)

Copyright 2019 Wingify Software Pvt. Ltd.
