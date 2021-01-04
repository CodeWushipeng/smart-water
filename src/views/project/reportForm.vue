<template>
  <div class="overview">
    <div class="view-main">
      <div class="select-pump">
        <template
          v-if="com == 'inlet' || com == 'sale' || com == 'saleprogress'"
        >
          <p>灌区</p>
          <el-select v-model="area"></el-select>
        </template>
        <template v-if="com == 'compare'">
          <p>测站</p>
          <el-select v-model="checkPump"></el-select>
        </template>
        <template v-if="com == 'extraction'">
          <p>泵站名称</p>
          <el-select v-model="pump"></el-select>
        </template>
        <p>时间</p>
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="时间"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
        <el-button type="primary" icon="el-icon-download">导出</el-button>
      </div>
      <div class="table-wrap">
        <div class="table-title">
          <p>{{ subtitle }}</p>
          <p>
            <span>{{ pre }}</span>
            {{ title }}
          </p>
          <p class="date"><span>填报日期：</span> 2020-02-02</p>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="所有数据" name="first"></el-tab-pane>
          <el-tab-pane label="预警数据" name="second"></el-tab-pane>
        </el-tabs>
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="tableConfig.headerStyle"
          border
          :span-method="arraySpanMethod"
          show-summary
        >
          <el-table-column
            v-if="com == 'peasant'"
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column
            v-for="(item, index) in tableConfig.columns"
            :key="index"
            :prop="item.value"
            :label="item.label"
            align="center"
          >
            <template v-if="item.children">
              <el-table-column
                v-for="(subitem, index) in item.children"
                :key="index"
                :prop="subitem.value"
                :label="subitem.label"
                align="center"
              >
                <template v-if="subitem.children">
                  <el-table-column
                    v-for="(thirditem, index) in subitem.children"
                    :key="index"
                    :prop="thirditem.value"
                    :label="thirditem.label"
                    align="center"
                  ></el-table-column>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">{{ remarks }}</div>
        <!-- <div class="page">{{ remarks }}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
  watch: {
    $route: {
      handler(val) {
        if (val.name == 'implement') {
          this.title = '各输售水管理站用水计划执行对照表';
          this.tableConfig = {
            headerStyle: {
              background: '#f6f6f6',
            },
            columns: [
              {
                label: '名称',
                value: 'name',
              },
              {
                label: '当日下达计划',
                value: 'plan',
                children: [
                  {
                    label: '流量（m³/s）',
                    value: 'flow',
                  },
                  {
                    label: '12小时水量（m³）',
                    value: 'half',
                  },
                ],
              },
              {
                label: '当日配水量（m³）',
                value: 'day',
                children: [
                  {
                    label: '20:00',
                    value: 'night',
                    children: [
                      {
                        label: '实用',
                        value: 'practical',
                      },
                      {
                        label: '超（少）',
                        value: 'difference',
                      },
                    ],
                  },
                  {
                    label: '08:00',
                    value: 'morning',
                    children: [
                      {
                        label: '实用',
                        value: 'practical',
                      },
                      {
                        label: '超（少）',
                        value: 'difference',
                      },
                    ],
                  },
                  {
                    label: '当日小计（m³）',
                    value: 'today',
                    children: [
                      {
                        label: '实用',
                        value: 'practical',
                      },
                      {
                        label: '超（少）',
                        value: 'difference',
                      },
                    ],
                  },
                ],
              },
              {
                label: '累积水量（m³）',
                value: 'cumulative',
                children: [
                  {
                    label: '实用',
                    value: 'practical',
                  },
                  {
                    label: '超（少）',
                    value: 'difference',
                  },
                ],
              },
              {
                label: '退（溢）水量（m³）',
                value: ' beyond',
                children: [
                  {
                    label: '当日',
                    value: 'today',
                  },
                  {
                    label: '累计',
                    value: 'total',
                  },
                ],
              },
            ],
          };
          this.remarks =
            '备注：1."超(少)"用水量以12小时为时段计算，"超(少)"用水量浮动在计划±5%以内的不计入"超(少)"用的水量内。';
        } else if (val.name == 'complete') {
          this.title = this.date + '泵站指标完成情况统计表';
          this.tableConfig = {
            headerStyle: {
              background: '#f6f6f6',
            },
            columns: [
              {
                label: '站名',
                value: 'name',
              },
              {
                label: '耗电量(万度)',
                value: 'name',
              },
              {
                label: '提水量（m³）',
                value: 'plan',
                children: [
                  {
                    label: '实际',
                    value: 'flow',
                  },
                  {
                    label: '全年任务',
                    value: 'half',
                  },
                  {
                    label: '完成率(%)',
                    value: 'half',
                  },
                  {
                    label: '排名',
                    value: 'half',
                  },
                ],
              },
              {
                label: '能源单耗(kw.h/kt.m)',
                value: 'day',
                children: [
                  {
                    label: '实际',
                    value: 'night',
                  },
                  {
                    label: '指标',
                    value: 'morning',
                  },
                  {
                    label: '完成率(%)',
                    value: 'today',
                  },
                  {
                    label: '排名',
                    value: 'today',
                  },
                ],
              },
              {
                label: '水源保证率',
                value: 'cumulative',
                children: [
                  {
                    label: '实用',
                    value: 'practical',
                  },
                  {
                    label: '任务',
                    value: 'difference',
                  },
                  {
                    label: '完成率(%)',
                    value: 'difference',
                  },
                ],
              },
              {
                label: '开停机及时率(%)',
                value: ' beyond',
              },
              {
                label: '安全运行率(%)',
                value: ' beyond',
              },
              {
                label: '综合指标完成情况(%)',
                value: ' beyond',
              },
              {
                label: '综合排名',
                value: ' beyond',
              },
            ],
          };
        } else if (val.name == 'inlet') {
          this.title = this.area + '输售水管理站计划用水执行情况';
          this.com = 'inlet';
          this.tableConfig = {
            headerStyle: {
              background: '#f6f6f6',
            },
            columns: [
              {
                label: '名称',
                value: '',
              },
              {
                label: '计划(m³/s)',
                value: '',
              },
              {
                label: '流量（m³/s）',
                value: '',
              },
            ],
          };
        } else if (val.name == 'extraction') {
          this.title = '各提水运行安全管理站提水量';
          this.tableConfig = {
            headerStyle: {
              background: '#f6f6f6',
            },
            columns: [
              {
                label: '提水站',
                value: '',
              },
              {
                label: '一级站',
                value: '',
              },
              {
                label: '一级站',
                value: '',
              },
              {
                label: '一级站',
                value: '',
              },
              {
                label: '一级站',
                value: '',
              },
              {
                label: '一级站',
                value: '',
              },
              {
                label: '一级站',
                value: '',
              },
              {
                label: '一级站',
                value: '',
              },
              {
                label: '一级站',
                value: '',
              },
            ],
          };
        } else if (val.name == 'utilization') {
          this.subtitle = '夏浇第59天';
          this.title = this.date + '泵站指标完成情况统计表';
          this.tableConfig = {
            headerStyle: {
              background: '#f6f6f6',
            },
            columns: [
              {
                label: '干渠名称',
                value: '',
              },
              {
                label: '责任人',
                value: '',
              },
              {
                label: '渠首供水量（m³）',
                value: '',
                children: [
                  {
                    label: '当日',
                    value: '',
                  },
                  {
                    label: '累计',
                    value: '',
                  },
                ],
              },
              {
                label: '区间输水量（m³）',
                value: '',
                children: [
                  {
                    label: '当日',
                    value: '',
                  },
                  {
                    label: '累计',
                    value: '',
                  },
                ],
              },
              {
                label: '配水量（m³）',
                value: '',
                children: [
                  {
                    label: '当日',
                    value: '',
                  },
                  {
                    label: '累计',
                    value: '',
                  },
                ],
              },
              {
                label: '退水量(m³)',
                value: '',
                children: [
                  {
                    label: '当日',
                    value: '',
                  },
                  {
                    label: '累计',
                    value: '',
                  },
                ],
              },
              {
                label: '输配水总量(m³)',
                value: '',
                children: [
                  {
                    label: '当日',
                    value: '',
                  },
                  {
                    label: '累计',
                    value: '',
                  },
                ],
              },
              {
                label: '渠道利用率(%)',
                value: '',
                children: [
                  {
                    label: '当日',
                    value: '',
                  },
                  {
                    label: '平均',
                    value: '',
                  },
                ],
              },
              {
                label: '考核利用率(%)',
                value: '',
              },
              {
                label: '利用率增减值(%)',
                value: '',
                children: [
                  {
                    label: '当日',
                    value: '',
                  },
                  {
                    label: '平均',
                    value: '',
                  },
                ],
              },
              {
                label: '备注',
                value: '',
              },
            ],
          };
          this.remarks = '备注：报表起止时间为前一日早八时至当日早八时';
          this.tips =
            '说明：1、渠首供水量系指灌区各级站提水总量；2、区间输水量系指下一级泵站的提水量； 3、配水量指各级干渠供给下一级支、斗渠的水量之和；分干渠首供水量计入二干渠配水量；七灌区渠首供水量计入六七八干渠配水量。 4、渠道利用率指输配水总量与渠首供水量的比值。';
        } else if (val.name == 'sale') {
          this.com = 'sale';
          this.title = this.area + '支（斗）口、固（临）提泵售水情况日报表';
          this.tableConfig = {
            headerStyle: {
              background: '#f6f6f6',
            },
            columns: [
              {
                label: '灌区',
                value: '',
              },
              {
                label: '渠道',
                value: '',
              },
              {
                label: '水深(m)',
                value: '',
              },
              {
                label: '流量(m³/s)',
                value: '',
              },
              {
                label: '计量仪累计水方(m³)',
                value: '',
              },
              {
                label: '完成售水量（m³）',
                value: '',
                children: [
                  {
                    label: '今日',
                    value: '',
                  },
                  {
                    label: '累计',
                    value: '',
                  },
                ],
              },
              {
                label: '预计水费(元)',
                value: '',
                children: [
                  {
                    label: '今日',
                    value: '',
                  },
                  {
                    label: '累计',
                    value: '',
                  },
                ],
              },
              {
                label: '应收水费(元)',
                value: '',
                children: [
                  {
                    label: '今日',
                    value: '',
                  },
                  {
                    label: '累计',
                    value: '',
                  },
                ],
              },
              {
                label: '水费余额(元)',
                value: '',
              },
            ],
          };
        } else if (val.name == 'saleprogress') {
          this.com = 'saleprogress';
          this.title = this.area + '支（斗）口、固（临）提泵售水进度日报表';
          this.tableConfig = {
            headerStyle: {
              background: '#f6f6f6',
            },
            columns: [
              {
                label: '灌区',
                value: '',
              },
              {
                label: '渠道',
                value: '',
              },
              {
                label: '灌季任务',
                value: '',
                children: [
                  {
                    label: '售水量(m³)',
                    value: '',
                  },
                  {
                    label: '面积(亩)',
                    value: '',
                  },
                ],
              },
              {
                label: '灌季任务',
                value: '',
                children: [
                  {
                    label: '售水量(m³)',
                    value: '',
                  },
                  {
                    label: '面积(亩)',
                    value: '',
                  },
                ],
              },
              {
                label: '应收水费(元)',
                value: '',
                children: [
                  {
                    label: '今日',
                    value: '',
                  },
                  {
                    label: '累计',
                    value: '',
                  },
                ],
              },
              {
                label: '水费余额(元)',
                value: '',
              },
            ],
          };
        } else if (val.name == 'compare') {
          this.title = '用水计划对照表（全天）';
          this.tableConfig = {
            headerStyle: {
              background: '#f6f6f6',
            },
            columns: [
              {
                label: '测量点名称',
                value: '',
              },
              {
                label: '计划用水开始时间',
                value: '',
              },
              {
                label: '实际用水开始时间',
                value: '',
              },
              {
                label: '时间对比(小时)',
                value: '',
              },
              {
                label: '计划用水量(m³)',
                value: '',
              },
              {
                label: '实际用水量(m³)',
                value: '',
              },
              {
                label: '水量对比(m³)',
                value: '',
              },
              {
                label: '水量对比(%)',
                value: '',
              },
            ],
          };
        } else if (val.name == 'peasant') {
          this.title = '农户用水情况表';
          this.com = 'peasant';
        }
      },
    },
  },
  created() {
    if (this.$route.name == 'implement') {
      this.title = '各输售水管理站用水计划执行对照表';
      this.tableConfig = {
        headerStyle: {
          background: '#f6f6f6',
        },
        columns: [
          {
            label: '名称',
            value: 'name',
          },
          {
            label: '当日下达计划',
            value: 'plan',
            children: [
              {
                label: '流量（m³/s）',
                value: 'flow',
              },
              {
                label: '12小时水量（m³）',
                value: 'half',
              },
            ],
          },
          {
            label: '当日配水量（m³）',
            value: 'day',
            children: [
              {
                label: '20:00',
                value: 'night',
                children: [
                  {
                    label: '实用',
                    value: 'practical',
                  },
                  {
                    label: '超（少）',
                    value: 'difference',
                  },
                ],
              },
              {
                label: '08:00',
                value: 'morning',
                children: [
                  {
                    label: '实用',
                    value: 'practical',
                  },
                  {
                    label: '超（少）',
                    value: 'difference',
                  },
                ],
              },
              {
                label: '当日小计（m³）',
                value: 'today',
                children: [
                  {
                    label: '实用',
                    value: 'practical',
                  },
                  {
                    label: '超（少）',
                    value: 'difference',
                  },
                ],
              },
            ],
          },
          {
            label: '累积水量（m³）',
            value: 'cumulative',
            children: [
              {
                label: '实用',
                value: 'practical',
              },
              {
                label: '超（少）',
                value: 'difference',
              },
            ],
          },
          {
            label: '退（溢）水量（m³）',
            value: ' beyond',
            children: [
              {
                label: '当日',
                value: 'today',
              },
              {
                label: '累计',
                value: 'total',
              },
            ],
          },
        ],
      };
      this.remarks =
        '备注：1."超(少)"用水量以12小时为时段计算，"超(少)"用水量浮动在计划±5%以内的不计入"超(少)"用的水量内。';
    } else if (this.$route.name == 'complete') {
      this.title = this.date + '泵站指标完成情况统计表';
      this.tableConfig = {
        headerStyle: {
          background: '#f6f6f6',
        },
        columns: [
          {
            label: '站名',
            value: 'name',
          },
          {
            label: '耗电量(万度)',
            value: 'name',
          },
          {
            label: '提水量（m³）',
            value: 'plan',
            children: [
              {
                label: '实际',
                value: 'flow',
              },
              {
                label: '全年任务',
                value: 'half',
              },
              {
                label: '完成率(%)',
                value: 'half',
              },
              {
                label: '排名',
                value: 'half',
              },
            ],
          },
          {
            label: '能源单耗(kw.h/kt.m)',
            value: 'day',
            children: [
              {
                label: '实际',
                value: 'night',
              },
              {
                label: '指标',
                value: 'morning',
              },
              {
                label: '完成率(%)',
                value: 'today',
              },
              {
                label: '排名',
                value: 'today',
              },
            ],
          },
          {
            label: '水源保证率',
            value: 'cumulative',
            children: [
              {
                label: '实用',
                value: 'practical',
              },
              {
                label: '任务',
                value: 'difference',
              },
              {
                label: '完成率(%)',
                value: 'difference',
              },
            ],
          },
          {
            label: '开停机及时率(%)',
            value: ' beyond',
          },
          {
            label: '安全运行率(%)',
            value: ' beyond',
          },
          {
            label: '综合指标完成情况(%)',
            value: ' beyond',
          },
          {
            label: '综合排名',
            value: ' beyond',
          },
        ],
      };
    } else if (this.$route.name == 'inlet') {
      this.title = this.area + '输售水管理站计划用水执行情况';
      this.com = 'inlet';
      this.tableConfig = {
        headerStyle: {
          background: '#f6f6f6',
        },
        columns: [
          {
            label: '名称',
            value: '',
          },
          {
            label: '计划(m³/s)',
            value: '',
          },
          {
            label: '流量（m³/s）',
            value: '',
          },
        ],
      };
    } else if (this.$route.name == 'extraction') {
      this.title = '各提水运行安全管理站提水量';
      this.tableConfig = {
        headerStyle: {
          background: '#f6f6f6',
        },
        columns: [
          {
            label: '提水站',
            value: '',
          },
          {
            label: '一级站',
            value: '',
          },
          {
            label: '一级站',
            value: '',
          },
          {
            label: '一级站',
            value: '',
          },
          {
            label: '一级站',
            value: '',
          },
          {
            label: '一级站',
            value: '',
          },
          {
            label: '一级站',
            value: '',
          },
          {
            label: '一级站',
            value: '',
          },
          {
            label: '一级站',
            value: '',
          },
        ],
      };
    } else if (this.$route.name == 'utilization') {
      this.subtitle = '夏浇第59天';
      this.title = this.date + '泵站指标完成情况统计表';
      this.tableConfig = {
        headerStyle: {
          background: '#f6f6f6',
        },
        columns: [
          {
            label: '干渠名称',
            value: '',
          },
          {
            label: '责任人',
            value: '',
          },
          {
            label: '渠首供水量（m³）',
            value: '',
            children: [
              {
                label: '当日',
                value: '',
              },
              {
                label: '累计',
                value: '',
              },
            ],
          },
          {
            label: '区间输水量（m³）',
            value: '',
            children: [
              {
                label: '当日',
                value: '',
              },
              {
                label: '累计',
                value: '',
              },
            ],
          },
          {
            label: '配水量（m³）',
            value: '',
            children: [
              {
                label: '当日',
                value: '',
              },
              {
                label: '累计',
                value: '',
              },
            ],
          },
          {
            label: '退水量(m³)',
            value: '',
            children: [
              {
                label: '当日',
                value: '',
              },
              {
                label: '累计',
                value: '',
              },
            ],
          },
          {
            label: '输配水总量(m³)',
            value: '',
            children: [
              {
                label: '当日',
                value: '',
              },
              {
                label: '累计',
                value: '',
              },
            ],
          },
          {
            label: '渠道利用率(%)',
            value: '',
            children: [
              {
                label: '当日',
                value: '',
              },
              {
                label: '平均',
                value: '',
              },
            ],
          },
          {
            label: '考核利用率(%)',
            value: '',
          },
          {
            label: '利用率增减值(%)',
            value: '',
            children: [
              {
                label: '当日',
                value: '',
              },
              {
                label: '平均',
                value: '',
              },
            ],
          },
          {
            label: '备注',
            value: '',
          },
        ],
      };
      this.remarks = '备注：报表起止时间为前一日早八时至当日早八时';
      this.tips =
        '说明：1、渠首供水量系指灌区各级站提水总量；2、区间输水量系指下一级泵站的提水量； 3、配水量指各级干渠供给下一级支、斗渠的水量之和；分干渠首供水量计入二干渠配水量；七灌区渠首供水量计入六七八干渠配水量。 4、渠道利用率指输配水总量与渠首供水量的比值。';
    } else if (this.$route.name == 'sale') {
      this.com = 'sale';
      this.title = this.area + '支（斗）口、固（临）提泵售水情况日报表';
      this.tableConfig = {
        headerStyle: {
          background: '#f6f6f6',
        },
        columns: [
          {
            label: '灌区',
            value: '',
          },
          {
            label: '渠道',
            value: '',
          },
          {
            label: '水深(m)',
            value: '',
          },
          {
            label: '流量(m³/s)',
            value: '',
          },
          {
            label: '计量仪累计水方(m³)',
            value: '',
          },
          {
            label: '完成售水量（m³）',
            value: '',
            children: [
              {
                label: '今日',
                value: '',
              },
              {
                label: '累计',
                value: '',
              },
            ],
          },
          {
            label: '预计水费(元)',
            value: '',
            children: [
              {
                label: '今日',
                value: '',
              },
              {
                label: '累计',
                value: '',
              },
            ],
          },
          {
            label: '应收水费(元)',
            value: '',
            children: [
              {
                label: '今日',
                value: '',
              },
              {
                label: '累计',
                value: '',
              },
            ],
          },
          {
            label: '水费余额(元)',
            value: '',
          },
        ],
      };
    } else if (this.$route.name == 'saleprogress') {
      this.com = 'saleprogress';
      this.title = this.area + '支（斗）口、固（临）提泵售水进度日报表';
      this.tableConfig = {
        headerStyle: {
          background: '#f6f6f6',
        },
        columns: [
          {
            label: '灌区',
            value: '',
          },
          {
            label: '渠道',
            value: '',
          },
          {
            label: '灌季任务',
            value: '',
            children: [
              {
                label: '售水量(m³)',
                value: '',
              },
              {
                label: '面积(亩)',
                value: '',
              },
            ],
          },
          {
            label: '灌季任务',
            value: '',
            children: [
              {
                label: '售水量(m³)',
                value: '',
              },
              {
                label: '面积(亩)',
                value: '',
              },
            ],
          },
          {
            label: '应收水费(元)',
            value: '',
            children: [
              {
                label: '今日',
                value: '',
              },
              {
                label: '累计',
                value: '',
              },
            ],
          },
          {
            label: '水费余额(元)',
            value: '',
          },
        ],
      };
    } else if (this.$route.name == 'compare') {
      this.title = '用水计划对照表（全天）';
      this.tableConfig = {
        headerStyle: {
          background: '#f6f6f6',
        },
        columns: [
          {
            label: '测量点名称',
            value: '',
          },
          {
            label: '计划用水开始时间',
            value: '',
          },
          {
            label: '实际用水开始时间',
            value: '',
          },
          {
            label: '时间对比(小时)',
            value: '',
          },
          {
            label: '计划用水量(m³)',
            value: '',
          },
          {
            label: '实际用水量(m³)',
            value: '',
          },
          {
            label: '水量对比(m³)',
            value: '',
          },
          {
            label: '水量对比(%)',
            value: '',
          },
        ],
      };
    } else if (this.$route.name == 'peasant') {
      this.title = '农户用水情况表';
      this.com = 'peasant';
    }
  },
  data() {
    return {
      date: '',
      pre: '',
      subtitle: '',
      title: '',
      activeName: 'first',
      area: '',
      pump: '',
      checkPump: '',
      tableConfig: {},
      com: '',
      remarks: '',
      tips: '',
      tableData: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addTable() {
      this.addDialog = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.overview {
  background: #f0f0f0;
  padding: 24px;
  .view-main {
    background-color: #fff;
    border-radius: 10px;
    padding: 36px;
  }
}
.select-pump {
  height: 113px;
  display: flex;
  padding-bottom: 40px;
  height: 40px;
  align-items: center;
  p,
  .el-select,
  .el-button,
  .el-date-editor {
    margin-right: 30px;
  }
}
.page {
  margin-top: 40px;
  font-size: 18px;
  color: #171819;
}
.table-wrap {
  > .table-title {
    font-size: 28px;
    color: #171819;
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    .date {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 18px;
    }
  }
  > .el-button {
    margin-bottom: 20px;
  }
  .el-dropdown {
    cursor: pointer;
    margin-left: 55px;
    color: #4280dc;
    font-size: 12px;
  }
}
</style>
