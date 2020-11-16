import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FaCog } from 'react-icons/fa';
import { Container, UserContainer } from './styles';

interface HeaderProps {
  userName: string;
  profilePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ userName, profilePage }) => {
  return (
    <Container>
      <div>
        <UserContainer>
          Welcome,
          <Link to="/me">{userName}</Link>
          {profilePage && (
            <Link to="/" title="Update profile">
              <FaCog size={22} color="#F4EDE8" />
            </Link>
          )}
        </UserContainer>

        <button title="Sign out" type="button">
          <FiPower size={22} color="#fff" />
        </button>
      </div>
    </Container>
  );
};

export default Header;
