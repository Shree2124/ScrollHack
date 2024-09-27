import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
    </div>
  );
};

export default Dashboard;
