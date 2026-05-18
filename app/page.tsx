import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Acerca from '@/components/Acerca'
import Artistas from '@/components/Artistas'
import Portfolio from '@/components/Portfolio'
import Citas from '@/components/Citas'
import FAQs from '@/components/FAQs'
import Footer from '@/components/Footer'
import { FAQSchema } from './faq-schema'

export default function Home() {
  return (
    <>
      <FAQSchema />
      <Nav />
      <main style={{ paddingTop: '72px' }}>
        <Hero />
        <Ticker />
        <Acerca />
        <Artistas />
        <Portfolio />
        <Citas />
        <FAQs />
      </main>
      <Footer />
    </>
  )
}
