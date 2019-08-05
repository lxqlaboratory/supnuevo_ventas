<template>
  <div>
    <el-form ref="form" :model="form" label-width="130px">
      <el-container>
        <el-aside style="width: 30%">
          <el-form-item label="公司经营范围" prop="type">
            <br>
            <el-checkbox-group v-model="rubroIdList" @change="handleCheckedCitiesChange">
<!--              <el-checkbox v-for="item in systemRubroList" :key="item.filterKey" :label="item.label" >{{item.label}}</el-checkbox>-->
              <br>
              <el-checkbox label="1" name="type">ALMACEN</el-checkbox>
              <br>
              <el-checkbox label="2" name="type">BAZAR</el-checkbox>
              <br>
              <el-checkbox label="3" name="type">BEBIDAS CON ALCOHOL</el-checkbox>
              <br>
              <el-checkbox label="4" name="type">BEBIDAS SIN ALCOHOL</el-checkbox>
              <br>
              <el-checkbox label="5" name="type">FIAMBRERIA</el-checkbox>
              <br>
              <el-checkbox label="6" name="type">KIO SKO</el-checkbox>
              <br>
              <el-checkbox label="7" name="type">LACTEOS</el-checkbox>
              <br>
              <el-checkbox label="8" name="type">LIMPIEZA</el-checkbox>
              <br>
              <el-checkbox label="9" name="type">MASCOTAS</el-checkbox>
              <br>
              <el-checkbox label="10" name="type">OTRAS</el-checkbox>
              <br>
              <el-checkbox label="11" name="type">PERFUMERIA</el-checkbox>
              <br>
              <br>
            </el-checkbox-group>
          </el-form-item>
<!--照片上传-->
          <div>
            <el-form-item label="图片">
           <!--<el-upload
              class="avatar-uploader"
              action="http://localhost/supnuevo_ventas/ventas/uploadSupnuevoVentasPhotoImageWeb"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
            <fileupload url="/ventas/uploadSupnuevoVentasPhotoImageWeb"
                        accepttype=".jpg,.jpeg,.png"
                        @successcallback="onSuccess"
                        @preview="onPreview"
                        remarks="只能上传.pdf文件"
            >上传文件
            </fileupload>
            </el-form-item>
          </div>

        </el-aside >
        <el-main >
          <el-row>
            <el-col :span="10">
              <el-form-item label="用户昵称" disabled="disabled">
                <el-input v-model="nickName" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="公司法定名称" prop="razon">
                <el-input v-model="razon" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="公司别名" prop="nombre">
                <el-input v-model="nombre" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="公司税号">
                <el-input v-model="cuit" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="与sos签订合同的合同号">
                <el-input v-model="contrato" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="合同有效期之起始日期">
                <el-date-picker v-model="desde" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="合同有效期之截止日期">
                <el-input v-model="hasta" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="电子邮箱地址">
                <el-input v-model="email" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="网页地址">
                <el-input v-model="pagina" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="所在省" prop="pro">
                <el-select v-model="provinceId" placeholder="请选择省份" style="width: 100%;" clearable @change="getValue">
                  <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="所在市" prop="city">
                <el-select v-model="cityId" placeholder="请选择城市" style="width: 100%;"clearable>
                  <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="公司地址">
                <el-input v-model="direccion" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="经纬度">
                <!--longitude  latitude-->
                <el-input v-model="longitude" disabled="disabled" style="width: 49%"/>
                <el-input v-model="latitude" disabled="disabled" style="width: 48%"/>
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="固定电话号码(含区号)">
                <el-input v-model="telefono" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="公司主要联系人">
                <el-input v-model="principalContactos" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="公司所有者">
                <el-input v-model="ropietario" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="其他注释">
                <el-input v-model="observaciones" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="计划标志">
                <el-input v-model="planNum" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="计划名称">
                <el-input v-model="planName" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="12">
              <el-form-item label="开始结束时间">
                <el-input v-model="planStartEndDate" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="空间大小">
                <el-input v-model="commodityCount" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input v-model="nota" type="textarea" />
          </el-form-item>
          <el-form-item label="公司送货范围">
