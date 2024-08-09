import React, {useEffect} from "react";
// material-ui
import { Grid, Button, FormControl } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import {useState} from 'react';
//import {useParams} from 'react-router-dom';
//import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import ListeCommande from 'ui-component/Components/Commande/ListeCommande';
import DateCalendar from 'ui-component/Components/Calendrier/index';
// import listClient from 'ui-component/Components/SelectableLists/Client';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import ConfirmModal from "ui-component/Components/Modals/ConfirmModal";
import MessageModal from "ui-component/Components/Modals/MessageModal";
import FormModal from "ui-component/Components/Modals/FormModal";
import FormCommande from "ui-component/Components/Commande/FormCommande";
import SelectableClient from "ui-component/Components/SelectableLists/Client";


// ===============================|| UI COLOR ||=============================== //


function UIColor() {
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [showFormAddEvent, setShowFormAddEvent] = useState(false);
  const [showMessageAdded, setShowMessageAdded] = useState(false);
  const [selectedClient, setSelectedClient] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(false);
  const [selectedPanier, setSelectedPanier] = useState(false);
  const [selectClient, setSelectClient] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  

  const handleAnnuler=()=>{
    setSelectClient(false);
    setSelectedClient(false);
  }

  return (
    <MainCard className="h-100"
      title={selectClient?"Création d'évènement":"Evènements"} xs={20} sm={20} md={20} lg={20}>
        {
          selectClient?
          <Grid>
            <MessageModal message="L'évènement a bien été ajouté" showForm={showMessageAdded} setShowForm={setShowMessageAdded}/>
            <FormModal 
              onSubmit={()=>setSubmitted(true)}
              showForm={showFormAddEvent} 
              setShowForm={setShowFormAddEvent} >
                <FormControl className="mt-4" fullWidth>
                  <FormCommande client={selectedClient}  panier={selectedPanier} event={selectedEvent} commande={selectedCommande} submitted={submitted} setSubmitted={setSubmitted}/>
                </FormControl>
            </FormModal>
            <div data-aos="slide-left">
              <h5 style={{width:"100%", textAlign:"left", marginLeft:"30px"}}>Choisissez le client...</h5>
              <SelectableClient client={selectedClient} setClient={setSelectedClient}/>
            </div>
            <div style={{position:"fixed", right:"70px", bottom:"30px"}}>
              <Button style={{marginRight:"10px"}} variant="contained" color="primary" onClick={()=>setShowFormAddEvent(true)} disabled={selectedClient===false}>suivant</Button>
              <Button variant="outlined" color="primary" onClick={()=>handleAnnuler()}>Annuler</Button>
            </div>
            
          </Grid>
          :
          <>
            <Grid container>
              <Grid item xs={12} sm={12} md={7.5} lg={7.5}>
                <DateCalendar/>
              </Grid>
              <Grid  style={{overflowY:"hidden"}} data-aos="zoom-in" className="myContainer" xs={12} sm={12} md={4.5} lg={4.5}>
                <Grid item style={{width:"100%", maxHeight:"560px", overflowY: showScrollBar?"auto":"hidden"}} onMouseOver={()=>setShowScrollBar(true)}
                    onMouseOut={()=>setShowScrollBar(false)}
                    >
                  <ListeCommande toModify={true} setSelectClient={setSelectClient} sClient={setSelectedClient} sCommande={setSelectedCommande} sEvent={setSelectedEvent} sPanier={setSelectedPanier}/>
                </Grid>
                <Button variant="contained" color="secondary" className="btnAjoutEvent mb-4-none" onClick={()=>setSelectClient(true)}>
                  Nouvel évènement
                </Button>
              </Grid>
            </Grid>
          </>
        
        }
      </MainCard>
  );
}

export default UIColor;
