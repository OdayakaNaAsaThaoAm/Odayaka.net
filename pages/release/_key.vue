<template>
  <div class="release-page">

    <div class="page-release">
      <SvgTriangle/>
      <div class="page-release__wrapper">

        <div class="page-release__media">
          <div class="page-release__cover">
            <img v-img v-if="release.cover" class="page-release__cover-img"
              :src="'https://content.sentimony.com/assets/img/releases/large/' + release.cat_no + '/' + release.slug +'.jpg'"
              :srcset="'https://content.sentimony.com/assets/img/releases/medium/' + release.cat_no + '/' + release.slug +'.jpg 1x, https://content.sentimony.com/assets/img/releases/medium-retina/' + release.cat_no + '/' + release.slug +'.jpg 2x'"
              :alt="release.title"
            >
            <div v-else class="page-release__cover-coming">Artwork<br>in progress</div>
          </div>
          <div class="page-release__info">
            <div class="page-release__small-info">
              <span v-if="release.cat_no" class="page-release__catalog-number">{{ release.cat_no }}</span>
              <span v-if="release.coming_soon"> | Coming at 2018</span>
              <span v-else-if="release.date"> | {{ release.date | formatDate }}</span>
            </div>
            <h1 v-if="release.title" class="page-release__title">
              {{ release.title }}
              <span v-if="release.format == 'EP'">{{ release.format }}</span>
            </h1>
            <div v-if="release.style" class="page-release__small-info">
              <span>{{ release.style }}</span>
              <span v-if="release.total_time"> | {{ release.total_time }}</span>
            </div>
            <div v-if="release.coming_soon !== true" class="page-release__small-info">Get it:</div>
            <div>

              <a v-if="release.links.applemusic" class="page-release__applemusic-btn"
                :href="release.links.applemusic"
                target="_blank" rel="noopener"
              >
                <img class="page-release__applemusic-btn-img" src="https://content.sentimony.com/assets/img/svg-icons/apple-music.svg?01" alt="Apple Music Icon">
                <span class="page-release__applemusic-btn-text">Apple Music</span>
              </a>

              <a v-if="release.links.googleplay" class="page-release__googlemusic-btn"
                :href="release.links.googleplay"
                target="_blank" rel="noopener"
              >
                <img class="page-release__googlemusic-btn-img" src="https://content.sentimony.com/assets/img/svg-icons/google-play.svg?01" alt="Google Play Icon">
                <span class="page-release__googlemusic-btn-text">Google Play</span>
              </a>

              <a v-if="release.links.bandcamp" class="page-release__googlemusic-btn"
                :href="release.links.bandcamp"
                target="_blank" rel="noopener"
              >
                <img class="page-release__bandcamp-btn-img" src="https://content.sentimony.com/assets/img/svg-icons/bandcamp.svg?01" alt="Bandcamp Icon">
                <span class="page-release__bandcamp-btn-text">Bandcamp</span>
              </a>

            </div>
          </div>
        </div>

        <div class="page-release__player-tabs">
          <vue-tabs>

            <v-tab title="Bandcamp" icon="page__tab__icon--bandcamp">
              <div class="page-release__bandcamp-player">
                <div v-if="release.coming_soon" class="page-release__bandcamp-player-coming">Music<br>is coming</div>
                <iframe
                  v-if="release.links.bandcamp_id"
                  :class="'page-release__bandcamp-player-iframe tracks-' + release.tracks_number"
                  :src="'https://bandcamp.com/EmbeddedPlayer/album=' + release.links.bandcamp_id + '/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/'"
                  seamless
                  :title="release.title + ' Bandcamp Iframe'"
                ></iframe>
              </div>
            </v-tab>

            <v-tab v-if="release.links.youtube_playlist_id" title="YouTube" icon="page__tab__icon--youtube">
              <div class="page-release__youtube-player">
                <iframe
                  class="page-release__youtube-player-iframe"
                  :src="'https://www.youtube.com/embed/videoseries?list=' + release.links.youtube_playlist_id"
                  :title="release.title + ' YouTube Iframe'"
                ></iframe>
              </div>
            </v-tab>

            <v-tab v-if="release.links.spotify" title="Spotify" icon="page__tab__icon--spotify">
              <iframe
                :src="release.links.spotify | spotifyEmbed"
                :class="'page-release__spotify-player-iframe tracks-' + release.tracks_number"
                :title="release.title + ' Spotify Iframe'"
              ></iframe>
            </v-tab>

          </vue-tabs>
        </div>

      </div>
    </div>

    <div class="content">
      <div class="content__wrapper">

        <div v-if="release.info">
          <p v-for="i in release.info" v-html="i.p"></p>
        </div>

        <div v-if="release.tracklist">
          <hr>
          <p>Trackist:</p>
          <p v-for="i in release.tracklist.tracks">
            <span>{{ i.number }}. </span>
            <span>{{ i.artist }}</span> - 
            <span>{{ i.title }}</span> | 
            <span>{{ i.bpm }}</span>
          </p>
          <p v-if="release.tracklist.note" v-html="release.tracklist.note"></p>
        </div>

        <div v-if="release.credits.artwork_by">
          <hr>
          <p>Credits:</p>
          <p v-if="release.credits.written_and_prodused_by" v-html="'Written & Prodused By ' + release.credits.written_and_prodused_by"></p>
          <p v-if="release.credits.compiled_by" v-html="'Compiled By ' + release.credits.compiled_by"></p>
          <p v-if="release.credits.artwork_by" v-html="'Artwork By ' + release.credits.artwork_by"></p>
          <p v-if="release.credits.mastered_by" v-html="'Mastered By ' + release.credits.mastered_by"></p>
          <p v-if="release.credits.mixed_and_mastered_by" v-html="'Mixed & Mastered By ' + release.credits.mixed_and_mastered_by"></p>
        </div>

        <div v-if="release.links.discogs">
          <hr>
          <p>Links:</p>
        </div>

        <p v-if="release.links.beatport">
          <a :href="release.links.beatport" target="_blank" rel="noopener">Beatport</a>
        </p>

        <p v-if="release.links.junodownload">
          <a :href="release.links.junodownload" target="_blank" rel="noopener">Juno Download</a>
        </p>

        <p v-if="release.links.spotify">
          <a :href="release.links.spotify" target="_blank" rel="noopener">Spotify</a>
        </p>

        <p v-if="release.links.beatspace">
          <a :href="release.links.beatspace" target="_blank" rel="noopener">Beatspace</a>
        </p>

        <p v-if="release.links.psyshop">
          <a :href="release.links.psyshop" target="_blank" rel="noopener">Psyshop</a>
        </p>

        <p v-if="release.links.ektoplazm">
          <a :href="release.links.ektoplazm" target="_blank" rel="noopener">Ektoplazm</a>
        </p>

        <p v-if="release.links.discogs">
          <a :href="release.links.discogs" target="_blank" rel="noopener">Discogs</a>
        </p>

        <hr>
        <Disqus shortname="sentimony" :identifier="release.slug" :url="'https://sentimony.com/release/' + release.slug"></Disqus>

      </div>
    </div>

  </div>
