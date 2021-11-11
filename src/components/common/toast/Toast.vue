<template>
    <div class="toast" v-show="isShow">
      {{message}}
    </div>
</template>

<script>
    export default {
        name: "Toast",
        // props:{
        //     message:{
        //         type:String,
        //         default:''
        //     }
        // },
        data(){
            return{
                message:'',
                isShow:false,
                time:null
            }
        },
        methods:{
            show(message,duration=2000){
                clearTimeout(this.time)
                this.isShow=true
                this.message=message

               this.time=setTimeout(()=>{
                    this.isShow=false
                    this.message=''
                },duration)
            }
        }
    }
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  color: #fff;
  z-index: 99;
  background-color: rgba(0,0,0,.75);
}
</style>
