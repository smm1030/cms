import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

interface IloginState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore('login', {
  // 如何指定state的类型
  state: (): IloginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1. 账号登录， 获取token等信息
      const loginResult = await accountLoginRequest(account)

      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 2. 获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3. 根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4. 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 重要: 动态添加路由
      const localRoutes: RouteRecordRaw[] = []
      // 1.1 读取router/main所有的ts文件
      const files: Record<string, any> = import.meta.glob(
        '../../router/main/**/*.ts',
        {
          eager: true
        }
      )
      // 1.2 将加载的对象放到localRoutes
      for (const key in files) {
        const module = files[key]
        localRoutes.push(module.default)
      }
      console.log(localRoutes)

      // 5.页面跳转(main)
      router.push('/main')
    }
  }
})

export default useLoginStore
