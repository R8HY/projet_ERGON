import React from 'react';
import Profile from 'ui-component/Components/Decoration/InfoDeco';
import MainCard from 'ui-component/cards/MainCard';

function ProfileProduit() {
  return (
        <MainCard title="Décorations" className="h-100">
            <Profile></Profile>
      </MainCard>
  );
}

export default ProfileProduit;