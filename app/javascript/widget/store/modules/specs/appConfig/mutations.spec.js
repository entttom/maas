import { mutations } from '../../appConfig';

describe('#mutations', () => {
  describe('#SET_REFERRER_HOST', () => {
    it('sets referrer host properly', () => {
      const state = { referrerHost: '' };
      mutations.SET_REFERRER_HOST(state, 'www.chattlin.com');
      expect(state.referrerHost).toEqual('www.chattlin.com');
    });
  });

  describe('#SET_WIDGET_COLOR', () => {
    it('sets widget color properly', () => {
      const state = { widgetColor: '' };
      mutations.SET_WIDGET_COLOR(state, { widgetColor: '#00bcd4' });
      expect(state.widgetColor).toEqual('#00bcd4');
    });
  });
});
