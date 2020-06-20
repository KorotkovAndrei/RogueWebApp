<template>
    <div v-if="temp() === 'true'" style="margin-top:200px;">
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        <input type="title" placeholder="title" v-model="title"/>
        <input type="subTitle" placeholder="subtitle" v-model="subTitle"/>
        <input type="text" placeholder="text" v-model="text"/>
        <button v-on:click="submitFile()" @click="save">Submit</button>
    </div>
</template>

<script>
    function getIndex(list, id){
        for(var i = 0; i < list.length; i++){
            if(list[i] === id){
                return i
            }
        }
        return -1;
    }
    export default{
        props: ['messages', 'messageAttr'],
        data: function(){
            return{
            text:'',
            id:'',
            title:'',
            subTitle:'',
            fileName:''
            }
        },
        watch: {
            messageAttr: function(newVal, oldVal){
                 this.text = newVal.text
                 this.id = newVal.id
                 this.title = newVal.title
                 this.subTitle = newVal.subTitle
                 this.fileName = newVal.fileName
            }
        },
        methods: {
            temp(){
                try {
                    //var temp = document.getElementById("helper").getAttribute("data-name")
                    //return temp
                    return true
                }
                catch(error) {
                    console.error(error)
                }
            },
            save(){
                 var message = {
                 text: this.text,
                 title: this.title,
                 subTitle: this.subTitle,
                 fileName: this.processSelectedFiles()
                 };
                 if(this.id){
                     this.$resource('/message{/id}').update({id: this.id}, message).then(result =>
                         result.json().then(data => {
                             var index = getIndex(this.messages, data.id)
                             this.messages.splice(index, 1, data)
                             this.id = ''
                             this.text = ''
                             this.title = ''
                             this.subTitle = ''
                             this.fileName = ''
                         })
                     )
                 }else{
                     this.$resource('/message{/id}').save({}, message).then(result =>
                         result.json().then(data =>{
                            this.messages.push(data)
                            this.text = ''
                            this.title = ''
                            this.subTitle = ''
                            this.fileName = ''
                         })
                     )
                 }
            },
            processSelectedFiles() {
            var myFile = this.file
            return( "https://rogue-aws.s3.eu-central-1.amazonaws.com/"+myFile.name)
            },
            submitFile(){
                let formData = new FormData();
                formData.append('file', this.file);
                 try {
                    const response =  fetch('http://localhost:9000/message/upload', {
                    method: 'POST',
                    body: formData
                    })
                    const result = response.json();
                    console.log('Success', JSON.stringify(result));
                    file = ''
                 } catch (error) {
                    console.error('Error', error)
                 }
            },
            handleFileUpload(){
            this.file = this.$refs.file.files[0]
            }
        }
    }
</script>

<style>

</style>