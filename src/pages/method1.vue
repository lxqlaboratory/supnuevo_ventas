<template>
  <div>
    <el-form ref="form" :model="form" label-width="180px">
      <el-container>
        <el-aside style="width: 30%">
          <el-form-item label="公司经营范围" prop="type">
            <br>
            <el-checkbox-group v-model="form.type" @change="handleCheckedCitiesChange">
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
            </el-checkbox-group>
          </el-form-item>
        </el-aside >
        <el-main >
          <el-row>
            <el-col :span="10">
              <el-form-item label="用户昵称" disabled="disabled">
                <el-input v-model="form.nickName" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="公司法定名称">
                <el-input v-model="form.razon" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="公司别名">
                <el-input v-model="form.nombre" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="公司税号">
                <el-input v-model="form.cuit" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="与sos签订合同的合同号">
                <el-input v-model="form.contrato" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="合同有效期之起始日期">
                <el-input v-model="form.desde" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="合同有效期之截止日期">
                <el-input v-model="form.hasta" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="电子邮箱地址">
                <el-input v-model="form.email" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="网页地址">
                <el-input v-model="form.pagina" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="所在省" prop="pro">
                <el-select v-model="form.provinceId" placeholder="请选择省份" style="width: 100%;" clearable @change="changeQueryProvince">
                  <el-option v-for="(item,index) in provinceList" :key="item.id" :label="item.regionName" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="所在市" prop="city">
                <el-select v-model="form.cityId" placeholder="请选择城市" style="width: 100%;"clearable>
                  <el-option v-for="(item,index) in queryCityList" :key="item.id" :label="item.regionName" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="公司地址">
                <el-input v-model="form.direccion" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="经纬度">
                <!--longitude  latitude-->
                <el-input v-model="form.longitude" disabled="disabled" style="width: 49%"/>
                <el-input v-model="form.latitude" disabled="disabled" style="width: 48%"/>
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="固定电话号码(含区号)">
                <el-input v-model="form.telefono" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="公司主要联系人">
                <el-input v-model="form.principalContactos" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="公司所有者">
                <el-input v-model="form.ropietario" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="其他注释">
                <el-input v-model="form.observaciones" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="计划标志">
                <el-input v-model="form.name" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="计划名称">
                <el-input v-model="form.name" disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col style="float: right" :span="10">
              <el-form-item label="开始结束时间">
                <el-input v-model="form.name" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="空间大小">
                <el-input v-model="form.name" disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input v-model="form.name" type="textarea" />
          </el-form-item>
          <el-form-item label="公司送货范围">
            <el-table
              v-loading="listLoading"
              :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                label="送货地区(省)"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.alarmId }}
                </template>
              </el-table-column>
              <el-table-column
                label="送货地区(市)"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.cardId }}
                </template>
              </el-table-column>
              <el-table-column
                label="最小订单量"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.alarmContent }}
                </template>
              </el-table-column>
              <el-table-column
                label="送货费"
                align="center"
                min-width="160"
              >
                <template slot-scope="scope">
                  {{ scope.row.alarmTime }}
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="160" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="deleteContent(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--保存-->
            <div>
              <el-dialog title="保存" :visible.sync="dialogSaveFormVisible" width="500px">
                <el-form ref="savelist" :model="savelist" :rules="rules" label-position="left" label-width="140px" style="width: 400px">
                  <el-form-item label="送货地区(省):" prop="cardId">
                    <el-select v-model="province" placeholder="请选择省份" style="width: 80%;">
                      <el-option v-for="item in provinceList" :key="item.id" :label="item.name" :value="item.name" />
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item label="送货地区(市):" prop="alarmContent">
                    <el-select v-model="province" placeholder="请选择省份" style="width: 80%;">
                      <el-option v-for="item in queryCityList" :key="item.id" :label="item.name" :value="item.name" />
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item label="最小订单量:" prop="X">
                    <el-input v-model="savelist.X" style="width: 80%" />
                  </el-form-item>
                  <br>
                  <el-form-item label="送货费:" prop="X">
                    <el-input v-model="savelist.X" style="width: 80%" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogSaveFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="saveAlarmList('savelist')">确 定</el-button>
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
            <el-button type="primary" @click="openSave()">新增送货范围</el-button>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-main>
      </el-container>
    </el-form>
  </div>
</template>

<script>
  import  {getSupnuevoVentasInfoFormByVentasIdWeb } from '../api/api'
  export default {

    data() {
      return {
        dialogFormVisible: false,
        dialogSaveFormVisible: false,
        province: '',
        city: '',
        provinceList: [],
        queryCityList: [],
        listLoading: false,
        pageSize: 10, // 每页的数据条数
        currentPage: 1, // 默认开始页面
        data: [],
        list: [],
        form: {
          type: [],
          name: '',
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
        editlist: {
          alarmId: '',
          cardId: '',
          alarmContent: '',
          X: '',
          Y: '',
          alarmTime: ''
        },
        savelist: {
          cardId: '',
          alarmContent: '',
          X: '',
          Y: '',
          alarmTime: ''
        },
        rules: {
          cardId: [
            { required: true, message: '请选择送货省份', trigger: 'blur' }
          ],
          alarmContent: [
            { required: true, message: '请选择送货地市', trigger: 'blur' }
          ],
          X: [
            { required: true, message: '请输入最小订单量', trigger: 'blur' }
          ],
          Y: [
            { required: true, message: '请输入送货费', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      'tableList': function() {
        return this.list.filter(item => {
          return true
        })
      }
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
      // 加载省元数据
      getProvince() {
        getSystemRegions(0).then(response => {
          this.provinceList = response.data.provinceName
        })
      },
      // 改变省
      changeQueryProvince() {
        this.from.cityId = ''
        this.from.regionId = ''
        this.queryRegionList = []
        if (this.from.provinceId) {
          getSystemRegions(this.from.provinceId).then(response => {
            this.queryCityList = response.data.cityName
          })
        } else {
          this.queryCityList = []
        }
      },
      openSave() {
        this.dialogSaveFormVisible = true
      },
      saveAlarmList(formName) {
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
      },
      fetchData() {
        // this.listLoading = true
        getSupnuevoVentasInfoFormByVentasIdWeb().then(response => {
          this.list = response.dataMap
        })
        // this.listLoading = false
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
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
      }
    }
  }
</script>
<style>
</style>
