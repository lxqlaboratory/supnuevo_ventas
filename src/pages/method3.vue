<template>
  <div style="padding:30px;">
    <el-container>
      <el-aside style="height: 900px" >
        <el-form label-width="80px"><br>
          <el-form-item label="计划标志" prop="planNum" >
            <el-select v-model="value" value="" placeholder="请选择..." @change="getValue" style="width: 100% ">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="计划名称" prop="planName" >
            <el-input disabled />
          </el-form-item>
          <el-form-item label="supnuevo空间" prop="commodityCount">
            <el-input disabled />
          </el-form-item>
          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker type="date" placeholder="开始日期" style="width: 100%;" disabled />
          </el-form-item>
          <el-form-item label="结束时间" prop="">
            <el-date-picker type="date" placeholder="结束日期" style="width: 100%;" disabled />
          </el-form-item>
          <el-form-item label="租用费用" prop="rentFee">
            <el-input disabled />
          </el-form-item>
          <el-form-item label="按天费用" prop="dayFee">
            <el-input disabled />
          </el-form-item>
          <el-form-item label="商户余额">
            <el-input disabled />
          </el-form-item>
          <el-form-item label="空间大小">
            <el-input disabled />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogVisible = true">购买</el-button>
          </el-form-item>
          <el-dialog
            title="日志信息"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            style="margin-left: 50px;"
          >
            <el-form label-width="120px">
              <el-form-item label="日志生成时间:" prop="logTime" />
              <el-form-item label="日志客户ID:" prop="ventasId" />
              <el-form-item label="日志种类名称:" prop="logType" />
              <el-form-item label="新计划信息:" prop="planInfo" />
              <el-form-item label="以前计划信息:" prop="oldPlanInfo" />
              <el-form-item label="新计划付款:" prop="rentFee" />
              <el-form-item label="增加费用原因:" prop="dayFee" />
              <el-form-item label="以前计划退款:" />
              <el-form-item label="退回费用原因:" />
              <div style="text-align: center">
                <el-button @click="innerVisible = true;dialogVisible = false">确 认</el-button>
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
      <el-main style="margin-left: 50px;width: 1000px;">
        <el-table
          border="true"
          :data="tableData"
          style="width: 100%;"
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
            prop="planName"
            label="计划名称"
            align="center"
          />
          <el-table-column
            prop="planNum"
            label="计划标志"
            align="center"
          />
          <el-table-column
            prop="planType"
            label="计划类型"
            align="center"
          />
          <el-table-column
            prop="name"
            label="创建时间"
            align="center"
          />
          <el-table-column
            prop="name"
            label="空间大小"
            align="center"
          />
          <el-table-column
            prop="startDate"
            label="开始日期"
            align="center"
          />
          <el-table-column
            prop="name"
            label="结束日期"
            align="center"
          />
          <el-table-column
            prop="rentFee"
            label="租用费用"
            align="center"
          />
        </el-table>
        <br>
        <br>
        <el-table
          border="true"
          :data="tableData"
          style="width: 100%;"

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
            prop="date"
            label="费用类型"
            align="center"
          />
          <el-table-column
            prop="name"
            label="缴费金额"
            align="center"
          />
          <el-table-column
            prop="name"
            label="缴费方式"
            align="center"
          />
          <el-table-column
            prop="name"
            label="票据号"
            align="center"
          />
          <el-table-column
            prop="name"
            label="缴费时间"
            align="center"
          />
          <el-table-column
            prop="name"
            label="收费人"
            align="center"
          />
          <el-table-column
            prop="bzhu"
            label="备注"
            align="center"
          />
        </el-table>
      </el-main>
    </el-container>
    <router-view />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        tableData: [{
          selectArr: '',
          date: '东风',
          name: '王小虎'
        }, {
          date: '东风',
          name: '王小虎'
        }, {
          date: '东风',
          name: '王小虎'
        }, {
          date: '东风',
          name: '王小虎'
        }],
        dialogVisible: false,
        innerVisible: false
      }
    },
    methods: {
      getValue: function(value) {
        alert(value.value)
        alert(value.label)
      }
    }
  }
</script>

