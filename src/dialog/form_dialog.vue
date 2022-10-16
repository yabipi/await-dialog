<template>
  <el-dialog v-model="visible" :title="title" :append-to-body=true width="50%">
    <el-form v-model="theForm">
      <el-form-item v-for="item in formItems" :label="item.label" :label-width="120">
        <el-input v-model="theForm[item.name]" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
        <span>
          <el-button type="primary" @click="cancel()">取消</el-button>
          <el-button type="primary" @click="submit()">确定</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref, watch, defineProps, onBeforeMount, getCurrentInstance} from "vue"
import {ElDialog, ElForm, ElFormItem, ElInput, ElButton} from "element-plus";
import {closeDialog} from "/@/components/dialog"

const props = defineProps<{title: string, formItems: []}>()
const visible = ref<boolean>(true)
const title = ref(props.title)
const formItems = ref<any[]>(props.formItems)
const theForm = ref<{}>({});

onBeforeMount(() => {
  formItems.value.forEach((item: {name: string, value: string}) => {
    theForm.value[item.name] = item.value
  })
})

const cancel = () => {
  closeDialog(null)
  visible.value = false
}

const submit = () => {
  closeDialog(theForm.value)
  visible.value = false
}
// const instance = getCurrentInstance()
// instance['returnValue'] = returnValue

// defineExpose({returnValue, visible})
</script>

<style scoped>

</style>
