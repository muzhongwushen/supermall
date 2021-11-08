<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-image="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
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
    import {debounce} from "common/utils";
    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
    import {itemListenerMixin} from "common/mixin";

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

            }
        },
        mixins:[itemListenerMixin],
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

            })
            //请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.list
            })
        }, methods: {
            imageLoad() {
                this.$refs.scroll.refresh()
            }
        },
        mounted() {
            const refresh = debounce(this.$refs.scroll.refresh, 100)
            this.itemImgLister=()=>{
                refresh()
            }
            this.$bus.$on('itemImageLoad',this.itemImgLister)
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
    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
