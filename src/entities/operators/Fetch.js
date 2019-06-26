import store from '../../store'
import {getter, action} from '../../store/types'
import linq from 'linq'
import axios from 'axios'

export default class Fetch {
    constructor(command, operator) {
        this.data = command.data
        this.operator = operator
        this.storeKey = command.data[this.operator]
        this.key = Object.keys(command.query)[0]
        this.text = command.data.text || 'name'
        this.value = command.data.value || 'id'
        this.table = command.data.table || command.data[this.operator]
        this.fetched = false

        const url = this.data.api || ''
        this.api = url.replace(/\/$/, '') || `/api/test/${this.storeKey}`

        if(store.getters[getter.OBJECTS](this.storeKey)) {
            this.options = store.getters[getter.OBJECTS](this.storeKey)
            this.fetched = true
        } else {
            this.options = this.defaultOption()
        }
    }

    defaultOption() {}

    fetchAfter() {}

    async fetch() {
        if(this.fetched) return

        this.options[0].text = '...loading'
        this.fetched = true
        const { data } = await axios.get(this.api)

        this.options = [...this.options, ...linq.from(data)
            .select((x, i) => {
                if(typeof x === 'string') {
                    return {
                        text: x,
                        value: i
                    }
                }
                return {
                    text: x[this.text],
                    value: x[this.value]
                }
            })
            .toArray()]

        this.options[0].text = '--選択--'

        this.fetchAfter()

        store.dispatch(action.SET_OBJECT, {key: this.storeKey, value: this.options})
    }
}