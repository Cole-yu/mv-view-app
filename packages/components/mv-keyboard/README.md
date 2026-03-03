## mv-keyboard 组件

#### data
| 属性 | 说明 | 类型 | 默认值 |
| :------: | :----: | :----: | :--: |
| input | 绑定的输入值 | String | 空 |
| extraKey | 配置多个按键 | Array | ["00", "."] |
| onInput | 接收回调值 | Function | (input) => { vm.input = input.length > 0 ? Number(input) : ""; } |

#### 使用示例
```
this.$keyboard({
    input: this.input,
    onInput: (input) => {
      vm.input = input.length > 0 ? Number(input) : "";
    }
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