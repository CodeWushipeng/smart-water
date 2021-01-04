import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts/lib/echarts'
import smTree from './components/smTree/index'
import empty from './components/empty/index'
import request from './utils/request'

// 按需引入类型
import 'echarts/lib/chart/line' // 折线图
import 'echarts/lib/chart/bar' // 柱形图
import 'echarts/lib/chart/pie' // 饼状图
import 'echarts/lib/chart/funnel' // 地理图

// 按需引入配置功能组件
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markPoint'

// 引入 SVG 渲染器模块
import 'zrender/lib/svg/svg'

Vue.prototype.$echarts = echarts

Vue.prototype.axios = request;
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(smTree)
Vue.use(empty)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
