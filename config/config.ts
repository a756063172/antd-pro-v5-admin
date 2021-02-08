// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import AppUrl from './url';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  devtool: false,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'font-size-sm': '12px',
    'text-color': '#333',
    'layout-body-background': '#f0f2f5',
    'layout-header-background': '#001529',
    'tab-left-menu': '#5E5E5E',
    'black': '#000',
    'close-icon-hover': '#ccc',
  },
  define: {
    'process.env.API_SERVER': AppUrl.API_SERVER, // 这里是重点吧，获取配置
    'process.env.API_OAUTH_SERVER': AppUrl.API_OAUTH_SERVER, // 鉴权地址
  },
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // https://github.com/zthxxx/react-dev-inspector
  plugins: ['react-dev-inspector/plugins/umi/react-inspector'],
  inspectorConfig: {
    // loader options type and docs see below
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  resolve: {
    includes: ['src/components'],
  },
  chainWebpack: function(config, { webpack }) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }: any) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
            antd_pro: {
              name: 'antd_pro',
              test: /pro-table|pro-field|pro-form|pro-descriptions|pro-cil|pro-skeleton|pro-layout|pro-utils|pro-provider/,
              priority: 11,
              chunks: 'async',
              enforce: true,
            },
            ant_compatible: {
              name: 'ant_compatible',
              test: /ant-design_compatible/,
              priority: 11,
              chunks: 'async',
              enforce: true,
            },
            antd_es: {
              name: 'antd_es',
              test: /antd[\\/]es/,
              priority: 11,
              chunks: 'async',
              enforce: true,
            },
            antd_lib: {
              name: 'antd_lib',
              test: /antd[\\/]lib/,
              priority: 11,
              chunks: 'async',
              enforce: true,
            },
            ant_icon_svg: {
              name: 'ant_icon_svg',
              //打包成单独文件
              // name(module:any) {
              // const packageName = module.resource.match(/[a-z|A-Z]*.js/);
              // if (!packageName) return 'ant_icon_svg';
              // return packageName;
              // },
              test: /ant-design_icons-svg/,
              priority: 12,
              chunks: 'async',
              enforce: true,
            },
          },
        },
      },
    });
  },
});
