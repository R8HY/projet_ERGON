import React, {useState, useEffect} from 'react'
import {
  // Button,
  // DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
// import moment from 'moment'
import { EventCalendar } from 'react-mui-event-calendar'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { format } from 'date-fns';

function Calendrier() {
  var data = []

  const getSplittedDate = (date) => {
    date = date.split('Z')[0];
    const datePart = date.split('T')[0];
    const TimePart = date.split('T')[1];
    const d = datePart.split('-')
    const t = TimePart.split(':')
    const result = d.concat(t);
    return result;
  }
  
  const isPast = (date) => {
    if(date){date = getSplittedDate(date);
    const today = new Date();
    var formToday = format(today, "yyyy-MM-dd");
    formToday+="T00:00Z";
    const formatedToday = getSplittedDate(formToday);
    if(formatedToday[0]>date[0]||
        formatedToday[0]===date[0]&&(formatedToday[1]>date[1]||
          formatedToday[1]===date[1]&&formatedToday[2]>date[2])
        ) return true;
    return false;}
  }

  const isOk = (commande) => {
    var ok = true
    if(commande){
      if(commande.salleSetted===false&&commande.locationSalle===true){
      ok=false;
      }
      if(commande.produitsSetted===false&&commande.locationProduit===true){
        ok=false;
      }
      if(commande.decorationsSetted===false&&commande.locationDecoration===true){
        ok=false;
      }
      if(commande.etat_paiement!=="C"){
        ok=false;
      }
    }
    
    return ok;
  }

  const Etat = (str) => (str === 'C' ? "Payement complet" : "Payement incomplet");

  const getStatus = (item, isEventPast) =>{
    return isEventPast && item.organised ? 
    (item.retour_checked===true ? "Processus achevé":item.payement_casse===true?"Casses à payer":"Retour à vérifier") 
    : isEventPast? "Date passée":(item.organised?"En cours":
    item.commande_passee?Etat(item.etat_paiement):"Commande à passer");
  }

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:8000/store/Commande/";
    const url = "http://127.0.0.1:8000/store/Evenement/";
        
    Promise.all([fetch(apiUrl), fetch(url)])
      .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
      .then(([d, dev]) => {
        dev.map((ev,index)=>{
          const isEventPast = isPast(ev.date);
          const evCommande = d.filter(cmd=>cmd.id===ev.commande);
          data.push({
          date:  new Date(ev.date),
          title: ev.description,
          popupContent: (
            <>
              <DialogContent>
                <DialogContentText>
                  Client : {evCommande[0].nomClient}
                  <br/><br/>Date de {"l'évènement"} : {getSplittedDate(ev.date)[2]}/{getSplittedDate(ev.date)[1]}/{getSplittedDate(ev.date)[0]} 
                  <br/><br/>Début de location : {getSplittedDate(evCommande[0].date_debutLoc)[2]}/{getSplittedDate(evCommande[0].date_debutLoc)[1]}/{getSplittedDate(evCommande[0].date_debutLoc)[0]} à {getSplittedDate(evCommande[0].date_debutLoc)[3]}:{getSplittedDate(evCommande[0].date_debutLoc)[4]}<br/>
                  Fin de location :  {getSplittedDate(evCommande[0].date_finLoc)[2]}/{getSplittedDate(evCommande[0].date_finLoc)[1]}/{getSplittedDate(evCommande[0].date_finLoc)[0]} à {getSplittedDate(evCommande[0].date_finLoc)[3]}:{getSplittedDate(evCommande[0].date_finLoc)[4]}
                  <br/><br/>Status : {getStatus(evCommande[0], isEventPast)}
                  <br/><br/>Montant payé : {evCommande[0].montant_payee} Ariary
                </DialogContentText>
                {/* <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label='Email Address'
                  type='email'
                  fullWidth
                  variant='standard'
                /> */}
              </DialogContent>
              {/* <DialogActions>
                <Button>Modifier</Button>
                <Button>Supprimer</Button>
              </DialogActions> */}
            </>
          ),
          color: isPast(ev.date)?(evCommande[0].organised?"#631cb5":"#888"):isOk(evCommande[0])?"#00f":"#ffbf00",
          id: index,
        })})
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  const [dataSource, setDataSource] = useState(data)

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom:"45px"
      }}
      data-aos="zoom-in"
    >
      <EventCalendar
        dataSource={dataSource}
        pallet={{ primary: '#8523a6', secondary: '#8523a6' }}
        style={{bakcgroundColor:"#8523a6"}}
        bg="#8523a6"
        onDataChange={(newEvents) => setDataSource(newEvents)}
      />
    </div>
  )
}

export default Calendrier;