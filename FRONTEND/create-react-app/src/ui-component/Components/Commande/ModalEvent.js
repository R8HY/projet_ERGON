import { Button} from '@mui/material';
import { Modal } from 'react-bootstrap'; 
import logo from 'assets/images/logoErgon.png';
import {format} from 'date-fns';
import {IconCalendarMinus} from '@tabler/icons';
import OutlinedModify from '@mui/icons-material/Edit';
import ConfirmModal from "ui-component/Components/Modals/ConfirmModal";
import MessageModal from "ui-component/Components/Modals/MessageModal";
import FormCommande from "ui-component/Components/Commande/FormCommande";
import FormModal from "ui-component/Components/Modals/FormModal";
import {IconArrowRight} from '@tabler/icons'
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function MesssageModal({showForm, setShowForm, onClose, commande, event}) {
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [showFormDeleted, setShowFormDeleted] = useState(false);
  const [eventDeleted, setEventDeleted] = useState(false);
  const [showFormModify, setShowFormModify] = useState(false);
  const [selectedClient, setSelectedClient] = useState(false);
  const [selectedPanier, setSelectedPanier] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const close = () =>{
    onClose();
    setShowForm(false);
  }

  const getSplittedDate = (date) => {
    const [datePart, timePart] = date.split('T');
    const result = [...datePart.split('-'), ...timePart.split(':')];
    return result;
  };

  const isPast = (date) => {
    if(date){
        const today = new Date();
      const formToday = format(today, "yyyy-MM-dd'T'00:00'Z'");
      date = getSplittedDate(date);
      const formatedToday = getSplittedDate(formToday);

      return (
        formatedToday[0] > date[0] ||
        (formatedToday[0] === date[0] &&
          (formatedToday[1] > date[1] ||
            (formatedToday[1] === date[1] && formatedToday[2] > date[2])))
      );
    }
  };

  const Etat = (str) => (str === 'C' ? "Payement complet" : "Payement incomplet");

  const getStatus = () =>{
    if(commande&&event){
      const isEventPast = isPast(event.date);
      return isEventPast && commande.organised ? 
      (commande.retour_checked===true ? "Processus achevé":commande.payement_casse===true?"Casses à payer":"Retour à vérifier") 
      : isEventPast? "Date passée":(commande.organised?"En cours":
      commande.commande_passee?Etat(commande.etat_paiement):"Commande à passer");
    }
  }

  const getLinkText = () =>{
    return getStatus()==="Commande à passer"?"Passer la commande":(getStatus()==="Payement incomplet"?"Ajouter un payement":
      (getStatus()==="En cours"?"":(getStatus()==="Retour à vérifier"?"Vérifier les retours":
      (getStatus()==="Casses à payer"?"Gérer le payement des casses":""))))
  }

  const getLinkUrl = () =>{
    const linkUrl = getLinkText()==="Passer la commande"?`./${commande.panier}`:(getLinkText()==="Ajouter un payement"?`./${commande.panier}`:
    (getLinkText()===""?"":(getLinkText()==="Vérifier les retours"?`./${commande.panier}/verification_location`:
    (getLinkText()==="Gérer le payement des casses"?`./${commande.panier}/casse`:""))))
    return linkUrl;
  }

  const askingForDelete = () => {
    setShowFormDelete(true);
  }

  const deleteEvent = () =>{
    axios.delete(`http://127.0.0.1:8000/store/Evenement/${event.id}/`)
    .catch((error) => {
      console.error("Erreur lors de l'envoi de la requête:", error);
    });
    axios.delete(`http://127.0.0.1:8000/store/Commande/${commande.id}/`)
    .catch((error) => {
      console.error("Erreur lors de l'envoi de la requête:", error);
    });
    axios.delete(`http://127.0.0.1:8000/store/Panier/${commande.panier}/`)
    .catch((error) => {
      console.error("Erreur lors de l'envoi de la requête:", error);
      setShowFormDelete(false);
      setEventDeleted(true);
      setShowForm(false);
    });
    setShowFormDelete(false);
  };

  useEffect(() => {
    if(eventDeleted==true){
      setShowFormDeleted(true);
      setEventDeleted(false);
    }
  }, [eventDeleted]);

  useEffect(() => {
    if(commande){const apiUrl = `http://127.0.0.1:8000/store/Panier/${commande.panier}/`;
    const apiUrlC = "http://127.0.0.1:8000/store/Client/";
    Promise.all([fetch(apiUrl), fetch(apiUrlC)])
      .then(([response1, response2]) => Promise.all([response1.json(),response2.json()]))
      .then(([artData, cliData]) => {
        setSelectedPanier(artData);
        setSelectedClient(cliData.filter(d=>d.id===artData.client)[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });}
  }, []);

  return (
    <Modal show={showForm} onHide={onClose?()=>close():()=>setShowForm(false)} centered>
        <FormModal 
              onSubmit={()=>setSubmitted(true)}
              showForm={showFormModify} 
              setShowForm={setShowFormModify} >
                  <FormCommande client={selectedClient}  panier={selectedPanier} event={event} commande={commande} submitted={submitted} setSubmitted={setSubmitted}/>
            </FormModal>
          <ConfirmModal showForm={showFormDelete} setShowForm={setShowFormDelete}
            message="Annuler cet évènement ?" onConfirm={()=>deleteEvent()} />
          <MessageModal showForm={showFormDeleted} setShowForm={setShowFormDeleted}
            message="L'évènement a été annulé"/>
        {commande&&event&&event.date&&<Modal.Body>
            <img src={logo} style={{width:"80px", height:"60px"}} alt="Logo"/>
            {((localStorage.getItem('userStatus')==='A'||localStorage.getItem('userStatus')==='C')&&window.location.href=='http://localhost:3000/Ergon/clientele/evenements/')&&
            <div style={{float:"right", marginTop:"15px"}}>
             <Button style={{display:"block"}} onClick={()=>askingForDelete(false)}>
                <IconCalendarMinus style={{color:"red", fontSize:"20px"}}/>
              </Button>
              <Button style={{display:"block"}} onClick={()=>setShowFormModify(true)}>
                <OutlinedModify style={{color:"blue", fontSize:"20px"}}/>
              </Button>
            </div>}
            <p className="mt-2 text-center">
                  <span style={{marginLeft:"15%"}}>{event.description} ({event.nbPersonne} personnes)</span>
                  <br/><br/>Prévu le {getSplittedDate(event.date)[2]}/{getSplittedDate(event.date)[1]}/{getSplittedDate(event.date)[0]}
                  <br/><br/>Client : {commande.nomClient}
                  <br/><br/>Status : {getStatus()}
                  <br/><br/>Début de location : {getSplittedDate(commande.date_debutLoc)[2]}/{getSplittedDate(commande.date_debutLoc)[1]}/{getSplittedDate(commande.date_debutLoc)[0]} à {getSplittedDate(commande.date_debutLoc)[3]}:{getSplittedDate(commande.date_debutLoc)[4]}
                  <br/><br/>Fin de location :  {getSplittedDate(commande.date_finLoc)[2]}/{getSplittedDate(commande.date_finLoc)[1]}/{getSplittedDate(commande.date_finLoc)[0]} à {getSplittedDate(commande.date_finLoc)[3]}:{getSplittedDate(commande.date_finLoc)[4]}
                  <br/><br/>Montant payé : {commande.montant_payee} Ariary
                  <br/><br/>{getLinkText()!=""&&<Button variant="secondary" style={{color:"blue", textDecoration:"underline"}} 
                    onClick={()=>{window.location.href=getLinkUrl()}}>{getLinkText()} <IconArrowRight style={{fontSize:"10px"}}/></Button>}
            </p></Modal.Body>}
        <Modal.Footer style={{width:"100%"}}>
          {((localStorage.getItem('userStatus')==='A'||localStorage.getItem('userStatus')==='R')&&window.location.href=="http://localhost:3000/Ergon/ressources/locations/")&&
            <>
              <Button variant="secondary" onClick={()=>{window.location.href=`./${commande.panier}`}}>Commandes</Button>
              <Button variant="secondary" onClick={()=>{window.location.href=`./${commande.id}/verification_location/`}}>Casses</Button>
            </>
          }
          {((localStorage.getItem('userStatus')==='A'||localStorage.getItem('userStatus')==='F')&&window.location.href=="http://localhost:3000/Ergon/finance/payements")&&
            <>            
              <Button variant="secondary" onClick={()=>{window.location.href=`./payements/${commande.panier}`}}>Payement sur commandes</Button>
              <Button variant="secondary" onClick={()=>{window.location.href=`./payements/${commande.panier}/casse/`}}>Paymenet sur casses</Button>
            </>
          }
          <Button style={{float:"left"}} variant="secondary" onClick={onClose?()=>close():()=>setShowForm(false)}>Retour</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default MesssageModal;