<template>
  <div class="video-wrap">
    <div class="tree-wrap">
      <div class="tree-list">
      </div>
      <sm-tree :treeData="treeData" :prop="treeProp"></sm-tree>
    </div>
    <div class="video-lists">
      <div class="video-item" v-for="(item,index) in videos" :key="index">
        <div class="mask" :class="videoStatu?'hideCtrl':''">
          <div class="play" :class="videoStatu?'hideCtrl':''" @click="playVideo(index)"></div>
        </div>
        <video class="videoCtrl" :src="item.url" controls="controls"></video>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../../utils/bus";
import axios from "axios"
import {mapState} from "vuex"
export default {
  data() {
    return {
      treeData: [
        {
          canal_name: "尊村灌区服务中心",
          id: "",
          child: []
        },
      ],
      treeProp:{
        label: "canal_name",
        value: "id",
        children: "child"
      },
      treeValue: "",
      videos:[],
      videoStatu:false
    };
  },
  computed:{
    ...mapState(["areaTree"])
  },
  watch:{
    treeData:{
      immediate: true,
      deep: true,
      handler:function(){
        console.log(this.areaTree)
      }
    }
  },
  created(){
    this.treeData[0].child = this.areaTree
    this.getVideos()
  },
  methods:{
    // 获取摄像头列表
    getVideos(){
      let data ={}
      axios.get("/realtime/index/getvideo")
      .then((res)=>{
        console.log(res)
        if(res.data.code == 200){
          this.videos = res.data.data
        }
      })
      .catch(error=>{
        console.log(error)
      })
    },
    // 点击播放视频
    playVideo(target){
      let videoElement = document.querySelectorAll(".videoCtrl")[target]
      console.log(videoElement)
      if(videoElement.paused){
        this.videoStatu = true
      }else{
        this.videoStatu = false
      }
      videoElement.addEventListener("ended", ()=>{
        this.videoStatu = false
      });
      videoElement.paused === true ? videoElement.play() : videoElement.pause();
    }
  },
  mounted() {
    console.log(this.treeData)
    Bus.$on("getData", (value) => {
      console.log(value);
      this.treeValue = value;
    });
  },
};
</script>

<style lang="scss" scoped>
.hideCtrl{
  opacity: 0;
}
.video-wrap {
  display: flex;
  .tree-wrap {
    width: 350px;
    padding: 39px 0 0;
    font-size: 22px;
    color: #171819;
    cursor: pointer;
    .tree-header {
      font-size: 22px;
      height: 56px;
      padding-left: 32px;
      display: flex;
      align-items: center;
      .icon-arr-left {
        margin-right: 10px;
        color: #4280dc;
        font-size: 26px;
        transition: all 0.2s linear;
      }
      .down {
        transform-origin: 50% 50%;
        transform: rotate(90deg);
      }
    }
    .tree {
      height: 56px;
      padding-left: 76px;
      line-height: 56px;
    }
    .active,
    .tree:hover {
      background: #4280dc;
      color: #fff;
    }
  }
  .video-lists {
    padding: 40px;
    background-color: #f0f0f0;
    width: 82.6vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .video-item {
      width: 480px;
      height: 280px;
      background: #000;
      margin-bottom: 25px;
      position: relative;
      > video {
        width: 100%;
        height: 100%;
      }
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        background: rgba($color: #000000, $alpha: 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .play {
          width: 80px;
          height: 52px;
          border: 1px solid #fff;
          border-radius: 5px;
          background: url("../../images/play.png");
          background-repeat: no-repeat;
          background-size: 16px 16px;
          background-position: center center;
        }
      }
    }
  }
}
</style>