<!--            <el-input v-model="deliverDes" disabled="disabled" />-->
            <el-table
              v-loading="listLoading"
              :data="itemList"
              strip
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
              style="margin-top:10px"
              size="mini"
            >
              <el-table-column align="center" label="ID" min-width="160" v-if="show">
                <template slot-scope="scope">
                  {{ scope.$index+1 }}
                </template>
              </el-table-column>
              <el-table-column
                label="配送号"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.deliverId }}
                </template>
              </el-table-column>
              <el-table-column
                label="送货地区(省)"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.provinceName }}
                </template>
              </el-table-column>
              <el-table-column
                label="送货地区(市)"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.cityName }}
                </template>
              </el-table-column>
              <el-table-column
                label="最小订单量"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.minAmount }}
                </template>
              </el-table-column>
              <el-table-column
                label="送货费"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.deliverFee }}
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="160" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="openEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" @click="deleteContent(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--修改-->
            <div>
              <el-dialog title="编辑修改" :visible.sync="dialogEditFormVisible" width="500px">
                <el-form ref="createList" :model="createList" :rules="rules" label-position="left" label-width="140px" style="width: 400px">
                  <el-form-item label="送货地区(省):" prop="cardId">
                    <el-select v-model="editlist.provinceName" placeholder="请选择省份" style="width: 80%;" @change="getEditValue">
                      <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item label="送货地区(市):" prop="alarmContent">
                    <el-select v-model="editlist.cityName" placeholder="请选择市" style="width: 80%;" @click="getEditValue1">
                      <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item label="最小订单量:" prop="X">
                    <el-input v-model="editlist.minAmount" style="width: 80%" />
                  </el-form-item>
                  <br>
                  <el-form-item label="送货费:" prop="X">
                    <el-input v-model="editlist.deliverFee" style="width: 80%" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="editCancel">取 消</el-button>
                  <el-button type="primary" @click="editRouterList('editlist')">确 定</el-button>
                </div>
              </el-dialog>
            </div>

            <!--新建-->
            <div>
              <el-dialog title="新建" :visible.sync="dialogCreateFormVisible" width="500px">
                <el-form ref="createList" :model="createList" :rules="rules" label-position="left" label-width="140px" style="width: 400px">
                  <el-form-item label="送货地区(省):" prop="cardId">
                    <el-select v-model="createList.provinceName" placeholder="请选择省份" style="width: 80%;" @change="getCreateValue">
                      <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item label="送货地区(市):" prop="alarmContent">
                    <el-select v-model="createList.cityName" placeholder="请选择市" style="width: 80%;">
                      <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item label="最小订单量:" prop="X">
                    <el-input v-model="createList.minAmount" style="width: 80%" />
                  </el-form-item>
                  <br>
                  <el-form-item label="送货费:" prop="X">
                    <el-input v-model="createList.deliverFee" style="width: 80%" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogCreateFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="createRouterList('createList')">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <!--分页-->
            <div class="block" style="float: right">
              <el-pagination
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableList.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createSave()">新增送货范围</el-button>
            <el-button type="primary" @click="onSubmit">保存修改</el-button>
          </el-form-item>
        </el-main>
      </el-container>
    </el-form>
  </div>

</template>

