const {
  API_CHANNEL_NAME: apiChannelName,
  API_CHANNEL_THUMBNAIL: apiChannelThumbnail,
  APP_VERSION: appVersion,
  BRAND_NAME: brandName,
  CHATTLIN_INBOX_TOKEN: chattlinInboxToken,
  CREATE_NEW_ACCOUNT_FROM_DASHBOARD: createNewAccountFromDashboard,
  DIRECT_UPLOADS_ENABLED: directUploadsEnabled,
  DISPLAY_MANIFEST: displayManifest,
  HCAPTCHA_SITE_KEY: hCaptchaSiteKey,
  INSTALLATION_NAME: installationName,
  LOGO_THUMBNAIL: logoThumbnail,
  LOGO: logo,
  PRIVACY_URL: privacyURL,
  TERMS_URL: termsURL,
  WIDGET_BRAND_URL: widgetBrandURL,
  DISABLE_USER_PROFILE_UPDATE: disableUserProfileUpdate,
  DEPLOYMENT_ENV: deploymentEnv,
} = window.globalConfig || {};

const state = {
  apiChannelName,
  apiChannelThumbnail,
  appVersion,
  brandName,
  chattlinInboxToken,
  deploymentEnv,
  createNewAccountFromDashboard,
  directUploadsEnabled: directUploadsEnabled === 'true',
  disableUserProfileUpdate: disableUserProfileUpdate === 'true',
  displayManifest,
  hCaptchaSiteKey,
  installationName,
  logo,
  logoThumbnail,
  privacyURL,
  termsURL,
  widgetBrandURL,
};

export const getters = {
  get: $state => $state,
  isOnChattlinCloud: $state => $state.deploymentEnv === 'cloud',
  isACustomBrandedInstance: $state => $state.installationName !== 'Chattlin',
};

export const actions = {};

export const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
