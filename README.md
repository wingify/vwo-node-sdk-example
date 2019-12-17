## VWO NodeJs SDK Example

[vwo-node-sdk](https://github.com/wingify/vwo-node-sdk) allows you to A/B Test your Website at server-side.

This repository provides a basic demo of how server-side works with VWO NodeJs SDK.

### Requirements

- Node 6.10.0 onwards

### Documentation

Refer [VWO Official Server-side Documentation](https://developers.vwo.com/reference#server-side-introduction)

### Scripts

1. Install dependencies

```
yarn install
```

2. Update your app configuration inside `config.js`

```js
<<<<<<< HEAD
const campaignKey = 'REPLACE_THIS_WITH_CORRECT_VALUE';
const goalIdentifier = 'REPLACE_THIS_WITH_CORRECT_VALUE';
const accountId = 'REPLACE_THIS_WITH_CORRECT_VALUE';
const sdkKey = 'REPLACE_THIS_WITH_CORRECT_VALUE';
=======
const accountId = '';
const sdkKey = '';

const abcampaignKey = '';
const abCampaigngoalIdentifier = '';

const featureRolloutCampaignKey = '';
const featureTestCampaignKey = '';
>>>>>>> e51db512b2c86430df2ae2c4214151c23cdcd4bf

```

3. Run application

```
yarn dev-app
```

## License

[Apache License, Version 2.0](https://github.com/wingify/vwo-node-sdk-example/blob/master/LICENSE)

Copyright 2019 Wingify Software Pvt. Ltd.
