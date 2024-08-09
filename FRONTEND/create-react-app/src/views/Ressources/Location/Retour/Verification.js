// material-ui
// import { Typography } from '@mui/material';
import React, {useState, useEffect} from "react";

// project imports
import MainCard from 'ui-component/cards/MainCard';
import ListGroup from 'react-bootstrap/ListGroup';
//import ArticlesCommande from "ui-component/ui-template/template/Commande/articlesCommande";
// import { useParams } from "react-router";

// ==============================|| SAMPLE PAGE ||============================== //

function Verification(){
  // const params = useParams();
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const apiUrl = `http://127.0.0.1:8000/store/Commande/`;
  
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          console.log(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

  return (
    <MainCard title="Vérification des matériaux" className="h-100">
     <ListGroup as="ul" numbered  className="liste_commande">
      {data.map((item, index) =>
            <ListGroup.Item key={index}
              as="li"
              className="d-flex justify-content-between align-items-start cellule_listeCommande"
              onClick={() => { window.location.href = `./${item.id}`; }}
            >
            <div className="ms-2 me-auto" >
              <div className="fw-bold">{item.date_commande}</div><br/>
              <p style={{color:"blue"}}>{item.nom_client}</p>
              Début de la location : {item.date_debutLoc}<br/>
              Fin de la location :{item.date_finLoc}<br/><br/>
              Sortie des produits : {item.dateSortie}<br/>
              Retour des produits :{item.dateEntree}<br/>
            </div>
          </ListGroup.Item>
          )}
    </ListGroup>
    </MainCard>
  );
}

export default Verification;
