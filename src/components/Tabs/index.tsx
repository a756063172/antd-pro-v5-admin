import React from 'react';
import { Tabs } from 'antd';
import { useModel, history, useAliveController } from 'umi'
import styles from './tabs.less';

// @ts-ignore
const { TabPane } = Tabs

const TabBox = () => {
  const { dispatch, tabList, active } = useModel("system");
  const { dropScope } = useAliveController()

  const onTabClick = (key: string) => {
    dispatch({
      type: 'CHANGESTATE',
      payload: { active: Number(key) },
    });

    history.push(tabList[Number(key)])
  }

  const onTabEdit = (targetKey: any, action: string) => {
    const localTabList = JSON.parse(JSON.stringify(tabList))
    const currentRoute = tabList[active]
    let activeIndex: number = 0;
    const actionKey = Number(targetKey)
    if (action === 'remove') {
      localTabList.splice(actionKey, 1)
      if (actionKey === active) { // 删除当前路由页
        if (active > 0) {
          activeIndex = active - 1
          const timer = setTimeout(() => {
            clearTimeout(timer)
            history.push(tabList[activeIndex])
          }, 10)
        } else {
          activeIndex = 0
          const timer = setTimeout(() => {
            clearTimeout(timer)
            history.push(localTabList[activeIndex + 1])
          }, 10)
        }

        const unListen = history.listen(() => {
          unListen()
          const dropTimer = setTimeout(() => {
            clearTimeout(dropTimer)
            dropScope(currentRoute.keepAliveName)
          }, 10)
        })

        dispatch({ type: "CHANGESTATE", payload: { tabList: localTabList, active: activeIndex } })
      } else { // 删除其它路由页
        dropScope(tabList[actionKey].keepAliveName)
        dispatch({ type: "CHANGESTATE", payload: { tabList: localTabList, active: actionKey > active ? active: active -1  } })
      }
    }
  }

  return (
      <div className={styles.tabsBar}>
        {
         <Tabs
            hideAdd
            activeKey={`${active}`}
            type="editable-card"
            onTabClick={onTabClick}
            onEdit={onTabEdit}
          >
            {
              tabList.map((value, index) => {
                // eslint-disable-next-line react/no-array-index-key
                return <TabPane tab={value.title} key={index}/>
              })
            }
          </Tabs>
        }
      </div>
  );
}

export default TabBox;
