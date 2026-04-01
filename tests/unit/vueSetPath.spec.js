import { deleteMany, deleteOne, setMany, setOne } from '@/vueSetPath'

describe('setOne', () => {
  let obj

  beforeEach(() => {
    obj = {
      foo: {
        bar: {
          baz: 'test',
        },
      },
      arr: [
        {
          name: 'John',
        },
      ],
    }
  })

  it('sets a value in a deep object', () => {
    setOne(obj, 'foo.bar.baz', 'changed')
    expect(obj.foo.bar.baz).toBe('changed')
  })

  it('sets a non-existing deep path', () => {
    setOne(obj, 'test.bar.baz', 'set')
    expect(obj.test.bar.baz).toBe('set')
  })

  it('sets a non-existing deep path that contains an array', () => {
    setOne(obj, 'test.bar.0.baz', 'set')
    expect(Array.isArray(obj.test.bar)).toBe(true)
    expect(obj.test.bar[0].baz).toBe('set')
  })

  it('sets an existing path to an empty array', () => {
    setOne(obj, 'foo.bar.baz', [])
    expect(obj.foo.bar.baz).toEqual([])
  })

  it('sets an object to an empty object', () => {
    setOne(obj, 'foo.bar', {})
    expect(obj.foo.bar).toEqual({})
  })

  it('sets an array to an empty object', () => {
    setOne(obj, 'arr', {})
    expect(obj.arr).toEqual({})
  })

  it('sets an object to an array of objects', () => {
    setOne(obj, 'arr.1', { name: 'George' })
    expect(obj.arr).toEqual([
      {
        name: 'John',
      },
      {
        name: 'George',
      },
    ])
  })

  it('sets an object', () => {
    setOne(obj, 'foo.bar.baz', { test: 'test' })
    expect(obj.foo.bar.baz).toEqual({ test: 'test' })
  })

  it('transforms an array property to an object', () => {
    obj.foo = [1, 2, 3]
    setOne(obj, 'foo.cat.dog', { test: 'test' })
    expect(obj.foo.cat.dog).toEqual({
      test: 'test',
    })
  })
})

describe('setMany', () => {
  let obj

  beforeEach(() => {
    obj = {
      foo: {
        bar: {
          baz: 'test',
        },
      },
      arr: [
        {
          name: 'John',
        },
      ],
    }
  })

  it('sets a single property when input is a string', () => {
    setMany(obj, 'foo.bar.baz', 'changed')
    expect(obj.foo.bar.baz).toBe('changed')
  })

  it('sets multiple properies when input is an object', () => {
    setMany(obj, {
      'foo.bar.baz': 'changed',
      'arr.1': { name: 'George' },
    })
    expect(obj.foo.bar.baz).toBe('changed')
    expect(obj.arr).toEqual([
      {
        name: 'John',
      },
      {
        name: 'George',
      },
    ])
  })

  it('throws an error when input is neither a string or an object', () => {
    const fn = () => {
      setMany(obj, 10)
    }

    expect(fn).toThrow(Error)
  })
})

describe('prototype pollution safeguards', () => {
  let obj

  beforeEach(() => {
    obj = {}
    delete Object.prototype.polluted
    delete Object.prototype.isAdmin
  })

  afterEach(() => {
    delete Object.prototype.polluted
    delete Object.prototype.isAdmin
  })

  it('throws on unsafe key in setOne root segment', () => {
    const fn = () => {
      setOne(obj, '__proto__.polluted', 'yes')
    }

    expect(fn).toThrow('Path contains unsafe keys.')
    expect({}.polluted).toBeUndefined()
  })

  it('throws on unsafe key in setOne nested segment', () => {
    const fn = () => {
      setOne(obj, 'a.__proto__.isAdmin', true)
    }

    expect(fn).toThrow('Path contains unsafe keys.')
    expect({}.isAdmin).toBeUndefined()
  })

  it('throws on constructor.prototype chain in setOne', () => {
    const fn = () => {
      setOne(obj, 'constructor.prototype.polluted', 'yes')
    }

    expect(fn).toThrow('Path contains unsafe keys.')
    expect({}.polluted).toBeUndefined()
  })

  it('throws on unsafe key in setMany string input', () => {
    const fn = () => {
      setMany(obj, '__proto__.polluted', 'yes')
    }

    expect(fn).toThrow('Path contains unsafe keys.')
    expect({}.polluted).toBeUndefined()
  })

  it('throws on unsafe key in setMany object input', () => {
    const fn = () => {
      setMany(obj, {
        'safe.path': 'ok',
        'a.__proto__.polluted': 'yes',
      })
    }

    expect(fn).toThrow('Path contains unsafe keys.')
    expect({}.polluted).toBeUndefined()
  })
})

