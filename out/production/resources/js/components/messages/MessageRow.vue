<template>
    <div style=" font-family: \'Montserrat\', sans-serif; width: 100%; max-width: 1000px; display: block; margin-left: auto; margin-right: auto; margin-top: 180px;">
        <p><img v-bind:src="message.fileName" style="width: 100%; margin-left: auto; margin-right: auto;"></p>
        <p style ="font-weight: thin; font-size: 80%;">{{ message.subTitle }}</p>
        <p style ="font-weight: bold; font-size: 250%;margin-top: -10px;">{{ message.title }}</p>
        <p style ="margin-top: -30px;">{{ message.text }} </p>
        <p style ="text-align: right;">{{ message.creationDate}} </p>
        <span v-if="temp() === 'true'">
            <input type="button" value="Edit" @click="edit" />
            <input type="button" value="X" @click="del" />
        </span>
    </div>
</template>

<script>
    export default{
        props: ['message', 'editMessage', 'deleteMessage', 'messages'],
            data(){
            return{
              styleObject: {
                    width: '100px'
                  }
              }
            },
            methods: {
                temp(){
                    try {
                        var temp = document.getElementById("helper").getAttribute("data-name")
                        return temp
                     }
                    catch(error) {
                        console.error(error)
                    }
                },
                edit(){
                    this.editMessage(this.message)
                },
                del(){
                    this.deleteMessage(this.message)
                }
            }
    }
</script>

<style>

</style