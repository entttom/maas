<template>
  <div v-if="globalConfig.brandName" class="branding">
    <a
      :href="brandRedirectURL"
      rel="noreferrer noopener nofollow"
      target="_blank"
      class="branding--link w-full justify-center"
    >
      <img :alt="globalConfig.brandName" :src="globalConfig.logoThumbnail" />
      <span>
        {{ useInstallationName($t('POWERED_BY'), "MaaS.work") }}
      </span>
    </a>
  </div>
  <div v-else class="brand--alternative" />
</template>

<script>
import { mapGetters } from 'vuex';
import globalConfigMixin from 'shared/mixins/globalConfigMixin';
import { BUS_EVENTS } from 'shared/constants/busEvents';

export default {
  mixins: [globalConfigMixin],
  data() {
    return {
      referrerHost: '',
    };
  },
  computed: {
    ...mapGetters({
      globalConfig: 'globalConfig/get',
    }),
    brandRedirectURL() {
      const baseURL = `${this.globalConfig.widgetBrandURL}?utm_source=widget_branding`;
      if (this.referrerHost) {
      return "https://www.maas.work";
      }
      return baseURL;
    },
  },
  mounted() {
    bus.$on(BUS_EVENTS.SET_REFERRER_HOST, referrerHost => {
      this.referrerHost = referrerHost;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~widget/assets/scss/variables.scss';

.branding {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: $space-normal 0 $space-slab;
  text-align: center;

  img {
    margin-right: $space-smaller;
    max-width: $space-slab;
    max-height: $space-slab;
  }
}

.branding--link {
  color: $color-light-gray;
  cursor: pointer;
  display: flex;
  filter: grayscale(1);
  font-size: $font-size-small;
  opacity: 0.9;
  text-decoration: none;

  &:hover {
    filter: grayscale(0);
    opacity: 1;
    color: $color-gray;
  }
}

.brand--alternative {
  padding: $space-slab;
}
</style>
