import React, {useEffect, useState} from "react";
// material-ui
import { Grid } from '@mui/material';
import Button from "@mui/material/Button";

// project imports
import MainCard from 'ui-component/cards/MainCard';
//import {useParams} from 'react-router-dom';
//import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import ListePayement from 'ui-component/Components/Payement/ListPayement';
import ListeCommande from 'ui-component/Components/Payement/ListeCommandePayement';
import EtatPayement from 'ui-component/Components/Payement/EtatPayement';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useParams} from 'react-router-dom';
import Loading from 'ui-component/Components/Loading/CylinderSpinLoader';
import ContratTitan from 'ui-component/Components/PDF/PDF_TITAN/ContratTitan'
import FactureTitan from 'ui-component/Components/PDF/PDF_TITAN/FactureTitan'
import { PDFDownloadLink} from '@react-pdf/renderer';

// ===============================|| UI COLOR ||=============================== //


function UIColor() {
  const params = useParams();
  const idPanier = params.id;
  const [idClient, setIdClient] = useState("");
  const [data, setData] = useState([]);
  const [salle, setSalle] = useState([]);
  const [fraisSupp, setFraisSupp] = useState([]);
  const [payements, setPayements] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/store/Panier/${idPanier}`;
    const apiSalleUrl = `http://127.0.0.1:8000/store/Panier/${idPanier}/salle_panier`;
    const apiDecorationUrl = `http://127.0.0.1:8000/store/Panier/${idPanier}/decoration_panier`;
    const apiArticleUrl = `http://127.0.0.1:8000/store/Panier/${idPanier}/article_panier`;
    const fraisSuppSalleUrl = `http://127.0.0.1:8000/store/Panier/${idPanier}/frais_supplementaire_panier`;
    const payementPanierUrl = `http://127.0.0.1:8000/store/Panier/${idPanier}/payement_panier`;

    Promise.all([fetch(apiUrl), fetch(apiSalleUrl), fetch(apiDecorationUrl),
       fetch(apiArticleUrl), fetch(fraisSuppSalleUrl), fetch(payementPanierUrl)])
    .then(([response1, response2, response3, response4, response5, response6]) => Promise.all([
      response1.json(), response2.json(), response3.json(), response4.json(), response5.json(), response6.json()
    ]))
    .then(([d, salleData, decorationsData, produitsData, fraisData, payementsData]) => {
      setData(d);
      setIdClient(d.client);
      setSalle(salleData);
      setDecorations(decorationsData);
      setProduits(produitsData);
      setFraisSupp(fraisData);
      setPayements(payementsData);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [data, payements, fraisSupp]);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    
    <MainCard className="h-100" title="Payements" xs={12} sm={12} md={12} lg={12}
      secondary={<>
      <PDFDownloadLink document={<ContratTitan idClient={idClient} id_panier={params.id}/>} fileName='Proforama1'>
              <Button variant="contained" color="primary" >Génerer le contrat</Button>
        </PDFDownloadLink>
        <PDFDownloadLink document={<FactureTitan idClient={idClient} panier={data} salle={salle} decorations={decorations} produits={produits}/>} fileName='Proforama1'>
              <Button variant="contained" color="primary" style={{marginLeft:"10px"}}>Génerer la facture</Button>
        </PDFDownloadLink></>}>
        {
            loading?
              (<Grid container className="h-100 w-100" style={{transform:"translate(0%,-30%)"}}><Loading/></Grid>)
                :
              (
                <Grid className="h-100" container>
                  <Grid className="h-100 mt-2" style={{marginRight:"5px", marginLeft:"5px"}} item xs={12} sm={12} md={5} lg={5}>
                    <Grid className="h-100" item>
                      <ListeCommande salle={salle} decorations={decorations} produits={produits}/>
                    </Grid>
                  </Grid>
                  <Grid className="h-100 mt-2" style={{marginRight:"15px", marginLeft:"15px"}} data-aos="zoom-in" xs={12} sm={12} md={3} lg={3}>
                    <Grid className="h-100" item>
                      <EtatPayement panier={data} salle={salle} decorations={decorations} produits={produits} fraisSupp={fraisSupp}/>
                    </Grid>
                  </Grid>
                  <Grid className="h-100 mb-5 mt-2" data-aos="zoom-in" xs={12} sm={12} md={3.5} lg={3.5}>
                    <Grid className="h-100" item>
                      <ListePayement payements={payements}/>
                    </Grid>
                  </Grid>
                </Grid>
              )
        }
      </MainCard>
  );
}

export default UIColor;
