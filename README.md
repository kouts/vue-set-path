# vue-set-path <a href="https://npm.im/vue-set-path"><img src="https://badgen.net/npm/v/vue-set-path"></a> ![](https://img.badgesize.io/kouts/vue-set-path/main/dist/umd/vueSetPath.min.js.svg) ![](https://img.badgesize.io/kouts/vue-set-path/main/dist/umd/vueSetPath.min.js.svg?compression=gzip)

> A set of utility methods to update Vue reactive objects, using the dot notation path syntax.

`vue-set-path` methods can be used to `set` and `delete`

- properties of the `data` object in a Vue instance
- Vuex `state` properties
- `Vue.observable` properties

All the methods use their `Vue` equivalents ([Vue.set](https://vuejs.org/v2/api/#Vue-set) and
[Vue.delete](https://vuejs.org/v2/api/#Vue-delete)) under the hood, in order to retain reactivity.

## Install

```sh
npm install vue-set-path
```

## Example

```js
import Vue from 'vue'
import { setOne, setMany, deleteOne, deleteMany } from 'vue-set-path'

const obj = Vue.observable({})

setOne(obj, 'foo.bar.baz', 'New value')
// This will set obj.foo.bar.baz to 'New value'
// If intermediate objects don't exist they will get automatically created

setMany(obj, {
  'foo.bar.baz', 'New value',
  'qux': 'Another value'
})
// The same as setOne, but uses a map of path/values to set multiple properties

deleteOne(obj, 'foo.bar.baz')
// Deletes the foo.bar.baz property

deleteMany(obj, ['foo.bar.baz', 'qux'])
// The same as deleteOne, but uses an array of paths to delete many properties at once

```

## API

### setOne

Sets a reactive value on an object property or an array element.  
Non-existent paths will be be initialized automatically.

#### Syntax

- `setOne(object, path, value)`

#### Parameters

- `object (Object | Array)`: The data object/array that we're changing.
- `path (string)`: The path of the data we're changing, e.g.
  - user
  - user.name
  - user.friends[1] or user.friends.1
- `value (any)`: The value we're changing it to. Can be a primitive or an object (or array).

### setMany

Sets one or many a reactive properties by using either `path, value` or a map of `path: value` pairs.

#### Syntax

- `setMany(object, path, value)`
- `setMany(object, map)`

#### Parameters

- `object (Object | Array)`: The data object/array that we're changing.
- `path (string)`: The path of the data we're changing, e.g.
  - user
  - user.name
  - user.friends[1] or user.friends.1
- `value (any)`: The value we're changing it to. Can be a primitive or an object (or array).
- `map (Object)`: A map of `path: value` pairs.

### deleteOne

Deletes a property of an object or the element of an array.

#### Syntax

- `deleteOne(object, path)`

#### Parameters

- `object (Object | Array)`: The data object/array that we're deleting a property from.
- `path (string)`: The path of the property that we're deleting, e.g.
  - user
  - user.name
  - user.friends[1] or user.friends.1

### deleteMany

Deletes one or many properties and/or array elements by using an array of paths.

#### Syntax

- `deleteMany(object, path)`
- `deleteMany(object, array)`

#### Parameters

- `object (Object | Array)`: The data object/array that we're deleting properties from.
- `path (string)`: The path of the property that we're deleting, e.g.
  - user
  - user.name
  - user.friends[1] or user.friends.1
- `array (Array)`: An array of paths to delete.

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions