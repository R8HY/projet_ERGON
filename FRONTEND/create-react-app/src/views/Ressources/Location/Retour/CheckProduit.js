import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Grid } from '@mui/material';
import Button from "@mui/material/Button";
//import ArticlesCommande from 'ui-component/ui-template/template/Commande/articlesCommande';
import { useParams } from 'react-router';
import ArticleCheckUp from 'ui-component/Components/Article/ArticlesCheckUp';
import ListeCasse from 'ui-component/Components/Article/ListeCasse';
import Loading from 'ui-component/Components/Loading/CylinderSpinLoader';

function CheckProduit() {
    const params = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [casseProd, setCasseProd] = useState([]);
    const [casseDeco, setCasseDeco] = useState([]);
    const [produitLouee, setProduitLouee] = useState([]);
    const [decoLouee, setDecoLouee] = useState([]);
  
    useEffect(() => {
      const apiCmdUrl = `http://127.0.0.1:8000/store/Commande/${params.id}`;
      Promise.all([fetch(apiCmdUrl)])
        .then(([ response]) => Promise.all([response.json()]))
        .then(([data]) => {
            setData(data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [casseDeco, casseProd]);

    

  useEffect(() => {
    // Define the URL for your GET request
    const apiUrl = `http://127.0.0.1:8000/store/Panier/${data.panier}/article_panier/`;
    const decoApiUrl = `http://127.0.0.1:8000/store/Panier/${data.panier}/decoration_panier/`;
    const apiUrlC = `http://127.0.0.1:8000/store/Panier/${data.panier}/casse_article_panier/`;
    const decoApiUrlC = `http://127.0.0.1:8000/store/Panier/${data.panier}/casse_decoration_panier/`;

    Promise.all([fetch(apiUrl), fetch(decoApiUrl), fetch(apiUrlC), fetch(decoApiUrlC)])
      .then(([response1, response2, response3, response4]) => Promise.all([response1.json(), response2.json(), response3.json(), response4.json()]))
      .then(([artData, decoData, cassP, cassD]) => {
        console.log(artData, decoData, cassP, cassD);
        setProduitLouee(artData);
        setDecoLouee(decoData);
        setCasseProd(cassP);
        setCasseDeco(cassD);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data, casseProd, casseDeco, produitLouee, decoLouee]);

  return (
    <MainCard title="Retour sur location" secondary={<Button variant="contained" color="primary">Confirmer</Button>} className="h-100" xs={12} sm={12} md={12} lg={12}>
      {isLoading ? (
          <Grid container style={{transform:"translate(0%,-30%)"}}><Loading/></Grid>
          ) : (
          <Grid className="h-100" container>
            <Grid className="h-100 mt-2" style={{marginRight:"5px", marginLeft:"5px"}} item xs={12} sm={12} md={4.5} lg={4.5}>
              <Grid className="h-100" item>
                 <ArticleCheckUp id_panier={data.id}
                  casseProd={casseProd} casseDeco={casseDeco}
                  produitLouee={produitLouee} decoLouee={decoLouee}
                />
              </Grid>
            </Grid>
            <Grid className="h-100 mt-2" style={{marginRight:"5px", marginLeft:"5px"}} data-aos="zoom-in" xs={12} sm={12} md={7} lg={7}>
              <Grid className="h-100" item>
              <ListeCasse cmd={data} casseProd={casseProd} casseDeco={casseDeco}
                produitLouee={produitLouee} decoLouee={decoLouee} />
              </Grid>
            </Grid>
          </Grid>
        )}
    </MainCard>
  );
}

 
export default CheckProduit;