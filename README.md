# vue-set-path <a href="https://npm.im/vue-set-path"><img src="https://badgen.net/npm/v/vue-set-path"></a> <a href="https://npm.im/vue-set-path"><img src="https://badgen.net/npm/dm/vue-set-path"></a> ![](https://img.badgesize.io/kouts/vue-set-path/main/dist/umd/vueSetPath.js.svg) ![](https://img.badgesize.io/kouts/vue-set-path/main/dist/umd/vueSetPath.js.svg?compression=gzip)

Set Vue reactive properties on an object, using dot notation path syntax

## Install
```sh
npm install vue-set-path
```

## Use
```js
import { setOne, setMany } from 'vue-set-path'

const obj = {}

setOne(obj, 'foo.bar.baz', 'New value')
// This will set obj.foo.bar.baz = 'New value'
// Intermediate objects are automatically created

setMany(obj, {
  'foo.bar.baz', 'New value',
  'qux': 'Another value'
})
// The same as setOne, but uses an object map to set multiple properties

```
