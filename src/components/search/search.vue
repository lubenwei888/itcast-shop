<template>
  <div>
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchdata"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <!-- 滑动单元格 -->
    <van-swipe-cell :before-close="beforeClose" v-show="showText"  v-for="item in resList" :key="item.id">
      <van-cell :border="false" :title="item.name" :value="item.ctime | dateFormate"/>
      <template slot="right" >
        <van-button square type="danger" text="删除"  @click="deleteitem(item.id)"/>
      </template>
    </van-swipe-cell>

      <!-- 搜索历史 -->
      <van-row type="flex" justify="space-between" v-show='showHistory'>
        <van-col span="5">搜索历史</van-col>
        <van-col span="1">
          <van-icon name="delete"  @click="iconDelete"/>
        </van-col>
      </van-row>

      <!-- 当没有内容是显示 -->
      <van-divider v-show="haveHistory">暂无搜索历史</van-divider>

        <!-- 标签 -->
      <van-tag @click="clickhistorytag(item)"   v-for="(item,index) in dataList" :key="index" v-show="showTag">{{item}}</van-tag>
      
    </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      searchdata:'',
      resList:[],
      showText:false,
      showHistory:true,
      haveHistory:true,
      showTag:false,
      dataList:[]
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get(
        "http://www.liulongbin.top:3005/api/getprodlist"
      );
      console.log(res);
      this.resList=res.message
    },
    // search事件在点击键盘上的搜索/回车按钮后触发
    onSearch() {
        this.getCateList()
        if(this.searchdata.trim().length==0){
            return
        }
        this.showHistory=false
        this.haveHistory=false
        this.showText=true
        this.showTag=false
        console.log(this.resList);
        //将用户输入的内容放入dataList数组中
        this.dataList.push(this.searchdata)
        console.log(this.dataList);
        
        
    },
    //cancel事件在点击搜索框右侧取消按钮时触发
    onCancel() {
        this.showText=false
        this.showHistory= true
        this.showTag=true
        this.searchdata = ''
        this.resList = []
    },

    // 点击删除小图标
    iconDelete(){
      this.showTag=false
      this.dataList=[]
      this.haveHistory=true
    },


    //滑动单元格的删除
      async deleteitem(id) {
         console.log(id);         
          const {data:res}= await this.$http.get('http://www.liulongbin.top:3005/api/delproduct/'+id) 
          // console.log(res);
          if(res.status==0) {
              this.getCateList();
          }
     },

    
    // 点击历史记录tag
    clickhistorytag(tag) {
      this.searchdata = tag
    },

    //滑动单元格的删除键
     beforeClose({ position, instance }) {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            console.log(1);
            
            instance.close();
            this.$notify({ type: "success", message: "删除成功" });
          });
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-col {
  margin: 20px 0 0 15px;
}

.van-tag{
     margin: 10px 15px 0 15px
}
</style>