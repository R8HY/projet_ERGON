import React from 'react';
import Flux from 'ui-component/Components/Compte/Lists/ListeFlux';
import MainCard from 'ui-component/cards/MainCard';

function FluxView() {
  return (
    <MainCard title="Comptes > Flux" style={{height:"100%"}}>
      <Flux></Flux>
  </MainCard>
  );
}

export default FluxView;