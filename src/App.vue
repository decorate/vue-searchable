<template>
  <div id="app">
      <b-row>
          <b-col>
              <b-card>
                  <example :searches="[
              {testValue: 'testText'},
          {checkbox: 'items', label: 'チェックTest', options: [
              {value: '1', text: 'ok1'},
              {value: '2', text: 'ok2'},
              ]},
              {radio: 'radios', label: 'ラジオ', options: [
                  {value: 1, text: 'radio1'},
                  {value: 2, text: 'radio2'}
              ]}
      ]"></example>
              </b-card>
          </b-col>
      </b-row>
  </div>
</template>

<script>
    import Example from './components/Searchable'
    import 'bootstrap/dist/css/bootstrap.css'

    export default {
        components: {
            Example
        },
    }

</script>

<style>
</style>
