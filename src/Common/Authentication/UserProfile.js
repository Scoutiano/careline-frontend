var UserProfile = (function () {
  var username = "";

  var email = "";

  var role = "";

  var id = -1;

  var ttl = 1800000;

  var getUsername = function () {
    username = localStorage.getItem("username");
    return username;
  };

  var setUsername = function (value) {
    username = value;
    localStorage.setItem("username", value);
  };

  var getEmail = function () {
    email = localStorage.getItem("email");
    return email;
  };

  var setEmail = function (value) {
    email = value;
    localStorage.setItem("email", value);
  };

  var getRole = function () {
    role = localStorage.getItem("userRole");
    return role;
  };

  var setRole = function (value) {
    role = value;
    localStorage.setItem("userRole", value);
    // localStorage.setItem("userRoleExpiry", new Date().getTime() + ttl);
  };

  var getId = function () {
    id = localStorage.getItem("id");
    return id;
  };

  var setId = function (value) {
    id = value;
    localStorage.setItem("id", value);
  };

  var clear = function () {
    username = null;
    email = null;
    role = null;
    id = null;
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("userRole");
    localStorage.removeItem("id");
  };

  return {
    getUsername: getUsername,
    setUsername: setUsername,
    getEmail: getEmail,
    setEmail: setEmail,
    getRole: getRole,
    setRole: setRole,
    getId: getId,
    setId: setId,
    clear: clear,
  };
})();

export default UserProfile;
