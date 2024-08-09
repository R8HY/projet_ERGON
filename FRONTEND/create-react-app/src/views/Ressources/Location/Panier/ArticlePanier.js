import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBRipple } from 'mdb-react-ui-kit';
import { Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import {useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductItem from 'ui-component/Components/Produit/ItemProduit';
import DecorationItem from 'ui-component/Components/Decoration/ItemDecoration';
import SalleItem from 'ui-component/Components/Salle/ItemSalle';
import ListeSalle from 'ui-component/Components/SelectableLists/Salle';
import ListeDeco from 'ui-component/Components/SelectableLists/Decoration';
import ListeProduit from 'ui-component/Components/SelectableLists/Produit';
// import image from 'assets/images/panierages.jpeg';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function EditButton() {
  const params = useParams();
  const [panier, setPanier] = useState({});
  const [commande, setCommande] = useState({});
  const [event, setEvent] = useState({});
  const [salles, setSalles] = useState([]);
  const [products, setProducts] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [modification, setModification] = useState(false);
  const [view, setView] = useState("main");

    useEffect(() => {
      const apiUrl = `http://127.0.0.1:8000/store/Panier/${params.id}`;
      const decorationsUrl = `http://127.0.0.1:8000/store/Panier/${params.id}/decoration_panier`;
      const produitsUrl = `http://127.0.0.1:8000/store/Panier/${params.id}/article_panier`;
      const sallesUrl = `http://127.0.0.1:8000/store/Panier/${params.id}/salle_panier`;

        Promise.all([fetch(apiUrl),fetch(decorationsUrl), fetch(produitsUrl), fetch(sallesUrl)])
        .then(([response, response1, response2, response3]) => Promise.all(
          [response.json(), response1.json(), response2.json(),  response3.json()]
          ))
        .then(([data, decorationsData, produitsData, sallesData]) => {
          setPanier(data);
          setDecorations(decorationsData);
          setProducts(produitsData);
          setSalles(sallesData);
          const cmdUrl = `http://127.0.0.1:8000/store/Commande/`;
          Promise.all([fetch(cmdUrl)])
          .then(([response]) => Promise.all(
            [response.json()]
            ))
          .then(([d]) => {
            d=d.filter(cmd=>cmd.panier===data.id)[0];
            setCommande(d);
            const evUrl = `http://127.0.0.1:8000/store/Evenement/`;
            Promise.all([fetch(evUrl)])
            .then(([response]) => Promise.all(
              [response.json()]
              ))
            .then(([dev]) => {
              setEvent(dev.filter(cmd=>cmd.commande===d.id)[0]);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, [panier, salles, products, decorations]);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <MainCard title="Locations" className="h-100" primary={view !== "main"&&<><Button variant="contained" data-aos="zoom-in" color="primary">Confirmer</Button>
      <Button variant="contained" data-aos="zoom-in" style={{marginLeft:"10px"}} color="primary" onClick={()=>{setView("main")}}>Retour</Button></>}>
        {view === "main" ? (<MDBRow className="justify-content-center align-items-center h-100 w-60">
          <MDBCol>
            <MDBCard data-aos="zoom-in" className="mb-4-none" style={{border:"solid #eee 1px", cursor:"default"}}>
              {/* <div className="rounded-top text-white d-flex flex-row" style={{
                  backgroundSize:"cover", height: '100px' }}>
                <div className="ms-3" style={{ marginTop: '50px', zIndex:"1", opacity:"1" }}>
              <MDBTypography tag="h3">{event.description}</MDBTypography>
                </div>
                {/* <div className="position-absolute top-0 start-0 w-100" 
                  style={{ background: 'rgba(50, 50, 255, 0.5)', 
                  height: '100px' }}></div>
              </div> */}
              <div className="p-4 text-black" style={{ backgroundColor: '#eef5ff',borderBottom:"solid 4px whitesmoke" }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <Button variant="contained" color="primary" onClick={()=>{setModification(!modification)}} style={{height: '36px', overflow: 'visible'}}>
                      {modification?"Confirmer":"Customizer"}
                    </Button>
                  </div>
                  {/* <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div> */}
                </div>
              </div>


              <MDBCardBody className="text-black p-4">

               <div data-aos="fade-up">
                 <div className="mb-5">
                 <div className="d-flex justify-content-between align-items-center mb-8 pt-2 p-2">
                    <MDBCardText className="lead fw-normal mb-0" style={{color:"#666"}}>Description</MDBCardText>
                  </div>
                  
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                <MDBCardText className="font-italic mb-1 fs-20">{event.description}</MDBCardText>
                  </div>
                </div>
                </div>
                
                {commande.locationSalle&&<div data-aos="fade-up">
                <div className="d-flex justify-content-between align-items-center mb-8 pt-2 p-2">
                  <MDBCardText className="lead fw-normal mb-0" style={{color:"#666"}}>Salle</MDBCardText>
                  {modification&&<Button  
                    onClick={()=>{setView("salle")}} variant="contained" color="primary" style={{fontSize: '12px', overflow: 'visible', color:"white"}}>
                      Modifier
                    </Button>}
                </div>
                {salles.length>0&&<MDBRow className="mb-5 p-2 pb-0" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                  <MDBCol className="mb-2"><MDBRow className="mb-2">
                  {salles
                        .map((salle, index) => (<MDBRow key={index} className="mb-2">
                        <SalleItem salle={salle.salle}/></MDBRow>
                      ))}
                    </MDBRow>
                  </MDBCol>
                </MDBRow>}
               </div>}
               


               
               
               {commande.locationProduit&&<div data-aos="fade-up">
                <div className="d-flex justify-content-between align-items-center mb-8 pt-2 p-2">
                  <MDBCardText className="lead fw-normal mb-0" style={{color:"#666"}}>Produits</MDBCardText>
                  {modification&&<Button onClick={()=>{setView("produits")}} 
                    variant="contained" color="primary" style={{fontSize: '12px', overflow: 'visible', color:"white"}}>
                      Modifier
                    </Button>}
                </div>
                {products.length>0&&<MDBRow style={{ backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                  <MDBCol className="mb-2">
                  {products
                          .map((prod, index) => <MDBRow key={index} className="mb-2"><MDBRipple
                          ripple
                          rippleTag="div"
                          className="bg-image rounded hover-zoom shadow-1-strong"
                        >
                          <ProductItem id={prod.produit}
                            />
                        </MDBRipple></MDBRow>)}
                  </MDBCol>
                </MDBRow>}
               </div>}
               


               
               
               {commande.locationDecoration&&<div data-aos="fade-up">
                <div className="d-flex justify-content-between align-items-center mb-8 pt-2 p-2">
                  <MDBCardText className="lead fw-normal mb-0" style={{color:"#666"}}>Décorations</MDBCardText>
                  {modification&&<Button onClick={()=>{setView("decorations")}} 
                    variant="contained"  color="primary" style={{fontSize: '12px', overflow: 'visible', color:"white"}}>
                      Modifier
                    </Button>}
                </div>
                {decorations.length>0&&<MDBRow className="mb-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                  <MDBCol className="mb-2">
                  {decorations
                            .map((deco, index) => <MDBRow key={index} className="mb-2"><MDBRipple
                            ripple
                            rippleTag="div"
                            className="bg-image rounded hover-zoom shadow-1-strong"
                          >
                            <DecorationItem id={deco.decoration}
                            />
                          </MDBRipple></MDBRow>)}
                  </MDBCol>
                </MDBRow>}
               </div>}
               
              </MDBCardBody>
              <div className="p-4 text-black" style={{ backgroundColor: '#eef5ff', borderTop:"solid 4px whitesmoke" }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div className="px-3">
                      <Button variant="outlined" color="primary" style={{height: '36px', overflow: 'visible'}}>
                        Tout annuler
                      </Button>
                    </div>
                </div>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>):(<></>)}
        {view === "salle" ? (<ListeSalle salle={salles} setView={setView} params={params}/>) : <></>}
        {view === "produits" ? (<ListeProduit produits={products} setProduits={setProducts} setView={setView} params={params}/>) : <></>}          
        {view === "decorations" ? (<ListeDeco decorations={decorations} setDecorations={setDecorations} setView={setView} params={params}/>) : <></>}
    </MainCard>
  );
}