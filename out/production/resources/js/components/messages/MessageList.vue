<template>
    <div>
        <message-form :messages ="messages" :messageAttr ="message" />
        <message-row v-for="message in messages"
        :key="message.id"
        :message="message"
        :editMessage="editMessage"
        :deleteMessage="deleteMessage"
        :messages="messages"/>
    </div>
</template>

<script>
    import MessageRow from 'components/messages/MessageRow.vue'
    import MessageForm from 'components/messages/MessageForm.vue'
    export default{
        props: ['messages'],
        components: {
            MessageRow,
            MessageForm
        },
        data(){
            return{
                message:null
            }
        },
        created(){
                    this.$resource('/message{/id}').get().then(result =>
                    result.json().then(data =>
                    data.forEach(message => this.messages.push(message))))
        },
        methods: {
            editMessage(message){
                this.message = message
            },
            deleteMessage(message){
                this.$resource('/message{/id}').remove({id: message.id}).then(result => {
                    if(result.ok){
                        this.messages.splice(this.messages.indexOf(this.message), 1)
                    }
                })
            }
        }
    }
</script>

<style>

</style>