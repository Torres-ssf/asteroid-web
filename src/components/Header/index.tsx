import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { Container, UserContainer } from './styles';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <Container>
      <div>
        <UserContainer>
          Welcome,
          <Link to="/profile">{userName}</Link>
        </UserContainer>

        <button title="Sign out" type="button">
          <FiPower size={20} color="#fff" />
        </button>
      </div>
    </Container>
  );
};

export default Header;
