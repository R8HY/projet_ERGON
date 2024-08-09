import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'
// import { format, parseISO, parse } from 'date-fns';
import { Grid, Button } from '@mui/material';
import ListeFraisAdditionnel from 'ui-component/Components/Payement/ListeFraisSupp';

function ListePayement({panier, salle, decorations, produits, fraisSupp, payements}) {
    const [total, setTotal] = useState(0);
    const [totalFraisSupp, setTotalFraisSupp] = useState(0);
    const [totalPayee, setTotalPayee] = useState(0);
    const [i, setI] = useState(0);
    const [data, setData] = useState(0);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/store/Commande/`;

    Promise.all([fetch(apiUrl)])
    .then(([response1]) => Promise.all([
      response1.json()
    ]))
    .then(([d]) => {
      d=d.filter(data=>data.panier===panier.id)[0];
      setData(d);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [data]);

  useEffect(() => {
    i===0&&produits.map(s=>setTotal(total+parseInt(s.prixP)*parseInt(s.quantiteCasse)));
    i===1&&decorations.map(s=>setTotal(total+parseInt(s.prixDecoration)*parseInt(s.quantiteCasse)));
    i===2&&salle.map(s=>setTotal(total+parseInt(s.montant)));
    i===3&&fraisSupp.map(d=>setTotalFraisSupp(totalFraisSupp+d.montant))
    i===4&&payements.map(d=>setTotalPayee(totalPayee+d.montant))
    i<5&&setI(i+1);
  }, [i]);

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

  // const getSplittedDate = (date) => {
  //   date = date.split('Z')[0];
  //   const datePart = date.split('T')[0];
  //   const TimePart = date.split('T')[1];
  //   const d = datePart.split('-')
  //   const t = TimePart.split(':')
  //   const result = d.concat(t);
  //   return result;
  // }

  return (
        <Grid container>
          <Grid data-aos="zoom-in" container className="h-100 myContainer mb-4 d-flex">
            <div style={{width:"100%", maxHeight:"100px"}}>
              <span style={{fontWeight:"bold"}}>Frais de Casse : </span>{total} Ariary
            </div>
            
          </Grid>
          <Grid data-aos="zoom-in" container className="h-100 myContainer mb-4 d-flex">
            <div style={{width:"100%", height:"300px"}}>
              <span style={{fontWeight:"bold"}}>Frais additionnels : </span>
                <Button style={{float:"right", width:"3px", height:"20px", fontWeight:"bold"}} variant="contained" color="secondary">
                    +
                </Button>  
                <ListeFraisAdditionnel fraisSupp={fraisSupp}/>
            </div>
            
          </Grid>
          <Grid data-aos="zoom-in" container className="h-100 myContainer mb-4">
            <div style={{width:"100%", maxHeight:"100px"}}>
              <span style={{fontWeight:"bold"}}>Total : </span>{parseInt(total)+parseInt(totalFraisSupp)} Ariary
            </div>  

          </Grid>
          <Grid data-aos="zoom-in" container className="h-100 myContainer mb-4">
            <div style={{width:"100%", maxHeight:"100px"}}>
              <span style={{fontWeight:"bold"}}>Monant payé : </span>{totalPayee} Ariary
            </div>  

          </Grid>
            <Button style={{width:"100%", height:"60px"}} variant="contained" color="secondary">
                Ajouter un payement
            </Button>  

        </Grid>
  );
}

export default ListePayement;