<template>
  <div>
    <el-form ref="form" :model="form" label-width="160px">
      <el-container>

        <el-main >
          <el-row>
            <el-col style="margin-top: -15px;"   :span="10" offset="2">
              <el-form-item :label="$t('hh.nickName')" disabled="disabled" >
                <el-input  v-model="nickName" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right;margin-top: -15px;" :span="10">
              <el-form-item :label="$t('hh.razon')" prop="razon">
                <el-input v-model="razon" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;" :span="10" offset="2">
              <el-form-item :label="$t('hh.nombre')" prop="nombre">
                <el-input v-model="nombre" />
              </el-form-item>
            </el-col>
            <el-col style="float: right;margin-top: -20px;" :span="10">
              <el-form-item :label="$t('hh.cuit')">
                <el-input v-model="cuit" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;"  :span="10" offset="2">
              <el-form-item :label="$t('hh.contrato')">
                <el-input v-model="contrato" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right;margin-top: -20px;"  :span="10">
              <el-form-item :label="$t('hh.desde')">
                <el-date-picker style="width: 100%" v-model="desde" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;" :span="10" offset="2">
              <el-form-item :label="$t('hh.hasta')">
                <el-date-picker style="width: 100%" v-model="hasta" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right;margin-top: -20px;"  :span="10">
              <el-form-item :label="$t('hh.email')">
                <el-input v-model="email" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;"  :span="10" offset="2">
              <el-form-item :label="$t('hh.pagina')">
                <el-input v-model="pagina" />
              </el-form-item>
            </el-col>
            <el-col style="float: right;margin-top: -20px;" :span="10">
              <el-form-item :label="$t('hh.provinceId')" prop="pro">
                <el-select v-model="provinceId" style="width: 100%;" clearable @change="getValue" :placeholder="$t('PRODUCTO.select')">
                  <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;"  :span="10" offset="2">
              <el-form-item :label="$t('hh.cityId')"  prop="city">
                <el-select v-model="cityId" style="width: 100%;"clearable :placeholder="$t('PRODUCTO.select')">
                  <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="float: right;margin-top: -20px;"  :span="10">
              <el-form-item :label="$t('hh.direccion')">
                <el-input v-model="direccion" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;"  :span="10" offset="2">
              <el-form-item :label="$t('hh.longitude')">
                <!--longitude  latitude-->
                <el-input v-model="longitude" disabled="disabled" style="width: 49%"/>
                <el-input v-model="latitude" disabled="disabled" style="width: 48%"/>
              </el-form-item>
            </el-col>
            <el-col style="float: right;margin-top: -20px;"  :span="10">
              <el-form-item :label="$t('hh.telefono')">
                <el-input v-model="telefono" @keyup.native="proving1" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;"  :span="10" offset="2">
              <el-form-item :label="$t('hh.principalContactos')">
                <el-input v-model="principalContactos" />
              </el-form-item>
            </el-col>
            <el-col style="float: right;margin-top: -20px;"  :span="10">
              <el-form-item :label="$t('hh.ropietario')">
                <el-input v-model="ropietario" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;"  :span="10" offset="2">
              <el-form-item :label="$t('hh.observaciones')">
                <el-input v-model="observaciones" />
              </el-form-item>
            </el-col>
            <el-col style="float: right;margin-top: -20px;"  :span="10">
              <el-form-item :label="$t('hh.planNum')">
                <el-input v-model="planNum" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;" :span="10" offset="2">
              <el-form-item :label="$t('hh.planName')">
                <el-input v-model="planName" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right;margin-top: -20px;"  :span="10">
              <el-form-item :label="$t('hh.planStartEndDate')">
                <el-input v-model="planStartEndDate" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;" :span="10" offset="2">
              <el-form-item :label="$t('hh.commodityCount')">
                <el-input v-model="commodityCount" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-top: -20px;margin-bottom: -20px" :span="22" offset="2">
              <el-form-item :label="$t('hh.nota')" offset="2">
                <el-input v-model="nota" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="$t('hh.gsshfw')"  style="margin-top: 0px;" >
            <el-table
              v-loading="listLoading"
              :data="itemList"
              strip
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
              style="margin-top:3px"
              size="mini"
            >
              <!--           <el-table-column align="center" label="ID" min-width="160" v-if="show">
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
                         </el-table-column>-->
              <el-table-column
                :label="$t('hh.provinceName')"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.provinceName }}
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('hh.cityName')"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.cityName }}
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('hh.minAmount')"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.minAmount }}
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('hh.deliverFee')"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.deliverFee }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('hh.operation')" min-width="160" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="openEdit(scope.row)">{{$t('operation.modify')}}</el-button>
                  <el-button size="mini" @click="deleteContent(scope.row)">{{$t('operation.delete')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--修改-->
            <div>
              <el-dialog title="编辑修改" :visible.sync="dialogEditFormVisible" width="500px">
                <el-form ref="editlist" :model="editlist" :rules="rules" label-position="left" label-width="140px" style="width: 400px">
                  <el-form-item  :label="$t('hh.provinceName')" prop="cardId">
                    <el-select v-model="editlist.provinceName" style="width: 80%;" @change="getEditValue" :placeholder="$t('PRODUCTO.select')">
                      <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item  :label="$t('hh.cityName')" prop="alarmContent">
                    <el-select v-model="editlist.cityName" style="width: 80%;" @click="getEditValue1" :placeholder="$t('PRODUCTO.select')">
                      <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item  :label="$t('hh.minAmount')" prop="X">
                    <el-input v-model="editlist.minAmount" style="width: 80%" />
                  </el-form-item>
                  <br>
                  <el-form-item :label="$t('hh.deliverFee')" prop="X">
                    <el-input v-model="editlist.deliverFee" style="width: 80%" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="editCancel">{{$t('operation.cancel')}}</el-button>
                  <el-button type="primary" @click="editRouterList('editlist')">{{$t('operation.ok')}}</el-button>
                </div>
              </el-dialog>
            </div>

            <!--新建-->
            <div>
              <el-dialog title="新建" :visible.sync="dialogCreateFormVisible" width="500px">
                <el-form ref="createList" :model="createList" :rules="rules" label-position="left" label-width="140px" style="width: 400px">
                  <el-form-item :label="$t('hh.provinceName')" prop="cardId">
                    <el-select v-model="createList.provinceName"  style="width: 80%;" @change="getCreateValue" :placeholder="$t('PRODUCTO.select')">
                      <el-option v-for="item in provinceList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item :label="$t('hh.cityName')" prop="alarmContent">
                    <el-select v-model="createList.cityName" style="width: 80%;" :placeholder="$t('PRODUCTO.select')">
                      <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item :label="$t('hh.minAmount')" prop="X">
                    <el-input v-model="createList.minAmount" style="width: 80%" @keyup.native="proving1"  />
                  </el-form-item>
                  <br>
                  <el-form-item :label="$t('hh.deliverFee')" prop="X">
                    <el-input v-model="createList.deliverFee" style="width: 80%" @keyup.native="proving1" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogCreateFormVisible = false">{{$t('operation.cancel')}}</el-button>
                  <el-button type="primary" @click="createRouterList('createList')">{{$t('operation.ok')}}</el-button>
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
          <el-form-item style="margin-top: -40px;margin-left: 200px;">
            <el-button type="primary" @click="createSave()">{{$t('operation.add')}}</el-button>
            <!--            <el-button type="primary" @click="onSubmit">保存修改</el-button>-->
          </el-form-item>
        </el-main>
        <el-aside style="width: 30%">
          <el-form-item :label="$t('hh.rubro')" prop="type">
            <br>
            <el-checkbox-group v-model="rubroIdList" @change="handleCheckedCitiesChange">
              <!--              <el-checkbox v-for="item in systemRubroList" :key="item.filterKey" :label="item.label" >{{item.label}}</el-checkbox>-->
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
          <div style="margin-top: -40px;">
            <el-form-item :label="$t('hh.upload')">
              <img v-if="show" :src=src1  height="120" align="middle" border="0"  alt="ERROR AL ABRIR EL ARCHIVO">
              <el-upload v-else
                         class="avatar-uploader"
                         action="/supnuevo_ventas/ventas/uploadSupnuevoVentasPhotoImageWeb"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            </el-form-item>
            <el-form-item>
            </el-form-item>
            <el-form-item style="margin-top: -30px;">
              <el-button type="primary" @click="onSubmit">{{$t('operation.modify')}}</el-button>
            </el-form-item>
          </div>
        </el-aside >
      </el-container>
    </el-form>
  </div>

</template>

<script>
  import  {getSupnuevoVentasInfoFormByVentasIdWeb,getCityInfoListOfProvinceWeb,editDeliverGoodWeb,createDeliverGoodWeb,deleteDeliverGoodWeb,updateSupnuevoVentasInfoAndRubroList,uploadSupnuevoVentasPhotoImageWeb,getSupnuevoVentasPromptInfoObjectListWeb,getAttachImageDataByAttachIdWeb,getTempBuffedBytesDataWeb } from '../api/api'
  import  fileupload  from '../api/fileupload.vue'
  import global from '../components/Global'
  export default {

    data() {
      return {
        show: 'false',
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
        provinceList:[],
        provinceList1:[],
        cityList:[],
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
        attachId:'',
        attachIds:'',
        dataKey:'',
        fileload:'',
        src1:''
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
      proving1(){
        this.telefono=this.telefono.replace(/[^\.\d]/g,'');
        this.telefono=this.telefono.replace('.','');
        this.createList.minAmount=this.createList.minAmount.replace(/[^\.\d]/g,'');
        this.createList.minAmount=this.createList.minAmount.replace('.','');
        this.createList.deliverFee=this.createList.deliverFee.replace(/[^\.\d]/g,'');
        this.createList.deliverFee=this.createList.deliverFee.replace('.','');
      },
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
          this.$message.error('ERROR. SOLO FORMATO JPG');//上传头像图片只能是 JPG 格式
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
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
        editDeliverGoodWeb(this.editlist.deliverId, this.editlist.provinceId+'',
          this.editlist.cityId+'', this.editlist.minAmount
          , this.editlist.deliverFee).then(res => {
          if (res.re === 1) {
            this.$message({
              message: '¡CAMBIO EXITOSO!',//更新成功 修改成功
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message.error('NO SE HA PODIDO CAMBIAR (CAMBIO SIN EXITO)') // 更新失败  修改失败
          }
        }).catch(e => {

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
              message: 'AGREGADO CON EXITO!',//添加成功
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message.error('NO SE HA PODIDO AGREGAR') //添加失败
          }
        }).catch(e => {

        })
      },
      openEdit(item) {
        this.editlist = item
        this.dialogEditFormVisible = true
      },
      createSave() {
        this.createList.provinceName=''
        this.createList.cityName=''
        this.createList.minAmount=''
        this.createList.deliverFee=''
        this.dialogCreateFormVisible = true
      },
      fetchData() {
        getSupnuevoVentasPromptInfoObjectListWeb().then(response => {
          this.province =  response.data
        }).catch(e => {

        }),
          getSupnuevoVentasInfoFormByVentasIdWeb().then(response => {
            this.attachId = response.data.form.attachId
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
            // this.provinceId = response.data.form.provinceName
            // this.cityId = response.data.form.cityName
            this.principalContactos = response.data.form.principalContactos
            this.itemList = response.data.form.itemList //送货列表
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
            for (i = 0; i < this.provinceList.length; i++) {
              if ((response.data.form.provinceId) == this.provinceList[i].value) {
                this.provinceId = this.provinceList[i].value
              }
            }
            getCityInfoListOfProvinceWeb((response.data.form.provinceId)+"").then(response1 => {
              this.cityList = response1.data
              for (i = 0; i < this.cityList.length; i++) {
                if (((response.data.form.cityId) == this.cityList[i].value) ){
                  this.cityId = this.cityList[i].value
                }
              }
            }).catch(e => {

            }),
              getAttachImageDataByAttachIdWeb((response.data.form.attachIds)+'').then(response2 => {
                this.dataKey =  response2.data
                console.log(response.data.form.attachIds)
                console.log(this.dataKey)
                this.src1 = global.address+'ventas/getTempBuffedBytesDataWeb?dataKey='+this.dataKey
                if(this.dataKey == null){
                  this.show = false
                }else{
                  this.show = true
                }
                /*      console.log(response2.data+'--response2.data=')
                      getTempBuffedBytesDataWeb((this.dataKey)+'').then(response3 => {
                        this.fileload = response3.data
                      })*/
              }).catch(e => {

              })

          }).catch(e => {

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
        }).catch(e => {

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
        }).catch(e => {

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
        }).catch(e => {

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
        }).catch(e => {

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
        }).catch(e => {

        })
      },
      deleteContent(item) {
        this.editlist = item
        this.$confirm('UNA VEZ ELIMINADO EL PLAN NO PUEDE VOLVER ATRAS. ESTAS SEGURO?', '提示', { //删除后不能回复，确认要删除吗
          confirmButtonText: 'ACEPTAR',   //确定
          cancelButtonText: 'CANCELAR',   // 取消
          type: 'warning'
        }).then(() => {
          deleteDeliverGoodWeb(this.editlist.deliverId).then(res => {
            if (res.re === 1) {
              this.$message({
                message: 'ELIMINADO CON EXITO!',   //删除成功
                type: 'success'
              })
              this.fetchData()
            } else {
              this.$message.error('ELIMINACION SIN EXITO') //删除失败
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
        updateSupnuevoVentasInfoAndRubroList(this.ventasId+'',this.rubroIdList,this.nombre+'',this.email+'',this.pagina+'',this.cityId+'',this.direccion+'',this.telefono+'',this.principalContactos+'',this.observaciones+'',this.nota).then(response => {
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '¡GUARDADO CON EXITO!',  //保存成功
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message.error('保存失败')
          }
        }).catch(e => {

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
