import PropTypes from 'prop-types';
import axios from 'axios';

export default function Home({ isLoggedIn, onLogout }) {
  const storedUser = sessionStorage.getItem('user');
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const username = parsedUser?.username || "";

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8080/api/auth/signout");
      onLogout();
      console.log("Log out successful!");
    } catch (error) {
      console.error("Failed to logout", error.response?.data || error.message);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h2>Hi, {username}. Thanks for logging in!</h2>
          <header className="jumbotron">
            <h3>
              <strong>{parsedUser?.username}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {parsedUser?.accessToken.substring(0, 20)} ...{" "}
            {parsedUser?.accessToken.substr(parsedUser?.accessToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong> {parsedUser?.id}
          </p>
          <p>
            <strong>Email:</strong> {parsedUser?.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {parsedUser?.roles &&
              parsedUser?.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h2>Please Login</h2>
      )}
    </div>
  );
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};
