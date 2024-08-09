import React, {useEffect, useState} from "react";
// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
//import {useParams} from 'react-router-dom';
//import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import ListeCommande from 'ui-component/Components/Commande/ListeCommande';
import AOS from 'aos';
import 'aos/dist/aos.css'

// ===============================|| UI COLOR ||=============================== //


function UIColor() {
  const [showScrollBar, setShowScrollBar] = useState(false);
  
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <MainCard className="h-100" title="Payements" xs={20} sm={20} md={20} lg={20}>
        <Grid container style={{width:"100%", maxHeight:"800px", overflowY: showScrollBar?"auto":"hidden"}} onMouseOver={()=>setShowScrollBar(true)}
                onMouseOut={()=>setShowScrollBar(false)}>
              <ListeCommande payements={true}/>
        </Grid>
      </MainCard>
  );
}

export default UIColor;
