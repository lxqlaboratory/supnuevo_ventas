import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementEsLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import esLocale from './es'
import zhLocale from './zh'


Vue.use(VueI18n)

const messages = {
  es: {
    ...esLocale,
    ...elementEsLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }

}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: 'es',
  // set locale messages
  messages
})

export default i18n

