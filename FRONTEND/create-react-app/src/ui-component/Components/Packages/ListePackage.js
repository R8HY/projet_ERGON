import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRipple,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";
import AOS from 'aos';
import { Button } from 'react-bootstrap'; 
import 'aos/dist/aos.css'

function App() {
  const [packs, setPacks] = useState([]);
  const [products, setProducts] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [listeDeco, setListeDeco] = useState([]);
  const [listeProd, setListeProd] = useState([]);
  const [images, setImages] = useState([]);
  const [salles, setSalles] = useState([]);

    useEffect(() => {
      const apiUrl = "http://127.0.0.1:8000/store/Location/Package";
      const decorationUrl = "http://127.0.0.1:8000/store/Location/DecorationsPackage";
      const produitsUrl = "http://127.0.0.1:8000/store/Produit";
      const decorationsUrl = "http://127.0.0.1:8000/store/Location/Decoration";
      const produitUrl = "http://127.0.0.1:8000/store/Location/ProduitsPackage";
      const imageUrl = "http://127.0.0.1:8000/store/Location/ImagesPackage";
      const salleUrl = "http://127.0.0.1:8000/store/Location/Salle";

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setPacks(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        fetch(decorationUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setDecorations(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        fetch(imageUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setImages(data);
        })
        fetch(salleUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSalles(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        fetch(decorationsUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setListeDeco(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        fetch(produitsUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setListeProd(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
        fetch(produitUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

    const getImage = (type, id) =>{
      var img = "";
      if(type==="deco") img = listeDeco.filter((item)=>item.id===id);
      if(type==="prod") img = listeProd.filter((item)=>item.id===id);
      if(img[0] && 
        img[0].image!=="http://127.0.0.1:8000/media/products/defaultImage.png" && 
        img[0].image!=="http://127.0.0.1:8000/media/decorations/defaultImage.png") {
         return img[0].image; 
        }
      else return "";
    }

    useEffect(() => {
      AOS.init({ duration: 2000 });
    }, []);

  return (
    <MDBContainer fluid>
      {packs.map((item, index) => (
        <MDBRow key={index}>
          <MDBCard style={{ height: '55%', display:'inline-block' }} data-aos="zoom-in" className="shadow-0 border rounded-3 mb-4 mt-2 mb-3">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol style={{ height: '520px', overflowY: 'auto' }} md="12" lg="3" className="mb-2 mb-lg-0">
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom hover-overlay"
                    >
                    {images
                          .filter((prod) => prod.package == item.id)
                          .map((img, index) => (<MDBRow key={index} className="mb-2"><MDBRipple
                          rippleColor="dark"
                          rippleTag="div"
                          className="bg-image rounded hover-zoom shadow-1-strong"
                        >
                          <img
                            src={img.image}
                            className="w-100 listeImage"
                            alt="Package"
                            style={{borderRadius:"10px"}}
                          />
                        </MDBRipple></MDBRow>))}
                    {salles
                        .filter((prod) => prod.id == item.salle)
                        .map((salle, index) => (salle.image!=="http://127.0.0.1:8000/media/salles/defaultImage.png"?
                        (<MDBRow key={index} className="mb-2"><MDBRipple
                        rippleColor="dark"
                        rippleTag="div"
                        className="bg-image rounded hover-zoom shadow-1-strong"
                      >
                        <img
                          src={(salle.image)}
                          className="w-100 listeImage"
                          alt={salle.nom}
                          style={{borderRadius:"10px"}}
                          />
                        </MDBRipple></MDBRow>):(<></>)))}
                    {decorations
                            .filter((deco) => deco.package == item.id)
                            .map((deco, index) => (getImage("deco", deco.decoration)!==""?(<MDBRow key={index} className="mb-2"><MDBRipple
                            rippleColor="dark"
                            rippleTag="div"
                            className="bg-image rounded hover-zoom shadow-1-strong"
                          >
                            <img
                              src={getImage("deco", deco.decoration)}
                              className="w-100 listeImage"
                              alt={deco.nom}
                              style={{borderRadius:"10px"}}
                            />
                          </MDBRipple></MDBRow>):(<></>)))}
                    {products
                          .filter((prod) => prod.package == item.id)
                          .map((prod, index) => (getImage("prod", prod.produit)!==""?(<MDBRow key={index} className="mb-2"><MDBRipple
                          rippleColor="dark"
                          rippleTag="div"
                          className="bg-image rounded hover-zoom shadow-1-strong"
                        >
                          <img
                            src={getImage("prod", prod.produit)}
                            className="w-100 listeImage"
                            alt={prod.nomProduit}
                            style={{borderRadius:"10px"}}
                          />
                        </MDBRipple></MDBRow>):(<></>)))}
                    </MDBRipple>
                  </MDBCol>
                  <MDBCol md="6" style={{ height: '520px', overflowY: 'auto' }}>
                  <MDBRow>
                    <div className="text-center mt-1">
                      <MDBCardTitle className="h4 mb-4">{item.nom}</MDBCardTitle>
                      <h6 className="text-primary mb-3 pb-4">{salles
                        .filter((prod) => prod.id == item.salle)
                        .map((salle, index) => (<h4 key={index} style={{color:"#bbb"}}>Salle : {salle.nom}</h4>))}<br/>{item.description}</h6>
                    </div>
                  </MDBRow>
                  <MDBRow>
                    <div className="text-center">
                      <div
                        className="p-3 mx-n3 mb-3"
                        style={{ backgroundColor: "#eff1f2" }}
                      >
                        <h5 className="mb-0">Decorations</h5>
                      </div>

                      {/* <div className="d-flex flex-column mb-3">
                        <span className="h1 mb-0">5.8″</span>
                        <span>Super Retina HD display1</span>
                      </div> */}

                      <div className="d-flex flex-column mb-3">
                        <span className="h1 mb-0">
                          <MDBIcon fas icon="camera-retro" />
                        </span>
                        <ul className="list-unstyled mb-0">
                          {decorations
                            .filter((deco) => deco.package == item.id)
                            .map((deco, index) => (<li key={index} aria-hidden="true">{deco.nomDecoration}</li>))}
                          <li aria-hidden="true">—</li>
                        </ul>
                      </div>

                      {/* <div className="d-flex flex-column mb-3">
                        <span className="h1 mb-0">4x</span>
                        <span>Optical zoom range</span>
                      </div> */}

                      <div
                        className="p-3 mx-n3 mb-3"
                        style={{ backgroundColor: "#eff1f2" }}
                      >
                        <h5 className="mb-0">Produits</h5>
                      </div>

                      <div className="d-flex flex-column mb-3">
                        <span className="h1 mb-0">
                          <MDBIcon fas icon="camera-retro" />
                        </span>
                        <ul className="list-unstyled mb-0">
                          {products
                            .filter((prod) => prod.package == item.id)
                            .map((prod, index) => (<li key={index} aria-hidden="true">{prod.nomProduit}</li>))}
                          <li aria-hidden="true">—</li>
                        </ul>
                      </div>
                    </div>
                  </MDBRow>
                    <div className="d-flex flex-row">
                      <div className="text-danger mb-1 me-2">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                      </div>
                      {/* <span>310</span> */}
                    </div>
                    {/* <div className="mt-1 mb-0 text-muted small">
                      <span>100% cotton</span>
                      <span className="text-primary"> • </span>
                      <span>Light weight</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Best finish
                        <br />
                      </span>
                    </div>
                    <div className="mb-2 text-muted small">
                      <span>Unique design</span>
                      <span className="text-primary"> • </span>
                      <span>For men</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Casual
                        <br />
                      </span>
                    </div> */}
                  </MDBCol>
                  <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start text-center"
                >
                <div>
                  <div className="d-flex flex-row align-items-center mb-1" style={{textAlign:"center", alignItems:"center", justifyContent:"center"}}>
                    <h4 className="mb-5 me-1" style={{fontSize:"2.5rem", textAlign:"center"}}>{item.prix.toLocaleString()} Ar</h4>
                    {/* <span className="text-danger">
                      <s>$20.99</s>
                    </span> */}
                  </div>
                  {/* <h6 className="text-success">Free shipping</h6> */}
                  <div className="d-flex flex-column" style={{marginTop:"100%"}}>
                    <Button variant="primary" size="sm">
                        Details
                      </Button>
                      <Button style={{backgroundColor:"white", color:"blue"}} size="sm" className="mt-2">
                        Louer
                      </Button>
                  </div>
                </div>
                </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        ))}
    </MDBContainer>
  );
}

export default App;