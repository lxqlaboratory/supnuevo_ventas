<template>
  <div style="padding:0px;">
    <el-container>
      <el-aside style="height: 60%" >
        <el-form label-width="80px"><br>
          <el-form-item label="计划标志" prop="planNum">
            <el-select v-model="planNum" placeholder="请选择..." @change="getValue" style="width: 100% ">
              <el-option v-for="item in list2" :key="item.planId" :label="item.planNum" :value="item.planId"/>
            </el-select>
          </el-form-item>
          <el-form-item label="计划名称" prop="planName" v-model="planName">
            <el-input v-model="planName" disabled/>
          </el-form-item>
          <el-form-item label="supnuevo空间" prop="commodityCount">
            <el-input v-model="commodityCount" disabled/>
          </el-form-item>
          <el-form-item label="开始时间" prop="startDate">
            <el-input v-model="nowTime" disabled/>
          </el-form-item>
          <el-form-item label="结束时间" prop="endDate">
            <el-input v-model="endTime" disabled/>
          </el-form-item>
          <el-form-item label="租用费用" prop="rentFee">
            <el-input v-model="rentFee" disabled/>
          </el-form-item>
          <el-form-item label="按天费用" prop="dayFee">
            <el-input v-model="dayFee" disabled/>
          </el-form-item>
          <el-form-item label="商户余额">
            <el-input v-model="rentFeeBalance" disabled/>
          </el-form-item>
          <el-form-item label="空间大小">
            <el-input v-model="commodityCount_size" disabled/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="buyPlanOfVentas">购买</el-button>
          </el-form-item>
          <el-dialog
            title="日志信息"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            style="margin-left: 0px;"
          >
            <el-form label-width="120px">
              <el-form-item label="日志生成时间:" prop="logTimeStr">
                <el-input v-model="logTimeStr"  disabled/>
              </el-form-item>
              <el-form-item label="日志客户ID:" prop="ventasId">
                <el-input v-model="ventasId" disabled/>
              </el-form-item>
              <el-form-item label="日志种类名称:" prop="logType">
                <el-input v-model="logTypeStr" disabled/>
              </el-form-item>
              <el-form-item label="新计划信息:" prop="planInfo">
                <el-input v-model="planInfo" disabled/>
              </el-form-item>
              <el-form-item label="以前计划信息:" prop="oldPlanInfo">
                <el-input v-model="oldPlanInfo" disabled/>
              </el-form-item>
              <el-form-item label="新计划付款:" prop="rentFee">
                <el-input v-model="total" disabled/>
              </el-form-item>
              <el-form-item label="增加费用原因:" prop="dayFee">
                <el-input v-model="addFeeTypeStr" disabled/>
              </el-form-item>
              <el-form-item label="以前计划退款:">
                <el-input v-model="oldBalance" disabled/>
              </el-form-item>
              <el-form-item label="退回费用原因:">
                <el-input v-model="returnFeeTypeStr" disabled/>
              </el-form-item>
              <div style="text-align: center">
                <el-button @click="addPlanToVentas">确 认</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
              </div>
            </el-form>
          </el-dialog>
          <el-dialog
            title="添加成功"
            :visible.sync="innerVisible"
            width="30%"
            :before-close="handleClose"
          >
            添加成功
            <span slot="footer" class="dialog-footer">
              <el-button @click="innerVisible = false;dialogVisible = false">确认</el-button>
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
            label="序号"
            sortable
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="planNum"
            label="计划标志"
            align="center"/>
          <el-table-column
            prop="planName"
            label="计划名称"
            align="center"/>
          <el-table-column
            prop="commodityModeStr"
            label="计划类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            min-width="100px">
            <template slot-scope="scope">
              {{ scope.row.createTimeStr}}
            </template>
          </el-table-column>
          <el-table-column
            prop="commodityCount"
            label="空间大小"
            align="center"/>
          <el-table-column
            label="开始日期"
            align="center"
            min-width="100px"
          >
            <template slot-scope="scope">
              {{ scope.row.startDateStr|formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            label="结束日期"
            align="center"
            min-width="100px"
          >
            <template slot-scope="scope">
              {{ scope.row.endDateStr|formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            prop="rentFee"
            label="租用费用"
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
            label="序号"
            sortable
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="feeType"
            label="费用类型"
            align="center"
          />
          <el-table-column
            prop="fee"
            label="缴费金额"
            align="center"
          />
          <el-table-column
            prop="feeMode"
            label="缴费方式"
            align="center"
          />
          <el-table-column
            prop="invoice"
            label="票据号"
            align="center"
          />
          <el-table-column
            prop="feeTimeStr"
            label="缴费时间"
            align="center"
          />
          <el-table-column
            prop="feePerson"
            label="收费人"
            align="center"
          />
          <el-table-column
            prop="note"
            label="备注"
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
              message: '购买成功',
              type: 'success'
            })
          } else {
            this.$message.error('更新失败')
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

