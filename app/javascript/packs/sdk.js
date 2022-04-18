import Cookies from 'js-cookie';
import { IFrameHelper } from '../sdk/IFrameHelper';
import {
  getBubbleView,
  getDarkMode,
  getWidgetStyle,
} from '../sdk/settingsHelper';
import {
  computeHashForUserData,
  getUserCookieName,
  hasUserKeys,
} from '../sdk/cookieHelpers';

const runSDK = ({ baseUrl, websiteToken }) => {
  if (window.$chattlin) {
    return;
  }

  const chattlinSettings = window.chattlinSettings || {};
  window.$chattlin = {
    baseUrl,
    hasLoaded: false,
    hideMessageBubble: chattlinSettings.hideMessageBubble || false,
    isOpen: false,
    position: chattlinSettings.position === 'left' ? 'left' : 'right',
    websiteToken,
    locale: chattlinSettings.locale,
    type: getBubbleView(chattlinSettings.type),
    launcherTitle: chattlinSettings.launcherTitle || '',
    showPopoutButton: chattlinSettings.showPopoutButton || false,
    widgetStyle: getWidgetStyle(chattlinSettings.widgetStyle) || 'standard',
    resetTriggered: false,
    darkMode: getDarkMode(chattlinSettings.darkMode),

    toggle(state) {
      IFrameHelper.events.toggleBubble(state);
    },

    popoutChatWindow() {
      IFrameHelper.events.popoutChatWindow({
        baseUrl: window.$chattlin.baseUrl,
        websiteToken: window.$chattlin.websiteToken,
        locale: window.$chattlin.locale,
      });
    },

    setUser(identifier, user) {
      if (typeof identifier !== 'string' && typeof identifier !== 'number') {
        throw new Error('Identifier should be a string or a number');
      }

      if (!hasUserKeys(user)) {
        throw new Error(
          'User object should have one of the keys [avatar_url, email, name]'
        );
      }

      const userCookieName = getUserCookieName();
      const existingCookieValue = Cookies.get(userCookieName);
      const hashToBeStored = computeHashForUserData({ identifier, user });
      if (hashToBeStored === existingCookieValue) {
        return;
      }

      window.$chattlin.identifier = identifier;
      window.$chattlin.user = user;
      IFrameHelper.sendMessage('set-user', { identifier, user });
      Cookies.set(userCookieName, hashToBeStored, {
        expires: 365,
        sameSite: 'Lax',
      });
    },

    setCustomAttributes(customAttributes = {}) {
      if (!customAttributes || !Object.keys(customAttributes).length) {
        throw new Error('Custom attributes should have atleast one key');
      } else {
        IFrameHelper.sendMessage('set-custom-attributes', { customAttributes });
      }
    },

    deleteCustomAttribute(customAttribute = '') {
      if (!customAttribute) {
        throw new Error('Custom attribute is required');
      } else {
        IFrameHelper.sendMessage('delete-custom-attribute', {
          customAttribute,
        });
      }
    },

    setLabel(label = '') {
      IFrameHelper.sendMessage('set-label', { label });
    },

    removeLabel(label = '') {
      IFrameHelper.sendMessage('remove-label', { label });
    },

    setLocale(localeToBeUsed = 'en') {
      IFrameHelper.sendMessage('set-locale', { locale: localeToBeUsed });
    },

    reset() {
      if (window.$chattlin.isOpen) {
        IFrameHelper.events.toggleBubble();
      }

      Cookies.remove('cw_conversation');
      Cookies.remove(getUserCookieName());

      const iframe = IFrameHelper.getAppFrame();
      iframe.src = IFrameHelper.getUrl({
        baseUrl: window.$chattlin.baseUrl,
        websiteToken: window.$chattlin.websiteToken,
      });

      window.$chattlin.resetTriggered = true;
    },
  };

  IFrameHelper.createFrame({
    baseUrl,
    websiteToken,
  });
};

window.chattlinSDK = {
  run: runSDK,
};
