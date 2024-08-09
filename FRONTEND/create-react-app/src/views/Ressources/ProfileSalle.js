import React from 'react';
import Profile from 'ui-component/Components/Salle/InfoSalle';
import MainCard from 'ui-component/cards/MainCard';

function ProfileProduit() {
  return (
        <MainCard title="Salles" className="h-100">
            <Profile></Profile>
      </MainCard>
  );
}

export default ProfileProduit;