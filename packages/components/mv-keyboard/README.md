## mv-keyboard 组件

#### data
| 属性 | 说明 | 类型 | 默认值 |
| :------: | :----: | :----: | :--: |
| target | 父组件上绑定的data对象 | String | "input" |
| extraKey | 配置多个按键 | Array | ["00", "."] |

#### 使用示例
```
this.$keyboard({
    target: "input", // 绑定到 this.input
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