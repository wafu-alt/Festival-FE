import { ReactNode, useCallback } from 'react';
import Link from 'next/link';
import TopArrow from '../../public/images/top_arrow.svg';
import Head from 'next/head';

/** 레이아웃 props 인터페이스 */
interface ILayoutProps {
  children?: ReactNode;
}

export default function Layout(props: ILayoutProps) {
  // props 파싱
  const { children } = props;

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Head>
        <title>Festibal Moa</title>
      </Head>

      {/* 전체 크기 조절 */}
      <div className="relative responsive-screen mx-auto ">
      </div>
    </>
  );
}
