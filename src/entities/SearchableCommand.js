import linq from 'linq'
import SelectOperator from '../entities/operators/SelectOperator'
import BetweenOperator from '../entities/operators/BetweenOperator'
import CheckBoxOperator from './operators/CheckBoxOperator'
import RadioOperator from './operators/RadioOperator'

export default class SearchableCommand {

    constructor(obj) {
        this.data = obj
        this.label = ''
        this.query = {}
        this.operator = ''
        this.operatorClass = {}
        this.type = ''
        this.key = ''

        this.analyze(obj)
    }

    analyze(obj) {
        this.data = obj
        this.key = Object.keys(this.data)[0]
        this.label = this.data.label || this.key

        this.operatorAnalyze()
    }

    operatorAnalyze() {
        this.operator = this.key

        if(this.key.match(/between/)) {
            this.betweenAnalyze()
            return
        }

        if(this.key.match(/select/)) {
            this.selectAnalyze()
            return
        }

        if(this.key.match(/checkbox/)) {
            this.checkBoxAnalyze()
            return
        }

        if(this.key.match(/radio/)) {
            this.radioBxoAnalyze()
            return
        }

        this.stringAnalyze()
    }

    stringAnalyze() {
        this.operator = 'string'
        this.label = this.data[this.key]
        this.query = {[this.key]: ''}
    }

    betweenAnalyze() {
        this.operator = 'between'
        this.type = this.key.replace(this.operator, '').toLowerCase()

        linq.from(this.data[this.key])
            .select(x => this.query[x] = '')
            .toArray()

        this.operatorClass = new BetweenOperator(this)
    }

    selectAnalyze() {
        this.operator = 'select'
        this.queryAnalyze()

        this.operatorClass = new SelectOperator(this)
    }

    checkBoxAnalyze() {
        this.operator = 'checkbox'
        this.queryAnalyze(true)

        this.operatorClass = new CheckBoxOperator(this)
    }

    radioBxoAnalyze() {
        this.operator = 'radio'
        this.queryAnalyze()

        this.operatorClass = new RadioOperator(this)
    }

    queryAnalyze(array = false) {
        const bind = array ? [] : ''
        if(this.data[this.key].match(/\./)) {
            if(this.data.key) {
                this.query = {[this.data.key]: bind}
            } else {
                this.query = {[this.data[this.key].split('.')[1]]: bind}
            }
        } else {
            this.query = {[this.data[this.key]]: bind}
        }
    }

    get hasBetween() {
        return this.operator.match(/between/)
    }

    get hasSelect() {
        return this.operator.match(/select/)
    }

    get hasCheckBox() {
        return this.operator.match(/checkbox/)
    }

    get hasRadioBox() {
        return this.operator.match(/radio/)
    }

    toObject(...ignore) {
        return linq.from(this)
            .where(x => !ignore.includes(x.key))
            .toObject('$.key', '$.value')
    }

}

