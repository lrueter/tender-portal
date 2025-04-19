import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import LoginPage from './components/LoginPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

export default App; 