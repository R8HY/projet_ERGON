import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

function ListeArticle({id_panier}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Define the URL for your GET request
    const apiUrl = `http://127.0.0.1:8000/store/Panier/${id_panier}/article_panier/`;

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

//   const handleUpdate = (id) => {
//     // Remplacez "your_update_endpoint" par l'URL de mise à jour réelle de votre API
//     axios.put(`http://127.0.0.1:8000/store/Guest/${id}`, { /* Données de mise à jour */ })
//       .then(response => {
//         // Gérez la réponse ou effectuez une action en cas de succès
//         console.log("Mise à jour réussie", response);
//       })
//       .catch(error => {
//         // Gérez les erreurs
//         console.error("Erreur de mise à jour", error);
//       });
//   };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID_PANIER</th>
            <th scope="col">NOM PRODUIT</th>
            <th scope="col">PRIX UNITAIRE</th>
            <th scope="col">QUANTITE</th>
            <th scope="col">PRIX TOTAL</th>
          </tr>
        </thead>
        {
        data.length!==0?(<tbody>
          {data.map((item, index) =>
            <tr key={index}>
              <td>{id_panier}</td>
              <td>{item.nomP}</td>
              <td>{item.prix_unitaireP}</td>
              <td>{item.quantite}</td>
              <td>{item.prix_total}</td>
              <td>
              <button className="btn btn-secondary" onClick={() => handleUpdate(item.id)}>
                  Modifier
              </button>
              </td>
            </tr>
          )}

        </tbody>
      )
      :(<tbody><tr><td colSpan={5}
        style={{textAlign:"center", padding:"100px", color:"red"}}
      >Le panier est vide</td></tr></tbody>)
      }
      </table>
    </div>
  );
}

export default ListeArticle;