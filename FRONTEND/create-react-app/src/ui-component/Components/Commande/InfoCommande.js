import React, {useState, useEffect} from "react";

const InfoCommande = () => {
    const [donnees, setDonnees] = useState([]);

    useEffect(() => {
      // Define the URL for your GET request
      const apiUrl = "http://127.0.0.1:8000/store/Commande/";
  
      // Make the GET request using the fetch API
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((donnees) => {
          // Update the state with the fetched data
          setDonnees(donnees);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
    
    const Etat = (str) =>{
        if(str == 'C') return "Complet";
        return "Avance"
      }

    console.log(donnees)

    return(
        <div>
        <div className="container">
            {donnees.map((elem, index) => (
                <div style={{ textAlign:"left" }} key={index}>
                    <p><strong>Date de la commande:</strong> {elem.date_commande}</p>
                    <p><strong>Nom du client:</strong> {elem.nom_client}</p>
                    <p><strong>Debut de début de location:</strong> {elem.date_debutLoc}</p>
                    <p><strong>Date fin de location: </strong>{elem.date_finLoc}</p>
                    <p><strong>Etat de paiement:</strong>{Etat(elem.etat_paiement)}</p>
                </div>
            ))}
        </div>
    </div>
    )
}


export default InfoCommande;