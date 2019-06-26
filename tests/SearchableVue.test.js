import { shallowMount, createLocalVue } from '@vue/test-utils'
import Searchable from '../src/components/Searchable.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
jest.mock('axios')

const localVue = createLocalVue()
localVue.use(VueRouter)

let actual, expected

describe('searchable test', () => {

    let router
    const getLabel = (wrap) => {
        return wrap.find('label').text()
    }

    let create

    beforeEach(() => {
        router = new VueRouter({query: {paginate: '15'}})

        create = (prop) => {
            return shallowMount(Searchable, {
                propsData: {searches: [prop]},
                localVue,
                router
            })
        }
    })

    it('string default', () => {

        const prop = {username: 'ユーザー名'}

        const wrap = create(prop)

        expect(getLabel(wrap)).toBe('ユーザー名')

        wrap.find('input').setValue('test user')

        expect(wrap.vm.search.query.username).toBe('test user')
    })

    it('between no date', () => {

        const prop = {between: ['pointStart', 'pointEnd'], label: 'ポイント'}

        const wrap = create(prop)

        expect(getLabel(wrap)).toBe('ポイント')

        const inputs = wrap.findAll('input')
        expect(inputs.length).toBe(2)

        inputs.at(0).setValue(100)
        inputs.at(1).setValue(4000)

        actual = wrap.vm.search.data()

        expected = {
            pointStart: '100', pointEnd: '4000'
        }

        expect(actual).toEqual(expected)
    })

    it('betweenDate', () => {
        const prop = {betweenDate: ['dateStart', 'dateEnd']}

        const wrap = create(prop)

        expect(getLabel(wrap)).toBe('betweenDate')

        const inputs = wrap.findAll('input')
        expect(inputs.at(0).attributes().type).toBe('date')
    })

    it('select minimum parameter', async () => {
        axios.get.mockImplementation(() => Promise.resolve({data: [
                {id: 1, name: '北海道'},
                {id: 2, name: '青森'},
            ]}))
        const prop = {select: 'place'}

        const wrap = create(prop)
        wrap.find('select').trigger('click')
        await wrap.vm.$nextTick()

        const options = wrap.findAll('option')
        expect(options.at(1).element.value).toBe('1')
        expect(options.at(2).element.value).toBe('2')

    })

    it('select maximum parameter', async () => {
        axios.get.mockImplementation(() => Promise.resolve({data: [
                {value: 0, text: 'user'},
                {value: 1, text: 'cast'},
            ]}))
        const prop = {select: 'user.type', fetch: true, key: 'user_type', label: 'タイプ', text: 'text', value: 'value'}

        const wrap = create(prop)
        await wrap.vm.$nextTick()

        const options = wrap.findAll('option')
        expect(options.at(0).text()).toBe('--選択--')
        expect(options.at(1).text()).toBe('user')
        expect(options.at(2).text()).toBe('cast')
    })

    it('checkbox', async () => {
        axios.get.mockImplementation(() => Promise.resolve({data: [
                {id: 1, name: 'ゴールド'},
                {id: 2, name: 'シルバー'},
            ]}))
        const prop = {checkbox: 'level'}

        const wrap = create(prop)
        await wrap.vm.$nextTick()

        const inputs = wrap.findAll('input[name="level[]"]')
        expect(inputs.at(1).element.value).toBe("2")
    })

})
