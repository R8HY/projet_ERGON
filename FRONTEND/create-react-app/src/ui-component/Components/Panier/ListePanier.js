import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

function ListePanier() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Define the URL for your GET request
    const apiUrl = `http://127.0.0.1:8000/store/Panier/`;

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
            <th scope="col">NOM CLIENT</th>
            <th scope="col">CATEGORIE</th>
            <th scope="col">DATE DE CREATION</th>
            <th scope="col">PRIX TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) =>
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nomClient}</td>
              <td>{item.categorieClient}</td>
              <td>{item.date_creation}</td>
              <td>{item.montant_total}</td>
              <td>
                <button className="btn btn-danger">
                  <a style={{color:"white"}} href={`./paniers/${item.id}/remplir`}>Remplir le panier</a>
                </button>
                <button className="btn btn-secondary">
                  <a style={{color:"white"}} href={`./paniers/${item.id}/articles`}>Voir les articles</a>
                </button>
              </td>
            </tr>
          )}

        </tbody>
      </table>
      {/* {data.map((item, index) => (
           <div className="card border w-96 hover:shadow-none relative flex flex-col mx-auto m-5" key={index}>
           <div className="profile w-full flex m-3 ml-4 text-white">
             <div className="title mt-11 ml-3 font-bold flex flex-col">
               <div className="name break-words">{item.nomCLient}</div>
               <div className="add font-semibold text-sm italic dark">{item.nomClient}</div>
             </div>
           </div>
           <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
             <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white"
                >{item.montant_total}</div>
              <div className="add border rounded-r-2xl rounded-l-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white"
                >{item.date_creation}</div> 
           </div>
         </div>
          ))} */}
    </div>
  );
}

export default ListePanier;