import React from 'react';
import Compte from 'ui-component/Components/Compte/dashboardmain/Default/index';
import MainCard from 'ui-component/cards/MainCard';

function CompteView() {
  return (
    <MainCard title="Comptes" style={{height:"100%"}}>
      <Compte></Compte>
  </MainCard>
  );
}

export default CompteView;