describe('deleteOne', () => {
  let obj

  beforeEach(() => {
    obj = {
      foo: {
        bar: {
          baz: 'test',
        },
      },
      arr: [
        {
          name: 'John',
          age: 21,
        },
        {
          name: 'George',
          age: 22,
        },
        {
          name: 'Nick',
          age: 23,
        },
      ],
    }

    delete Object.prototype.polluted
  })

  afterEach(() => {
    delete Object.prototype.polluted
  })

  it('deletes an object property', () => {
    deleteOne(obj, 'foo')
    expect(obj.foo).toBeUndefined()
    expect(obj.arr).toBeDefined()
  })

  it('deletes a deep object property', () => {
    deleteOne(obj, 'foo.bar.baz')
    expect(obj.foo.bar.baz).toBeUndefined()
    expect(obj.foo.bar).toBeDefined()
    expect(obj.arr).toBeDefined()
  })

  it('deletes an array item', () => {
    deleteOne(obj, 'arr.1')
    expect(obj.arr.length).toBe(2)
    expect(obj.arr[1]).toEqual({ name: 'Nick', age: 23 })
  })

  it('deletes an object property inside array item', () => {
    deleteOne(obj, 'arr[1].age')
    expect(obj.arr.length).toBe(3)
    expect(obj.arr[1]).toEqual({ name: 'George' })
  })

  it('throws on unsafe key path', () => {
    const fn = () => {
      deleteOne(obj, '__proto__.polluted')
    }

    expect(fn).toThrow('Path contains unsafe keys.')
    expect({}.polluted).toBeUndefined()
  })
})

describe('deleteMany', () => {
  let obj

  beforeEach(() => {
    obj = {
      foo: {
        bar: {
          baz: 'test1',
          biz: 'test2',
          boz: 'test3',
        },
        far: {
          faz: 'test1',
        },
      },
      arr: [
        {
          name: 'John',
          age: 21,
        },
        {
          name: 'George',
          age: 22,
        },
        {
          name: 'Nick',
          age: 23,
        },
      ],
    }

    delete Object.prototype.polluted
  })

  afterEach(() => {
    delete Object.prototype.polluted
  })

  it('deletes both object properties and array items', () => {
    deleteMany(obj, ['foo.bar.baz', 'foo.bar.biz', 'foo.far.faz', 'arr[0]', 'arr[1].name'])
    expect(obj.foo.bar).toEqual({ boz: 'test3' })
    expect(obj.foo.far).toEqual({})
    expect(obj.arr.length).toBe(2)
    expect(obj.arr[1].name).toBeUndefined()
    expect(obj.arr[1]).toEqual({ age: 23 })
  })

  it('deletes an object property given one string path', () => {
    deleteMany(obj, 'arr')
    expect(obj.arr).not.toBeDefined()
  })

  it('throws an error when path is not a string or array', () => {
    const test = () => {
      deleteMany(obj, 2)
    }

    expect(test).toThrow('Arguments must be either string or array.')
  })

  it('throws on unsafe key path when input is string', () => {
    const fn = () => {
      deleteMany(obj, '__proto__.polluted')
    }

    expect(fn).toThrow('Path contains unsafe keys.')
    expect({}.polluted).toBeUndefined()
  })

  it('throws on unsafe key path when input is array', () => {
    const fn = () => {
      deleteMany(obj, ['foo.bar.baz', 'a.__proto__.polluted'])
    }

    expect(fn).toThrow('Path contains unsafe keys.')
    expect({}.polluted).toBeUndefined()
  })
})
