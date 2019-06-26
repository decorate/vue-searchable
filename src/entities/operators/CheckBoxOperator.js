import Fetch from './Fetch'

export default class CheckBoxOperator extends Fetch{
    constructor(command) {
        super(command, 'checkbox')

        this.fetch()
    }

    defaultOption() {
        return [{text: '--選択--', value: ''}]
    }

    fetchAfter() {
        this.options.splice(0, 1)
    }
}