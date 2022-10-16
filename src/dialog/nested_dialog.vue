<template>
  <el-dialog v-model="visible" :title="title" :append-to-body=true width="50%">
    <component ref="compRef" :is="nestedComponent" v-bind="options"></component>
    <template #footer>
        <span>
          <el-button type="primary" @click="cancel()">取消</el-button>
          <el-button type="primary" @click="submit()">确定</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {ref, shallowRef, watch, defineProps, onBeforeMount, getCurrentInstance} from "vue"
import {ElDialog, ElForm, ElFormItem, ElInput, ElButton} from "element-plus";
import {closeDialog} from "/@/components/dialog"

const props = defineProps<{title: string, nestedComponent: any, options: any}>()
const visible = ref<boolean>(true)
const title = ref(props.title)
const nestedComponent = shallowRef(props.nestedComponent)
const options = ref(props.options)
const compRef = ref()


const cancel = () => {
  closeDialog(null)
  visible.value = false
}

const submit = () => {
  closeDialog(compRef.value.getReturnedData())
  visible.value = false
}
// const instance = getCurrentInstance()
// instance['returnValue'] = returnValue

// defineExpose({returnValue, visible})
</script>

<style scoped>

</style>
