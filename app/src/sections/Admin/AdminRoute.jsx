const AdminRoute = () => {
  // const [authed, setAuthed] = useState(null);
  // useEffect(() => { ... }, []);
  // if (authed === null) return <div>Checking session...</div>;
  // if (authed === false) return <Navigate to="/Admin/Login" replace />;
  return <Outlet />;   // TEMP: bypass auth for layout testing
};
export default AdminRoute;