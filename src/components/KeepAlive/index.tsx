import React, { useEffect } from 'react';
import { useIntl, useModel, KeepAlive } from 'umi';

const KeepAlivePage = (props: any) => {
  const intl = useIntl();
  const { dispatch, tabList } = useModel('system');

  useEffect(() => {
    const localTabList = JSON.parse(JSON.stringify(tabList));
    const isExit = localTabList.findIndex((item: any) => item.pathname === props.location.pathname);
    if (isExit < 0) {
      localTabList.push({
        ...props.location,
        title: intl.formatMessage({ id: props.route.keepAliveName }),
        keepAliveName: props.route.keepAliveName,
      });
      dispatch({
        type: 'CHANGESTATE',
        payload: { tabList: localTabList, active: localTabList.length - 1 },
      });
    } else {
      dispatch({ type: 'CHANGESTATE', payload: { active: isExit } });
    }
  }, []);

  if (props.route.keepAlive) {
    return (
      <KeepAlive saveScrollPosition={props.route.saveScrollPosition ?? 'screen'} name={props.route.keepAliveName}>
        {props.children}
      </KeepAlive>
    );
  }
  return props.children;
}

export default KeepAlivePage
