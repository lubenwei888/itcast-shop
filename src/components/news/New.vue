<template>

    <div>
       <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-card v-for="item in newlist" :key="item.id" :title="item.title.slice(0,item.title.length-2)"
                :thumb="item.img_url" centered @click="goDetail(item.id)" lazy-load	>
                <div slot="desc" class="desc_bottom">
                    <span class="addtime">发表时间: {{item.add_time | dateFormate}}</span> 
                    <span class="clickchange"> 点击: {{item.click}}</span>
                </div>
            </van-card>  
         </van-pull-refresh> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            newlist:[],
            isLoading:false,
        }
    },
    created:function(){
        this.getNewList()
    },
    methods:{
       async getNewList(){
          const {data:res}= await this.$http.get('/api/getnewslist')
          if(res.status!==0){
                return  this.$notify({ type: 'danger', message: '获取数据失败' });
          }
          this.newlist=res.message
       },
         //    实现下拉刷新
       onRefresh() {
        setTimeout(() => {
            this.$toast('刷新成功');
            this.isLoading = false
        }, 500)
     },
    //    跳转到新闻详情页
       goDetail(id){
           this.$router.push({ path: '/news/detail', query: { id: id}})
           
       },
  
    },
    
}
</script>

<style lang="less" scoped>
.van-card {
    background-color: #fff;
    border-bottom:1px solid #eee;
    margin:0 10px;
    padding:10px;
}
.van-card__title {
    font-weight:700;
    font-size:14px;
    color:#000;
    box-sizing: border-box;
    white-space: nowrap;              
    overflow: hidden;
    text-overflow: ellipsis;        
}
.addtime {
    color:#1989FA;
}
.clickchange {
     color:#1989FA;
     float: right;
}
.desc_bottom {
    line-height: 30px;
}
.van-card__thumb{
    width: 42px;
    height: 42px;
}
.van-card__content{
    min-height: 38px;
}

</style>