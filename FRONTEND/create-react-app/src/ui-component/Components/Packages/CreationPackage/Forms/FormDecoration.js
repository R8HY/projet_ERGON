import { useState } from "react";
import axios from 'axios';
import {useParams} from 'react-router-dom';

function FormPanier({settedData, decoration, setShowForm}) {
  // const [nomProduit, setNomProduit] = useState("");
  // const [prix_unitaire, setPrix_unitaire] = useState("");
  const [quantite, setQuantite] = useState(settedData.length>0?settedData[0].quantite:"");
  const params = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(settedData.length>0){
      axios.delete(`http://127.0.0.1:8000/store/Panier/${params.id}/decoration_panier/${settedData[0].id}`)
    }
    else{
      const formData = {
        decoration:decoration.id,
        panier:params.id,
        quantite:quantite
      }
      axios.post(`http://127.0.0.1:8000/store/Panier/${params.id}/decoration_panier/`, 
        formData)
    }
    setShowForm(false);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Nom du decoration
            </label>
            <input type="text" className="form-control" value={decoration.nom} disabled/>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Prix unitaire
            </label>
            <input type="price" className="form-control" value={decoration.prix_unitaire} disabled/>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Quantité
            </label>
            <input type="text" value={quantite} disabled={settedData.length>0} className="form-control" onChange={(e) => setQuantite(e.target.value)} min={0}/>
          </div>
          <div style={{ textAlign: "right" }}>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {!(settedData.length>0)?"Ajouter à la commande":"Supprimer de la commande"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPanier;