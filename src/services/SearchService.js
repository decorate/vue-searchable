import linq from 'linq'
import SearchableCommand from '../entities/SearchableCommand'

export default class SearchService {

    constructor(route) {
        this.route = route
        this.searches = []
        this.query = {...this.route.query}
        this.command = []

        this.clears = []
        this.ignoreQuery = []
    }


    fill(searches, ignoreQuery = []) {
        this.searches = searches
        this.ignoreQuery = ignoreQuery

        this.command = linq.from(this.searches)
            .select(x => new SearchableCommand(x))
            .select(x => {
                this.clears.push(x.key)
                this.query = {...x.query, ...this.query}
                return x
            })
            .toArray()
    }

    data() {
        return linq.from(this.query)
            .where(x => x.value !== '' && x.value !== null)
            .toObject('$.key', '$.value')
    }

    clear() {
        linq.from(this.query)
            .where(x => !this.ignoreQuery.includes(x.key))
            .select(x => {
                this.query[x.key] = ''
            })
            .toArray()
    }

}