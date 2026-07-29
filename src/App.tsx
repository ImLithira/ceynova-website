import Nav from './components/Nav'
import Hero from './components/Hero'
import Pillars from './components/Pillars'
import Services from './components/Services'
import WhyCeynova from './components/WhyCeynova'
import Connect from './components/Connect'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pillars />
        <Services />
        <WhyCeynova />
        <Connect />
      </main>
      <Footer />
    </>
  )
}
