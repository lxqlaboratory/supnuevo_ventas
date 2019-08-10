<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="40%">
      <el-form-item :label="$t('mm.OldPwd')" prop="oldPass" style="color: #9b0d14">
        <el-input v-model="ruleForm.oldPass" type="password" autocomplete="off" style="width: 25%;" />
      </el-form-item>
      <el-form-item :label="$t('mm.newPwd')" prop="newPass">
        <el-input v-model="ruleForm.newPass" type="password" autocomplete="off" style="width: 25%;" />
      </el-form-item>
      <el-form-item :label="$t('mm.conPwd')" prop="checkPass" class="leftSpan" style="color: #9b0d14">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" style="width: 25%;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submitBtn" @click="submitForm()">提交</el-button>
        <el-button class="resetBtn" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import  {editPassword} from '../api/api'
  const Base64 = require('js-base64').Base64
  export default {

    data() {
      var validateOldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空'))
        }
        callback()
      }
      var validateNewPass = (rule, value, callback) => {
        var c
        var low = false
        var up = false
        var num = false
        var other = false
        for (var i = 0; i < value.length; i++) {
          c = value.charAt(i)
          if (c >= 'a' && c <= 'z') { low = true } else if (c >= 'A' && c <= 'Z') { low = true } else if (c >= '0' && c <= '9') { num = true } else { other = true }
        }
        var count = 0
        if (low) { count++ }
        if (up) { count++ }
        if (num) { count++ }
        if (other) { count++ }
        if (value === '') {
          callback(new Error(this.$t('modifyPasswordModal.inputNewPassword')))
        } else if (count < 2) {
          callback(new Error(this.$t('modifyPasswordModal.passwordzf')))
        } else if (value.length < 8) {
          callback(new Error(this.$t('modifyPasswordModal.passwordminLength')))
        }
        setTimeout(() => {
          if (value.length > 20) {
            callback(new Error(this.$t('modifyPasswordModal.passwordLength')))
          } else {
            callback()
          }
        }, 10)
      }
      var validateNewPass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('modifyPasswordModal.passwordWrong1')))
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error(this.$t('modifyPasswordModal.passwordWrong')))
        }
        setTimeout(() => {
          if (value.length > 20) {
            callback(new Error('The maximum password length is 20'))
          } else {
            callback()
          }
        }, 10)
      }
      return {
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkPass: '',
          msg: ''
        },
        rules: {
          oldPass: [
            { validator: validateOldPass, trigger: 'blur' }
          ],
          newPass: [
            { validator: validateNewPass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validateNewPass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm() {
        const newPass = Base64.encode(this.ruleForm.newPass)
        const oldPass = Base64.encode(this.ruleForm.oldPass)
        const jsonForm = JSON.stringify({ oldPwd: oldPass, newPwd: newPass })
        editPassword(jsonForm).then(res => {
          this.msg = res.errMessage
          if (this.msg === '此用户名不存在！') {
            this.$message({
              type: 'error',
              message: '此用户名不存在！'
            })
          }
            else if (this.msg === '旧密码输入错！') {
            this.$message({
              type: 'error',
              message: '旧密码输入错！'
            })
          }
            else {
            this.$message({
              type: 'success',
              message: 'modify successfully'
            })
          }
        }).catch(e => {
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .leftSpan{
    font-size: 14px;

  }
  .submitBtn{
    border:0px;
    background-color: #A50001 ;

  }
</style>
