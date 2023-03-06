<template>
  <div class="modal">
    <ElDialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <ElForm :model="formData" label-width="80px" size="large">
          <ElFormItem label="部门名称" prop="name">
            <ElInput v-model="formData.name" placeholder="请输入部门名称" />
          </ElFormItem>
          <ElFormItem label="部门领导" prop="leader">
            <ElInput v-model="formData.leader" placeholder="请输入部门领导" />
          </ElFormItem>

          <ElFormItem label="选择部门" prop="parentId">
            <ElSelect
              v-model="formData.parentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <ElOption :label="item.name" :value="item.id" />
              </template>
            </ElSelect>
          </ElFormItem>
        </ElForm>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="dialogVisible = false">取消</ElButton>
          <ElButton type="primary" @click="handleConfirmClick"> 确定 </ElButton>
        </span>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'

import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

// 1.定义内部属性

const dialogVisible = ref(false)
const formData = reactive({
  name: '',
  leader: '',
  parentId: ''
})
const isNewRef = ref(true)
const editData = ref()

// 2.获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// 3.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑用户数据
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 创建新的部门
    console.log(formData)

    systemStore.newPageDataAction('department', formData)
  }
}
// 暴露属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
