import { setOne, setMany } from '@/vueSetPath'

describe('setOne', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: {
        bar: {
          baz: 'test'
        }
      },
      arr: [
        {
          name: 'John'
        }
      ]
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
        name: 'John'
      },
      {
        name: 'George'
      }
    ])
  })

  it('sets an object', () => {
    setOne(obj, 'foo.bar.baz', { test: 'test' })
    expect(obj.foo.bar.baz).toEqual({ test: 'test' })
  })
})

describe('setMany', () => {
  let obj
  beforeEach(() => {
    obj = {
      foo: {
        bar: {
          baz: 'test'
        }
      },
      arr: [
        {
          name: 'John'
        }
      ]
    }
  })

  it('sets a single property when input is a string', () => {
    setMany(obj, 'foo.bar.baz', 'changed')
    expect(obj.foo.bar.baz).toBe('changed')
  })

  it('sets multiple properies when input is an object', () => {
    setMany(obj, {
      'foo.bar.baz': 'changed',
      'arr.1': { name: 'George' }
    })
    expect(obj.foo.bar.baz).toBe('changed')
    expect(obj.arr).toEqual([
      {
        name: 'John'
      },
      {
        name: 'George'
      }
    ])
  })

  it('throws an error when input is neither a string or an object', () => {
    const fn = () => {
      setMany(obj, 10)
    }
    expect(fn).toThrow(Error)
  })
})
