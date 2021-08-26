import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  //this function will set the data in our app
  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch = (e) => {
    console.log(e.target.value);

    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        //if user not found
        if (data.message) {
          setError(data.message); //just pass message in
        } else {
          setData(data); //otherwise user is found
          setError(null);

          console.log(data);
        }
      });
  };

  return (
    <div>
      <Header>Github Profile Search</Header>

      {error ? (
        <div className="flex justify-center items-center font-bold ">
          {error}
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <div>
              <img src={avatar} alt="profile-pic" />
              <div>
                <div className="font-bold">{name}</div>
                <Description>Followers: {followers}</Description>
                <Description>Following: {following}</Description>
                <Description>Repos: {repos}</Description>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center pt-6">
          <div className="p-5">
            <input
              autoComplete="off"
              className="border-2 border-gray-300 focus:outline-none"
              type="text"
              placeholder="Search User"
              name="github user"
              onChange={handleSearch}
            />
          </div>
          <div>
            <Button>Search</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Header(props) {
  return (
    <div className="p-10 bg-blue-500 text-center font-black text-5xl mb-5">
      {props.children}
    </div>
  );
}

function Button(props) {
  return (
    <button className="bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 inline-block">
      {props.children}
    </button>
  );
}

function Description(props) {
  return (
    <div className="flex border border-gray-300 justify-center text-gray-400 m-1">
      {props.children}
    </div>
  );
}

export default App;
