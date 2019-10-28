<template>
    <div id="searchable">
        <div class="box box-default">
            <div class="box-header with-border">
                <div class="box-title">検索</div>
            </div>

            <div class="box-body">
                <div class="row">
                    <div class="col-md-12 d-flex flex-wrap">

                        <div v-for="command in search.command" :class='setClass(command)'>
                            <div v-if="command.operator === 'string'" class="form-group">
                                <label>{{command.label}}</label>
                                <input class="form-control" v-model="search.query[command.key]"/>
                            </div>

                            <div v-if="command.hasBetween" class="form-group">
                                <label>{{command.label}}</label>

                                <div class="input-group date">
                                    <div class="input-group-addon">
                                        <i class="fa fa-arrow-circle-right"></i>
                                    </div>
                                    <input :type="command.type" v-model="search.query[command.operatorClass.start]"
                                           class="form-control"
                                           data-inputmask="'alias': 'yyyy/dd/mm'">
                                    <span class="input-group-addon">～</span>
                                    <div class="input-group-addon">
                                        <i class="fa fa-arrow-circle-left"></i>
                                    </div>
                                    <input :type="command.type" v-model="search.query[command.operatorClass.end]"
                                           class="form-control"
                                           data-inputmask="'alias': 'yyyy/dd/mm'">
                                </div>
                            </div>

                            <div v-if="command.hasSelect" class="form-group">
                                <label>{{command.label}}</label>
                                <select class="form-control"
                                        @click="command.operatorClass.fetch()"
                                        v-model="search.query[command.operatorClass.key]">
                                    <option v-for="option in command.operatorClass.options"
                                            :value="option.value">{{option.text}}</option>
                                </select>
                            </div>

                            <div v-if="command.hasCheckBox" class="form-group">
                                <label>
                                    {{command.label}}
                                    <input type="checkbox" @click="allCheck(command)"/>
                                    全て
                                </label>
                                <div style="display: flex; flex-wrap: wrap;">
                                    <div class="mr10"
                                         v-for="(option, i) in command.operatorClass.options">
                                        <input :id="`${option.text}_${i}`"
                                               v-model="search.query[command.operatorClass.key]"
                                               :name="`${command.operatorClass.key}[]`"
                                               type="checkbox" :value="option.value"/>
                                        <label style="cursor: pointer;" :for="`${option.text}_${i}`">{{option.text}}</label>
                                    </div>
                                </div>
                            </div>

                            <div v-if="command.hasRadioBox" class="form-group ">
                                <label>{{command.label}}</label>
                                <div style="display: flex; flex-wrap: wrap;">
                                    <div class="mr10"
                                         v-for="(option, i) in command.operatorClass.options">
                                        <input :id="`${option.text}_${i}`"
                                               type="radio"
                                               :value="option.value"
                                               v-model="search.query[command.operatorClass.key]">
                                        <label style="cursor: pointer;" :for="`${option.text}_${i}`">{{option.text}}</label>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="col-md-12">
                        <div class="col-md-3">
                            <button class="btn btn-primary" @click="send">
                                検索
                            </button>

                            <button type="button" @click="clear"
                                    class="btn btn-danger btn-flat pull-right">クリア</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import SearchService from '../services/SearchService'
    import linq from 'linq'

    export default {
        name: 'searchable',

        data() {
            return {
                search: new SearchService(this.$route)
            }
        },

        props: {
            searches: {
                type: Array,
                required: true,
            },

            ignoreQuery: {
                type: Array,
                required: false
            }
        },

        created() {
            this.search.fill(this.searches, this.ignoreQuery)
        },

        methods: {
            async send() {
                this.$router.push({query: this.search.data()})
            },

            clear() {
                this.search.clear()
                this.$router.push({query: this.search.data()})
            },

            allCheck(command) {
                const query = this.search.query

                if(command.operatorClass.options.length === query[command.operatorClass.key].length) {
                    query[command.operatorClass.key] = []
                    return
                }
                query[command.operatorClass.key] =
                    linq.from(command.operatorClass.options)
                        .select(x => x.value)
                        .toArray()
            },

            setClass(command) {
                if(command.hasBetween) {
                    return 'col-md-6'
                }
                return 'col-md-3'
            }
        }
    }

</script>

