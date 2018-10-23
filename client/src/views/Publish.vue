<template>
  <div class="publish">
    <div class="header">
        <button @click="$router.go(-1)">取消</button>
        <button @click="publish">发表</button>
    </div>
      <div class="content">
          <div class="text_wrap">
              <textarea placeholder="这一刻的想法。。。"
                        v-model="text"/>
              <!--文件上传-->
              <Upload :loading="loading" @getImg="getImgs"/>
          </div>
      </div>
      <Loading :loading="loading"/>
  </div>
</template>

<script>
    import Upload from '../components/Upload'
    import jwt_decode from 'jwt-decode'
    import Loading from '../components/Loading'
  export default {
    name: "Publish",
      components:{
          Upload,
          Loading
      },
      data(){
        return{
            text:'',
            imgs:[],
            loading:false
        }
      },
      computed:{
          user(){
              const token = localStorage.wxToken
        
              //解析token
              const decode = jwt_decode(token)
              return decode
          }
      },
    methods:{
        publish(){
        //发布消息
            this.loading = true
            const postData = {
                name:this.user.name,
                img:this.user.avatar,
                text:this.text,
                imgs:this.imgs.join("|")
            };
            //请求
            this.$axios.post("/api/profiles/add",postData)
                .then(res =>{
                    this.loading = false
                    // 发布成功后跳转
                    this.$router.push('/moments')
                })
        },
        getImgs(imgs){
            //  获取base64
            imgs.forEach(file =>{
                this.uploadFile(file)
            })
        },
        uploadFile(file){
            const _this = this;
            let reader = new FileReader();
            reader.onload = function (e) {
                _this.imgs.push(e.target.result)
            };
            reader.readAsDataURL(file);
        },
    },
  }
</script>

<style scoped>
    .publish {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    
    .header {
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        display: flex;
        padding: 0 10px;
        line-height: 50px;
        justify-content: space-between;
    }
    .header button {
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 16px;
    }
    .header button:nth-child(2) {
        color: #20af0e;
    }
    
    .content {
        width: 100%;
        box-sizing: border-box;
        padding: 16px;
    }
    .text_wrap textarea {
        width: 100%;
        font-size: 14px;
        min-height: 60px;
        border: none;
        outline: none;
    }
    .text_wrap {
        margin-bottom: 16px;
    }
</style>