<template>
  <div style="padding:0px;">
    <el-container>
      <el-aside style="height: 60%" >
        <el-form label-width="80px"><br>
          <el-form-item  prop="planNum" :label="$t('spgm.planNum')">
            <el-select v-model="planNum" @change="getValue" style="width: 100% " :placeholder="$t('PRODUCTO.select')">
              <el-option v-for="item in list2" :key="item.planId" :label="item.planNum" :value="item.planId"/>
            </el-select>
          </el-form-item>
          <el-form-item prop="planName" v-model="planName" :label="$t('spgm.planName')">
            <el-input v-model="planName" disabled/>
          </el-form-item>
          <el-form-item  prop="commodityCount" :label="$t('spgm.supnuevoZoom')">
            <el-input v-model="commodityCount" disabled/>
          </el-form-item>
          <el-form-item prop="startDate" :label="$t('spgm.startDate')">
            <el-input v-model="nowTime" disabled/>
          </el-form-item>
          <el-form-item prop="endDate" :label="$t('spgm.endDate')">
            <el-input v-model="endTime" disabled/>
          </el-form-item>
          <el-form-item prop="rentFee" :label="$t('spgm.rentFee')">
            <el-input v-model="rentFee" disabled/>
          </el-form-item>
          <el-form-item prop="dayFee" :label="$t('spgm.dayFee')">
            <el-input v-model="dayFee" disabled/>
          </el-form-item>
          <el-form-item  :label="$t('spgm.rentFeeBalance')">
            <el-input v-model="rentFeeBalance" disabled/>
          </el-form-item>
          <el-form-item  :label="$t('spgm.count')">
            <el-input v-model="commodityCount_size" disabled/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="buyPlanOfVentas">{{$t('spgm.buy')}}</el-button>
          </el-form-item>
          <el-dialog
            title="日志信息"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            style="margin-left: 0px;"
          >
            <el-form label-width="120px">
              <el-form-item  prop="logTimeStr" :label="$t('spgm.logTimeLabel')">
                <el-input v-model="logTimeStr"  disabled/>
              </el-form-item>
              <el-form-item prop="ventasId" :label="$t('spgm.ventasIdLabel')">
                <el-input v-model="ventasId" disabled/>
              </el-form-item>
              <el-form-item  prop="logType" :label="$t('spgm.logTypeLabel')">
                <el-input v-model="logTypeStr" disabled/>
              </el-form-item>
              <el-form-item  prop="planInfo" :label="$t('spgm.planInfoLabel')">
                <el-input v-model="planInfo" disabled/>
              </el-form-item>
              <el-form-item prop="oldPlanInfo" :label="$t('spgm.oldPlanInfoLabel')">
                <el-input v-model="oldPlanInfo" disabled/>
              </el-form-item>
              <el-form-item prop="rentFee" :label="$t('spgm.addFeeLabel')">
                <el-input v-model="total" disabled/>
              </el-form-item>
              <el-form-item prop="dayFee" :label="$t('spgm.addFeeTypeLabel')">
                <el-input v-model="addFeeTypeStr" disabled/>
              </el-form-item>
              <el-form-item :label="$t('spgm.returnFeeLabel')">
                <el-input v-model="oldBalance" disabled/>
              </el-form-item>
              <el-form-item :label="$t('spgm.returnFeeTypeLabel')">
                <el-input v-model="returnFeeTypeStr" disabled/>
              </el-form-item>
              <div style="text-align: center">
                <el-button @click="addPlanToVentas">{{$t('operation.ok')}}</el-button>
                <el-button @click="dialogVisible = false">{{$t('operation.cancel')}}</el-button>
              </div>
            </el-form>
          </el-dialog>
          <el-dialog
            title="AGREGADO CON EXITO!"
            :visible.sync="innerVisible"
            width="30%"
            :before-close="handleClose"
          >
            AGREGADO CON EXITO!
            <span slot="footer" class="dialog-footer">
              <el-button @click="innerVisible = false;dialogVisible = false">{{$t('operation.ok')}}</el-button>
              <el-button @click="innerVisible = false;dialogVisible = false">帮助</el-button>
            </span>
          </el-dialog>
        </el-form>
      </el-aside>
      <el-main style="margin-left: 30px;width: 1000px;">
        <el-table
          style="overflow:visible"
          id="out-table"
          border
          v-loading="listLoading"
          :data="workPlanList"
          strip
          element-loading-text="Loading"
          fit
          highlight-current-row
        >
          <el-table-column
            sortable
            align="center"
            :label="$t('spgm.no')"
          >
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="planNum"
            :label="$t('spgm.planNum')"
            align="center"/>
          <el-table-column
            prop="planName"
            :label="$t('spgm.planName')"
            align="center"/>
          <el-table-column
            prop="commodityModeStr"
            :label="$t('spgm.planType')"
            align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('spgm.createTime')"
            align="center"
            min-width="100px">
            <template slot-scope="scope">
              {{ scope.row.createTimeStr}}
            </template>
          </el-table-column>
          <el-table-column
            prop="commodityCount"
            :label="$t('spgm.count')"
            align="center"/>
          <el-table-column
            :label="$t('spgm.startDate1')"
            align="center"
            min-width="100px"
          >
            <template slot-scope="scope">
              {{ scope.row.startDateStr|formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('spgm.endDate1')"
            align="center"
            min-width="100px"
          >
            <template slot-scope="scope">
              {{ scope.row.endDateStr|formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="rentFee"
            :label="$t('spgm.rentFee')"
            align="center"/>
        </el-table>
        <br>
        <br>
        <el-table
          border
          style="width: 100%;margin-top: 10%"
          :data="feeList"
        >
          <el-table-column
            :label="$t('spgm.no')"
            sortable
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="feeType"
            :label="$t('spgm.feeType')"
            align="center"
          />
          <el-table-column
            prop="fee"
            :label="$t('spgm.jiafeijine')"
            align="center"
          />
          <el-table-column
            prop="feeMode"
            :label="$t('spgm.jiaofeifangshi')"
            align="center"
          />
          <el-table-column
            prop="invoice"
            :label="$t('spgm.piaojuhao')"
            align="center"
          />
          <el-table-column
            prop="feeTimeStr"
            :label="$t('spgm.jiaofeishijian')"
            align="center"
          />
          <el-table-column
            prop="feePerson"
            :label="$t('spgm.shoufeiren')"
            align="center"
          />
          <el-table-column
            prop="note"
            :label="$t('spgm.beizhu')"
            align="center"
          />
        </el-table>
      </el-main>
    </el-container>
    <router-view/>
  </div>
</template>
<script>
  import {allRentPlanListOfVentas, getSupnuevoVentasPlanFeeInfoWeb,getSupnuevoVentasLogMapByPlanIdWeb,addSupnuevoVentasRentPlanToVentasWeb} from '../api/api'

  export default {
    data() {
      return {
        logTimeStr:'',
        logTypeStr:'',
        planInfo:'',
        oldPlanInfo:'',
        total:'',
        addFeeTypeStr:'',
        oldBalance:'',
        returnFeeTypeStr:'',
        value: '',
        rentFeeBalance: '',
        commodityCount_size: '',
        dayCount: '',
        dialogVisible: false,
        innerVisible: false,
        // 搜索框
        filterText: '',
        pageSize: 10, // 每页的数据条数
        currentPage: 1, // 默认开始页面
        data: [],
        list: [],
        list2: [],
        listLoading: true,
        listLoading2: true,
        item: {},
        planId: '',
        planNum: '',
        planName: '',
        nowTime: '',
        endTime: '',
        workPlanList: [],
        feeList: [],
        planList: [],
        logForm:''
      }
    },
    created() {
      this.fetchData()
      this.getTime()
    },
    methods: {
      getTime() {
        setInterval(() => {
          this.nowTime = new Date().toLocaleDateString()
        }, 1000)
      },
      getNewDay() {
        console.log('sssssss' + this.dayCount);
        var date = new Date();
        date.setDate(date.getDate() + this.dayCount);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var mm = "'" + month + "'";
        var dd = "'" + day + "'";
        //单位数前面加0
        if (mm.length == 3) {
          month = "0" + month;
        }
        if (dd.length == 3) {
          day = "0" + day;
        }
        console.log('mmmm' + month + 'dddd' + day)
        var time = date.getFullYear() + "/" + month + "/" + day
        console.log(time)
        this.endTime = time;
      },
      getValue: function (vId) {

        let obj = {};
        obj = this.list2.find((item) => {
          return item.planId === vId;
        });
        console.log(obj.startDate)
        console.log(obj.dayCount);
        console.log(obj.endDate);
        console.log(obj.planId+'planId');
        this.planId = obj.planId;
        this.planName = obj.planName;
        this.commodityCount = obj.commodityCount;
        // this.startDate = obj.startDate;
        this.rentFee = obj.rentFee;
        this.dayFee = obj.dayFee;
        this.dayCount = obj.dayCount;
        this.customCount = obj.customCount;
        this.getNewDay();
      },

      buyPlanOfVentas:function(){
        this.dialogVisible = true
        getSupnuevoVentasLogMapByPlanIdWeb(this.planId).then(response => {
         this.logForm = response.data
          this.logTimeStr = response.data.logTimeStr
          this.logTypeStr = response.data.logTypeStr
          this.planInfo = response.data.planInfo
          this.oldPlanInfo = response.data.oldPlanInfo
          this.total = response.data.total
          this.oldBalance = response.data.oldBalance
          this.returnFeeTypeStr = response.data.returnFeeTypeStr
          this.addFeeTypeStr = response.data.addFeeTypeStr
          this.ventasId = response.data.ventasId
        })
        this.dialogVisible1=false
      },
      addPlanToVentas:function(){
        addSupnuevoVentasRentPlanToVentasWeb(this.planId).then(response =>{
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '¡PLAN AGREGADO CON EXITO!',
              type: 'success'
            })
          } else {
            this.$message.error('PLAN NO SE HA PODIDO AGREGAR')
          }
          this.dialogVisible = false
        })
      },

      fetchData() {
        this.listLoading = true
        getSupnuevoVentasPlanFeeInfoWeb().then(response => {
          this.commodityCount_size = response.data.commodityCount
          this.rentFeeBalance = response.data.rentFeeBalance
          this.planList = response.data.planList
          this.workPlanList = response.data.workPlanList
          this.feeList = response.data.feeList
          /*   console.log(response)
             console.log("planList="+response.planList)
             console.log("planList="+response.workPlanList)
             console.log("commodityCount="+response.commodityCount)
             console.log("rentFeeBalance="+response.rentFeeBalance)*/
          this.list = response.data
        })
        allRentPlanListOfVentas().then(response => {
          this.list2 = response.ArrayList
        })
        this.listLoading = false
      },
      computed: {
        'tableList': function () {
          var search = this.filterText
          if (search) {
            return this.list.filter(function (dataNews) {
              return Object.keys(dataNews).some(function (key) {
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
              })
            })
          }
          return this.list
        }
      },
      filters: {
        formatDate: function (value) {
          let date = new Date(value);
          let y = date.getFullYear();
          let MM = date.getMonth() + 1;
          MM = MM < 10 ? ('0' + MM) : MM;
          let d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          let h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          let m = date.getMinutes();
          m = m < 10 ? ('0' + m) : m;
          let s = date.getSeconds();
          s = s < 10 ? ('0' + s) : s;
          return y + '-' + MM + '-' + d;
        }
      }
    }
  }
</script>

