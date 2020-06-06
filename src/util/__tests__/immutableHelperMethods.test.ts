import { updateAtIndex } from '../immutableHelperMethods'

describe('immutable helper methods', () => {
  it('update should replace at index 0', () => {
    expect(updateAtIndex(0, 8, [1, 2, 3, 4, 5])).toEqual([8, 2, 3, 4, 5])
  })

  it('update should replace at last index', () => {
    expect(updateAtIndex(4, 8, [1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 8])
  })

  it('update should ignore updates at index -1', () => {
    expect(updateAtIndex(-1, 8, [1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
  })

  it('update should append updates at index out of bounds', () => {
    expect(updateAtIndex(9, 8, [1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5, 8])
  })
})
