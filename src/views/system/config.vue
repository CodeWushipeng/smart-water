<template>
  <div class="video-wrap">
    <div class="overview">
      <el-table :data="pumpData" style="width: 100%" :header-cell-style="headerStyle" border>
        <el-table-column
          v-for="(item, index) in tableConfig"
          :key="index"
          :prop="item.value"
          :label="item.label"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pumpData: [],
      headerStyle: {
        background: '#f0f0f0'
      },
      tableConfig: [
        {
          label: '系统版本',
          value: ''
        },
        {
          label: '运行环境',
          value: ''
        },
        {
          label: '组件',
          value: 'param_name'
        },
        {
          label: '路径',
          value: 'set_value'
        }
      ]
    }
  },
  created(){
    this.getSystemLists()
  },
  methods: {
    // 获取系统参数
    getSystemLists(){
      this.axios.post("/config_index")
      .then(res=>{
        if(res.code ==0){
          this.pumpData = res.data
        }else{
          this.$message({
            type:"error",
            message: res.msg
          })
        }
      })
      .catch(error =>{
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-wrap {
  padding: 25px;
    .overview {
      background: #fff;
      padding: 36px;
      border-radius: 10px;
    }
}
</style>