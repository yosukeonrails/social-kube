import React from 'react';

function UserInfoHeader(props) {
  // eslint-disable-next-line react/prop-types
  const { userInfo, logout } = props;
  const greeting = `Hello ${userInfo.given_name}!`;
  return (
    <div className="user-info-header">
      <h3>
        {greeting}
        {' '}
      </h3>
      <button type="button" onClick={logout}>Log out</button>
    </div>
  );
}

export default UserInfoHeader;
