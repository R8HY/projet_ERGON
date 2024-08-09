import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'
import { Grid, Button } from '@mui/material';
import Chart from './Courbe/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import {
    MDBProgress,
    MDBProgressBar
  } from 'mdb-react-ui-kit';
  import MessageModal from "ui-component/Components/Modals/MessageModal";
  import FormModal from "ui-component/Components/Modals/FormModal";
  import FormSociete from "ui-component/Components/Client/Forms/FormSociete";
  import FormParticulier from "ui-component/Components/Client/Forms/FormParticulier";

function ListePayement({clients}) {
  const [ajoutSocieteParMois, setAjoutSocieteParMois] = useState([]);
  const [ajoutParticulierParMois, setAjoutParticulierParMois] = useState([]);
  const [showFormSociete, setShowFormSociete] = useState(false);
  const [showFormParticulier, setShowFormParticulier] = useState(false);
  const [showMessageSociete, setShowMessageSociete] = useState(false);
  const [showMessageParticulier, setShowMessageParticulier] = useState(false);
  const [particulierAdded, setParticulierAdded] = useState(false);
  const [societeAdded, setSocieteAdded] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [totalParticulier, setTotalParticulier] = useState(0);
  const [totalSociete, setTotalSociete] = useState(0);
  const [submittedSociete, setSubmittedSociete] = useState(false);
  const [submittedParticulier, setSubmittedParticulier] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    if(particulierAdded==true){
      setShowMessageParticulier(true);
      setParticulierAdded(false);
    }
  }, [particulierAdded]);

  useEffect(() => {
    if(societeAdded==true){
      setShowMessageSociete(true);
      setParticulierAdded(false);
    }
  }, [societeAdded]);

  useEffect(()=>{
    const apiSUrl = "http://127.0.0.1:8000/store/Societe/";
    const apiPUrl = "http://127.0.0.1:8000/store/Particulier/";
    Promise.all([fetch(apiSUrl), fetch(apiPUrl)])
    .then(([response2, response3]) => Promise.all([
      response2.json(),
      response3.json()
    ]))
    .then(([data1, data2]) => {
      setAjoutSocieteParMois(getDataParMois(data1));
      setAjoutParticulierParMois(getDataParMois(data2));
      setTotalSociete(data1.length);
      setTotalParticulier(data2.length);
      setTotalData(data1.length+data2.length);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  },[clients])

  const getDataParMois = (data) => {
    const tab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    data.forEach((elem) => {
      const date = elem.date_ajout;
      const dateObj = new Date(date);
      const mois = dateObj.getMonth();
      tab[mois] += 1;
    });
    return tab;
  };

  const getPourcentage = (value, base) =>{
    return parseInt(value*100/base);
  }


  return (
        <Grid container style={{transform:"translateY(4%)"}}>
          <FormModal onSubmit={()=>setSubmittedParticulier(true)}
            showForm={showFormParticulier} setShowForm={setShowFormParticulier}>
            <FormParticulier setShowMessage={()=>setParticulierAdded(true)} submitted={submittedParticulier} setSubmitted={setSubmittedParticulier}/>
          </FormModal>
          <FormModal onSubmit={()=>setSubmittedSociete(true)}
           showForm={showFormSociete} setShowForm={setShowFormSociete}>
            <FormSociete submitted={submittedSociete} setShowMessage={()=>setSocieteAdded(true)} setSubmitted={setSubmittedSociete}/>
          </FormModal>
          <MessageModal message="Nouvelle société ajouté" showForm={showMessageSociete} setShowForm={setShowMessageSociete}/>
          <MessageModal message="Nouveau particulier ajoutée" showForm={showMessageParticulier} setShowForm={setShowMessageParticulier}/>

          <Grid data-aos="zoom-in" style={{height:'700px'}} container className="myContainer mb-4 d-flex">
            <Chart societeData={ajoutSocieteParMois} particulierData={ajoutParticulierParMois} totalData={totalData}/>
            <MainCard style={{width:"100%", padding:"10px", height:"250px"}} className="mt-2">
                <div style={{float:"right"}} >
                    <Button variant="contained" color="primary" style={{marginRight:"10px", fontSize:"11px"}} onClick={() => setShowFormSociete(true)}>Inscrire Societe</Button>
                    <Button variant="contained" color="secondary" style={{fontSize:"11px"}}  onClick={() => setShowFormParticulier(true)}>Inscrire Particulier</Button>
                </div>
                <div style={{width:"100%", marginTop:"40px"}} >
                    Clients ({totalData}) <MDBProgress className="rounded mt-1 mb-2">
                        <MDBProgressBar 
                            width={totalData===0?0:100} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    Particuliers ({totalParticulier}) <MDBProgress className="rounded mt-1 mb-2">
                        <MDBProgressBar 
                            width={getPourcentage(totalParticulier, totalData)} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    Sociétés ({totalSociete}) <MDBProgress className="rounded mt-1">
                        <MDBProgressBar 
                            width={getPourcentage(totalSociete, totalData)} valuemin={0} valuemax={100} />
                    </MDBProgress>
                </div>
                
            </MainCard>
          </Grid>
        </Grid>
  );
}

export default ListePayement;