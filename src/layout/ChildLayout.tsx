import React from 'react';
import Tabs from '@/components/Tabs';

const ChildLayout = (children: React.ElementType) => {
  return (
    <>
      {window.location.pathname !== '/user/login' && <Tabs />}
      {children}
    </>
  );
};
export default ChildLayout;
