import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

function ArticleCommande({id_panier}) {
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
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
        {data.map((elem, key) =>
            <div style={{ textAlign:"left", marginLeft:'100px' }} key={key}>
               <p><strong>Produit:</strong> {elem.nomP}</p>
               <p><strong>Prix Unitaire:</strong> {elem.prix_unitaireP}</p>
               <p><strong>Quantite:</strong> {elem.quantite}</p>
               <p><strong>Prix total:</strong> {elem.prix_total}</p>
        </div>
          )}
    </div>
  );
}

export default ArticleCommande;