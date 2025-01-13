import React from 'react';
import ReactDom from 'react-dom';

type LoadingPortalProps = {
  children: React.ReactNode;
};

const LoadingPortal = ({ children }: LoadingPortalProps) => {
  const el = document.getElementById('loading-root') as HTMLElement; // 타입 단언 사용
  return ReactDom.createPortal(children, el);
};

export default LoadingPortal;
