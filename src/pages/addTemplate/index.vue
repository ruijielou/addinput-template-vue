<template>
    <div class="template">
        <div class="template-content">
            <group title="模板标题">
                <x-input :title="'标题'" placeholder="请输入模板标题" novalidate :show-clear="true" v-model="groups.name"></x-input>
            </group>
            <group v-for="(item, $index) in groups.groupList" :key='item.id' >
                <template v-if="item.type=='text'">
                    <x-input :title="item.label+'标题'" placeholder="请输入标题" novalidate :show-clear="true" v-model="item.placeholder"></x-input>
                    <x-input :title="item.placeholder" v-model="item.val" :placeholder="item.placeholder == ''?'请输入':item.placeholder" novalidate :show-clear="true"></x-input>
                </template>
                <template v-if="item.type=='switch'">
                    <x-input :title="item.label+'标题'" placeholder="请输入标题" novalidate :show-clear="true" v-model="item.placeholder"></x-input>
                    <x-switch :value-map="['0', '1']" title="" v-model="item.val"></x-switch>
                </template>
                <template v-if="item.type=='checkbox'">
                    <x-input :title="item.label+'标题'" placeholder="请输入标题" novalidate :show-clear="true" v-model="item.placeholder"></x-input>
                    <checklist label-position="left" required :options="item.options" v-model="item.val"></checklist>
                </template>
                <template v-if="item.type=='radio'">
                    <x-input :title="item.label+'标题'" placeholder="请输入标题" novalidate :show-clear="true" v-model="item.placeholder"></x-input>
                    <radio fill-mode fill-label="Other" fill-placeholder="填写其他的哦" v-model="item.val" :options="item.options"></radio>
                </template>
                <template v-if="item.type=='address'">
                    <x-input :title="item.label+'标题'" placeholder="请输入标题" novalidate :show-clear="true" v-model="item.placeholder"></x-input>
                    <x-address :list="item.addressData" title="" v-model="item.val" placeholder="" inline-desc="请选择地址" :show.sync="item.showAddress"></x-address>
                </template>
                <template v-if="item.type=='textarea'">
                    <x-input :title="item.label+'标题'" placeholder="请输入标题" novalidate :show-clear="true" v-model="item.placeholder"></x-input>
                    <x-textarea :max="20" placeholder="请输入内容" v-model="item.val"></x-textarea>
                </template>
                <template v-if="item.type=='select'">
                    <x-input :title="item.label+'标题'" placeholder="请输入标题" novalidate :show-clear="true" v-model="item.placeholder"></x-input>
                    <selector ref="defaultValueRef" :title="item.placeholder" direction="rtl" :options="item.options" v-model="item.val"></selector>
                </template>
                <template v-if="item.type=='dateTime'">
                    <x-input :title="item.label+'标题'" placeholder="请输入标题" novalidate :show-clear="true" v-model="item.placeholder"></x-input>
                    <datetime-range title="" format="YYYY年MM月DD日" start-date="2017-01-01" :end-date="new Date()" v-model="item.val"></datetime-range>
                </template>

            </group>
        </div>
        <div class="add-template">
            <div style="margin: 0 15px;">
                <x-button @click.native="showPopupPicker = true" :gradients="['#FF5E3A', '#FF9500']">Add Item</x-button>
                <x-button type="primary" @click.native="saveTemplate">保存</x-button>
            </div>
            <group>
                <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="添加表单项" :data="list1" @on-show="onShow" @on-hide="onHide" @on-change="onChange" v-model="value1" show-name></popup-picker>
            </group>
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

let defaultVal = {
  text: {
    label: "文本框",
    type: "text",
    title: "",
    placeholder: "",
    val: ""
  },
  switch: {
    label: "开关",
    type: "switch",
    title: "",
    placeholder: "",
    val: ""
  },
  address: {
    label: "地址",
    type: "address",
    title: "",
    placeholder: "",
    val: [],
    addressData: ChinaAddressV4Data,
    showAddress: false
  },
  textarea: {
    label: "多行文本框",
    type: "textarea",
    title: "",
    placeholder: "",
    val: ""
  },

  checkbox: {
    label: "多选",
    type: "checkbox",
    title: "",
    placeholder: "",
    val: [],
    options: ["China", "Japan", "America"]
  },
  radio: {
    label: "单选",
    type: "radio",
    title: "",
    placeholder: "",
    val: "",
    options: ["A", "B", "C"]
  },
  select: {
    label: "下拉框",
    type: "select",
    title: "",
    placeholder: "",
    val: "",
    options: [{ key: "gd", value: "广东" }, { key: "gx", value: "广西" }]
  },
  dateTime: {
    label: "日期时间",
    type: "dateTime",
    title: "",
    placeholder: "",
    val: [],
    showPopup: false
  }
};

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
      value1: [],
      isEdit: false,
      groups: {
        name: "",
        id: new GUID().newGUID(),
        groupList: []
      },

      list1: [
        [
          {
            name: "文本框",
            value: "text",
            id: 1
          },
          {
            name: "多选框",
            value: "checkbox",
            id: 2
          },
          {
            name: "单选框",
            value: "radio",
            id: 3
          },
          {
            name: "多行文字框",
            value: "textarea",
            id: 4
          },
          {
            name: "下拉框",
            value: "selsect",
            id: 5
          },
          {
            name: "日期时间",
            value: "dateTime",
            id: 6
          },
          {
            name: "地址",
            value: "address",
            id: 7
          },
          {
            name: "开关",
            value: "switch",
            id: 8
          }
        ]
      ]
    };
  },
  mounted() {
    if (this.$route.name == "editTemplate") {
      this.isEdit = true;
      this.$store.commit("addCurrentId", this.$route.params.id);

      this.groups = this.$store.getters.getTemplates.filter(item => {
        return (item.id = this.$store.state.currentId);
      })[0];
    }
  },
  methods: {
    saveTemplate() {
      if (this.isEdit) {
        let obj = this.$store.getters.getTemplates.filter(item => {
          return (item.id = this.$store.state.currentId);
        })[0];
        this.$store.commit("deleteTemplate", obj);
      }

      this.$store.commit("addTemplates", this.groups);
      this.$router.push({name: 'templateList'})
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

