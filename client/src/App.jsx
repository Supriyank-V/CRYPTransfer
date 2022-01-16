import { NavBar, Welcome , Footer, Transaction } from './components'

const App = () => {
  return (
    <div className="min-h-screen">
        <div className="gradient-bg-welcome">
            <NavBar />
            <Welcome />
        </div>
        <Transaction />
        <Footer />
    </div>
  )
}

export default App
