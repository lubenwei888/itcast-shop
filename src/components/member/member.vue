<template>
  <div>
    <!-- 联系人卡片 -->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="showList = true"
      add-text="添加会员"
    />

    <!-- 联系人列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-contact-list
        v-model="chosenContactId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
        add-text="新增会员"
        default-tag-text="默认"
      />
    </van-popup>

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
        show-set-default
        set-default-label="设为默认联系人"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      // 会员列表
      list: []
    };
  },
  created() {
    this.getMemberlist();
  },
  computed: {
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    },

    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    }
  },

  methods: {
    getMemberlist() {
      // 读取sessionStorage
       const str = sessionStorage.obj;     
      //重新转换为对象
      const obj1 = JSON.parse(str);
      this.list=obj1
      
    },
    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;
      this.showEdit = true;
      this.editingContact = item;
    },
    // 选中联系人
    onSelect() {
      this.showList = false;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;

      if (this.isEdit) {
        this.list = this.list.map(item => (item.id === info.id ? info : item));
        this.$notify({ type: "success", message: "修改成功" });
        const obj=this.list
        const str = JSON.stringify(obj)
        sessionStorage.obj=str
      } else {
        this.list.push(info);
        this.$notify({ type: "success", message: "添加成功" });
        // 将list数组利用JSON转化为字符串存储在sessionStorage中
        const obj = this.list;
        const str = JSON.stringify(obj);
        sessionStorage.obj = str;
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
              this.$notify({ type: "success", message: "删除成功" });
        const objlist=this.list
        const str=JSON.stringify(objlist)
        // 读取sessionStorage
        sessionStorage.obj=str      
      if (this.chosenContactId === info.id) {         
        this.chosenContactId = null;  
      }
    }
  }
};
</script>