import { Header, Footer } from '@/components'
import React from 'react'
import Hero from './Hero'
import Solusi from './Solusi'
import Keuntungan from './Keuntungan'
import Kegiatan from './Kegiatan'
import Team from './Team'
import Pertanyaan from './Pertanyaan'

const Home = () => {
    return (
        <main>
            <Header />
            <Hero />
            <Solusi />
            <Keuntungan />
            <Kegiatan />
            <Team />
            <Pertanyaan />
            <Footer />
        </main>
    )
}

export default Home