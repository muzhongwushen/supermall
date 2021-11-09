<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button class="check-button" />
    <span>全选</span>
  </div>

</div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
    export default {
        name: "CartBottomBar",
        components:{
            CheckButton
        }
    }
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 0px;
  line-height: 40px;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
}
  .check-button{
    width: 22px;
    height: 22px;
    line-height: 20px;
  }
</style>
