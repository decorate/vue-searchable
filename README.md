
## searchable-vue
vue admin-lte search support

### Installation

With npm:

    npm i @team-decorate/vue-searchable
    
### Command Examples
```vue
<searchable  
  :ignore-query="['paginate', 'type']"  
  :searches="[  
            {id: 'ID'},  
            {username: 'ユーザー名'},  
            {email: 'メールアドレス'},  
            {between: ['pointSt', 'pointEd'], label: 'ポイント'},  
            {betweenDate: ['dateStart', 'dateEnd'], label: '日時'},  
            {betweenDate: ['dateBefore', 'dateAfter']},  
            {select: 'user.type', fetch: true, key: 'user_type', label: 'タイプ'},  
            {checkbox: 'level'},  
            {radio: 'alcohol', value: 'name'},  
            {select: 'shape', label: '体型'},  
        ]"></searchable>
```