import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBBtn, MDBTypography, MDBRipple } from 'mdb-react-ui-kit';
import MainCard from 'ui-component/cards/MainCard';
import {useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductItem from 'ui-component/Components/Produit/ItemProduit';
import DecorationItem from 'ui-component/Components/Decoration/ItemDecoration';
import SalleItem from 'ui-component/Components/Salle/ItemSalle';
// import image from 'assets/images/packages.jpeg';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function EditButton() {
  const params = useParams();
  const [pack, setPack] = useState({});
  const [products, setProducts] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [listeDeco, setListeDeco] = useState([]);
  const [listeProd, setListeProd] = useState([]);
  const [images, setImages] = useState([]);
  const [salles, setSalles] = useState([]);
  const [bgImage, setBgImage] = useState(null);

    useEffect(() => {
      const apiUrl = `http://127.0.0.1:8000/store/Location/Package/${params.id}`;
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
          setPack(data);
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
          console.log(data.filter((prod) => prod.package == params.id)[0].image);
          setBgImage(data.filter((prod) => prod.package == params.id)[0].image);
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
    <MainCard title="Packages">
      <MDBContainer className="py-2 h-100 w-60">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard data-aos="zoom-in" className="mb-4">
              <div className="rounded-top text-white d-flex flex-row" style={{
                 backgroundImage: `url(${bgImage})`, 
                  backgroundSize:"cover", height: '600px' }}>
                {/* <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn>
                </div> */}
                <div className="ms-3" style={{ marginTop: '500px', zIndex:"1", opacity:"1" }}>
                  <MDBTypography tag="h1">Package {pack.id}</MDBTypography>
                  <MDBCardText className="mb-5">{pack.nom}</MDBCardText>
                </div>
                <div className="position-absolute top-0 start-0 w-100" 
                  style={{ background: 'rgba(50, 50, 255, 0.5)', 
                  height: '600px' }}></div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBBtn color="primary" style={{height: '36px', overflow: 'visible'}}>
                      Customiser
                    </MDBBtn>
                  </div>
                  <div className="px-3">
                    <MDBBtn outline color="primary" style={{height: '36px', overflow: 'visible'}}>
                      Supprimer
                    </MDBBtn>
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
                  <p className="lead fw-normal mb-4 pt-2 p-2" style={{color:"blue"}}>Description</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">{pack.description}</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 pt-2 p-2">
                  <MDBCardText className="lead fw-normal mb-0" style={{color:"blue"}}>Salle</MDBCardText>
                  {/* <MDBCardText className="mb-0"><MDBBtn color="dark" style={{fontSize: '12px', overflow: 'visible'}}>
                      Modifier
                    </MDBBtn></MDBCardText> */}
                </div>
                <MDBRow>
                  <MDBCol className="mb-2"><MDBRow className="mb-2">
                  {salles
                        .filter((prod) => prod.id == pack.salle)
                        .map((salle, index) => (<MDBRow key={index} className="mb-2">
                        <SalleItem salle={pack.salle}/></MDBRow>
                      ))}
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
               </div>
               
               
               
               
               
               <div data-aos="fade-up">
                <div className="d-flex justify-content-between align-items-center mb-4 pt-2 p-2">
                  <MDBCardText className="lead fw-normal mb-0" style={{color:"blue"}}>Décorations</MDBCardText>
                  {/* <MDBCardText className="mb-0"><MDBBtn color="dark" style={{fontSize: '12px', overflow: 'visible'}}>
                      Modifier
                    </MDBBtn></MDBCardText> */}
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                  {decorations
                            .filter((deco) => deco.package == params.id)
                            .map((deco, index) => (getImage("deco", deco.decoration)!==""?(<MDBRow key={index} className="mb-2"><MDBRipple
                            rippleColor="dark"
                            rippleTag="div"
                            className="bg-image rounded hover-zoom shadow-1-strong"
                          >
                            <DecorationItem id={deco.decoration}
                            />
                          </MDBRipple></MDBRow>):(<></>)))}
                  </MDBCol>
                </MDBRow>
               </div>
               
               
               
               <div data-aos="fade-up">
                <div className="d-flex justify-content-between align-items-center mb-4 pt-2 p-2">
                  <MDBCardText className="lead fw-normal mb-0" style={{color:"blue"}}>Pack de produits</MDBCardText>
                  {/* <MDBCardText className="mb-0"><MDBBtn color="dark" style={{fontSize: '12px', overflow: 'visible'}}>
                      Modifier
                    </MDBBtn></MDBCardText> */}
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                  {products
                          .filter((prod) => prod.package == params.id)
                          .map((prod, index) => (getImage("prod", prod.produit)!==""?(<MDBRow key={index} className="mb-2"><MDBRipple
                          rippleColor="dark"
                          rippleTag="div"
                          className="bg-image rounded hover-zoom shadow-1-strong"
                        >
                          <ProductItem id={prod.produit}
                            />
                        </MDBRipple></MDBRow>):(<></>)))}
                  </MDBCol>
                </MDBRow>
               </div>
               
               
               
               <div data-aos="fade-up">
                <div className="d-flex justify-content-between align-items-center mb-4 pt-2 p-2">
                  <MDBCardText className="lead fw-normal mb-0" style={{color:"blue"}}>Photos</MDBCardText>
                  {/* <MDBCardText className="mb-0"><MDBBtn color="dark" style={{fontSize: '12px', overflow: 'visible'}}>
                      Modifier
                    </MDBBtn></MDBCardText> */}
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                  {images
                          .filter((prod) => prod.package == params.id)
                          .map((img, index) => (<MDBRow key={index} className="mb-2"><MDBRipple
                          rippleColor="dark"
                          rippleTag="div"
                          className="bg-image rounded hover-zoom shadow-1-strong"
                        >
                          <img
                            src={img.image}
                            className="w-10"
                            alt="null"
                            style={{borderRadius:"10px"}}
                            data-aos="fade-left"
                          />
                        </MDBRipple></MDBRow>))}
                  </MDBCol>
                </MDBRow>
               </div>
                
                
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MainCard>
  );
}