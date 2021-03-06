import Fetch from './Fetch'

export default class RadioOperator extends Fetch{
    constructor(command) {
        super(command, 'radio')

        this.fetch()
    }

    defaultOption() {
        return [{text: '--選択--', value: ''}]
    }

    fetchAfter() {
        this.options.splice(0, 1)
    }
}