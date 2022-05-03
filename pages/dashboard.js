import AuthWrapper from "../components/AuthWrapper";

const Dashboard = () => {
  return (
    <AuthWrapper>
      <h1>This is the dashboard page</h1>
      <h3>Total tasks: 13</h3>
      <h3>Total users: 23</h3>
      <h3>Calendar</h3>
      <h3>Recent activity</h3>
    </AuthWrapper>
  );
};

export default Dashboard;
