# await-dialog
基于Element-plus UI框架实现的async/await调用方式的对话框

## 用法
提供两种常用的对话框。一种是FormDialog，该对话框包含一些form录入元素，另一种为NestedDialog，里面可以嵌入自己任意定制的内容。
```typescript
let data:any = await openFormDialog('搜索相关文章', [
    {label: '节点名称', name: 'nodename', value: node?node.data.text:''},
    {label: '关键词', name: 'keyword', value: ''}
  ]);
```

NestedDialog的使用和上面类似，但允许传入一个自定义的类：
```typescript
import {CategoryTree} from 'category_tree.vue'
 
async function showCatalog(pageId) {
  let result:any = await openNestedDialog('选择分类', CategoryTree, {editable: 'false'})
  await catalogArticle(pageId, result.id)
}
```

