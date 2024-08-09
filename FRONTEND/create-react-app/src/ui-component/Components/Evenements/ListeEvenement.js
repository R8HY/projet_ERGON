import React, { useEffect, useState } from "react";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
// import { useNavigate } from "react-router-dom";

function ListeEvenement() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Define the URL for your GET request
    const apiUrl = `http://127.0.0.1:8000/store/Commande/`;

    // Make the GET request using the fetch API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the fetched data
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data)

  const Etat = (str) =>{
    if(str == 'C') return "Complet";
    return "Avance"
  }

  return (
      <ListGroup as="ul" numbered  className="liste_commande">
      {data.map((item, index) =>
            <ListGroup.Item key={index}
            as="li"
            className="d-flex justify-content-between align-items-start cellule_listeCommande"
            onClick={() => { window.location.href = `../clients/${item.nom_client}/Commande`; }}
          >
            <div className="ms-2 me-auto" >
              <div className="fw-bold">{item.date_commande}</div>
              <br/><p style={{color:"blue"}}>{item.nom_client}</p>
              Début de la location : {item.date_debutLoc}<br/>
              Fin de la location :{item.date_finLoc}<br/>
            </div>
            <Badge bg="primary" pill>
              {Etat(item.etat_paiement)}
            </Badge>
          </ListGroup.Item>
          )}
    </ListGroup>
  );
}

export default ListeEvenement;