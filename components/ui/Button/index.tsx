'use client';

import { useSoundEffect } from '@/hooks/useSoundEffect';
import { useSoundStore } from '@/stores/soundStore';
import { useThemeStore } from '@/stores/themeStore';
import type { ButtonParams } from '@/types/components';
import { useState } from 'react';

import { Flex } from 'antd';
import './index.scss';

/**
 * Button 组件用于渲染一个可交互的按钮。
 *
 * @param {string} props.text - 按钮上显示的文本内容
 * @param {'small' | 'medium' | 'large'} props.size - 按钮的尺寸大小
 * @param {React.ReactNode} props.icon - 按钮的图标
 * @param {() => void} props.onClick - 按钮点击事件处理函数
 **/
const Button = ({ text, size, icon, onClick, style }: ButtonParams) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const { theme } = useThemeStore();
  const { effectsVolume } = useSoundStore();

  const undertaleSound = useSoundEffect({ audioSrc: '/sounds/effects/undertale-button.wav' });
  // const touhouSound = useSoundEffect('/sounds/touhou-button.mp3')
  const handleMouseEnter = () => {
    if (hasInteracted) {
      if (effectsVolume) {
        if (theme === 'undertale') undertaleSound.play();
        // else
        //   touhouSound.play()
      }
    }
  };

  const handleClick = () => {
    // 标记用户已交互
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    // 执行原始点击处理
    if (onClick) onClick();
  };

  return (
    <button
      className={`${theme} ${size}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      style={style}
    >
      <Flex justify="space-evenly" align="center">
        {icon}
        {text
          .toUpperCase()
          .split('')
          .map((char, index) => (
            <span key={index}>{char}</span>
          ))}
      </Flex>
    </button>
  );
};

export default Button;
