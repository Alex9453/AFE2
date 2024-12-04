import LoginForm from './login/login-form';

export default function Home() {
  return (
    <div className="page-container">
      <h1>Velkommen til Fitness App</h1>
      <LoginForm />
    </div>
  );
}