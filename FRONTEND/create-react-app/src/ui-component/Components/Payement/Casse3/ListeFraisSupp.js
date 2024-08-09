import React from "react";
import Button from '@mui/material/Button'
import {useParams} from 'react-router-dom';

function ArticleCheckUp({fraisSupp}) {
    const params = useParams();

    const deletePayement = (payementId) => {
        // Utilisez fetch avec la méthode DELETE pour supprimer le paiement
        fetch(`http://127.0.0.1:8000/store/Panier/${params.id}/frais_supplementaire_casse_panier/${payementId}`, {
            method: "DELETE",
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("Paiement supprimé avec succès !");
            })
            .catch((error) => {
            console.error("Erreur lors de la suppression du paiement:", error);
            });
        };

  return (
        <table className="table" style={{width:"100%", marginTop:"10px"}}>
        <tbody>
            {fraisSupp.map((elem, index) => (
            <tr key={index}>
                <td style={{width:"5%"}}><Button style={{color:"red"}} onClick={()=>{deletePayement(elem.id)}}>x</Button></td>
                <td><p style={{transform:"translate(0%,50%)"}}>{elem.motif}</p></td>
                <td><p style={{transform:"translate(0%,50%)"}}>-</p></td>
                <td><p style={{transform:"translate(0%,50%)"}}>{elem.montant} Ariary</p></td>
            </tr>
            ))}
        </tbody>
        </table>
  );
}

export default ArticleCheckUp;