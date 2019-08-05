<template>
  <div>
    <el-container>
      <el-header height="150px" style="text-align: center">
        <br><br>
        <!--条形码尾位查询法-->
        <div style="width:350px; padding-bottom: 10px; float: left;" v-show="txm" >
          <!--<el-input-->
            <!--v-model="filterText"-->
            <!--placeholder="请输入条形码尾位"-->
            <!--class="filterText"-->
            <!--clearable-->
          <!--&gt;</el-input>-->
              <el-autocomplete
                class="inline-input"
                v-model="filterText"
                :fetch-suggestions="querySearch"
                placeholder="请输入条形码"
              >
            <el-button slot="append" icon="el-icon-search" @click=" search1" />
              </el-autocomplete>
        </div>
        <!--商品名称查询法-->
        <div style="width:350px; padding-bottom: 10px; float: left;" v-show="spmc" >
          <!--<el-input-->
          <!--v-model="filterText"-->
          <!--placeholder="请输入条形码尾位"-->
          <!--class="filterText"-->
          <!--clearable-->
          <!--&gt;</el-input>-->
          <el-autocomplete
            class="inline-input"
            v-model="filterText"
            :fetch-suggestions="querySearch"
            placeholder="请输入商品名称"
          >
            <el-button slot="append" icon="el-icon-search" @click=" search2" />
          </el-autocomplete>
        </div>
        <!--引擎查询法-->
        <div style="width:250px; padding-bottom: 10px; float: left;" v-show="yq" >
          <el-autocomplete
            class="inline-input"
            v-model="filterText"
            :fetch-suggestions="querySearch"
            placeholder="请输入"
          >
            <el-button slot="append" icon="el-icon-search" @click=" search3" />
          </el-autocomplete>
        </div>
        <!--类型-品牌-描述-尺寸查询法-->
        <div style="width:500px; padding-bottom: 10px; float: left;" v-show="lpmc" >
          <!--<el-input-->
            <!--v-model="filterText"-->
            <!--placeholder="lexingpinpai"-->
            <!--class="filterText"-->
            <!--clearable-->
          <!--&gt;-->
            <!--<el-button slot="append" icon="el-icon-search" @click=" search4" />-->
          <!--</el-input>-->
          <el-select v-model="searchshangpinlei" placeholder="请选择..." @change="getSearchValue"  style="width: 120px ">
            <el-option v-for="item in options" :key="item.catalogId" :label="item.catalogName" :value="item.catalogId"/>
          </el-select>
          <el-select  v-model="searchshangpinpinpai"  placeholder="请选择..." @change="getSearchValue1" style="width: 120px ">
            <el-option v-for="item in searchOptions1" :key="item.catalogId" :label="item.catalogName" :value="item.catalogId" />
          </el-select>
          <el-select  v-model="searchxinghao"  placeholder="请选择..." @change="getSearchValue2" style="width: 120px ">
            <el-option v-for="item in searchOptions2" :key="item.catalogId" :label="item.catalogName" :value="item.catalogId" />
          </el-select>
          <el-select v-model="searchhanliang"   placeholder="请选择..." @change="getSearchValue3" style="width: 120px ">
            <el-option v-for="item in searchOptions3" :key="item.catalogId" :label="item.catalogName" :value="item.catalogId" />
          </el-select>
        </div>
        <div>
          <el-radio-group v-model="radio">
            <el-radio :label="1" @change="showtxm">条形码尾位查询法</el-radio>
            <el-radio :label="2" @change="showlpmc">类型-品牌-描述-尺寸查询法</el-radio>
            <el-radio :label="3" @change="showspmc">商品名称查询法</el-radio>
            <el-radio :label="4" @change="showyq">引擎查询法</el-radio>
          </el-radio-group>
        </div>
      </el-header>
      <el-container style="height: 700px;margin-left: 3%">
        <el-aside width="20%">
          <el-table

            :data="tableData"
            style="width: 100%"
            height="500"
            row-key="value"
            @row-click="sraa"
            highlight-current-row
          >
            <el-table-column v-for="(item, index) in col"
                             :key="`col_${index}`"
                             :prop="dropCol[index].prop"
                             :label="item.label"

              >
            </el-table-column>
          </el-table>
        </el-aside>
        <el-form label-width="200px">
          <el-container>
            <el-aside style="width: 45%;">
              <el-form-item  style="width: 100% " label="商品内码" >
                <el-input v-model="codigoEntreno" />
              </el-form-item>
              <el-form-item  style="width: 100% " label="商品条码" >
                <el-input disabled v-model="codigo"/>
              </el-form-item>
              <el-form-item  style="width: 100% " label="商品价格">
                <el-input  v-model="price"/>
              </el-form-item>
              <el-form-item label="">
                <img :src="src" style="width: 280px; height: 280px;float: right"/>
              </el-form-item>
            </el-aside>
            <el-container>
              <el-main width="40%">
                <el-form-item label="商品类">
                  <el-select v-model="category" placeholder="请选择..." @change="getValue"  style="width: 80% ">
                    <el-option v-for="item in options" :key="item.catalogId" :label="item.catalogName" :value="item.catalogId"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品品牌">
                  <el-select v-model="brand" value="" placeholder="请选择..." @change="getValue1" style="width: 80% ">
                    <el-option v-for="item in options1" :key="item.catalogId" :label="item.catalogName" :value="item.catalogId" />
                  </el-select>
                  <el-button type="text" @click="judge1" v-show="showshangpinpinpai">编辑</el-button>
                </el-form-item>
                <el-dialog
                  title="请输入商品品牌"
                  :visible.sync="dialogVisible1"
                  width="40%"
                  style="margin-left: 50px">
                  <!--<el-row>-->
                    <!--分类：<el-input v-model="fenlei" disabled="disable" style="width: 60%"></el-input>-->
                  <!--</el-row>-->
                  <!--<br>-->
                  <!--<el-row>-->
                    <!--名称：<el-input v-model="shangpinpinpaidialog" style="width: 60%"></el-input>-->
                  <!--</el-row>-->
                  <el-form ref="rulelist" :model="rulelist" :rules="rules" label-position="left" label-width="140px" style="width: 90%; margin-left:50px;">
                    <el-form-item label="分类:" prop="name">
                      <el-input v-model="fenlei" disabled="disable" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="名称:" prop="shangpinpinpaidialog">
                      <el-input v-model="rulelist.shangpinpinpaidialog" style="width: 90%" autocomplete="off" ></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="xinzengshangpinpinpaimethod">添加</el-button>
                    <el-button @click="xiugaishangpinpinpaimethod" v-show="xiugaishangpinfenleibutton">修改</el-button>
                    <el-button @click="shanchushangpinpinpaimethod" v-show="shanchushangpinfenleibutton">删除</el-button>
                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                  </span>
                </el-dialog>
                <el-form-item label="型号">
                  <el-select v-model="typ"  placeholder="请选择..." @change="getValue2" style="width: 80% ">
                    <el-option v-for="item in options2" :key="item.catalogId" :label="item.catalogName" :value="item.catalogId" />
                  </el-select>
                  <el-button type="text" @click="judge2" v-show="showxinghao">编辑</el-button>
                </el-form-item>
                <el-dialog
                  title="请输入型号"
                  :visible.sync="dialogVisible2"
                  width="40%"
                  style="margin-left: 50px">
                  <!--<el-row>-->
                    <!--分类：<el-input v-model="fenlei" disabled="disable" style="width: 60%"></el-input>-->
                  <!--</el-row>-->
                  <!--<br>-->
                  <!--<el-row>-->
                    <!--名称：<el-input v-model="xinghaodialog" style="width: 60%" :rules="rules"  ></el-input>-->
                  <!--</el-row>-->

                  <el-form ref="rulelist" :model="rulelist" :rules="rules" label-position="left" label-width="140px" style="width: 90%; margin-left:50px;">
                    <el-form-item label="分类:">
                      <el-input v-model="fenlei" disabled="disable" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="名称:" prop="xinghaodialog">
                      <el-input v-model="rulelist.xinghaodialog" style="width: 90%" autocomplete="off" ></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="xinzengxinghaomethod">添加</el-button>
                    <el-button @click="xiugaixinghaomethod" v-show="xiugaixinghaobutton">修改</el-button>
                    <el-button @click="shanchuxinghaomethod" v-show="shanchuxinghaobutton">删除</el-button>
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                  </span>
                </el-dialog>
                <el-form-item label="含量">
                  <el-select v-model="volume"  placeholder="请选择..." @change="getValue3" style="width: 80% ">
                    <el-option v-for="item in options3" :key="item.catalogId" :label="item.catalogName" :value="item.catalogId" />
                  </el-select>
                  <el-button type="text" @click="judge3" v-show="showhanliang">编辑</el-button>
                </el-form-item>
                <el-dialog
                  title="请输入含量"
                  :visible.sync="dialogVisible3"
                  width="40%"
                  style="margin-left: 50px">
                  <!--<el-row>-->
                    <!--分类：<el-input v-model="fenlei" disabled="disable" style="width: 60%"></el-input>-->
                  <!--</el-row>-->
                  <!--<br>-->
                  <!--<el-row>-->
                    <!--名称：<el-input v-model="hanliangdialog" style="width: 60%"></el-input>-->
                  <!--</el-row>-->
                  <el-form ref="rulelist" :model="rulelist" :rules="rules" label-position="left" label-width="140px" style="width: 90%; margin-left:50px;">
                    <el-form-item label="分类:">
                      <el-input v-model="fenlei" disabled="disable" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="名称:" prop="hanliangdialog">
                      <el-input v-model="rulelist.hanliangdialog" style="width: 90%" autocomplete="off" ></el-input>
                    </el-form-item>
                  </el-form>

                  <span slot="footer" class="dialog-footer">
                    <el-button @click="xinzenghanliangmethod">添加</el-button>
                    <el-button @click="xiugaihanliangmethod" v-show="xiugaihanliangbutton">修改</el-button>
                    <el-button @click="shanchuhanliangmethod" v-show="shanchuhanliangbutton">删除</el-button>
                    <el-button @click="dialogVisible3 = false">取 消</el-button>
                  </span>
                </el-dialog>
                <el-form-item label="商品名称">
                  <el-input style="width: 80% " v-model="descripcion" />
                </el-form-item>
                <el-form-item label="商品条码">
                  <el-input style="width: 80% " disabled v-model="codigo"/>
                </el-form-item>
                <el-form-item label="">
                  <img :src="src" style="width: 200px; height: 200px;text-align: center;"/>
                </el-form-item>
              </el-main>
            </el-container>
          </el-container>
          <el-footer style="margin-left: 100px;">
            <el-row>
              <el-button @click="saveOrUpdateSupnuevoVentasCommodityPrice">提交</el-button>
              <el-button @click="clearSupnuevoVentasCommodityPrice">清除</el-button>
              <el-button @click="deleteSupnuevoVentasCommodityPrice">删除</el-button>
              <el-button @click="test1" ref="click1">导入价格</el-button>
              <el-button @click="saveOrUpdateSupnuevoVentasCommodity">保存</el-button>
            </el-row>
          </el-footer>
        </el-form>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import Sortable from 'sortablejs'
  import { getCommodityPriceFormByPriceId, getVentasCommodityPriceOptionList, getCommodityCatalogListOptionInfoList,getCommodityCatalogListOptionInfoList1, insertSupnuevoVentasCommodityPrice, getQueryDataListByInputStringMobile, getDescripcionListByDescripcionPrefix, getCommodityBySearchEngineOld, changeTableStation
  , getCommodityCatalogListOptionInfoListWeb, addNewCommodityCatalogWeb, modifyCommodityCatalogWeb, deleteCommodityCatalogWeb, getCommodityPriceFormByOrderNumWeb,saveOrUpdateSupnuevoVentasCommodityWeb, deleteSupnuevoVentasCommodityPriceWeb, clearSupnuevoVentasCommodityPriceWeb, saveOrUpdateSupnuevoVentasCommodityPriceWeb, getCommodityPriceFormByIndexCodigoWeb, getCommodityPriceFormByCatalogId} from '../api/api'
  export default {
    data() {
      return {
        isCommodity:false,  //删除时
        rulelist:{
          hanliangdialog:'',
          shangpinpinpaidialog:'' ,
          xinghaodialog:'',
        },
        rules: {
          hanliangdialog: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          shangpinpinpaidialog: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          xinghaodialog: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
        },
        col: [
          {
            label: '序列',
            prop: 'numName'
          }
        ],
        dropCol: [
          {
            label: '序列',
            prop: 'numName'
          }
        ],
        tableData: [],   // 接收左侧序列
        fenlei:'',
        lpmc:false,          // 类型-品牌-描述-尺寸查询法
        txm:true, // 条形码尾位查询法
        spmc:false, //   商品名称查询法
        yq:false,//     引擎查询法
        radio:1,

        // hanliangdialog:'',     // 弹出框中的输入

        shangpinlei:'',
        shangpinpinpai:'',
        xinghao:'',
        hanliang:'',//用于记录当前选择的商品的catalogName

        shangpinleiParentId:'',
        shangpinpinpaiParentId:'',
        xinghaoParentId:'',//用于记录当前选择的商品的ParentId

        test:'', //当前选择的商品
        parentId:null,
        filterText: '',        // 搜索框
        descripcion:'',  //商品名称绑定属性
        codigoEntreno:'',  // 商品内码绑定属性
        codigo:'',  // 商品条码绑定属性
        price: '',  // 价格绑定属性
        options:[], // 商品类
        options1:[],// 商品品牌
        options2:[], // 型号
        options3:[],// 含量
        category: '',// 商品类绑定属性
        brand: '',  //商品品牌绑定属性
        typ: '',  //型号绑定属性
        volume:'',  //含量绑定属性
        msg:'', // 添加后的返回消息
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563291928298&di=b2134c49452c75f99403eb76f3cd55ab&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F04%2F15%2FFpx2zXgqBNAt2CBx1wSmT5oHe3Mf.jpg%2521280x280.jpg',
        dialogVisible1: false, //商品品牌的弹出框
        dialogVisible2: false, //型号的弹出框
        dialogVisible3: false, //含量的弹出框
        showshangpinpinpai:false,
        showxinghao:false,
        showhanliang:false , // 是否展示编辑按钮

        xiugaishangpinfenleibutton:true,
        shanchushangpinfenleibutton:true,
        xiugaixinghaobutton:true,
        shanchuxinghaobutton:true,
        xiugaihanliangbutton:true,
        shanchuhanliangbutton:true,  //是否展示删除修改按钮

        priceId:'',   // 商品ID
        commodityId:'', //公共商品库ID
        orderNum:'',

        resultList:[], // 搜索时用的数据
        result:[],
        searchList:[],
        searchResult:'',

        searchOptions1:[], //类型品牌描述尺查询时用到
        searchOptions2:[],
        searchOptions3:[],
        searchshangpinlei:'',
        searchshangpinpinpai:'',
        searchxinghao:'',
        searchhanliang:'',

      }
    },
    computed: {
    },
    created() {
      this.fetchData()
    },
    mounted(){
      // this.$refs.click1.$el.click();
    },
    methods: {
      querySearch(queryString, cb) { //用于搜索建议
        var resultList = this.result
        var results = queryString ? resultList.filter(item => {
          const isValue = item.value && ((item.value.toLowerCase().indexOf(queryString) >= 0)||(item.value.indexOf(queryString) >= 0))
          return (isValue)
        }) : resultList
        cb(results)
      },
      rowDrop() {    // 行拖拽
        const tbody = document.querySelector('.el-table__body-wrapper tbody')
        const _this = this
        Sortable.create(tbody, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.tableData.splice(oldIndex, 1)[0]
            _this.tableData.splice(newIndex, 0, currRow)
            changeTableStation(newIndex,oldIndex).then(response => {
            })
          }
        })
      },
      fetchData() {
        getVentasCommodityPriceOptionList().then(response => {   // 获取左侧序列
          this.tableData = response.ArrayList
          this.searchList = response.resultList
          this.result=[{}]
          for (let item of response.resultList) {
            this.result.push({"value": item.codigo})
          }
          this.rowDrop()
        })
        getCommodityCatalogListOptionInfoList(this.parentId).then(response => {  //获取商品类
          this.options = response.arrayList
        })
        // getCommodityPriceFormByCatalogId(521).then(response => {  //获取商品类
        //
        // })
      },
      sraa(row) {
        this.category=''
        this.brand=''
        this.typ=''
        this.volume=''
        getCommodityPriceFormByPriceId(row.value).then(response => {      //点击左侧序列取得数据
          this.codigoEntreno = response.codigoEntreno
          this.codigo = response.codigo
          this.price = response.price
          this.descripcion=response.descripcion
          this.priceId = response.priceId
          this.commodityId= response.commodityId
          this.orderNum = response.orderNum
          // this.getCommodityPriceFormByOrderNumWeb()
          if (response.rubroId != null) {
            this.showshangpinpinpai =false
            this.showxinghao=true
            this.showhanliang =true
            var i = 0;
            // (response.rubroId)
            for (i; i < this.options.length; i++) {
              if ((response.rubroId) == this.options[i].catalogId) {
                this.category = this.options[i].catalogName
                this.shangpinlei = this.options[i].catalogName;//记录选择的商品类
                this.shangpinleiParentId = this.options[i].catalogId

              }
            }
            // alert((response.rubroId)+"")
            getCommodityCatalogListOptionInfoList1((response.rubroId) + "").then(response1 => {
              this.options1 = response1.arrayList
              for (i = 0; i < this.options1.length; i++) {
                if ((response.marcaId) == this.options1[i].catalogId) {
                  this.brand = this.options1[i].catalogName
                  this.shangpinpinpai = this.options1[i].catalogName;//记录选择的商品品牌
                  this.shangpinpinpaiParentId = this.options1[i].catalogId
                  this.rulelist.shangpinpinpaidialog = this.shangpinpinpai
                }
              }
            })

            getCommodityCatalogListOptionInfoList1((response.marcaId) + "").then(response1 => {
              this.options2 = response1.arrayList
              for (i = 0; i < this.options2.length; i++) {
                if ((response.presentacionId) == this.options2[i].catalogId) {
                  this.typ = this.options2[i].catalogName
                  this.xinghaoParentId = this.options2[i].catalogId
                  this.xinghao = this.options2[i].catalogName;//记录选择的型号
                }
              }
            })
            getCommodityCatalogListOptionInfoList1((response.presentacionId) + "").then(response1 => {
              this.options3 = response1.arrayList
              for (i = 0; i < this.options3.length; i++) {
                if ((response.tamanoId) == this.options3[i].catalogId) {
                  this.volume = this.options3[i].catalogName
                  this.hanliangParentId = this.options3[i].catalogId
                  this.hanliang = this.options3[i].catalogName
                }
              }
            })
          }

        })
      },
      getCommodityPriceFormByOrderNumWeb() {
        getCommodityPriceFormByOrderNumWeb(this.orderNum+'').then(response => {
          if (response.data.rubroId != null) {
            this.showshangpinpinpai =false
            this.showxinghao=true
            this.showhanliang =true
            var i = 0;
            // alert(response.data.rubroId)
            for (i; i < this.options.length; i++) {
              if ((response.data.rubroId) == this.options[i].catalogId) {
                this.category = this.options[i].catalogName
                this.shangpinlei = this.options[i].catalogName;//记录选择的商品类
                this.shangpinleiParentId = this.options[i].catalogId

              }
            }
            //alert((response.data.rubroId)+"")
            getCommodityCatalogListOptionInfoList1((response.data.rubroId) + "").then(response1 => {
              this.options1 = response1.arrayList
              for (i = 0; i < this.options1.length; i++) {
                if ((response.data.setmarcaId) == this.options1[i].catalogId) {
                  this.brand = this.options1[i].catalogName
                  this.shangpinpinpai = this.options1[i].catalogName;//记录选择的商品品牌
                  this.shangpinpinpaiParentId = this.options1[i].catalogId
                  this.rulelist.shangpinpinpaidialog = this.shangpinpinpai
                }
              }
            })
            getCommodityCatalogListOptionInfoList1((response.data.setmarcaId) + "").then(response1 => {
              this.options2 = response1.arrayList
              for (i = 0; i < this.options2.length; i++) {
                if ((response.data.presentacionId) == this.options2[i].catalogId) {
                  this.typ = this.options2[i].catalogName
                  this.xinghaoParentId = this.options2[i].catalogId
                  this.xinghao = this.options2[i].catalogName;//记录选择的型号
                }
              }
            })
            getCommodityCatalogListOptionInfoList1((response.data.presentacionId) + "").then(response1 => {
              this.options3 = response1.arrayList
              for (i = 0; i < this.options3.length; i++) {
                if ((response.data.tamanoId) == this.options3[i].catalogId) {
                  this.volume = this.options3[i].catalogName
                  this.hanliangParentId = this.options3[i].catalogId
                  this.hanliang = this.options3[i].catalogName
                }
              }
            })
          }
        })
      },
      getValue: function(vId) { //获取商品品牌
        // alert(this.category)
        this.brand= ''
        this.typ= ''
        this.volume=''
        this.shangpinpinpai=''
        this.xinghao=''
        this.hanliang=''
        this.showshangpinpinpai =true
        this.showxinghao=false
        this.showhanliang =false
        let obj = {};
        obj = this.options.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.catalogId === vId;//筛选出匹配数据
        });
        // this.parentId = obj.parentId;     //记录当前parenId
        this.shangpinlei = obj.catalogName;//记录选择的商品类
        this.shangpinleiParentId = obj.catalogId;//记录商品品牌的parentId以及商品类的catalogId
        getCommodityCatalogListOptionInfoList1(obj.catalogId).then(response => {
          this.options1 = response.arrayList
        })
      },
      getValue1: function(vId) { //获取型号
        this.typ= ''
        this.volume=''
        this.xinghao=''
        this.hanliang=''
        let obj = {};
        this.showshangpinpinpai =true
        this.showxinghao=true
        this.showhanliang =false
        obj = this.options1.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.catalogId === vId;//筛选出匹配数据
        });
        // alert(obj.catalogId)
        this.shangpinpinpai = obj.catalogName;//记录选择的商品品牌
        this.rulelist.shangpinpinpaidialog = this.shangpinpinpai
        this.shangpinpinpaiParentId = obj.catalogId;//记录型号的parentId以及商品品牌的catalogId
        getCommodityCatalogListOptionInfoList1(obj.catalogId).then(response => {
          this.options2 = response.arrayList
        })
      },
      getValue2: function(vId) { //获取含量
        this.volume=''
        this.hanliang=''
        let obj = {};
        this.showshangpinpinpai =false
        this.showxinghao=true
        this.showhanliang =true
        obj = this.options2.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.catalogId === vId;//筛选出匹配数据
        });
        this.xinghao = obj.catalogName;//记录选择的型号
        this.xinghaoParentId = obj.catalogId;//记录含量的parentId以及型号的catalogId
        getCommodityCatalogListOptionInfoList1(obj.catalogId).then(response => {
          this.options3= response.arrayList
        })
      },
      getValue3: function(vId) { //记录含量
        let obj = {};
        obj = this.options3.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.catalogId === vId;//筛选出匹配数据
        });
        this.hanliangParentId = obj.catalogId;//记录含量的catalogId
        // alert(this.hanliangParentId)
        this.hanliang = obj.catalogName;//记录选择的含量
        // alert(this.shangpinlei+'--'+this.shangpinpinpai+'--'+this.xinghao+'--'+this.hanliang)
      },

      getSearchValue: function(vId) { //搜索时用  获取商品品牌
        let obj = {};
        obj = this.options.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.catalogId === vId;//筛选出匹配数据
        });
        getCommodityCatalogListOptionInfoList1(obj.catalogId).then(response => {
          this.searchOptions1 = response.arrayList
        })
      },
      getSearchValue1: function(vId) { //获取型号
        let obj = {};
        obj = this.searchOptions1.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.catalogId === vId;//筛选出匹配数据
        });
        getCommodityCatalogListOptionInfoList1(obj.catalogId).then(response => {
          this.searchOptions2 = response.arrayList
        })
      },
      getSearchValue2: function(vId) { //获取含量
        let obj = {};
        obj = this.searchOptions2.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.catalogId === vId;//筛选出匹配数据
        });
        getCommodityCatalogListOptionInfoList1(obj.catalogId).then(response => {
          this.searchOptions3= response.arrayList
        })
      },
      getSearchValue3: function(vId) { //记录含量
        let obj = {};
        obj = this.searchOptions3.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.catalogId === vId;//筛选出匹配数据
        });
        getCommodityPriceFormByCatalogId(obj.catalogId).then(response => {  //获取商品类
          this.codigoEntreno = response.codigoEntreno
          this.codigo = response.codigo
          this.price = response.price
          this.descripcion=response.descripcion
          this.priceId = response.priceId
          this.commodityId= response.commodityId
          this.orderNum = response.orderNum
          // this.getCommodityPriceFormByOrderNumWeb()
          if (response.rubroId != null) {
            this.showshangpinpinpai =false
            this.showxinghao=true
            this.showhanliang =true
            var i = 0;
            // (response.rubroId)
            for (i; i < this.options.length; i++) {
              if ((response.rubroId) == this.options[i].catalogId) {
                this.category = this.options[i].catalogName
                this.shangpinlei = this.options[i].catalogName;//记录选择的商品类
                this.shangpinleiParentId = this.options[i].catalogId

              }
            }
            // alert((response.rubroId)+"")
            getCommodityCatalogListOptionInfoList1((response.rubroId) + "").then(response1 => {
              this.options1 = response1.arrayList
              for (i = 0; i < this.options1.length; i++) {
                if ((response.marcaId) == this.options1[i].catalogId) {
                  this.brand = this.options1[i].catalogName
                  this.shangpinpinpai = this.options1[i].catalogName;//记录选择的商品品牌
                  this.shangpinpinpaiParentId = this.options1[i].catalogId
                  this.rulelist.shangpinpinpaidialog = this.shangpinpinpai
                }
              }
            })

            getCommodityCatalogListOptionInfoList1((response.marcaId) + "").then(response1 => {
              this.options2 = response1.arrayList
              for (i = 0; i < this.options2.length; i++) {
                if ((response.presentacionId) == this.options2[i].catalogId) {
                  this.typ = this.options2[i].catalogName
                  this.xinghaoParentId = this.options2[i].catalogId
                  this.xinghao = this.options2[i].catalogName;//记录选择的型号
                }
              }
            })
            getCommodityCatalogListOptionInfoList1((response.presentacionId) + "").then(response1 => {
              this.options3 = response1.arrayList
              for (i = 0; i < this.options3.length; i++) {
                if ((response.tamanoId) == this.options3[i].catalogId) {
                  this.volume = this.options3[i].catalogName
                  this.hanliangParentId = this.options3[i].catalogId
                  this.hanliang = this.options3[i].catalogName
                }
              }
            })
          }

        })
      },
      xinzengshangpinpinpaimethod:function(){   // 新增商品品牌
        addNewCommodityCatalogWeb(this.shangpinleiParentId ,this.rulelist.shangpinpinpaidialog).then(response => {
          this.msg =  response.data.cataLogId
          if (this.msg > 0) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            getCommodityCatalogListOptionInfoList1(this.shangpinleiParentId).then(response => {
              this.options1 = response.arrayList
            })
          } else {
            this.$message.error('更新失败')
          }
        })
        this.dialogVisible1=false
      },
      xinzengxinghaomethod:function(){   //新增型号
        addNewCommodityCatalogWeb(this.shangpinpinpaiParentId ,this.rulelist.xinghaodialog).then(response => {
          this.msg =  response.data.cataLogId
          if (this.msg > 0) {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            getCommodityCatalogListOptionInfoList1(this.shangpinpinpaiParentId).then(response => {
              this.options2 = response.arrayList
            })
          } else {
            this.$message.error('更新失败')
          }
        })
        this.dialogVisible2=false
      },
      xinzenghanliangmethod:function(){   //新增含量
        addNewCommodityCatalogWeb(this.xinghaoParentId ,this.rulelist.hanliangdialog).then(response => {
          this.msg =  response.data.cataLogId
          if (this.msg > 0) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            getCommodityCatalogListOptionInfoList1(this.xinghaoParentId).then(response => {
              this.options3 = response.arrayList
            })
          } else {
            this.$message.error('新增失败')
          }
        })
        this.dialogVisible3=false
      },
      xiugaishangpinpinpaimethod:function(){    //修改商品品牌
        modifyCommodityCatalogWeb(this.shangpinpinpaiParentId ,this.rulelist.shangpinpinpaidialog).then(response => {
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.brand=this.rulelist.shangpinpinpaidialog
            getCommodityCatalogListOptionInfoList1(this.shangpinleiParentId).then(response => {
              this.options1 = response.arrayList
            })
          } else {
            this.$message.error('修改失败')
          }
        })
        this.dialogVisible1=false
      },
      xiugaixinghaomethod:function(){     // 修改型号
        modifyCommodityCatalogWeb(this.xinghaoParentId ,this.rulelist.xinghaodialog).then(response => {
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.typ=this.rulelist.xinghaodialog
            getCommodityCatalogListOptionInfoList1(this.shangpinpinpaiParentId).then(response => {
              this.options2 = response.arrayList
            })
          } else {
            this.$message.error('修改失败')
          }
        })
        this.dialogVisible2=false
      },
      xiugaihanliangmethod:function(){    // 修改含量
        modifyCommodityCatalogWeb(this.hanliangParentId ,this.rulelist.hanliangdialog).then(response => {
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.volume=this.rulelist.hanliangdialog
            getCommodityCatalogListOptionInfoList1(this.xinghaoParentId).then(response => {
              this.options3 = response.arrayList
            })
          } else {
            this.$message.error('修改失败')
          }
        })
        this.dialogVisible3=false
      },
      shanchushangpinpinpaimethod:function(){    // 删除商品品牌
        deleteCommodityCatalogWeb(this.shangpinpinpaiParentId ,this.isCommodity).then(response => {
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.brand=''
            getCommodityCatalogListOptionInfoList1(this.shangpinleiParentId).then(response => {
              this.options1 = response.arrayList
            })
          } else {
            this.$message.error('删除失败')
          }
        })
        this.dialogVisible1=false
      },
      shanchuxinghaomethod:function(){    // 删除型号
        deleteCommodityCatalogWeb(this.xinghaoParentId ,this.isCommodity).then(response => {
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.typ=''
            getCommodityCatalogListOptionInfoList1(this.shangpinpinpaiParentId).then(response => {
              this.options2 = response.arrayList
            })
          } else {
            this.$message.error('删除失败')
          }
        })
        this.dialogVisible2=false
      },
      shanchuhanliangmethod:function(){    // 删除含量
        deleteCommodityCatalogWeb(this.hanliangParentId ,this.isCommodity).then(response => {
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.volume=''
            getCommodityCatalogListOptionInfoList1(this.xinghaoParentId).then(response => {
              this.options3 = response.arrayList
            })
          } else {
            this.$message.error('删除失败')
          }
        })
        this.dialogVisible3=false
      },
      empty() {
        this.filterText = ''
      },
      showtxm(){       // 展示条形码搜索框
        this.clear()
        getVentasCommodityPriceOptionList().then(response => {   // 获取左侧序列
          this.result=[{}]
          for (let item of response.resultList) {
            this.result.push({"value": item.codigo})
          }
        })
        this.filterText=''
        this.txm = true;
        this.yq = false;
        this.spmc = false;
        this.lpmc=false;
      },
      showlpmc(){    //展示类型品牌描述尺寸搜索框
        this.clear()
        this.filterText=''
        this.lpmc=true;
        this.txm = false;
        this.yq = false;
        this.spmc = false
      },
      showyq(){     // 展示引擎查询搜索框
        this.clear()
        getVentasCommodityPriceOptionList().then(response => {   // 获取左侧序列
          this.result=[{}]
          for (let item of response.resultList) {
            this.result.push({"value": item.codigoAndDescripcion})
          }
        })
        this.filterText=''
        this.yq = true;
        this.txm = false;
        this.spmc = false
        this.lpmc=false;
      },
      showspmc(){     // 展示商品名称搜索框
        this.clear()
        getVentasCommodityPriceOptionList().then(response => {   // 获取左侧序列
          this.result=[{}]
          for (let item of response.resultList) {
            this.result.push({"value": item.descripcion})
          }
        })
        this.filterText=''
        this.spmc = true;
        this.yq = false;
        this.txm = false
        this.lpmc=false;
      },
      clear(){
        this.codigoEntreno = ''
        this.codigo = ''
        this.price = ''
        this.descripcion=''
        this.priceId = ''
        this.commodityId= ''
        this.orderNum = ''
        this.options1 = []
        this.options2 = []
        this.options3 = []
        this.category= '',
        this.brand='',
        this.typ= '',
        this.volume=''
      },
      search(res){       //条形码查询方法
        getCommodityPriceFormByIndexCodigoWeb(res).then(response => {
              this.codigoEntreno = response.data.codigoEntreno
              this.codigo = response.data.codigo
              this.price = response.data.price
              this.descripcion=response.data.descripcion
              this.priceId = response.data.priceId
              this.commodityId= response.data.commodityId
              this.orderNum = response.data.orderNum
              // this.getCommodityPriceFormByOrderNumWeb()
              if (response.data.rubroId != null) {
                this.showshangpinpinpai =false
                this.showxinghao=true
                this.showhanliang =true
                var i = 0;
                // (response.rubroId)
                for (i; i < this.options.length; i++) {
                  if ((response.data.rubroId) == this.options[i].catalogId) {
                    this.category = this.options[i].catalogName
                    this.shangpinlei = this.options[i].catalogName;//记录选择的商品类
                    this.shangpinleiParentId = this.options[i].catalogId

                  }
                }
                // alert((response.rubroId)+"")
                getCommodityCatalogListOptionInfoList1((response.data.rubroId) + "").then(response1 => {
                  this.options1 = response1.arrayList
                  for (i = 0; i < this.options1.length; i++) {
                    if ((response.data.setmarcaId) == this.options1[i].catalogId) {
                      this.brand = this.options1[i].catalogName
                      this.shangpinpinpai = this.options1[i].catalogName;//记录选择的商品品牌
                      this.shangpinpinpaiParentId = this.options1[i].catalogId
                      this.rulelist.shangpinpinpaidialog = this.shangpinpinpai
                    }
                  }
                })

                getCommodityCatalogListOptionInfoList1((response.data.setmarcaId) + "").then(response1 => {
                  this.options2 = response1.arrayList
                  for (i = 0; i < this.options2.length; i++) {
                    if ((response.data.presentacionId) == this.options2[i].catalogId) {
                      this.typ = this.options2[i].catalogName
                      this.xinghaoParentId = this.options2[i].catalogId
                      this.xinghao = this.options2[i].catalogName;//记录选择的型号
                    }
                  }
                })
                getCommodityCatalogListOptionInfoList1((response.data.presentacionId) + "").then(response1 => {
                  this.options3 = response1.arrayList
                  for (i = 0; i < this.options3.length; i++) {
                    if ((response.data.tamanoId) == this.options3[i].catalogId) {
                      this.volume = this.options3[i].catalogName
                      this.hanliangParentId = this.options3[i].catalogId
                      this.hanliang = this.options3[i].catalogName
                    }
                  }
                })
              }

            })
      },
      search1(){     //商品名称查询方法
        var  i = 0
        for (i ;i < this.searchList.length;i++){
          if (this.filterText===this.searchList[i].codigo){
            this.search(this.filterText)
          }
        }
        // if (i===this.searchList.length) {
        //   insertSupnuevoVentasCommodityPrice().then(response => {
        //     alert(1111)
            // this.msg =  response.re
            // if (this.msg === 1) {
            //   this.$message({
            //     message: '删除成功',
            //     type: 'success'
            //   })
            //   this.fetchData()
            // } else {
            //   this.$message.error('删除失败')
            // }
        //   })
        // }
      },
      search2(){     //商品名称查询方法
        // getDescripcionListByDescripcionPrefix(this.filterText).then(response => {
        //   // this.codigoEntreno = response.tmpList.filterKey
        //   // this.codigo = response.tmpList.filterKey
        //   // this.price = response.tmpList.price
        //   this.descripcion=response.tmpList[0].label
        // })
        var  i = 0
        for (i ;i < this.searchList.length;i++){
            if (this.filterText===this.searchList[i].descripcion){
              this.search(this.searchList[i].codigo)
            }
        }
      },
      search3(){     //引擎查询方法
        // getCommodityBySearchEngineOld(this.filterText).then(response => {
        //   this.codigoEntreno = response.object.codigoEntreno
        //   this.codigo = response.object.codigo
        //   this.price = response.object.price
        //   this.descripcion=response.object.descripcion
        // })
          var  i = 0
          for (i ;i < this.searchList.length;i++){
            if (this.filterText===this.searchList[i].codigoAndDescripcion){
              this.search(this.searchList[i].codigo)
            }
          }
      },
      search4(){      //类型品牌描述尺寸查询方法

      },
      judge1(){   //判断商品品牌弹出框能否打开
        this.xiugaishangpinfenleibutton = true;
        this.shanchushangpinfenleibutton = true;
        if (this.shangpinpinpai==''){     //编辑时置空与带原值修改
          this.rulelist.shangpinpinpaidialog=''
          this.xiugaishangpinfenleibutton = false;
          this.shanchushangpinfenleibutton = false;
        }else {
          this.rulelist.shangpinpinpaidialog=this.shangpinpinpai
        }
      //  if(this.shangpinlei!=''&&this.xinghao===''){
          this.fenlei=this.shangpinlei
          this.dialogVisible1 = true
      //  }
      },
      judge2(){ //判断型号弹出框能否打开
        this.xiugaixinghaobutton = true;
        this.shanchuxinghaobutton = true;
        if (this.xinghao==''){
          this.xiugaixinghaobutton = false;
          this.shanchuxinghaobutton = false;
          this.rulelist.xinghaodialog=''
        }else {
          this.rulelist.xinghaodialog=this.xinghao
        }
       // if(this.shangpinlei!=''&&this.shangpinpinpai!=''&&this.hanliang==''){
          this.fenlei=this.shangpinlei+'-'+this.shangpinpinpai
          this.dialogVisible2 = true
       // }
      },
      judge3(){ //判断含量弹出框能否打开
        this.xiugaihanliangbutton = true;
        this.shanchuhanliangbutton = true;
        if (this.hanliang==''){
          this.xiugaihanliangbutton = false;
          this.shanchuhanliangbutton =false;
          this.rulelist.hanliangdialog=''
        }else {
          this.rulelist.hanliangdialog=this.hanliang
        }
        // if(this.shangpinlei!=''&&this.shangpinpinpai!=''&&this.xinghao!=''){
          this.fenlei=this.shangpinlei+'-'+this.shangpinpinpai+'-'+this.xinghao
          this.dialogVisible3 = true
       // }
      },
      deleteSupnuevoVentasCommodityPrice(){
        deleteSupnuevoVentasCommodityPriceWeb(this.priceId).then(response => {
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message.error('删除失败')
          }
        })
      },
      clearSupnuevoVentasCommodityPrice(){
        clearSupnuevoVentasCommodityPriceWeb(this.priceId).then(response => {
          this.msg =  response.re
          if (this.msg === 1) {
            this.$message({
              message: '清除成功',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message.error('清除失败')
          }
        })
      },
      saveOrUpdateSupnuevoVentasCommodityPrice(){
        saveOrUpdateSupnuevoVentasCommodityPriceWeb(this.priceId,this.commodityId,this.codigoEntreno+'',this.codigo,this.price+'').then(response => {
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
      saveOrUpdateSupnuevoVentasCommodity(){
        saveOrUpdateSupnuevoVentasCommodityWeb(this.priceId,this.commodityId,this.hanliangParentId,this.codigo,this.descripcion).then(response => {
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
         handdle(event) {
         console.log(event)
     }
    }
  }
</script>
<style>
  /* 用来设置当前页面element全局table的内间距 */
  .el-table__row td{
    padding: 0;
  }
  /* 用来设置当前页面element全局table 选中某行时的背景色*/
  .el-table__body tr.current-row>td{
    background-color: #e3f1e9 !important;
    /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
  }
  /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #def1ee;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
  }
</style>


