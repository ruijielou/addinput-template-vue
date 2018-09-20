<template>
    <div class="content">
        <x-table>
            <thead>
                <tr>
                    <th></th>
                    <th>模板名称</th>
                    <th>使用人数</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody v-if="$store.state.templates.length !== 0">
                <tr v-for="(item, $index) in $store.state.templates" :key="item.id">
                    <td>{{$index + 1}}</td>
                    <td>{{item.name}}</td>
                    <td>
                        0
                    </td>
                    <td>

                        <span class="tag-read" :data-clipboard-text="origin+ '/#/myTemplate/' + item.id" @click="copy">
                            <x-icon type="share" size="30" class="icon-blue"></x-icon>
                        </span>
                        <span @click="showMenu(item.id)">
                            <x-icon type="more" size="30"></x-icon>
                        </span>
                    </td>
                </tr>
            </tbody>
        </x-table>
        <actionsheet v-model="show" :menus="menu" theme="android" @on-click-menu="operation" @on-after-hide="log('after hide')" @on-after-show="log('after show')">
        </actionsheet>
        <div>
            <alert v-model="alterShow" title="复制成功"> 复制到剪贴板成功，可以粘贴分享给好友哦</alert>
        </div>
    </div>
</template>
<script>
import { Tab, TabItem, XButton, XTable, Actionsheet, Alert } from "vux";
import Clipboard from "clipboard";
const hrefs = window.location.origin;

export default {
  components: { Tab, TabItem, XButton, XTable, Actionsheet, Alert },
  data() {
    return {
      alterShow: false,
      origin: hrefs,
      show: false,
      menu: {
        delete: "删除",
        preview: "查看",
        edit: "编辑"
      }
    };
  },
  methods: {
    copy() {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        this.alterShow = true;
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    log(str) {
      console.log(str);
    },
    showMenu(id) {
      this.show = true;
      //   this.currentId = id;
      this.$store.commit("addCurrentId", id);
    },
    operation(val) {
      switch (val) {
        case "edit":
          let name = this.$store.state.templates.filter(item => {
            return (item.id = this.$store.state.currentId);
          })[0].name;
          this.$store.commit("changeEditTitle", name);
          this.$router.push({
            name: "editTemplate",
            params: { id: this.$store.state.currentId }
          });
          break;
        case "delete":
        let obj = (this.$store.getters.getTemplates.filter(item => {return item.id = this.$store.state.currentId}))[0];
          this.$store.commit('deleteTemplate', obj);
          break;
        case "preview":
          this.$router.push({ name: "preview", params: { id: this.$store.state.currentId } });
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    console.log(this.$store);
  }
};
</script>
