<template>
  <div class="gis-wrap">
    <div class="aside-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="工作区" name="first">
          <el-form>
            <el-form-item>
              <el-select
                v-model="area"
                placeholder="请选择灌区"
                clearable
                filterable
                style="margin-right: 30px"
              >
                <el-option
                  v-for="(item, index) in areaList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-table style="width: 100%">
                <el-table-column
                  type="index"
                  width="50"
                  label="序号"
                ></el-table-column>
                <el-table-column
                  v-for="(item, index) in tableConfig"
                  :key="index"
                  :prop="item.value"
                  :label="item.label"
                  align="center"
                ></el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="图例图层" name="second">
          <el-tree
            :data="gisData"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
            @check-change="layerChange"
          >
          </el-tree>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="mapContainer" style="width: 100%; height: 100%"></div>
    <div class="tab-wrap">
      <div
        class="tab-item"
        v-for="(item, index) in mapTabList"
        :key="index"
        @click="tabclick(index)"
        :class="activeIndex == index ? 'active' : ''"
      >
        <p class="icon iconfont" :class="item.icon"></p>
        <p>{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import T from "T"; // 天地图引入
//摄像头
var videos = [
  [110.33566, 34.91465, 1],
  [110.47473, 34.89466, 2],
  [110.90902, 34.98472, 3],
  [110.96775, 35.06373, 5],
  [110.90569, 35.09526, 6],
  [111.0692, 35.10713, 56],
  [111.12439, 35.08129, 65],
  [111.26197, 35.3894, 565],
  [111.10353, 35.26356, 565],
  [111.04121, 35.26538, 565],
  [110.9171, 35.19941, 56],
  [110.59215, 35.03393, 565],
];

//水泵
var machines = [
  [110.52324, 34.97797, 1],
  [110.48994, 34.98585, 2],
  [110.45578, 34.94632, 3],
  [110.42041, 34.90663, 5],
  [110.72168, 35.01031, 6],
  [110.89025, 35.11092, 56],
  [110.78657, 35.01861, 65],
  [110.94793, 34.99007],
];
var cf = {
  version: "1.1.1", //请求服务的版本
  layers: "", //每个请求图层的用","分隔的描述样式
  transparent: true, //输出图像背景是否透明
  styles: "",
  opacity: 1,
  srs: "EPSG:4326",
  setZIndex: 9999,
  format: "image/gif", //输出图像的类型
};
var gq_obj, zq_obj, bz_obj;
export default {
  name: "Gis",
  data() {
    return {
      activeIndex: 0,
      mapTabList: [
        {
          icon: "icon-shuiwenzhan",
          text: "泵站",
        },
        {
          icon: "icon-shuizhan",
          text: "一体化闸门",
        },
        {
          icon: "icon-bengzhan1",
          text: "临提泵",
        },
        {
          icon: "icon-bengzhan",
          text: "万亩站",
        },
        {
          icon: "icon-hehuqushuikou",
          text: "取水口",
        },
        {
          icon: "icon-shipin",
          text: "视频",
        },
        {
          icon: "icon-daolu",
          text: "交通图",
        },
        {
          icon: "icon-weixing",
          text: "影像图",
        },
        {
          icon: "icon-dixing",
          text: "地形图",
        },
      ],
      map: null,
      activeName: "first",
      area: "",
      areaList: [
        {
          label: "",
          value: "",
        },
      ],
      tableConfig: [
        {
          label: "泵站名称",
          value: "",
        },
        {
          label: "开机台数(台)",
          value: "",
        },
        {
          label: "当前流量(m³/s)",
          value: "",
        },
      ],
      tableData: [],
      gisData: [
        {
          id: 1,
          label: "干渠",
          children: [
            {
              id: 4,
              label: "干渠1",
              children: [
                {
                  id: 9,
                  label: "干渠1-1",
                },
                {
                  id: 10,
                  label: "干渠1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "支渠",
          children: [
            {
              id: 5,
              label: "支渠1",
            },
            {
              id: 6,
              label: "支渠2",
            },
          ],
        },
        {
          id: 3,
          label: "泵站",
          children: [
            {
              id: 7,
              label: "泵站1",
            },
            {
              id: 8,
              label: "泵站2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    this.mapLoad();
  },
  methods: {
    mapLoad() {
      let that = this; //将方法放在mounted，会有指向问题，定义this使用就会正常
      let zoom = 12; //地图的初始化级别，及放大比例
      that.map = new T.Map("mapContainer");
      that.map.centerAndZoom(new T.LngLat(110.38237, 35.006796), zoom);
      var icon = new T.Icon({
        iconUrl: require("../images/station.png"),
        iconSize: new T.Point(19, 27),
        iconAnchor: new T.Point(10, 25),
      });
      //向地图上添加自定义标注
      var marker = new T.Marker(new T.LngLat(110.38237, 35.006796), {
        icon: icon,
      });
      that.map.addOverLay(marker);
    },
    // 添加gis图层
    addGisLayer() {
      var config = {
        version: "1.1.1", //请求服务的版本
        layers: "base_map,base_map1", //每个请求图层的用","分隔的描述样式
        transparent: true, //输出图像背景是否透明
        styles: "",
        opacity: 0.8,
        srs: "EPSG:4326",
        setZIndex: 1000,
        format: "image/png", //输出图像的类型
      };
      var base_map = new T.TileLayer.WMS(
        "http://146.56.208.179:6080/arcgis/services/zc/MapServer/WMSServer",
        config
      );
      this.map.addLayer(base_map);
    },
    // 添加摄像头图层
    addCamera() {
      var marker = [];
      var icon = new T.Icon({
        iconUrl:
          "http://s.99img.cn/20201002/21154797f1eff7e261b4d3dad7e65a55e131e8.png",
        iconSize: new T.Point(25, 25),
        iconAnchor: new T.Point(10, 25),
      });

      for (var i = 0; i < videos.length; i++) {
        marker[i] = new T.Marker(new T.LngLat(videos[i][0], videos[i][1]), {
          icon: icon,
        }); // 创建标注
        var content = videos[i][2];
        this.map.addOverLay(marker[i]); // 将标注添加到地图中
        addClickHandler(content, marker[i]);
      }

      function addClickHandler(content, marker) {
        marker.addEventListener("click", function (e) {
          openInfo(content, e);
        });
      }
      function openInfo(content, e) {
        layer.open({
          type: 1,
          title: "设备详情",

          area: ["420px", "480px"], //宽高
          content: $("#td1"),
        });
      }
    },
    // 移除摄像头图层
    removeCamera() {
      for (var i = 0; i < videos.length; i++) {
        this.map.removeOverLay(marker[i]);
      }
    },
    // 显示机组
    showMachine() {
      var bzz = [];
      var icon = new T.Icon({
        iconUrl:
          "http://s.99img.cn/20201002/212008c3ecb747840b846cb279ed1b9b011c49.png",
        iconSize: new T.Point(50, 50),
        iconAnchor: new T.Point(0, 0),
      });

      for (var i = 0; i < machines.length; i++) {
        bzz[i] = new T.Marker(new T.LngLat(machines[i][0], machines[i][1]), {
          icon: icon,
        }); // 创建标注
        var content = machines[i][2];
        this.map.addOverLay(bzz[i]); // 将标注添加到地图中
        addClickHandler(content, bzz[i]);
      }

      function addClickHandler(content, marker) {
        marker.addEventListener("click", function (e) {
          openInfo(content, e);
        });
      }
      function openInfo(content, e) {
        layer.open({
          type: 1,
          title: "设备详情",

          area: ["420px", "480px"], //宽高
          content: $("#td1"),
        });
      }
    },
    // 隐藏机组
    hideMachine() {
      for (var i = 0; i < machines.length; i++) {
        this.map.removeOverLay(bzz[i]);
      }
    },
    // 显示图层
    showlayer(id) {
      switch (id) {
        case 1:
          var gq = cf;
          gq.layers = "总干渠";
          gq.opacity = 1;
          gq_obj = new T.TileLayer.WMS(
            "http://146.56.208.179:6080/arcgis/services/zc/MapServer/WMSServer",
            gq
          );
          this.map.addLayer(gq_obj);

          break;

        case 2:
          var zq = cf;
          zq.opacity = 1;
          zq.layers = "分干渠支渠";
          zq_obj = new T.TileLayer.WMS(
            "http://146.56.208.179:6080/arcgis/services/zc/MapServer/WMSServer",
            zq
          );
          this.map.addLayer(zq_obj);

          break;

        case 3:
          var bz = cf;
          bz.layers = "泵站";
          bz_obj = new T.TileLayer.WMS(
            "http://146.56.208.179:6080/arcgis/services/zc/MapServer/WMSServer",
            bz
          );
          this.map.addLayer(bz_obj);

          break;

        case 4:
          this.showVideo();

          break;

        case 5:
          this.showMachine();

          break;
      }
    },
    // 隐藏图层
    hidelayer(id) {
      switch (id) {
        case 1:
          this.map.removeLayer(gq_obj);
          break;
        case 2:
          this.map.removeLayer(zq_obj);
          break;
        case 3:
          this.map.removeLayer(bz_obj);
          break;
        case 4:
          this.hideVideo();
          break;
        case 5:
          this.hideMachine();
          break;
      }
    },
    tabclick(index) {
      this.activeIndex = index;
      if (this.activeIndex == 8) {
        this.map.setMapType(TMAP_TERRAIN_HYBRID_MAP);
      } else if (this.activeIndex == 7) {
        this.map.setMapType(TMAP_HYBRID_MAP);
      } else if (this.activeIndex == 6) {
        this.map.setMapType(TMAP_NORMAL_MAP);
      }
    },
    handelDraw() {
      this.drawer = true;
    },
    layerChange(data, checked) {
      console.log(data, checked);
      let now_id = data.id;
      if(checked){
      this.showlayer(now_id);
      }else{
        this.hidelayer(now_id)
      }
      // this.getCheckedKeys();
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
      // this.showlayer()
    },
  },
};
</script>

<style scoped>
.aside-wrap {
  width: 400px;
  height: 100%;
  border-right: 1px solid #eee;
  padding: 0 10px;
}
.gis-wrap {
  height: 100%;
  display: flex;
}
.tab-wrap {
  position: absolute;
  bottom: 30px;
  left: 50%;
  height: 70px;
  margin-left: -250px;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1000;
  border-radius: 10px;
  border: 1px solid #66b1ff;
  padding: 4px;
}

.tab-item {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  color: #66b1ff;
  font-size: 14px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all linear 0.3s;
}

.tab-item:hover {
  background: #66b1ff;
  color: #fff;
}

.tab-item.active {
  background: #66b1ff;
  color: #fff;
}

.tab-item > .icon {
  font-size: 30px;
}
.draw-wrap {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10000;
  height: 100%;
}
.drow-button {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 160px;
  cursor: pointer;
  background-color: #4280dc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 0 15px 15px 0;
  transition: all linear 1s;
}
.icon-arr-left {
  font-size: 20px;
}
</style>
