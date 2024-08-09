import React, {useState, useEffect} from "react";

const ListeSociete = () => {
    const [donnees, setDonnees] = useState([]);

    useEffect(() => {
      // Define the URL for your GET request
      const apiUrl = "http://127.0.0.1:8000/store/Societe/";
  
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
    
    console.log(donnees)

    return(
        <div>
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NOM</th>
                  <th scope="col">PRENOM</th>
                  <th scope="col">CONTACT</th>
                  <th scope="col">DATE DE RENDEZ-VOUS</th>
                  <th scope="col">NOM DE LA SOCIETE</th>
                  <th scope="col">DOMICILIATION</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">NIF</th>
                  <th scope="col">STAT</th>
                </tr>
              </thead>
              <tbody>
                {donnees.map((elem, index)=>
                  <tr key={index}>
                    <td>{elem.id}</td>
                    <td>{elem.nom}</td>
                    <td>{elem.prenom}</td>
                    <td>{elem.contact}</td>
                    <td>{elem.rdv}</td>
                    <td>{elem.nomSociete}</td>
                    <td>{elem.domiciliation}</td>
                    <td>{elem.email}</td>
                    <td>{elem.nif}</td>
                    <td>{elem.stat}</td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>
    )
}


export default ListeSociete