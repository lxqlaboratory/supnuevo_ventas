<template>
    <div>
      <el-upload
        style="margin-left: 15px;" name="file"
        :action='baseUrl+url'
        :multiple="false"
        :file-list="fileList"
        :data="formData"
        :with-credentials="true"
        :show-file-list="true"
        :accept="accepttype"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-remove="remove"
        :limit="limitnum"
        :on-preview="onPreview"

      >
        <el-button size="small"  class="styleBtn">
          <slot></slot>
        </el-button>
        <div slot="tip" class="el-upload__tip">{{remarks}}</div>
      </el-upload>
    </div>
</template>

<script>
    export default {
      name: 'Fileupload',
      data() {
        return {
          fileList:[],
          baseUrl: 'http://localhost/supnuevo_ventas',
          formData:{
            title:'uyjg',
            desc:'fjfj',
            priority:'',
            occurDate:'',
            file:''
          }
        }
      },
      props: {
        limitnum:{
          type:Number,
          default:function () {
            return 1
          }
        },
        accepttype:{
          type:String,
          default:function() {
            return ''
          }
        },
        url:{
          type:String,
          default:function() {
            return ''
          }
        },
        remarks:{
          type:String,
          default:function() {
            return '只能上传.pdf文件'
          }
        }
      },
      methods: {
        onPreview:function(file){
          this.$emit('preview',file)

        },
        remove:function(file){
          console.log(file)
        },
        uploadSuccess(response, file, fileList) {
            this.$emit('successcallback', response,file)
            this.$message({
              type:"success",
              message:"上传成功"
            })
        },
        uploadError(err, file, fileList) {
          console.log(err)
          console.log(file)
          console.log(fileList)
          this.$message({
            type:"error",
            message:"上传失败，请检查网络"
          })
        }
      }
    }
</script>

<style scoped>
  .styleBtn{
    background-color: #A50001;
    border: none;
    color: #ffffff;
  }

</style>
