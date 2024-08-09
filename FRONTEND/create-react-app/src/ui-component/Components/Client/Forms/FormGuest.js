// import React, { useState } from "react";

// function FormGuest() {
//   const [nom, setNom] = useState("");
//   const [prenom, setPrenom] = useState("");
//   const [contact, setContact] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Créez un objet contenant les données du formulaire
//     const formData = {
//       nom: nom,
//       prenom: prenom,
//       contact: contact,
//     };

//     // Envoyez les données du formulaire au serveur Django
//     await fetch("http://127.0.0.1:8000/store/Guest/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json", // Utilisez JSON pour le contenu
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Réponse du serveur:", data);
//         // Utilisez this.props.history.push pour passer les données à la page ListeClients
//       })
//       .catch((error) => {
//         console.error("Erreur lors de l'envoi de la requête:", error);
//         // Gérez l'erreur si nécessaire
//       });
//     //ref vita io de redirigena amzay  ListeClients

//   };

//   return (
//     <div>
//       <div>
//         <h1>FORMULAIRE</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="exampleFormControlInput1" className="form-label">
//               Nom
//             </label>
//             <input type="text" className="form-control" onChange={(e) => setNom(e.target.value)} />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="exampleFormControlInput1" className="form-label">
//               Prenom
//             </label>
//             <input type="text" className="form-control" onChange={(e) => setPrenom(e.target.value)} />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="exampleFormControlInput1" className="form-label">
//               Contact
//             </label>
//             <input type="text" className="form-control" onChange={(e) => setContact(e.target.value)} />
//           </div>
//           {/* <Link to="/ListeClients"> */}
//           <button className="btn btn-primary" onClick={handleSubmit}>Valider</button>
//           {/* </Link> */}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default FormGuest;