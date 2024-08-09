import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'
// import { format, parseISO, parse } from 'date-fns';
import { Grid, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

function ListePayement({payements}) {
  const params = useParams();

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  // const getClock = (h) => {
  //   var heure = parseInt(h);
  //   if(heure===0)heure='12';
  //   if(heure>12)heure=heure-12;
  //   return heure;
  // }

  // const isPast = (date) => {
  //   const newDate = parse(date, "dd/MM/yyyy hh:mm", new Date());
  //   const today = new Date();
  //   const formatedDate = format(newDate, "dd/MM/yyyy");
  //   const formatedToday = format(today, "dd/MM/yyyy");
  //   return  formatedDate<formatedToday;
  // }

  const getSplittedDate = (date) => {
    return date.split('-');
  }

  const deletePayement = (payementId) => {
    // Utilisez fetch avec la méthode DELETE pour supprimer le paiement
    fetch(`http://127.0.0.1:8000/store/Panier/${params.id}/payement_casse_panier/${payementId}`, {
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
      <Grid container className="h-100">
        <Grid data-aos="zoom-in" container className="h-100 myContainer w-100">
          <table className="table" style={{width:"100%", marginTop:"10px"}}>
            <tbody>
                {payements.map((elem, index) => (
                <tr key={index}>
                    <td style={{width:"30%"}}><span style={{fontWeight:"bold"}}>Payement {index+1} : </span></td>
                    <td style={{textAlign:"right"}}>{getSplittedDate(elem.date)[2]} / {getSplittedDate(elem.date)[1]} / {getSplittedDate(elem.date)[0]}</td>
                    <td style={{width:"10px"}}>-</td>
                    <td>{elem.montant} Ariary</td>
                    <td style={{width:"5%"}}><Button style={{color:"red"}} onClick={()=>{deletePayement(elem.id)}}>x</Button></td>
                </tr>
                ))}
            </tbody>
          </table>
        </Grid>
      </Grid>
  );
}

export default ListePayement;