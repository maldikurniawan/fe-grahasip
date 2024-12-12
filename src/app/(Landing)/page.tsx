import Header from '@/components/layout/Header'
import React from 'react'
import Hero from './Hero'
import Solusi from './Solusi'
import Keuntungan from './Keuntungan'
import Kegiatan from './Kegiatan'
import Team from './Team'
import Pertanyaan from './Pertanyaan'
import Footer from '@/components/layout/Footer'

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