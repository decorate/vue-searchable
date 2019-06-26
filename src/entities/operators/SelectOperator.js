import Fetch from './Fetch'

export default class SelectOperator extends Fetch{
    constructor(command) {
        super(command, 'select')

        if(this.data.fetch) {
            this.fetch()
        }
    }

    defaultOption() {
        return [{text: '--選択--', value: ''}]
    }
}
