<template>
  <div class="home">
    <div class="top">

      <tab v-if="$route.name !== 'editTemplate' && $route.name !== 'preview'">
        <tab-item :selected="$route.name == 'templateList'" @on-item-click="onItemClick">模板列表</tab-item>
        <tab-item :selected="$route.name == 'addTemplate'" @on-item-click="onItemClick">新增模板</tab-item>
        <!-- <tab-item @on-item-click="onItemClick">全部订单</tab-item> -->
      </tab>
        <x-header v-if="$route.name == 'editTemplate' || $route.name == 'preview'" :title="($route.name == 'preview'?'查看': '编辑') + $store.state.editTitle"></x-header>
      </div>
    <router-view></router-view>

  </div>
</template>

<script>
import { Tab, TabItem, XButton, XTable, XHeader } from "vux";

export default {
  components: { Tab, TabItem, XButton, XTable, XHeader },
  name: "home",
  data() {
    return {};
  },
  methods: {
    onItemClick(index) {
      console.log("on item click:", index);
      if (index == 0) {
        this.$router.push({ name: "templateList" });
      } else if (index == 1) {
        this.$router.push({ name: "addTemplate" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.BR-1 {
  border-right: 1px solid #ffffff;
}
.BL-1 {
  border-left: 1px solid #ffffff;
}
.BT-1 {
  border-top: 1px solid #ffffff;
}
.BB-1 {
  border-bottom: 1px solid #ffffff;
}
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  .top {
    // padding: 0.5rem;
    background: #f44336;
  }
  .content {
    flex: 1;
  }
}
</style>


