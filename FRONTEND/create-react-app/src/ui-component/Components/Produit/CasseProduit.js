import { useState } from "react";
import axios from "axios";

function CasseProduit({ onSend, selectedProduct }) {
  // const [nomProduit, setNomProduit] = useState("");
  // const [prix_unitaire, setPrix_unitaire] = useState("");
  const [quantite, setQuantite] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProduct) { // Vérification pour éviter l'erreur si selectedProduct est null
      onSend({ quantite });
    }
    else{
      console.log('ca ne marche pas')
    }

    setQuantite("");

    // Créez un objet contenant les données du formulaire
    const formData = {
      produit:idProduit,
      //prix_unitaire:prix_unitaire,
      quantite:quantite,
      //id:id,
    };

        axios.post(`http://127.0.0.1:8000/store/Panier/${id_panier}/article_panier/`, formData)
        .then((response) => response.json())
        .then((data) => {
            console.log("Réponse du serveur:", data);
        })
        .catch((error) => {
            // Gérez les erreurs ici
            console.error("Erreur:"+error);
        });
  };


  return (
    <div>
      <div>
        <h3>Remplissez vos panier!</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Nom du produit
            </label>
            <input type="text" className="form-control" value={selectedProduct.nomP} disabled/>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
                Nombre de casse
            </label>
            <input type="text" className="form-control" onChange={(e) => setQuantite(e.target.value)} min={0}/>
          </div>
          <button className="btn btn-primary" onClick={handleSubmit} type="submit">Modifier</button>
        
        </form>
      </div>
    </div>
  );
}

export default CasseProduit;