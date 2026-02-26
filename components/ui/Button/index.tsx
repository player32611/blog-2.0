'use client';

import { useSoundEffect } from '@/hooks/useSoundEffect';
import { useSoundStore } from '@/stores/soundStore';
import { useThemeStore } from '@/stores/themeStore';
import type { ButtonParams } from '@/types/ui';
import { useState } from 'react';

import { Flex } from 'antd';
import './index.scss';

const Button = ({ text, size, icon, onClick }: ButtonParams) => {
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
    <button className={`${theme} ${size}`} onClick={handleClick} onMouseEnter={handleMouseEnter}>
      <Flex align="center">
        {icon}
        {text.toUpperCase()}
      </Flex>
    </button>
  );
};

export default Button;
