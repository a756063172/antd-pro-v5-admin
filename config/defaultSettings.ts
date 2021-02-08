import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  title: '后台管理系统',
  pwa: false,
  iconfontUrl: '',
  menu: {
    locale: true,
  },
  headerHeight: 48,
};

export default Settings;
