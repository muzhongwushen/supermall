import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

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
export const backTopMixin={
  components:{
    BackTop
  },
  data(){
    return{
      isShowBackTop:false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
  }
}
