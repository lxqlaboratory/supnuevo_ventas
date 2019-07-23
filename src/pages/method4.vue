<template>
  <div>
    <el-container>
      <el-header height="150px" style="text-align: center">
        <br><br>
        <el-row >
          请输入条码后四位
          <el-input style="width: 20%;" />
          <el-button>清空</el-button>
          <el-button>设置</el-button>
          <el-button>向前</el-button>
          <el-button>向后</el-button>
        </el-row> <br/>
      </el-header>
      <el-container style="height: 700px;margin-left: 3%">
        <el-aside width="20%">
          <el-table
            :data="tableData"
            style="width: 100%"
            height="500"
            @row-click="sraa"
          >
            <!--            codigo-descripcion-->
            <el-table-column
              prop="name"
              label="序列"
              align="center"
            />
          </el-table>
        </el-aside>
        <el-form label-width="200px">
          <el-container>
            <el-aside style="width: 45%;">
              <el-form-item  style="width: 100% " label="商品内码">
                <el-input />
              </el-form-item>
              <el-form-item  style="width: 100% " label="商品条码">
                <el-input disabled/>
              </el-form-item>
              <el-form-item  style="width: 100% " label="商品价格">
                <el-input/>
              </el-form-item>
              <el-form-item label="">
                <img :src="src" style="width: 280px; height: 280px;float: right"/>
              </el-form-item>
            </el-aside>
            <el-container>
              <el-main width="40%">
                <el-form-item label="商品类">
                  <el-select v-model="category" value="" placeholder="请选择..." @change="getValue" style="width: 80% ">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" />
                  </el-select>
                </el-form-item>
                <el-form-item label="商品品牌">
                  <el-select v-model="brand" value="" placeholder="请选择..." @change="getValue" style="width: 80% ">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" />
                  </el-select>
                  <el-button type="text" @click="dialogVisible = true">编辑</el-button>
                </el-form-item>
                <el-dialog
                  title="请输入商品名"
                  :visible.sync="dialogVisible"
                  width="30%"
                  :before-close="handleClose"
                  style="margin-left: 50px">
                  <el-row>
                    分类：<span>xxxxx</span>
                  </el-row>
                  <br>
                  <el-row>
                    名称
                    <el-input style="width: 100px;" />
                  </el-row>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = true">添加</el-button>
                    <el-button @click="dialogVisible = false">修改</el-button>
                    <el-button @click="dialogVisible = false">删除</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                  </span>
                </el-dialog>
                <el-dialog
                  title="添加成功"
                  :visible.sync="innerVisible"
                  width="30%"
                  :before-close="handleClose">
                  添加成功
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = false;dialogVisible = false">确认</el-button>
                    <el-button @click="innerVisible = false;dialogVisible = false">帮助</el-button>
                  </span>
                </el-dialog>
                <el-form-item label="型号">
                  <el-select v-model="typ" value="" placeholder="请选择..." @change="getValue" style="width: 80% ">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" />
                  </el-select>
                  <el-button type="text" @click="dialogVisible = true">编辑</el-button>
                </el-form-item>
                <el-form-item label="含量">
                  <el-select v-model="volume" value="" placeholder="请选择..." @change="getValue" style="width: 80% ">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" />
                  </el-select>
                  <el-button type="text" @click="dialogVisible = true">编辑</el-button>
                </el-form-item>
                <el-form-item label="商品名称">
                  <el-input style="width: 80% "/>
                </el-form-item>
                <el-form-item label="商品条码">
                  <el-input style="width: 80% " disabled/>
                </el-form-item>
                <el-form-item label="">
                  <img :src="src" style="width: 200px; height: 200px;text-align: center;"/>
                </el-form-item>
              </el-main>
            </el-container>
          </el-container>
          <el-footer style="margin-left: 100px;">
            <el-row>
              <el-button>提交</el-button>
              <el-button>清除</el-button>
              <el-button>插入</el-button>
              <el-button>删除</el-button>
              <el-button>导入价格</el-button>
            </el-row>
          </el-footer>
        </el-form>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '50/7'
        }, {
          value: '选项2',
          label: '50/14'
        }, {
          value: '选项3',
          label: '20/7'
        }],
        category: '',
        brand: '',
        typ: '',
        volume:'',
        tableData: [{
          name: '1'
        }, {
          name: '2'
        }, {
          name: '3'
        }, {
          name: '4'
        }, {
          name: '5'
        }, {
          name: '6'
        }, {
          name: '7'
        }, {
          name: '8'
        }, {
          name: '9'
        }, {
          name: '10'
        }],
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563291928298&di=b2134c49452c75f99403eb76f3cd55ab&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F04%2F15%2FFpx2zXgqBNAt2CBx1wSmT5oHe3Mf.jpg%2521280x280.jpg',
        dialogVisible: false,
        innerVisible: false
      }
    },
    methods: {
      sraa(row) {
        console.log(row)
        alert(row.name)
      },
      getValue: function(value) {
        alert('hh')
      }
    }
  }
</script>

