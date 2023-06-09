<template>
  <div class="home-page">
    <Banner v-if="!isLogin" />
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <tab-navigation
            :tab-type="feedType"
            :tab-items="tabItems"
            @on-click-tab="getArticleListByFeed"
          />

          <article-list-loading v-if="fetchState.pending" />

          <template v-if="!fetchState.pending && !fetchState.error">
            <article-preview-list
              :article-list="articleList"
              @toggle-favorite-article="toggleFavoriteArticleByList"
            />
            <pagination :total-count="articleCount" @fetch-data="fetchData" />
          </template>
        </div>

        <template v-if="!fetchState.pending && !fetchState.error">
          <div class="col-md-3">
            <popular-tag-list
              :tag-list="tagList"
              @on-click-tag="getArticleListByTag"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ArticlePreviewList from '@/components/articleList/ArticlePreviewList.vue'
import ArticleListLoading from '@/components/articleList/ArticleListLoading.vue'
import PopularTagList from '@/components/articleList/PopularTagList.vue'
import TabNavigation from '@/components/articleList/TabNavigation.vue'
import Banner from '@/components/banner/Banner.vue'
import Pagination from '@/components/common/Pagination.vue'

import { useArticleList, useTag, useUser } from '@/compositions'
import { feedTypes } from '@/constants'
import Vue from 'vue'
import {
  computed,
  defineComponent,
  toRef,
  toRefs,
  useFetch,
} from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'IndexPage',
  components: {
    ArticlePreviewList,
    Banner,
    TabNavigation,
    Pagination,
    PopularTagList,
    ArticleListLoading,
  },
  setup() {
    const { isLogin } = useUser()
    const {
      state,
      feedType,
      getArticleList,
      getProvince,
      getFeedArticleList,
      getArticleListByTag,
      getArticleListByFeed,
      toggleFavoriteArticleByList,
    } = useArticleList()
    const { state: tagState, getTagList } = useTag()

    const fetchData = async (offset = 0) => {
      if (feedType.value === 'YOUR') {
        await getFeedArticleList(offset)
      } else {
        await getArticleList({ offset })

      }
      await getProvince()
      await getTagList()
    }

    const { fetchState } = useFetch(() => fetchData())

    const tabItems = computed(() => {
      const [, globalFeed] = feedTypes

      return isLogin.value ? feedTypes : [globalFeed]
    })

    return {
      fetchState,
      fetchData,
   
      // articleCount: toRef(articleListState,'articleCount'),
      ...toRefs(state),
      tagList: toRef(tagState, 'tagList'),
      provinces: toRef(state, 'provinces'),
      feedType,
      tabItems,
      getArticleListByTag,
      isLogin,
      getArticleListByFeed,
      toggleFavoriteArticleByList,
    }
  },
})
</script>
