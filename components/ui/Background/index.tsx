import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import Image from 'next/image';
import './index.scss';
const Background = () => {
  const viewBoxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const viewBoxData = useRef<{
    height: number;
    width: number;
  }>({
    height: 0,
    width: 0,
  });
  const imageData = useRef<{
    height: number;
    width: number;
  }>({
    height: 0,
    width: 0,
  });
  const mousePos = useRef<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const movedata = useRef<{
    moveable: boolean;
    x: number;
    y: number;
    movX: number;
    movY: number;
  }>({
    moveable: false,
    x: 0,
    y: 0,
    movX: 0,
    movY: 0,
  });
  const ani = useRef<gsap.core.Tween | null>(null); // gsap 动画
  const standardWidth = useRef<number>(1700); // 标准宽度
  const scalesNums = useRef<number>(1); // 缩放比例

  const resize = () => {
    if (viewBoxRef.current && imageRef.current) {
      viewBoxData.current.height = viewBoxRef.current.offsetHeight;
      viewBoxData.current.width = viewBoxRef.current.offsetWidth;
      imageData.current.height = imageRef.current.offsetHeight;
      imageData.current.width = imageRef.current.offsetWidth;
      movedata.current.x = 0;
      movedata.current.y = 0;
      movedata.current.movX = 0;
      movedata.current.movY = 0;
      scalesNums.current = document.body.offsetWidth / standardWidth.current;
      imageRef.current.style.transform = `scale(${scalesNums.current})`;
      gsap.to(imageRef.current, {
        transform: `translate(0,0)`,
        duration: 0,
        ease: 'power4.out',
      });
    }
  };

  const move = (x: number, y: number) => {
    if (!movedata.current.moveable || !imageRef.current) return;
    const distanceX = (x - mousePos.current.x) / scalesNums.current;
    const distanceY = (y - mousePos.current.y) / scalesNums.current;

    const newMovX = movedata.current.movX + distanceX;
    const newMovY = movedata.current.movY + distanceY;

    const maxOffsetX = Math.max(0, (imageData.current.width - viewBoxData.current.width) / 2);
    const maxOffsetY = Math.max(0, (imageData.current.height - viewBoxData.current.height) / 2);

    movedata.current.movX = Math.max(-maxOffsetX, Math.min(maxOffsetX, newMovX));
    movedata.current.movY = Math.max(-maxOffsetY, Math.min(maxOffsetY, newMovY));

    if (ani.current) ani.current.kill();
    ani.current = gsap.to(imageRef.current, {
      transform: `translate(${movedata.current.movX}px , ${movedata.current.movY}px)`,
      duration: 0.3,
      ease: 'power4.out',
    });
    mousePos.current = { x, y };
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    movedata.current.moveable = true;
    mousePos.current.x = event.clientX;
    mousePos.current.y = event.clientY;
  };

  const handleMouseUp = () => {
    movedata.current.moveable = false;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    move(event.clientX, event.clientY);
  };

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      className="viewBox"
      ref={viewBoxRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={'/sprites/background/undertale.jpg'}
        alt="background"
        width={6016 / 2}
        height={3541 / 2}
        draggable={false}
        ref={imageRef}
      ></Image>
    </div>
  );
};

export default Background;