<script>
  import  {getSupnuevoVentasInfoFormByVentasIdWeb,getCityInfoListOfProvinceWeb,editDeliverGoodWeb,createDeliverGoodWeb,deleteDeliverGoodWeb,updateSupnuevoVentasInfoAndRubroList,uploadSupnuevoVentasPhotoImageWeb } from '../api/api'
  import  fileupload  from '../api/fileupload.vue'
  export default {

    data() {
      return {
        imageUrl: '',
        editlist: {
          deliverId:'',
          provinceId100:'',
          provinceName:'',
          cityId:'',
          cityName:'',
          minAmount:'',
          deliverFee:''
        },
        createList:{
          deliverId:'',
          provinceId100:'',
          provinceName:'',
          cityId:'',
          cityName:'',
          minAmount:'',
          deliverFee:''
        },
        razon: '',
        provinceList:'',
        provinceList1:[],
        cityList:'',
        cityList1:[],
        rubroIdList:[],
        commodityCount:'',
        longitude:'',
        latitude:'',
        nickName:'',
        planStartEndDate:'',
        planName:'',
        planNum:'',
        observaciones: '',
        deliverDes: '',
        nombre: '',
        cuit: '',
        contrato: '',
        desde: '',
        hasta: '',
        email: '',
        pagina: '',
        direccion:'',
        nota:'',
        telefono: '',
        principalContactos: '',
        ropietario: ' ',
        provinceId: '',
        cityId: '',
        cityId1: '',
        itemList:[],
        dialogEditFormVisible: false,
        dialogCreateFormVisible: false,
        dialogSaveFormVisible: false,
        province: '',
        province1:'',
        city: '',
        queryCityList: [],
        listLoading: false,
        pageSize: 10, // 每页的数据条数
        currentPage: 1, // 默认开始页面
        data: [],
        list: [],
        form: {
          type: [],
          name: '',
          nota:'',
          nickName: '',
          razon: '',
          nombre: '',
          cuit: '',
          contrato: '',
          desde: '',
          hasta: '',
          email: '',
          pagina: '',
          telefono: '',
          principalContactos: '',
          ropietario: ' ',
          provinceId: '',
          cityId: ''
        },

        savelist: {
          cardId: '',
          alarmContent: '',
          X: '',
          Y: '',
          alarmTime: ''
        },
        rules: {
          provinceName: [
            { required: true, message: '请选择送货省份', trigger: 'blur' }
          ],
          cityName: [
            { required: true, message: '请选择送货地市', trigger: 'blur' }
          ],
          minAmount: [
            { required: true, message: '请输入最小订单量', trigger: 'blur' }
          ],
          deliverFee: [
            { required: true, message: '请输入送货费', trigger: 'blur' }
          ]
        },
      }
    },
    computed: {
      'tableList': function() {
        return this.list.filter(item => {
          return true
        })
      }
    },
    components:{
      fileupload
    },

    created() {
      this.show = false
      // var test1 = '8'
      // this.form.type[0] = test1
      this.fetchData()
      // this.getProvince()
    },
    mounted() {
      // this.getPro()
      // this.getCity()
    },
    methods: {
      onPreview:function(file){
        console.log(file)
        //window.location.href = file.response.url
      },
      onSuccess(res,file){
        console.log(res)
        console.log(file)
        this.degreeAttachId =  res.data.degreeAttachId
        this.showDownloadBtn = !this.showDownloadBtn;
        /*if(res.code === 0){
          alert(111)
        }*/
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        this.$emit('preview',file)
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      editCancel(){
        this.dialogEditFormVisible = false
        this.fetchData()
      },
      editRouterList(formName) {
        //alert (this.editlist.cityName)
        // this.$refs[formName].validate((valid) => {
        //   alert('-------')
        //   if (valid) {
            this.dialogEditFormVisible = false
            editDeliverGoodWeb(this.editlist.deliverId, this.editlist.provinceName,
              this.editlist.cityName, this.editlist.minAmount
              , this.editlist.deliverFee).then(res => {
              if (res.re === 1) {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
                this.fetchData()
              } else {
                this.$message.error('更新失败')
              }
            })
      },
      createRouterList(formName) {
        //alert (this.editlist.cityName)
        // this.$refs[formName].validate((valid) => {
        //   alert('-------')
        //   if (valid) {
        this.dialogCreateFormVisible = false
        createDeliverGoodWeb(this.createList.deliverId, this.createList.provinceName,
          this.createList.cityName, this.createList.minAmount
          , this.createList.deliverFee).then(res => {
          if (res.re === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message.error('添加失败')
          }
        })
      },
      openEdit(item) {
        this.editlist = item
        this.dialogEditFormVisible = true
      },
      createSave() {
        this.dialogCreateFormVisible = true
      },
/*      saveAlarmList(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogSaveFormVisible = false
            saveAlarm(this.savelist.cardId,
              this.savelist.alarmContent, this.savelist.X
              , this.savelist.Y, this.savelist.alarmTime).then(res => {
              console.log(res)
              if (res.re === 1) {
                this.$refs[formName].resetFields()
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
              } else {
                this.$message.error('保存失败')
              }
              this.fetchData()
            }).catch(e => {
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },*/
      fetchData() {
        getSupnuevoVentasInfoFormByVentasIdWeb().then(response => {
          this.razon = response.data.form.razon
          this.nota = response.data.form.nota
          this.nombre = response.data.form.nombre
          this.cuit = response.data.form.cuit
          this.contrato = response.data.form.contrato
          this.desde = response.data.form.desde
          this.hasta = response.data.form.hasta
          this.email = response.data.form.email
          this.pagina = response.data.form.pagina
          this.direccion = response.data.form.direccion
          this.ropietario = response.data.form.ropietario
          this.deliverDes = response.data.form.deliverDes
          this.observaciones = response.data.form.observaciones
          this.planStartEndDate = response.data.form.planStartEndDate
          this.planNum = response.data.form.planNum
          this.planName = response.data.form.planName
          this.provinceId = response.data.form.provinceName
          this.cityId = response.data.form.cityName
          this.principalContactos = response.data.form.principalContactos
          this.itemList = response.data.form.itemList
          this.nickName = response.data.form.nickName
          this.longitude = response.data.form.longitude
          this.latitude = response.data.form.latitude
          this.telefono = response.data.form.telefono
          this.commodityCount = response.data.form.commodityCount
          this.systemRubroList = response.data.form.systemRubroList
          this.provinceList = response.data.provinceList
          this.provinceList1 = response.data.provinceList
          this.rubroIdList = response.data.form.rubroIdList
          // alert(this.rubroIdList)
          var i =0
          for (i;i<response.data.form.rubroIdList.length;i++){
            this.rubroIdList[i]=response.data.form.rubroIdList[i]+''
          }
        })
        // this.listLoading = false
      },

      getEditValue: function(vId) {
        this.editlist.cityName = ''
        let obj = {};
        obj = this.provinceList.find((item)=>{
          return item.value === vId;
        })
        this.province = obj.value
        getCityInfoListOfProvinceWeb(obj.value).then(response => {
          this.cityList = response.data
        })
      },
      getEditValue1: function(vId) {
        let obj = {};
        obj = this.provinceList.find((item)=>{
          return item.value === vId;
        })
        this.province = obj.value
        getCityInfoListOfProvinceWeb(obj.value).then(response => {
          this.cityList = response.data
        })
      },
      getCreateValue: function(vId) {
        this.createList.cityName = ''
        let obj = {};
        obj = this.provinceList.find((item)=>{
          return item.value === vId;
        })
        this.province = obj.value
        getCityInfoListOfProvinceWeb(obj.value).then(response => {
          this.cityList = response.data
        })
      },
      getValue: function(vId) {
        this.cityList = ''
        this.cityId=''
        let obj = {};
        obj = this.provinceList.find((item)=>{
          return item.value === vId;
        })
        this.province = obj.value
        getCityInfoListOfProvinceWeb(obj.value).then(response => {
          this.cityList = response.data
        })
      },
      getValue1: function(vId) {
        this.cityList1 = ''
        this.cityId1=''
        let obj = {};
        obj = this.provinceList1.find((item)=>{
          return item.value === vId;
        })
        this.province1 = obj.value
        getCityInfoListOfProvinceWeb(obj.value).then(response => {
          this.cityList1 = response.data
        })
      },
     deleteContent(item) {
        this.editlist = item
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDeliverGoodWeb(this.editlist.deliverId).then(res => {
            if (res.re === 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.fetchData()
            } else {
              this.$message.error('删除失败')
            }
          }).catch(e => {

          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 0) {
          return 'th'
        }
        return ''
      },
      handleSizeChange: function(size) {
        this.pageSize = size
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage = currentPage
      },
      onSubmit() {
        updateSupnuevoVentasInfoAndRubroList(this.ventasId,this.rubroIdList,this.nombre,this.email,this.pagina,this.cityId,this.direccion,this.telefono,this.principalContactos,this.observaciones,this.nota).then(response => {
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message.error('保存失败')
          }
        })
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
