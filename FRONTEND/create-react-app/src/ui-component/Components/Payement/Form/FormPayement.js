import React, { useState, useEffect } from "react";
import 'aos/dist/aos.css';

function FormRdv({ submitted, setSubmitted, idPanier }) {
  const [montant, setMontant] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Fetch pour obtenir la liste des comptes depuis votre API
    fetch("http://127.0.0.1:8000/accounts/Account/")
      .then((response) => response.json())
      .then((data) => {
        setAccounts(data);
        // Définissez le premier compte comme compte sélectionné par défaut
        setSelectedAccount(data[0]);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des comptes:", error);
      });
  }, []);

  const handleSubmit = () => {
    // Assurez-vous qu'un compte a été sélectionné
    if (!selectedAccount) {
      console.error("Veuillez sélectionner un compte.");
      return;
    }

    // Créez un objet contenant les données du formulaire
    const formData = {
      motif: "Payement sur location",
      montant: montant,
      date: new Date().toISOString(), // Date d'aujourd'hui en format ISO
      description: "E",
      crediteur: selectedAccount.id,
      debiteur: null,
    };

    fetch(`http://127.0.0.1:8000/store/Panier/${idPanier}/payement_panier/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Utilisez JSON pour le contenu
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
        setSubmitted(false);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête:", error);
        // Gérez l'erreur si nécessaire
      });

    // Envoyez les données du formulaire au serveur Django
    fetch("http://127.0.0.1:8000/accounts/Fluxcash/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Utilisez JSON pour le contenu
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur:", data);
        setSubmitted(false);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la requête:", error);
        // Gérez l'erreur si nécessaire
      });
  };

    useEffect(() => {
        if(submitted===true){
        handleSubmit();
        }
    }, [submitted]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="compte" className="form-label">
          {"Choisissez le compte d'entrée d'argent"}
        </label>
        <select
          id="compte"
          className="form-select"
          value={selectedAccount ? selectedAccount.id : ""}
          onChange={(e) =>
            setSelectedAccount(
              accounts.find((acc) => acc.id === parseInt(e.target.value))
            )
          }
        >
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.nom}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="montant" className="form-label">
          Entrez le montant
        </label>
        <input
          type="number"
          className="form-control"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
        />
      </div>
    </form>
  );
}

export default FormRdv;
