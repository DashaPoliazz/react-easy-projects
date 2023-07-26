import React, { useEffect, useState } from "react";
import "./styles/index.scss";
import { User } from "./components/User/User";
import { Skeleton } from "./components/User/Skeleton";
import { IUser } from "./types/user";
import { Success } from "./components/Success";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [isInvitesSend, setIsInvitesSend] = useState(false);

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((json) => setUsers(json.data))
      .catch((e) => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleInviteUser = (id: number) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          isInvited: !user.isInvited,
        };
      } else {
        return user;
      }
    });

    setUsers(updatedUsers);
  };

  const hanldeSendInvitations = () =>
    setIsInvitesSend((prevState) => !prevState);

  const getFilteredUsers = () => {
    return users.filter((user) => {
      const name = (user.first_name + user.last_name).toUpperCase();
      const upperCasedSearch = search.toUpperCase();

      return (
        name.includes(upperCasedSearch) ||
        user.email.toUpperCase().includes(upperCasedSearch)
      );
    });
  };

  const guestsNumber = users.filter((user) => user.isInvited).length;

  return (
    <div className="App">
      {isInvitesSend ? (
        <Success onBack={hanldeSendInvitations} count={guestsNumber} />
      ) : (
        <>
          <div className="search">
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
            </svg>
            <input
              onChange={handleInputChange}
              value={search}
              type="text"
              placeholder="Search user..."
            />
          </div>
          <ul className="users-list">
            {getFilteredUsers().map((user) => (
              <User
                key={user.id}
                {...user}
                onInvite={handleInviteUser}
                isLoading={isLoading}
              />
            ))}
          </ul>
          <button onClick={hanldeSendInvitations} className="send-invite-btn">
            Send Invitation
          </button>
        </>
      )}
    </div>
  );
}

export default App;
