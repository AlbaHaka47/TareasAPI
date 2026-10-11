import Auth from '../components/auth/Auth';

function Home({ onLogin }) {
  return <Auth onLogin={onLogin} />;
}

export default Home;
