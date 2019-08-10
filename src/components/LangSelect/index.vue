<template>

  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <span style="font-size:18px;color:white;margin-left: 8px">{{ $t('base.curLanguage') }}:{{ showLanguage }}</span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='es'" command="es">Español</el-dropdown-item>
    </el-dropdown-menu>

  </el-dropdown>

</template>

<script>
  export default {
    name:'langSelect',

    computed: {
      language() {
        return  this.$i18n.locale;
      },
      showLanguage() {
        switch (this.language) {
          case 'zh':
            return '中文'
          case 'es':
            return 'español'
          default:
            return '未知'
        }
      }
    },
    methods: {
      handleSetLanguage(lang) {
        this.$i18n.locale = lang

      }
    }
  }
</script>

