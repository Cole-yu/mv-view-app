## mv-dialog 组件

#### data
| 属性 | 说明 | 类型 | 默认值 |
| :------: | :----: | :----: | :--: |
| title | 标题 | String | 提示 |
| message | 内容 | String | 文本内容 |
| confirmText | 确认按钮文案 | String | 确定 |
| cancelText | 取消按钮文案 | String | 取消 |

#### 使用示例
```
this.$confirm({
    title: "提示",
    message: "请开通产品权限后使用。",
    confirmText: "确定",
    cancelText: "取消",
  }).then((action) => {
    console.log("action", action);
    if (action == "confirm") {
      return;
    }
    if (action == "cancel") {
      return;
    }
  });
```