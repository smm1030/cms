import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      console.log(usersListResult.data)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据

      const deleteResult = await deleteUserById(id)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新用户
      const newResult = await newUserData(userInfo)
      console.log('newuser', newResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })

      // 3.获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户数据
      const editResult = await editUserData(id, userInfo)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /**针对页面的数据: 增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)

      const { totalCount, list } = pageListResult.data
      this.pageTotalCount = totalCount
      this.pageList = list
    },
    async deletePageByIdAction(pageName: string, id: number) {
      // 1.删除数据

      const deleteResult = await deletePageById(pageName, id)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 3.获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      // 1.创建新用户
      const newResult = await newPageData(pageName, pageInfo)
      console.log('newpage', newResult)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 3.获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      // 1.更新用户数据
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)

      // 2.重新请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 3.获取完整数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
