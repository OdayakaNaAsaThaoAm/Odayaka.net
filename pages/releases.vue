<template>
  <div class="releases">
    <h1>Releases</h1>
    <div class="list">
      <div v-for="i in sortByDate" class="item">
        <router-link v-touch-ripple v-if="i.slug" :to="'/release/' + i.slug + '/'" class="item__link">
          <div class="item__wrapper">
            <div class="item__cover">
              <img v-if="i.cover" class="item__img"
                :src="'https://content.sentimony.com/assets/img/releases/small/' + i.cat_no + '/' + i.slug + '.jpg'"
                :srcset="'https://content.sentimony.com/assets/img/releases/small/' + i.cat_no + '/' + i.slug + '.jpg 1x, https://content.sentimony.com/assets/img/releases/small-retina/' + i.cat_no + '/' + i.slug + '.jpg 2x'"
                :alt="i.title + ' Small Thumbnail'"
              >
              <div v-else class="item__soon">Artwork<br>in progress</div>
            </div>
            <div v-if="i.coming_soon" class="item__status--green">Coming Soon</div>
            <div v-if="i.new" class="item__status--red">Out Now</div>
          </div>
          <div class="item__title">
            {{ i.title }}
            <span v-if="i.format == 'EP'">{{ i.format }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import sortBy from 'lodash/sortBy'

export default {
  async asyncData() {
    const { data } = await axios.get('releases.json')
    return { releases: data }
  },
  computed: {
    sortByDate () {
      return sortBy(this.releases, 'date').reverse()
    }
  },
  // filters: {
  //   year (date) {
  //     return date.split('-')[0]
  //   }
  // },
  head: {
    title: 'Releases',
    meta: [
      { name: 'description', content: 'Releases of Sentimony Records' },
      { property: 'og:image', content: 'https://content.sentimony.com/assets/img/og-images/sentimony/home.jpg' }
    ]
  }
}
</script>

<style lang="scss">
@import '../assets/scss/page';
@import '../assets/scss/item';
@import '../assets/scss/list';

.releases {
  @extend .page;
  max-width: 1278px;
  margin: 0 auto;
}
</style>
