## 更新日志

## v0.0.1（示例）
`2019-01-01`

**Improvements**

- Tag: 新增 click 事件 
- Swipe: 新增 click 事件
- NoticeBar: 新增 close 事件
- PullRefresh: 新增 success-text、success-duration 属性 
- 针对 Vue 2.6 优化插槽渲染效率 

**Breaking changes**

- Radio: 重写了组件结构，现在提供和 Checkbox 一致的 UI 和 DOM 结构 

**Bug Fixes**

- 修复函数式组件未继承标签属性的问题
- 修复 Swipe 内懒加载图片无法正确加载的问题
- 修复 Dialog 点击蒙层时无法触发 beforeClose 属性的问题
- 修复 AddressList 在禁用状态下样式错误的问题 
- 修复 AddressEdit 在 Vue 2.6 版本下无法选择推荐地址的问题 