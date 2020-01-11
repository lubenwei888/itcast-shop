<template>
    <div>
       <input type="text" placeholder="请输入添加内容"  class="inp" v-model="addvalue">
      <van-button type="info" block @click="add">添加商品</van-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            addvalue:''
        }
    },
    methods: {
         async add(){
             const {data:result}= await this.$http.post(`/api/addproduct`,{name:this.addvalue})
            console.log(result);
            console.log(this.addvalue);
            
        }
    },
}
</script>

<style lang="less" scoped>
.inp{
    outline: none;
    border: 0; 
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    margin:20px
}
</style>