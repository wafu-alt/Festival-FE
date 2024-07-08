import { ReactNode, useCallback } from 'react';
import Link from 'next/link';
import TopArrowSVG from '../../public/images/top_arrow.svg';
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
        {/* 헤더 영역 */}
        <header className="p-4 max-w-screen-2xl ">
          {/* 헤더 네비게이션 영역 */}
          <nav className="navbar container mx-auto flex justify-between  bg-base-100">
            <Link href="/">
              <h1>
                <a className="btn btn-ghost text-xl font-bold ">Festival Moa</a>
              </h1>
            </Link>
          </nav>
        </header>

        {/* 컨텐츠 메인 내용 */}
        <main className="flex-grow container mx-auto p-4 responsive-contents">{children}</main>
        {/* 상단으로 이동 버튼 */}
        <div className="fixed right-[2%] bottom-[2%]">
          <button onClick={handleScrollToTop} className="btn btn-circle bg-transparent">
            <TopArrowSVG className="h-9 w-9" />
          </button>
        </div>

        {/* 푸터 영역 */}
        <footer className="p-4">
          <div className="container mx-auto p-2">
            <p>해당 자료 출처는 대한민국 공공데이터포털입니다</p>

            <Link href={'https://www.data.go.kr/data/15013104/standard.do#/tab_layer_open'}>
              <a>바로가기</a>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
