import { useReducer } from 'react';

interface InitialState {
  collapsed: boolean
  tabList: TabItem[]  // 所有的应有的点击过后的路由
  active: number   // 当前的路由的索引值
}


interface TabItem {
  hash: string
  key: string
  pathname: string
  title: string
  query: { [key: string]: any }
  search: string
  state: any
  keepAliveName: string
}

interface InitialStateType {
  collapsed?: boolean
  tabList?: TabItem[] // 所有的应有的点击过后的路由
  active?: number // 当前的路由的索引值
}

interface StateType extends InitialState {
  dispatch: React.Dispatch<{
    type: 'CHANGESTATE';
    payload: InitialStateType;
  }>
}

export default function useSystem(): StateType {

  const initialState: InitialState = {
    collapsed: false, // 菜单是否折叠
    tabList: [],
    active: 0,
  };

  const reducer = (state: InitialState, { type, payload }: { type: 'CHANGESTATE', payload: InitialStateType }) => {
    switch (type) {
      case 'CHANGESTATE': {
        return { ...state, ...payload };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return { ...state, dispatch };
}
