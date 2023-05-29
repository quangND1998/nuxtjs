<template>
  <Tutorial/>

</template>

<script lang="ts">

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
  setup() {
    const { isLogin } = useUser()
    const {
      state: articleListState,
      feedType,
      getArticleList,
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
      ...toRefs(articleListState),
      tagList: toRef(tagState, 'tagList'),
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
