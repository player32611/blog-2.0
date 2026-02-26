'use client';

import { useLoading } from '@/hooks/useLoading';

import { Flex } from 'antd';
import Button from '../Button';
import './index.scss';

export default function UiBox() {
  const { loadingIn } = useLoading();
  return (
    <div className="uibox">
      <Flex>
        <Button
          text="blog"
          size="large"
          icon={<span className="iconfont">&#xe600;</span>}
          onClick={() => loadingIn('/blog')}
        ></Button>
        <Button
          text="item"
          size="large"
          icon={<span className="iconfont">&#xe600;</span>}
          onClick={() => {}}
        ></Button>
      </Flex>
    </div>
  );
}
