import React, { useEffect, useState } from "react";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { format, parseISO } from 'date-fns';
import {IconBrandCouchdb, IconBallon} from '@tabler/icons';
import { Grid } from '@mui/material';
import {MeetingRoom} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
} from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loading from 'ui-component/Components/Loading/CylinderSpinLoader';
import ModalEvent from './ModalEvent';
import SearchSection from "ui-component/Components/SearchSection/index";


function ListeCommande({sEvent, sPanier, sCommande, sClient, toModify}) {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(true);
  const [selectedCommande, setSelectedCommande] = useState(true);
  const [showMessageEvent, setShowMessageEvent] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/store/Commande/`;
    const evUrl = `http://127.0.0.1:8000/store/Evenement/`;

    Promise.all([fetch(apiUrl), fetch(evUrl)])
      .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
      .then(([commandeData, evenementData]) => {
        evenementData = evenementData.filter(
          data=>data.description.toLowerCase().includes(inputSearch.toLowerCase())||
          data.date.toLowerCase().includes(inputSearch.toLowerCase())
        )
        setEvents(evenementData);
        var orderedCommande = [];
        evenementData.map(d=>orderedCommande.push(commandeData.filter(c=>c.id===d.commande)[0]));
        setData(orderedCommande);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [events, inputSearch]);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    if(showMessageEvent===false){
      setSelectedEvent(false);
      setSelectedCommande(false);
      if(toModify===true){sEvent(false);
      sCommande(false);
      sClient(false);
      sPanier(false);}
    }
  }, [showMessageEvent]);

  const Etat = (str) => (str === 'C' ? "Payement complet" : "Payement incomplet");

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

  const getStatus = (item, isEventPast) =>{
      return isEventPast && item.organised ? 
      (item.retour_checked===true ? "Processus achevé":item.payement_casse===true?"Casses à payer":"Retour à vérifier") 
      : isEventPast? "Date passée":(item.organised?"En cours":
      item.commande_passee?Etat(item.etat_paiement):"Commande à passer");
  }

  const showModalEvent = (item, event) =>{
    setSelectedEvent(event);
    setSelectedCommande(item);
    const apiUrl = `http://127.0.0.1:8000/store/Panier/`;
    const cliUrl = `http://127.0.0.1:8000/store/Client/`;

    if(toModify){Promise.all([fetch(apiUrl), fetch(cliUrl)])
      .then(([response1,response2]) => 
        Promise.all([response1.json(),response2.json()]))
      .then(([paniers, clients]) => {
        clients = (clients.filter(p=>p.id===paniers.filter(p=>p.id===item.panier)[0].client));
        sEvent(event);
        sCommande(item);
        sPanier(item.panier);
        sClient(clients);
        setShowMessageEvent(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
    });}
    else setShowMessageEvent(true);
  }


  return (
    <ListGroup as="ul" className="liste_commande w-100">
      <SearchSection value={inputSearch} setValue={setInputSearch}/>        
      <ModalEvent message="true" showForm={showMessageEvent} setShowForm={setShowMessageEvent}
        event={selectedEvent} commande={selectedCommande}/>
      {loading ? (
        <Grid container style={{transform:"translate(0%,-30%)"}}><Loading/></Grid>
      ) : (
        
        data.map((item, index) => {
          const event = events.find((ev) => ev.commande === item.id);
          const isEventPast = isPast(event.date);

          return (
            <Grid style={{ borderRadius:'20px', width:"98%"}} key={index} className="d-flex justify-content-between align-items-start">
                    
              <ListGroup.Item 
                onClick={()=>showModalEvent(item,event)}
                style={{display:"inline-block", marginTop:index===0?"10px":"none"}}
                as="li"
                className={`d-flex justify-content-between w-100 align-items-start cellule_listeCommande ${
                  isEventPast ? 'past-event' : ''
                }`}
                >
                <div style={{ marginRight: "10px", height: "100%" }}>
                  {item.locationSalle && (
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        background: isEventPast ? (item.organised? theme.palette.secondary.dark  :"#999") : 
                          (item.salleSetted ? theme.palette.primary.dark : theme.palette.warning.dark),
                        color: isEventPast ? (item.organised? theme.palette.secondary.light:"#999") : 
                          (item.salleSetted ? theme.palette.primary.light : theme.palette.warning.light),

                      }}
                      className="mb-1"
                      color="inherit"
                    >
                      <MeetingRoom style={{color:"white"}} stroke={1.5} size="1.5rem" />
                    </Avatar>
                  )}
                  {item.locationProduit && (
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        background: isEventPast ? (item.organised? theme.palette.secondary.dark  :"#999") : 
                          (item.produitsSetted ? theme.palette.primary.dark : theme.palette.warning.dark),
                        color: isEventPast ? (item.organised? theme.palette.secondary.light:"#999") : 
                          (item.produitsSetted ? theme.palette.primary.light : theme.palette.warning.light),

                      }}
                      className="mb-1"
                      color="inherit"
                    >
                      <IconBrandCouchdb style={{color:"white"}} stroke={1.5} size="1.5rem" />
                    </Avatar>
                  )}
                  {item.locationDecoration && (
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        background: isEventPast ? (item.organised? theme.palette.secondary.dark  :"#999") : 
                          (item.decorationsSetted ? theme.palette.primary.dark : theme.palette.warning.dark),
                        color: isEventPast ? (item.organised? theme.palette.secondary.light:"#999") : 
                          (item.decorationsSetted ? theme.palette.primary.light : theme.palette.warning.light),
                      }}
                      className="mb-1"
                      color="inherit"
                    >
                      <IconBallon style={{color:"white"}} stroke={1.5} size="1.5rem" />
                    </Avatar>
                  )}
                </div>
                <div className="ms-2 me-auto">
                  <div
                    className="fw-bold"
                    style={{ color: isEventPast ? (item.organised?'#631cb5':'#999') : '#6871ed', fontSize: "13px" }}
                  >
                    {format(parseISO(event.date), "dd/MM/yyyy")} - {event.description}
                  </div>
                  <br />
                  <p style={{ fontSize: "13px", fontWeight: "bold", fontFamily: "verdana", color: isEventPast ? (item.organised?'#000':'#999')  : '#000' }}>
                    {item.nomClient}
                  </p>
                  <p style={{ fontSize: "12px", color: isEventPast ? (item.organised?'#777':'#999') : '#777' }}>
                    Début des locations : {getSplittedDate(item.date_debutLoc)[2]}/{getSplittedDate(item.date_debutLoc)[1]}/{getSplittedDate(item.date_debutLoc)[0]} à {getSplittedDate(item.date_debutLoc)[3]}:{getSplittedDate(item.date_debutLoc)[4]}
                    <br />
                    Fin des locations : {getSplittedDate(item.date_finLoc)[2]}/{getSplittedDate(item.date_finLoc)[1]}/{getSplittedDate(item.date_finLoc)[0]} à {getSplittedDate(item.date_finLoc)[3]}:{getSplittedDate(item.date_finLoc)[4]}
                    <br />
                  </p>
                </div>
                <Badge bg={isEventPast ? (item.organised?(item.retour_checked?"":"warning"):'secondary') :
                   Etat(item.etat_paiement) === "Payement complet" ? "primary" : "warning"} pill 
                   style={{backgroundColor:item.retour_checked&&"#631cb5"}}>
                  {getStatus(item, isEventPast)}
                </Badge>
              </ListGroup.Item>
          </Grid>
          );
        })
      )}
    </ListGroup>
  );
}

export default ListeCommande;
