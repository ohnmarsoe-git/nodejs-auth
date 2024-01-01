const handleLogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json("Logout successfully");
}

export {
  handleLogout
}