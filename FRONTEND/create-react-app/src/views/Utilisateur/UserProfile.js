import React from 'react';
import Profile from 'ui-component/Components/Utilisateur/Profile/index';
import MainCard from 'ui-component/cards/MainCard';

function ProfileClient() {
  return (
    <MainCard title="Clients" style={{height:"98%"}}>
      <Profile></Profile>
  </MainCard>
  );
}

export default ProfileClient;