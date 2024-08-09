import React from 'react';
import Profile from 'ui-component/Components/Produit/InfoProduit';
import MainCard from 'ui-component/cards/MainCard';

function ProfileProduit() {
  return (
        <MainCard title="Produits" className="h-100">
            <Profile></Profile>
      </MainCard>
  );
}

export default ProfileProduit;