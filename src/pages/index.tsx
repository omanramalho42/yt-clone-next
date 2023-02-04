import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet'
import { Header, Main } from '../components'
// import useDarkSide from '../hooks/useDarkSide'

const Home: NextPage = () => {  
  const [useShowToggleMenu, setUseShowToggleMenu] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

	// const [colorTheme] = useDarkSide();
	// useEffect(() => { console.log(colorTheme,'theme') },[colorTheme])

  return (
    <div>
      <Head>
        <Helmet>
          <title>Agym Care</title>
        </Helmet>
      </Head>
      

      <main className={`w-full h-[100vh] dark:bg-[#121212] bg-gray-100 `}>
        {/* HEADER */}
        <Header
          setSearch={setSearch}
          setShow={setUseShowToggleMenu} 
        />
        {/* INFO */}
        <Main 
          search={search}
          show={useShowToggleMenu} 
        />
      </main>

    </div>
  )
}

export default Home