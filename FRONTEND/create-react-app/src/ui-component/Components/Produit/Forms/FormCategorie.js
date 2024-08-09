import React, { useState, useEffect } from "react";
import axios from "axios";

function FormCategorie({submitted, setSubmitted}) {
  const [categorie, setCategorie] = useState("");

  const resetData = () =>{
    setCategorie('')
  }

  const handleSubmit = () => {

    // Créez un objet contenant les données du formulaire
    const formData = {
      categorie: categorie,
    };

        axios.post('http://127.0.0.1:8000/store/TypeProduit/', formData)
        .then((response) => {
            console.log("Réponse du serveur:", response.data);
            setSubmitted(false);
            resetData()
        })
        .catch((error) => {
            // Gérez les erreurs ici
            console.error(error);
        });
  };

  useEffect(()=>{
    if(submitted===true){
      handleSubmit();
    }
  },[submitted])

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Nom de la categorie
            </label>
            <input type="text" className="form-control" onChange={(e) => setCategorie(e.target.value)} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCategorie;