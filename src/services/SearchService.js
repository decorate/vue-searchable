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

                if(x.key === 'checkbox') {
                    const queryKey = Object.keys(x.query)[0]
                    const arr = []
                    if(!Array.isArray(this.query[queryKey])) {
                        arr.push(this.query[queryKey])
                    } else {
                        arr.push(...this.query[queryKey])
                    }
                    this.query[queryKey] = Object.assign(arr, x.query[queryKey])

                } else {
                    this.query = {...x.query, ...this.query}
                }
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

                if(Array.isArray(x.value) || this.isCheckBox(x.key)) {
                    this.query[x.key] = []
                } else {
                    this.query[x.key] = ''
                }
            })
            .toArray()
    }

    isCheckBox(key) {
        const c = linq.from(this.command)
            .where(xs => xs.query[key])
            .select(xs => xs.key).firstOrDefault(null)

        return c === 'checkbox'
    }

}