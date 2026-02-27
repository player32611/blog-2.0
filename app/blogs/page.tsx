'use client';

import { useLoading } from '@/hooks/useLoading';

import Button from '@/components/ui/Button';

export default function Page() {
  const { loadingIn } = useLoading();
  return (
    <>
      <div>blogs</div>
      <Button
        text="back"
        icon={<span className="icon">&#xeaf1;</span>}
        size="small"
        onClick={() => {
          loadingIn('/');
        }}
        style={{
          position: 'fixed',
          left: '20px',
          top: '20px',
        }}
      ></Button>
      <Button
        text="menu"
        icon={<span className="icon">&#xeaf1;</span>}
        size="small"
        onClick={() => {}}
        style={{
          position: 'fixed',
          right: '20px',
          top: '20px',
        }}
      ></Button>
    </>
  );
}
