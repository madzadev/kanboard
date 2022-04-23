const LogOut = () => {
  const onClick = async () => {
    try {
      const login = await api.logout();
      setUser("");
      router.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <button onClick={onClick}>Log out</button>
    </div>
  );
};

export default LogOut;
