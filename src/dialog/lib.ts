import {Component, h, render, shallowRef} from "vue";
import {DefineComponent} from "@vue/runtime-core";
import FormDialog from "./form_dialog.vue"
import NestedDialog from "./nested_dialog.vue"

export interface DialogInstance {
    comp?: any;
    dialog: Component;
    wrapper: string;
    props: any;
    resolve: (data: any) => void;
}

export const dialogRef = shallowRef<DialogInstance>();


/**
 * 对话框点击取消或关闭时，调用resolve, 返回数据
 * @param data
 */
export function closeDialog(data?: any) {
    dialogRef.value.resolve(data)
    dialogRef.value = null
}

/**
 * Extracts the type of props from a component definition.
 */
type PropsType<C extends DefineComponent<any, any, any>> = InstanceType<C>["$props"];

/**
 * Extracts the return type of the dialog from the setup function.
 */
type BindingReturnType<C extends DefineComponent<any, any, any>> = C extends DefineComponent<any, infer X, any> ?
    (X extends { returnValue: () => infer Y } ? Y : never)
    : never;

/**
 * Extracts the return type of the dialog from the methods.
 */
type MethodReturnType<C extends DefineComponent<any, any, any, any, any>> = C extends DefineComponent<any, any, any, any, infer X> ?
    (X extends { returnValue: () => infer Y } ? Y : never)
    : never;

/**
 * Extracts the return type of the dialog either from the setup method or from the methods.
 */
type ReturnType<C extends DefineComponent<any, any, any, any, any>> = BindingReturnType<C> extends never ? MethodReturnType<C> : BindingReturnType<C>;

/**
 * 打开一个定制的Dialog组件，减少对父组件的侵入
 * @param dlgComponent
 * @param options
 */
export function openNormalDialog(dlgComponent, options) {
    const vnode = h(dlgComponent, options)
    vnode.appContext = null
    const container = document.createElement('div')
    render(vnode, container)
    const instance = vnode.component
    const vm = instance.proxy
    return vm
}
/**
 * Opens a dialog.
 * @param dialog The dialog you want to open.
 * @param props The props to be passed to the dialog.
 * @param wrapper The dialog wrapper you want the dialog to open into.
 * @return A promise that resolves when the dialog is closed
 */
export function openDialog<C extends DefineComponent<any, any, any, any, any>>(dialog: C, props?: PropsType<C>, wrapper: string = 'default'): Promise<ReturnType<C>> {
    return new Promise(resolve => {
        const vnode = h(dialog, props)
        vnode.appContext = null
        const container = document.createElement('div')
        render(vnode, container)
        const instance = vnode.component
        const vm = instance.proxy
        dialogRef.value = {
            comp: vm,
            dialog,
            props,
            wrapper,
            resolve
        }
    });
}

export function openFormDialog(title, formItems) {
    return openDialog(FormDialog, {title, formItems})
}

/**
 * 打开一个含有指定组件的对话框
 * @param title: 对话框标题
 * @param nestedComponent：对话框内嵌组件
 * @param options : 传递给nestedComponent的属性
 */
export function openNestedDialog(title, nestedComponent, options) {
  return openDialog(NestedDialog, {title, nestedComponent, options})
}
