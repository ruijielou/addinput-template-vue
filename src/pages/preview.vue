<template>
    <div class="template">
        <div class="template-content">
            <group v-for="item in groups.groupList" :key='item.id' :title="item.placeholder">
                <template v-if="item.type=='text'">
                    <x-input v-model="item.val" :placeholder="item.placeholder == ''?'正文内容':item.placeholder+'正文部分'" novalidate :show-clear="true"></x-input>
                </template>
                <template v-if="item.type=='switch'">
                    <x-switch :value-map="['0', '1']" title="" v-model="item.val"></x-switch>
                </template>
                <template v-if="item.type=='checkbox'">
                    <checklist label-position="left" required :options="item.options" v-model="item.val"></checklist>
                </template>
                <template v-if="item.type=='radio'">
                    <radio fill-mode fill-label="Other" fill-placeholder="填写其他的哦" v-model="item.val" :options="item.options"></radio>
                </template>
                <template v-if="item.type=='address'">
                    <x-address :list="item.addressData" title="" v-model="item.val" placeholder="" inline-desc="请选择地址" :show.sync="item.showAddress"></x-address>
                </template>
                <template v-if="item.type=='textarea'">
                    <x-textarea :max="20" placeholder="请输入内容" v-model="item.val"></x-textarea>
                </template>
                <template v-if="item.type=='select'">
                    <selector ref="defaultValueRef" :title="item.placeholder" direction="rtl" :options="item.options" v-model="item.val"></selector>
                </template>
                <template v-if="item.type=='dataTime'">
                    <datetime-range title="" format="YYYY年MM月DD日" start-date="2017-01-01" :end-date="new Date()" v-model="item.val"></datetime-range>
                </template>
            </group>
        </div>
        <div class="add-template">
            <div style="margin: 0 15px;">
                <!-- <x-button @click.native="showPopupPicker = true" :gradients="['#FF5E3A', '#FF9500']">取消</x-button> -->
                 <!-- <x-button type="primary" @click.native="saveTemplate">保存</x-button> -->
            </div>
        </div>
    </div>
</template>
<script>

import {
  Datetime,
  PopupPicker,
  Group,
  Cell,
  Picker,
  XButton,
  Divider,
  XSwitch,
  XInput,
  Checklist,
  Radio,
  XAddress,
  ChinaAddressV4Data,
  XTextarea,
  Selector,
  DatetimeRange
} from "vux";


export default {
  components: {
    PopupPicker,
    Group,
    Picker,
    XButton,
    Divider,
    Cell,
    XSwitch,
    Datetime,
    XInput,
    Checklist,
    Radio,
    XAddress,
    XTextarea,
    Selector,
    DatetimeRange
  },
  data() {
    return {
      showPopupPicker: false,
    //   isEdit: false,
      groups: {
        name: "",
        id: '',
        groupList: []
      }
    };
  },
  mounted(){
    //   if(this.$route.name == 'editTemplate'){
        //   this.isEdit = true;
          this.$store.commit('addCurrentId', this.$route.params.id);
        //   debugger
        //   console.log(this.$store.getters.getTemplates)
          this.groups = (this.$store.getters.getTemplates.filter(item => {return item.id = this.$store.state.currentId}))[0];
        //   console.log(this.groups.id)
    //   }
  },
  methods: {
      saveTemplate() {
        //   console.log(this.groups)
          if(this.isEdit) {
              let obj = (this.$store.getters.getTemplates.filter(item => {return item.id = this.$store.state.currentId} ))[0];
              this.$store.commit('deleteTemplate', obj)
          }
        //    console.log(this.groups.id)
           this.$store.commit('addTemplates', this.groups)
      },
    onChange(val) {

      let obj = defaultVal[val];

      this.groups.groupList.push(obj);
     
    },
    onShow() {
      console.log("on show");
    },
    onHide(type) {
      console.log("on hide", type);
    }
  }
};
</script>
<style lang="scss" scoped>
.template {
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;

  .template-content {
    flex: 1;
  }
}
</style>

