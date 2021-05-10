# vue-set-path <a href="https://npm.im/vue-set-path"><img src="https://badgen.net/npm/v/vue-set-path"></a> ![](https://img.badgesize.io/kouts/vue-set-path/main/dist/umd/vueSetPath.min.js.svg) ![](https://img.badgesize.io/kouts/vue-set-path/main/dist/umd/vueSetPath.min.js.svg?compression=gzip)

Set Vue reactive properties on an object, using dot notation path syntax

## Install

```sh
npm install vue-set-path
```

## Example

```js
import Vue from 'vue'
import { setOne, setMany } from 'vue-set-path'

const obj = Vue.observable({})

setOne(obj, 'foo.bar.baz', 'New value')
// This will set obj.foo.bar.baz = 'New value'
// If intermediate objects don't exist they will get automatically created

setMany(obj, {
  'foo.bar.baz', 'New value',
  'qux': 'Another value'
})
// The same as setOne, but uses a map of path/values to set multiple properties

```

## API

### setOne

Sets a reactive value on a property of an object or the element of an array.  
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

Sets one or many a reactive values by using either `path, value` or a map of `path: value` pairs.

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
- `map (object)`: A map of keypath: value pairs, as above.