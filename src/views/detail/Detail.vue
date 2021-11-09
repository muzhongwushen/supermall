<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" >
      <detail-swiper :top-image="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment"  :comment-info="commentInfo"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "components/common/scroll/Scroll";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "../../components/content/goods/GoodsList";
    import DetailBottomBar from "./childComps/DetailBottomBar";
    import {debounce} from "common/utils";
    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
    import {itemListenerMixin,backTopMixin} from "common/mixin";


    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
            Scroll,

        },
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs:[],
                getThemeTopY:null,
                currentIndex:0,


            }
        },
        mixins:[itemListenerMixin,backTopMixin
        ],
        created() {
            this.iid = this.$route.params.iid;

            //根据iid请求数据
            getDetail(this.iid).then(res => {
                const data = res.result

                this.topImages = res.result.itemInfo.topImages

                //获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                //创建店铺信息对象
                this.shop = new Shop(data.shopInfo)
                //保存商品的详情数据
                this.detailInfo = data.detailInfo
                //获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                if (data.rate.cRate !== 0) {

                    this.commentInfo = data.rate.list[0]

                }
                // this.$nextTick(()=>{
                //     //对应的DOM已经被渲染出来了
                //     //但是图片依然没有加载完成(offsetTop不包含图片)
                //     this.themeTopYs=[]
                //     this.themeTopYs.push(0);
                //     this.themeTopYs.push(-this.$refs.params.$el.offsetTop-44);
                //     this.themeTopYs.push(-this.$refs.comment.$el.offsetTop-44);
                //     this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop-44);
                // })

            })
            //请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.list
            })
            //给赋值的操作进行防抖
            this.getThemeTopY=debounce(()=>{
                this.themeTopYs=[]
                this.themeTopYs.push(0);
                this.themeTopYs.push(-this.$refs.params.$el.offsetTop+44);
                this.themeTopYs.push(-this.$refs.comment.$el.offsetTop+44);
                this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop+44);
                this.themeTopYs.push(-Number.MAX_VALUE);
            },100)
        }, methods: {
            imageLoad() {
                this.$refs.scroll.refresh()
                this.getThemeTopY()

            },
            titleClick(index){
                this.$refs.scroll.scrollTo(0,this.themeTopYs[index],100)
            },
            contentScroll(position){
                //回到顶部
                this.isShowBackTop= (-position.y)>1000

               const positionY=-position.y
                //2.对比
                //positionY 在 0-1之间 为index=0
                let length=this.themeTopYs.length
                for (let i =0;i<length-1;i++){

                 /*   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.this.themeTopYs[i]))){
                        this.currentIndex=i
                        console.log(this.currentIndex)
                    }*/

                 if (this.currentIndex !== i &&(positionY >= -this.themeTopYs[i] && positionY < -this.themeTopYs[i+1])){
                     this.currentIndex=i
                     this.$refs.nav.currentIndex =this.currentIndex
                 }
                }
            },
            addToCart(){
                //1.获取商品信息
                const product ={}
                product.image=this.topImages[0]
                product.title=this.goods.title
                product.desc=this.goods.desc
                product.price=this.goods.realPrice;
                product.iid=this.iid;

               // this.$store.commit('addCart',product)
                this.$store.dispatch('addCart',product)

            }
        },
        mounted() {

        },
        destroyed() {
            this.$bus.$off('itemImageLoad',this.itemImgLister)
        }
    }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    overflow: hidden;
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
