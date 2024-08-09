import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'
// import { format, parseISO, parse } from 'date-fns';
import { Grid, Button } from '@mui/material';
import ListeFraisAdditionnel from 'ui-component/Components/Payement/ListeFraisSupp';
import FormPayement from './Form/FormPayement';
import FormFraisSupp from './Form/FormFraisSupp';
import FormModal from "ui-component/Components/Modals/FormModal";

function ListePayement({panier, salle, decorations, produits, fraisSupp}) {
    const [total, setTotal] = useState(0);
    const [totalFraisSupp, setTotalFraisSupp] = useState(0);
    const [i, setI] = useState(0);
    const [data, setData] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [showFormSupp, setShowFormSupp] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submittedSupp, setSubmittedSupp] = useState(false);

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
    console.log(produits, decorations, salle)
    i===0&&produits.map(s=>setTotal(total+parseInt(s.prixP)*parseInt(s.quantite)));
    i===1&&decorations.map(s=>setTotal(total+parseInt(s.prixDecoration)*parseInt(s.quantite)));
    (i===2&&salle)&&salle.map(s=>setTotal(total+parseInt(s.prixSalle)));
    i===3&&fraisSupp.map(d=>setTotalFraisSupp(totalFraisSupp+d.montant))
    i<4&&setI(i+1);
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
            <FormModal 
                onSubmit={()=>setSubmitted(true)}
                showForm={showForm} 
                setShowForm={setShowForm}
                >
                  <FormPayement idPanier={panier.id} submitted={submitted} setSubmitted={setSubmitted}/>
              </FormModal>
              <FormModal 
                onSubmit={()=>setSubmittedSupp(true)}
                showForm={showFormSupp} 
                setShowForm={setShowFormSupp}
                >
                  <FormFraisSupp idPanier={panier.id} submitted={submittedSupp} setSubmitted={setSubmittedSupp}/>
              </FormModal>
          <Grid data-aos="zoom-in" container className="h-100 myContainer mb-4 d-flex">
            <div style={{width:"100%", maxHeight:"100px"}}>
              <span style={{fontWeight:"bold"}}>Frais de locations : </span>{total} Ariary
            </div>
            
          </Grid>
          <Grid data-aos="zoom-in" container className="h-100 myContainer mb-4 d-flex">
            <div style={{width:"100%", height:"300px"}}>
              <span style={{fontWeight:"bold"}}>Frais additionnels : </span>
                <Button onClick={()=>setShowFormSupp(true)} style={{float:"right", width:"3px", height:"20px", fontWeight:"bold"}} variant="contained" color="secondary">
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
              <span style={{fontWeight:"bold"}}> Monant payé : </span>{data.montant_payee} Ariary
            </div>  

          </Grid>
            <Button onClick={()=>setShowForm(true)} style={{width:"100%", height:"60px"}} variant="contained" color="secondary">
                Ajouter un payement
            </Button>  

        </Grid>
  );
}

export default ListePayement;