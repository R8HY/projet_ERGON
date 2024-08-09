import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Card from "@mui/material/Card";
// import InfoCommande from 'ui-component/Components/Commande/InfoCommande';
import ArticleCommande from 'ui-component/Components/Article/ArticleCommande';
import {faCartShopping, faCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { PDFDownloadLink} from '@react-pdf/renderer';
// import ContratTitan from 'ui-component/Components/PDF/PDF_TITAN/ContratTitan';
// import ContratTitan2 from 'ui-component/ui-template/template/PDF/PDF_TITAN/ContratTitan2';

const cardContainer = {
  display: 'flex',
};

function CommandeClient() {
    const params = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const apiUrl = `http://127.0.0.1:8000/store/Commande/${params.id}`;
  
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
          console.log(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }, [params.id]);
    console.log(params.id)

  return (
    <MainCard title="Finaliser la commande">
      <Typography variant="body2">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div style={cardContainer}>
            <div className="container">
                            <div className="row text-center" style={{display:"flex", justifyContent:"space-around"}}>
                                {/* <Card variant="outlined" style={{width: "25%"}} className="mb-4">
                                    <span className="fa-stack fa-4x">
                                        {/* <i className="fas fa-circle fa-stack-2x text-primary"></i> 
                                        <FontAwesomeIcon icon={faCircle} className="fa-stack-2x text-warning" bounce/>
                                        <FontAwesomeIcon icon={faBagShopping} className="fa-stack-1x fa-inverse" bounce/>
                                    </span>
                                    <h4 className="my-3">Vos commandes</h4>
                                    <p className="text-muted"><InfoCommande/></p>
                                  </Card> */}

                                  <Card variant="outlined" style={{width: "25%"}} className="mb-4">
                                    <span className="fa-stack fa-4x">
                                          <FontAwesomeIcon icon={faCircle} className="fa-stack-2x text-danger" bounce/>
                                          <FontAwesomeIcon icon={faCartShopping} className="fa-stack-1x fa-inverse" bounce/>
                                      </span>
                                      <h4 className="my-3">Vos articles</h4>
                                      <p className="text-muted">{data.panier && <ArticleCommande id_panier={data.panier} />}</p>
                                  </Card>

                                  {/* <Card variant="outlined" style={{width: "25%"}} className="mb-4">
                                    <span className="fa-stack fa-4x">
                                        {/* <i className="fas fa-circle fa-stack-2x text-primary"></i> 
                                        <FontAwesomeIcon icon={faCircle} className="fa-stack-2x text-warning" bounce/>
                                        <FontAwesomeIcon icon={faBagShopping} className="fa-stack-1x fa-inverse" bounce/>
                                    </span>
                                    <h4 className="my-3">Vos commandes</h4>
                                    <p className="text-muted"><InfoCommande/></p>
                                  </Card> */}
                                {/* <div className="col-md-4">
                                    <span className="fa-stack fa-4x">
                                        <FontAwesomeIcon icon={faCircle} className="fa-stack-2x text-danger" bounce/>
                                        <FontAwesomeIcon icon={faCartShopping} className="fa-stack-1x fa-inverse" bounce/>
                                    </span>
                                    <h4 className="my-3">Vos articles</h4>
                                    <p className="text-muted">{data.panier && <ArticlesCommande id_panier={data.panier} />}</p>
                                </div> */}
                                {/* <div className="col-md-4">
                                    <span className="fa-stack fa-4x">
                                        <FontAwesomeIcon icon={faCircle} className="fa-stack-2x text-primary" bounce/>
                                        <FontAwesomeIcon icon={faUser} className="fa-stack-1x fa-inverse" bounce/>
                                    </span>
                                    <h4 className="my-3">Vos informations</h4>
                                    <p className="text-muted"><InfoClientComm id={data.id_client}/></p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </Typography>

            {/* <PDFDownloadLink document={<ContratTitan/>} fileName='Proforama1'>
              {({ blob, url, loading, error }) =>
                loading ? (
                  <button>Loading...</button>
                ) : (
                  <button onClick={() => console.log(blob, url, error)}>Download</button>
                )
              }
            </PDFDownloadLink> */}
        </MainCard>
    )
}

 
export default CommandeClient;