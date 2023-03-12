import '../assets/css/TablePage.css';
import { Table } from './Table';

const Header = () => {
    return (
      <header className="header">
        <div className="header__logo"></div>
        <div className="header__brand">Flagright</div>
        <nav className="header__nav">
          <ul className="header__menu">
            <li className="header__menu-item"><a href="/">Home</a></li>
            <li className="header__menu-item"><a href="/">About</a></li>
            <li className="header__menu-item"><a href="/">Services</a></li>
            <li className="header__menu-item"><a href="/">Contact</a></li>
          </ul>
        </nav>
      </header>
    );
};
  
const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2023 Flagright</p>
    </footer>
  );
}

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
      </div>
    </section>
  );
}

export const TablePage = () => {
  return (
    <div className="App">
      <Header />
      <main className='cc'>
        <HeroSection />
        <h1 className="formTitle"> Transactions Data </h1>
        <div className="container">
          <Table/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
