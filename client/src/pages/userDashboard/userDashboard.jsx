import { useSelector } from "react-redux";

const UserDashboard = () => {
  const user = useSelector((state) => state.userData);

  return (
    <div className="pt-16">
      <h1>Test 1</h1>
      {user.loading && <div>Loadind</div>}
      {user.data && <div>{user.data.name}</div>}
      {user.data && <div>{user.data._id}</div>}
      {user.data && <div>{user.data.email}</div>}
      {user.error && <div>{error}</div>}
    </div>
  );
};

export default UserDashboard;
