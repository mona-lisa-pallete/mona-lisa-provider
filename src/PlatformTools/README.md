# Platform Tools

平台工具，提供给接入的组件的公共工具，例如上传、素材库 etc

## API

通过 props 的方式传入组件表单

```tsx
const platformCtx = {
  ui: {
    Upload: React.Component,
  },
};
```

## 使用

在组件表单中使用：

```tsx
const Form = ({ platformCtx }) => {
  return (
    <div>
      <platformCtx.ui.Upload onChange={val => {
        // 处理
      }}>
    </div>
  )
}
```
