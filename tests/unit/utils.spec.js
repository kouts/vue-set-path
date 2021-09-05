import { isObject, isNumeric, isArray, splitPath, getByPath } from '@/utils'

describe('isObject', () => {
  it('returns true when input is an object literal', () => {
    const res = isObject({})
    expect(res).toBe(true)
  })

  it('returns false when input is an array', () => {
    const res = isObject([])
    expect(res).toBe(false)
  })

  it('returns false when input is null', () => {
    const res = isObject(null)
    expect(res).toBe(false)
  })

  it('returns false when input is undefined', () => {
    const res = isObject(undefined)
    expect(res).toBe(false)
  })

  it('returns false when input is string', () => {
    const res = isObject('test')
    expect(res).toBe(false)
  })

  it('returns false when input is number', () => {
    const res = isObject(10)
    expect(res).toBe(false)
  })
})

describe('isNumeric', () => {
  it('returns true when input is a number', () => {
    const res = isNumeric(-1)
    const res0 = isNumeric(0)
    const res1 = isNumeric(1)
    expect(res).toBe(true)
    expect(res0).toBe(true)
    expect(res1).toBe(true)
  })

  it('returns false when input is an object literal', () => {
    const res = isNumeric({})
    expect(res).toBe(false)
  })

  it('returns false when input is an array', () => {
    const res = isNumeric([])
    expect(res).toBe(false)
  })

  it('returns false when input is null', () => {
    const res = isNumeric(null)
    expect(res).toBe(false)
  })

  it('returns false when input is undefined', () => {
    const res = isNumeric(undefined)
    expect(res).toBe(false)
  })

  it('returns false when input is string', () => {
    const res = isNumeric('test')
    expect(res).toBe(false)
  })
})

describe('isArray', () => {
  it('returns true when input is an array', () => {
    const res = isArray([])
    expect(res).toBe(true)
  })

  it('returns false when input is an object literal', () => {
    const res = isArray({})
    expect(res).toBe(false)
  })

  it('returns false when input is null', () => {
    const res = isArray(null)
    expect(res).toBe(false)
  })

  it('returns false when input is undefined', () => {
    const res = isArray(undefined)
    expect(res).toBe(false)
  })

  it('returns false when input is string', () => {
    const res = isArray('test')
    expect(res).toBe(false)
  })

  it('returns false when input is number', () => {
    const res = isArray(10)
    expect(res).toBe(false)
  })
})

describe('splitPath', () => {
  it('returns the correct value for dot notation syntax', () => {
    const path = 'foo.bar.baz'
    const pathArr = ['foo', 'bar', 'baz']
    const res = splitPath(path)
    expect(res).toEqual(pathArr)
  })

  it('returns the correct value for bracket syntax', () => {
    const path = 'foo[bar][baz]'
    const pathArr = ['foo', 'bar', 'baz']
    const res = splitPath(path)
    expect(res).toEqual(pathArr)
  })

  it('returns the correct value for mixed dot and bracket syntax', () => {
    const path = 'foo[bar].baz.qux[quuux]'
    const pathArr = ['foo', 'bar', 'baz', 'qux', 'quuux']
    const res = splitPath(path)
    expect(res).toEqual(pathArr)
  })

  it('returns the correct value when using number parts', () => {
    const path = 'foo[0].baz.qux[1]'
    const pathArr = ['foo', '0', 'baz', 'qux', '1']
    const res = splitPath(path)
    expect(res).toEqual(pathArr)
  })

  it('returns the correct value when path has dashes in name', () => {
    const path = 'foo-dash[0].baz-double-dash.qux[1]'
    const pathArr = ['foo-dash', '0', 'baz-double-dash', 'qux', '1']
    const res = splitPath(path)
    expect(res).toEqual(pathArr)
  })

  it('returns the correct value when path has spaces in name', () => {
    const path = 'foo-dash[0].baz-double-dash.qux.space inside'
    const pathArr = ['foo-dash', '0', 'baz-double-dash', 'qux', 'space inside']
    const res = splitPath(path)
    expect(res).toEqual(pathArr)
  })
})

describe('getByPath', () => {
  const obj = {
    foo: {
      bar: 'test',
      baz: [
        {
          qux: 'test'
        }
      ],
      notDefined: undefined,
      nested: {
        personalInfo: {
          name: 'John Doe',
          address: {
            line1: 'Westwish St'
          }
        }
      }
    }
  }
  it('returns the correct value for dot notation syntax', () => {
    const res = getByPath(obj, 'foo.bar')
    expect(res).toBe('test')
  })

  it('returns undefined when value does not exist', () => {
    const res1 = getByPath(obj, 'foo.nonExisting')
    const res2 = getByPath(obj, 'bee.nonExisting.qux.bar.baz')
    expect(res1).toBe(undefined)
    expect(res2).toBe(undefined)
  })

  it('returns the correct value for array paths', () => {
    const res = getByPath(obj, 'foo.baz.0.qux')
    expect(res).toBe('test')
  })

  it('returns undefined for resolved properties that have a value of undefined', () => {
    const res = getByPath(obj, 'foo.notDefined')
    expect(res).toBe(undefined)
  })

  it('gets whole object properties', () => {
    const res = getByPath(obj, 'foo.nested')
    expect(res).toMatchObject(obj.foo.nested)
  })

  it('gets nested properties with mixed syntax', () => {
    const res = getByPath(obj, 'foo[nested].personalInfo[address][line1]')
    expect(res).toBe('Westwish St')
  })

  it('works with an array as input', () => {
    const res = getByPath(obj, ['foo', 'baz', '0', 'qux'])
    expect(res).toBe('test')
  })
})
