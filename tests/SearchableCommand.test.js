import SearchableCommand from '../src/entities/SearchableCommand'
import BetweenOperator from '../src/entities/operators/BetweenOperator'
import SelectOperator from '../src/entities/operators/SelectOperator'
import CheckBoxOperator from '../src/entities/operators/CheckBoxOperator'
import axios from 'axios'
import RadioOperator from '../src/entities/operators/RadioOperator'

axios.defaults.baseURL = 'http://localhost:3000'

let actual, expected

describe('SearchableCommand', () => {
    it('default string', () => {

        const prop = {username: 'ユーザー名'}

        actual = new SearchableCommand(prop)

        expected = {
            data: prop,
            label: 'ユーザー名',
            query: {username: ''},
            operator: 'string',
            operatorClass: {},
            type: '',
            key: 'username'
        }

        expect(actual).toEqual(expected)

    })

    it('between no date', () => {

        const prop = {between: ["pointStart", "pointEnd"], label: 'ポイント'}

        actual = new SearchableCommand(prop)

        expect(actual.operatorClass instanceof BetweenOperator).toEqual(true)

        expected = {
            data: prop,
            label: 'ポイント',
            query: {pointStart: '', pointEnd: ''},
            operator: 'between',
            type: '',
            key: 'between'
        }

        expect(actual.toObject('operatorClass')).toEqual(expected)
    })

    it('betweenDate', () => {

        const prop = {betweenDate: ['dateStart', 'dateEnd'], label: '日時'}

        actual = new SearchableCommand(prop)

        expect(actual.operatorClass instanceof BetweenOperator).toEqual(true)

        expected = {
            data: prop,
            label: '日時',
            query: {dateStart: '', dateEnd: ''},
            operator: 'between',
            type: 'date',
            key: 'betweenDate'
        }

        expect(actual.toObject('operatorClass')).toEqual(expected)

    })

    it('select minimum parameter', () => {

        const prop = {select: 'place',label: '場所'}

        actual = new SearchableCommand(prop)

        expect(actual.operatorClass instanceof SelectOperator).toEqual(true)

        expected = {
            data: prop,
            label: '場所',
            query: {place: ''},
            operator: 'select',
            type: '',
            key: 'select'
        }

        expect(actual.toObject('operatorClass')).toEqual(expected)

    })

    it('select maximum parameter', () => {

        const prop = {select: 'user.type', label: 'タイプ', fetch: true, key: 'user_type'}

        actual = new SearchableCommand(prop)

        expect(actual.operatorClass instanceof SelectOperator).toEqual(true)

        expected = {
            data: prop,
            label: 'タイプ',
            query: {user_type: ''},
            operator: 'select',
            type: '',
            key: 'select'
        }

        expect(actual.toObject('operatorClass')).toEqual(expected)
    })

    it('checkbox', () => {

        const prop = {checkbox: 'level'}

        actual = new SearchableCommand(prop)

        expect(actual.operatorClass instanceof CheckBoxOperator).toEqual(true)

        expected = {
            data: prop,
            label: 'checkbox',
            query: {level: []},
            operator: 'checkbox',
            type: '',
            key: 'checkbox'
        }

        expect(actual.toObject('operatorClass')).toEqual(expected)
    })

    it('radio', () => {

        const prop = {radio: 'level'}

        actual = new SearchableCommand(prop)

        expect(actual.operatorClass instanceof RadioOperator).toEqual(true)

        expected = {
            data: prop,
            label: 'radio',
            query: {level: ''},
            operator: 'radio',
            type: '',
            key: 'radio'
        }

        expect(actual.toObject('operatorClass')).toEqual(expected)
    })
})