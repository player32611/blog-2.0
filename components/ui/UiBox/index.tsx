'use client';

import { useLoading } from '@/hooks/useLoading';
import { useThemeStore } from '@/stores/themeStore';

import { Flex, Progress } from 'antd';
import Button from '../Button';
import './index.scss';

export default function UiBox() {
  const { loadingIn } = useLoading();
  const { theme } = useThemeStore();
  return (
    <Flex className={`uibox ${theme}`} vertical={true}>
      <Flex align="center" className="userState">
        <Flex align="center" className="userName" justify="center">
          FRISK
        </Flex>
        <Flex align="center" className="userLevel" justify="center">
          <div>LV</div>
          <div>19</div>
        </Flex>
        <Flex align="center" className="userHp">
          <div>HP</div>
          <Progress
            className="userHpProgress"
            percent={50}
            railColor="#C00000"
            showInfo={false}
            size={{ height: 21 * 2, width: 92 * 1.25 * 2 }}
            strokeColor="#FFFF00"
            strokeLinecap="butt"
          ></Progress>
          <div>KR</div>
          <div>92</div>
          <div>/</div>
          <div>92</div>
        </Flex>
      </Flex>
      <Flex justify="space-evenly">
        <Button
          text="blog"
          size="large"
          icon={<span className="icon">&#xe99c;</span>}
          onClick={() => {
            loadingIn('/blog');
          }}
        ></Button>
        <Button
          text="music"
          size="large"
          icon={<span className="icon">&#xe99a;</span>}
          onClick={() => {}}
        ></Button>
        <Button
          text="image"
          size="large"
          icon={<span className="icon">&#xe997;</span>}
          onClick={() => {}}
        ></Button>
      </Flex>
    </Flex>
  );
}
