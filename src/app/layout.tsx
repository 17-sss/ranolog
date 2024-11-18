import {PropsWithChildren} from 'react';

import {Metadata} from 'next';

import './root.css';

export const metadata: Metadata = {
  title: 'VROOM',
  description: '시나리오기반의 모의훈련을 위한 훈련장입니다.',
  keywords: ['aio', 'allitone', 'gym', '올잇원'],
  openGraph: {
    type: 'website',
    siteName: 'VROOM',
    title: 'VROOM',
    description: 'ALL IT ONE - VROOM',
    images:
      'https://user-images.githubusercontent.com/28799597/151486258-bcb83586-7c60-4da4-9300-95ba44d4ae01.png',
    url: 'https://v-room.kr',
  },
};

interface RootLayoutProps extends PropsWithChildren {}

async function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang={'ko'}>
      <head></head>
    </html>
  );
}
export default RootLayout;