</template>

<script>
import SvgTriangle from '~/components/SvgTriangle.vue'
import Disqus from 'vue-disqus/VueDisqus.vue'
import axios from '~/plugins/axios'

export default {
  layout: 'release',
  components: {
    SvgTriangle,
    Disqus
  },
  async asyncData({ route }) {
    const { key } = route.params
    const { data } = await axios.get(`releases/${key}.json`)
    return { release: data }
  },
  filters: {
    formatDate: function (date) {
      var moment = require('moment');
      if (date) {
        return moment(String(date)).format('DD MMM YYYY');
      }
    },
    spotifyEmbed (spotify) {
      if (spotify) {
        let s = spotify.replace('https://open.spotify.com/album/', '');
        return 'https://open.spotify.com/embed?uri=spotify:album:' + s + '&theme=white';
      }
    }
  },
  head () {
    return {
      title: this.release.title,
      meta: [
        { name: 'description', content: this.release.tracks_number + ' tracks ' + this.release.style + ' ' + this.release.format + ', ' + this.release.date.split('-')[0] },
        { property: 'og:image', content: 'https://content.sentimony.com/assets/img/releases/og-images/' + this.release.cat_no + '/' + this.release.slug + '.jpg' }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../../node_modules/coriolan-ui/tools/variables';
@import '../../node_modules/coriolan-ui/mixins/media';
@import '../../node_modules/coriolan-ui/mixins/ratio';
@import '../../assets/scss/variables';
@import '../../assets/scss/buttons';
@import '../../assets/scss/vue-tabs-restyle';
@import '../../assets/scss/content';
@import '../../assets/scss/page';
@import '../../assets/scss/iframe-size';
@import '../../assets/scss/v-img-restyle';
@import '../../assets/scss/page';

.page-release {
  @extend .page;
  position: relative;

  &__wrapper {
    margin: 0 auto;
    max-width: 1278px;
    text-align: left;
    border-top: 1px solid rgba(#fff,.3);
    padding: 1.8em 0 1.8em;
    box-sizing: border-box;
    position: relative;
    z-index: 40;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;

    @include media(L) {
      flex-direction: row;
      padding-top: 40px;
    }
  }

  &__media {
    margin-bottom: 1em;
    width: 100%;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @include media(L) {
      margin-top: 62px;
      margin-bottom: 6em;
      width: auto;
    }
  }

  &__cover {
    min-width: 100px;
    height: 100px;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 1.4em;
    background-color: $colorBgBlack;
    display: flex;
    align-items: stretch;
    box-shadow: $shadow;

    @include media(M) {
      min-width: 190px;
      height: 190px;
    }

    &-link {
      display: flex;
      align-items: stretch;
      width: 100%;
    }

    &-img {
      display: block;
      width: 100%;
      max-width: 100px;
      box-shadow: $shadow;

      @include media(M) {
        max-width: 190px;
      }
    }

    &-coming {
      padding: 1em 1.2em;
      font-size: 10px;
      color: rgba(#fff,.5);

      @include media(M) {
        font-size: 14px;
      }
    }
  }

  &__info {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding-right: 1.1em;
  }

  &__small-info {
    font-size: 10px;
    color: rgba(#fff,.5);

    @include media(S) {
      font-size: 14px;
    }
  }

  &__catalog-number {
    text-transform: uppercase;
  }

  &__title {
    font-size: 18px;
    line-height: 1.2;
    margin: 0 0 .1em;
    color: #fff;
    text-transform: capitalize;

    @include media(M) {
      font-size: 2em;
    }
  }

  // &__junodownload-btn,
  &__bandcamp-btn,
  &__applemusic-btn,
  &__googlemusic-btn {
    @extend .btn;
    margin-top: .5em;

    &-img {
      @extend .btn__img;
      height: 18px;
    }

    &-text {
      @extend .btn__text;
    }
  }

  &__player-tabs {
    width: 100%;
    max-width: 540px;
  }

  &__bandcamp-player {
    @extend .sentimony-iframe;

    &-coming {
      padding: 1em 1.2em;
      font-size: 14px;
      color: rgba(#fff,.5);
    }

    &-iframe {
      margin: 0 auto;
      max-width: 540px;
    }
  }

  &__youtube-player {
    @include ratio(100%,16,9);
    @extend .sentimony-iframe;

    &-iframe {
      border-radius: 6px;
      border: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 143%;
      height: 143%;
      transform: scale(.7);
      transform-origin: top left;
    }
  }

  &__spotify-player-iframe {
    @extend .sentimony-iframe;
  }
}
</style>
