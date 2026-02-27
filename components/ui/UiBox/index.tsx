'use client';

import { useLoading } from '@/hooks/useLoading';
import { useThemeStore } from '@/stores/themeStore';

import { Col, Flex, Progress, Row } from 'antd';
import Button from '../Button';
import './index.scss';

export default function UiBox() {
  const { loadingIn } = useLoading();
  const { theme } = useThemeStore();
  return (
    <Flex className={`uibox ${theme}`} vertical={true}>
      <Row className="userState" justify="center" align="middle">
        <Col span={6}>
          <Flex align="center" className="userName" justify="center">
            FRISK
            <div>LV</div>
            <div>19</div>
          </Flex>
        </Col>
        <Col span={12}>
          <Row className="userState" justify="center" align="middle">
            <Col span={8}>HP</Col>
            <Col span={8}>
              <Progress
                className="userHpProgress"
                percent={50}
                railColor="#C00000"
                showInfo={false}
                size={{ height: 21 * 2, width: 92 * 1.25 * 2 }}
                strokeColor="#FFFF00"
                strokeLinecap="butt"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              ></Progress>
            </Col>
            <Col span={8}>KR 92/92</Col>
          </Row>
        </Col>
        <Col span={6}>
          <Flex align="center" className="userName" justify="center">
            13:00
          </Flex>
        </Col>
      </Row>
      <Flex justify="space-between">
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
