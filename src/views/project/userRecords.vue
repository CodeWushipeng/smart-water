<template>
  <div class="video-wrap">
    <div class="tree-wrap">
      <sm-tree :treeData="treeData"></sm-tree>
    </div>
    <div class="video-lists">
      <div class="overview">
        <div class="select-pump">
          <p>灌季</p>
          <el-select v-model="point"></el-select>
          <p>用水户名称</p>
          <el-input v-model="user" placeholder="请输入用水户"></el-input>
          <el-button type="primary" icon="el-icon-refresh-right">查询</el-button>
          <!-- <el-button icon="el-icon-refresh">重置</el-button> -->
        </div>
        <div class="table-wrap">
          <el-button type="primary" icon="el-icon-plus" @click="addDialog=true">新增</el-button>
          <el-button icon="el-icon-top">数据导入</el-button>
          <el-button icon="el-icon-bottom">模板下载</el-button>
          <el-button icon="el-icon-bottom">导出</el-button>
          <div class="selectTips">
            已选择
            <span>3</span>
            项
          </div>
          <el-table :data="pumpData" style="width: 100%" :header-cell-style="headerStyle" border>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="date" label="渠道名称"></el-table-column>
            <el-table-column prop="date" label="用水户名称"></el-table-column>
            <el-table-column prop="date" label="灌季"></el-table-column>
            <el-table-column prop="name" label="用水开始时间"></el-table-column>
            <el-table-column prop="name" label="用水结束时间"></el-table-column>
            <el-table-column prop="address" label="用水量（m³）"></el-table-column>
            <el-table-column prop="address" label="本次灌溉面积（亩）"></el-table-column>
            <el-table-column prop="address" label="本次灌溉作物"></el-table-column>
            <el-table-column prop="address" label="水费（元）"></el-table-column>
            <el-table-column prop="address" label="打印状态"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template>
                <el-button type="text" size="small">打印票据</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="allData" style="display:none" id="projectTab">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="date" label="渠道名称"></el-table-column>
            <el-table-column prop="date" label="用水户名称"></el-table-column>
            <el-table-column prop="date" label="灌季"></el-table-column>
            <el-table-column prop="name" label="用水开始时间"></el-table-column>
            <el-table-column prop="name" label="用水结束时间"></el-table-column>
            <el-table-column prop="address" label="用水量（m³）"></el-table-column>
            <el-table-column prop="address" label="本次灌溉面积（亩）"></el-table-column>
            <el-table-column prop="address" label="本次灌溉作物"></el-table-column>
            <el-table-column prop="address" label="水费（元）"></el-table-column>
            <el-table-column prop="address" label="打印状态"></el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="prev, pager, next, sizes, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <el-dialog title="新增" :visible.sync="addDialog" center>
          <el-form :model="form">
            <el-form-item label="渠道" :label-width="formLabelWidth">
              <el-select v-model="form.canal" placeholder="请选择渠道"></el-select>
            </el-form-item>
            <el-form-item label="用水户名称" :label-width="formLabelWidth">
              <el-select v-model="form.canalCode" placeholder="请选择用水户名称"></el-select>
            </el-form-item>
            <el-form-item label="灌季" :label-width="formLabelWidth" prop="person">
              <el-select v-model="form.person" placeholder="请选择灌季"></el-select>
            </el-form-item>
            <el-form-item label="开始时间" :label-width="formLabelWidth">
              <el-date-picker type="date" v-model="form.personCode" placeholder="请选择开始时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" :label-width="formLabelWidth">
              <el-date-picker type="date" v-model="form.personCode" placeholder="请选择结束时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="用水量" :label-width="formLabelWidth">
              <el-input placeholder="请输入用水量" v-model="form.waterNumber"></el-input>
            </el-form-item>
            <el-form-item class="water-wrap">
              <el-form-item class="area" label="本次灌溉面积1" :label-width="formLabelWidth">
                <el-input placeholder="请输入本次灌溉面积" v-model="form.waterNumber"></el-input>
                <el-button type="primary" icon="el-icon-circle-plus-outline"></el-button>
              </el-form-item>
              <el-form-item label="本次灌溉作物1" :label-width="formLabelWidth">
                <el-input placeholder="请输入本次灌溉作物" v-model="form.waterNumber"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="消费金额" :label-width="formLabelWidth">
              <el-input placeholder="请输入消费金额" v-model="form.waterNumber"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="addDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../../utils/bus'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      treeValue: '',
      treeData: [],
      select: -1,
      area: '',
      model: '',
      point: '',
      date: '',
      user: '',
      pumpData: [],
      headerStyle: {
        background: '#f0f0f0'
      },
      currentPage: 1,
      pageSize:10,
      total:0,
      addDialog: false,
      form: {
        canal: '',
        canalCode: '',
        person: '',
        personCode: '',
        waterNumber: '',
        
      },
      formLabelWidth: '120px'
    }
  },
  mounted(){
    Bus.$on('getvalue',value => {
      console.log(value)
      this.treeValue = value
    })
  },
  methods: {
    //定义导出Excel表格事件
    exportExcel() {
      let xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      / generate workbook object from table /;
      /* 从表生成工作簿对象 */
      let wb = XLSX.utils.table_to_book(
        document.querySelector("#projectTab"),  //elementui 表格的id
        xlsxParam
      );

      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleClick(row) {
      console.log(row)
    },
    handelTab(index) {
      this.select = index
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-wrap {
  display: flex;
  .tree-wrap {
    width: 334px;
    padding: 39px 0 0;
    font-size: 22px;
    color: #171819;
    cursor: pointer;
    .el-tree {
      height: 56px;
      .el-tree-node {
        height: 56px;
        padding-left: 76px;
        line-height: 56px;
      }
    }
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

    .active,
    .el-tree-node:hover {
      background: #4280dc;
      color: #fff;
    }
  }
  .video-lists {
    padding: 23px;
    background-color: #f0f0f0;
    width: 82.6vw;
    .overview {
      background: #fff;
      padding: 36px;
      border-radius: 10px;
    }
  }
}
.water-wrap{
  width: 641px;
  height: 142px;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 25px;
  box-sizing: border-box;
  .area{
    margin: 0 0 17px 0;
    .el-input{
      margin-right: 22px;
    }
  }
}
.select-pump {
  height: 113px;
  display: flex;
  padding: 0 0 40px;
  height: 40px;
  align-items: center;
  p,
  .el-select,
  .el-button,
  .el-input,
  .el-date-editor {
    margin-right: 30px;
  }
  .el-input {
    width: 250px;
  }
}
.page {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.table-wrap {
  > .el-button {
    margin-bottom: 20px;
  }
  .el-dropdown {
    cursor: pointer;
    margin-left: 55px;
    color: #4280dc;
    font-size: 12px;
  }
  .selectTips {
    height: 24px;
    background: rgba($color: #4280dc, $alpha: 0.1);
    border-radius: 5px;
    margin-top: 28px;
    margin-bottom: 16px;
    font-size: 18px;
    color: #171819;
    padding: 6px 27px;
    span {
      color: #4280dc;
    }
  }
}
.el-form-item {
  .el-select,
  .el-input {
    width: 300px;
  }
}
</style>