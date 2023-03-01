<template>
  <div class="user-wrapper">
    <span class="action" @click="searchMenuVisible = !searchMenuVisible">
      <a-icon type="search"></a-icon>
    </span>
    <!-- 菜单搜索改为动态组件，在手机端呈现出弹出框 -->
    <component
      :is="searchMenuComp"
      v-show="searchMenuVisible || isMobile()"
      class="borders"
      :visible="searchMenuVisible"
      title="搜索菜单"
      :footer="null"
      @cancel="searchMenuVisible = false"
    >
      <a-select
        ref="menuSelect"
        class="search-input"
        showSearch
        :showArrow="false"
        placeholder="搜索菜单"
        optionFilterProp="children"
        :filterOption="filterOption"
        :open="isMobile() ? true : null"
        :getPopupContainer="node => node.parentNode"
        :style="isMobile() ? { width: '100%', marginBottom: '50px' } : {}"
        @change="searchMethods"
        @blur="searchMenuVisible = false"
      >
        <a-select-option v-for="(site, index) in searchMenuOptions" :key="index" :value="site.id">
          {{ site.meta.title }}
        </a-select-option>
      </a-select>
    </component>

    <header-notice class="action" />

    <a-dropdown>
      <span class="action action-full ant-dropdown-link user-dropdown-menu">
        <a-avatar class="avatar" size="small" icon="user" :src="getAvatar()" />
        <span v-if="isDesktop()">欢迎您，{{ nickname() }}</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="0">
          <router-link :to="{ name: 'account-center' }">
            <a-icon type="user" />
            <span>&nbsp;&nbsp;个人中心</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link :to="{ name: 'account-settings-base' }">
            <a-icon type="setting" />
            <span>&nbsp;&nbsp;账户设置</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2" @click="updatePassword">
          <a-icon type="key" />
          <span>密码修改</span>
        </a-menu-item>
        <a-menu-item key="3" @click="updateCurrentDepart">
          <a-icon type="cluster" />
          <span>切换部门</span>
        </a-menu-item>
        <a-menu-item key="4" @click="clearCache">
          <a-icon type="delete" />
          <span>清理缓存</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="question-circle-o" />
          <a style="display: inline-block" target="_blank" href="http://doc.jeecg.com">帮助中心</a>
        </a-menu-item>
        <!-- v-if="process.env.NODE_ENV !== 'production'" -->
        <a-menu-item key="6" @click="handleLayoutSetting">
          <a-icon type="tool" />
          <span>布局设置</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>

    <span class="action" @click="handleLogout">
      <a class="logout-title" href="javascript:;">
        <a-icon type="logout" />
        <span v-if="isDesktop()">&nbsp;退出登录</span>
      </a>
    </span>

    <user-password ref="userPassword"></user-password>
    <depart-select ref="departSelect" :closable="true" title="部门切换"></depart-select>
    <!-- v-if="process.env.NODE_ENV !== 'production'" -->
    <setting-drawer ref="settingDrawer"></setting-drawer>
  </div>
</template>

<script>
import HeaderNotice from './HeaderNotice'
import UserPassword from './UserPassword'
import DepartSelect from './DepartSelect'
import SettingDrawer from '@/components/setting/SettingDrawer'
import { mapActions, mapGetters, mapState } from 'vuex'
import { mixinDevice } from '@tievd/cube-block/lib/utils/mixin.js'
import { getFileAccessHttpUrl, getAction } from '@tievd/cube-block/lib/api/manage'
import Vue from 'vue'
import { UI_CACHE_DB_DICT_DATA } from '@tievd/cube-block/lib/store/mutation-types'

export default {
  name: 'UserMenu',

  components: {
    HeaderNotice,
    UserPassword,
    DepartSelect,
    SettingDrawer
  },

  mixins: [mixinDevice],

  data() {
    return {
      searchMenuOptions: [],
      searchMenuComp: 'span',
      searchMenuVisible: false,
      process
    }
  },

  created() {
    let lists = []
    this.searchMenus(lists, this.permissionMenuList)
    this.searchMenuOptions = [...lists]
  },

  mounted() {
    // 如果是单点登录模式
    if (process.env.VUE_APP_SSO == 'true') {
      let depart = this.userInfo().orgCode
      if (!depart) {
        this.updateCurrentDepart()
      }
    }
  },

  computed: {
    ...mapState({
      // 后台菜单
      permissionMenuList: state => state.user.permissionList
    })
  },

  watch: {
    device: {
      immediate: true,
      handler() {
        this.searchMenuVisible = false
        this.searchMenuComp = this.isMobile() ? 'a-modal' : 'span'
      }
    }
  },

  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
    handleLayoutSetting() {
      this.$refs.settingDrawer.showDrawer()
    },
    getAvatar() {
      return getFileAccessHttpUrl(this.avatar())
    },
    handleLogout() {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              that.$router.push({ path: '/user/login' })
              //window.location.reload()
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    },
    updatePassword() {
      let username = this.userInfo().username
      this.$refs.userPassword.show(username)
    },
    updateCurrentDepart() {
      this.$refs.departSelect.show()
    },
    searchMenus(arr, menus) {
      for (let i of menus) {
        if (!i.hidden && 'layouts/RouteView' !== i.component) {
          arr.push(i)
        }
        if (i.children && i.children.length > 0) {
          this.searchMenus(arr, i.children)
        }
      }
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    searchMethods(value) {
      let route = this.searchMenuOptions.filter(item => item.id === value)[0]
      if (route.meta.internalOrExternal === true || route.component.includes('layouts/IframePageView')) {
        window.open(route.meta.url, '_blank')
      } else {
        this.$router.push({ path: route.path })
      }
      this.searchMenuVisible = false
    },
    clearCache() {
      getAction('sys/dict/refleshCache')
        .then(res => {
          if (res.success) {
            //重新加载缓存
            getAction('sys/dict/queryAllDictItems').then(res => {
              if (res.success) {
                Vue.ls.remove(UI_CACHE_DB_DICT_DATA)
                Vue.ls.set(UI_CACHE_DB_DICT_DATA, res.result, 7 * 24 * 60 * 60 * 1000)
              }
            })
            this.$message.success('刷新缓存完成！')
          }
        })
        .catch(e => {
          this.$message.warn('刷新缓存失败！')
          console.log('刷新失败', e)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.user-wrapper {
  float: right;
  height: 100%;
  .search-input {
    width: 180px;
    color: inherit;

    /deep/ .ant-select-selection {
      background-color: inherit;
      border-radius: 0;
      border: none;
      box-shadow: none;
      border-bottom: 1px solid @border-color-base;
      &__placeholder,
      &__field__placeholder {
        color: inherit;
      }
    }
  }

  .action {
    display: inline-block;
    cursor: pointer;
    padding: 0 14px;
    transition: all 0.3s;
    height: 70%;
    line-height: 46px;

    &.action-full {
      height: 100%;
    }

    &:hover {
      background: @item-hover-bg;
    }

    .avatar {
      margin: 20px 10px 20px 0;
      color: @primary-color;
      background: @body-background;
      vertical-align: middle;
    }

    .icon {
      font-size: 16px;
      padding: 4px;
    }

    .anticon {
      color: inherit;
    }
  }

  .logout-title {
    color: inherit;
    text-decoration: none;
  }
}
</style>
