import SearchService from '../src/services/SearchService'
import SelectOperator from '../src/entities/operators/SelectOperator'
import SearchableCommand from '../src/entities/SearchableCommand'

let actual, expected

describe('SearchService', () => {
  it('fill check', () => {
      actual = new SearchService({query: {paginate: '15'}})
      actual.fill([{select: 'test'}], ['paginate'])

      expect(actual.command[0].operatorClass instanceof SelectOperator).toEqual(true)

      expected = {
          route: {query: {paginate: '15'}},
          searches: [{select: 'test'}],
          query: {test: '', paginate: '15'},
          command: [new SearchableCommand({select: 'test'})],
          clears: ['select'],
          ignoreQuery: ['paginate']
      }

      expect(actual).toEqual(expected)
  })
})