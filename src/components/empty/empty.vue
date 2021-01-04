<template>
  <div class="empty-wrap">
    <div class="empty-img"><img src="../../images/empty.png" alt=""></div>
    <p>暂无数据</p>
  </div>
</template>

<script>
export default {
  name: 'empty'
}
</script>

<style scoped>
.empty-wrap{
  background: #fff;
}
.empty-img{
  width: 170px;
  height: 118px;
  margin: 154px auto;
}
.empty-img>img{
  width: 100%;
  height: 100%;
}
.empty-wrap>p{
  font-size: 22px;
  color: #fff;
}
</style>