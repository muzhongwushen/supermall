<template>

        <Swiper class="detail-swiper">
          <swiper-item v-for="item in topImage" >
            <img :src="item" alt="">
          </swiper-item>
        </Swiper>

</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "DetailSwiper",
        components:{
            SwiperItem,
            Swiper
        },
        props:{
            topImage:{
                type:Array,
                default(){
                    return[]
                }
            }
        }
    }
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
