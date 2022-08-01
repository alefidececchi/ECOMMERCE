const getByName = ({ users, name }) => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );
};

module.exports = {
  getByName,
};
