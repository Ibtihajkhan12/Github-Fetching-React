import React, { useState } from "react";
import "./Fetching.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchGithubUser = async () => {
    if (!username) return;

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.status === 404) {
        setUserData(null);
        setNotFound(true);
      } else {
        const data = await response.json();
        setUserData(data);
        setNotFound(false);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUserData(null);
      setNotFound(true);
    }
  };

  return (
    <div className="app">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Profile..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchGithubUser}>Search</button>
      </div>

      <div className="card">
        {userData ? (
          <>
            <img src={userData.avatar_url} alt="Avatar" />
            <h2>{userData.name || "No Name"}</h2>
            <p>{userData.login}</p>
            <div className="stats">
              <span><strong>{userData.followers}</strong> Followers</span>
              <span><strong>{userData.following}</strong> Following</span>
              <span><strong>{userData.public_repos}</strong> Repositories</span>
            </div>
            <a href={userData.html_url} target="_blank" rel="noreferrer">
              Visit Github Profile &gt;
            </a>
          </>
        ) : (
          <>
            <img src="https://picsum.photos/200" alt="default-avatar" />
            <h2>Profile Name</h2>
            <p>profile_username</p>
            <div className="stats">
              <span><strong>00</strong> Followers</span>
              <span><strong>00</strong> Following</span>
              <span><strong>00</strong> Repositories</span>
            </div>
            <a href="#">Visit Github Profile &gt;</a>
            {notFound && (
              <p style={{ color: "red", marginTop: "1rem" }}>
                User not found!
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
