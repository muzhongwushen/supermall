import {debounce} from "./utils";
export const itemListenerMixin ={
  mounted(){
    let refresh=debounce(this.$refs.scroll.refresh,100)
    //监听 item图片加载
    this.itemImgLister=()=>{
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgLister
    )
  },
  data(){
    return{
      itemImgLister:null
    }
  }
}
