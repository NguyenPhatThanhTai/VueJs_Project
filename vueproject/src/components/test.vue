<template>
    <div id="test">
        <h1>{{message}}</h1>
        <button v-on:click="reverseMessage">Reverse Message</button>
    </div>
</template>

<script>
export default {
  name: 'test',
    data:function() {
        return {
            message: this.$route.query.page
        }
    },
    created() {
        
    },methods: {
    reverseMessage: function() {
            this.message = this.message.split('').reverse().join('')
        }
    }
}
</script>