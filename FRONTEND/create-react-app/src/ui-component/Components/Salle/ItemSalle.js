import React, { useEffect, useState } from "react";
import {
//   MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
} from "mdb-react-ui-kit";
import { Button } from '@mui/material'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

function App(props) {
    const [item, setItem] = useState([]);

    useEffect(() => {
      const apiUrl = `http://127.0.0.1:8000/store/Location/Salle/${props.salle}`;
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((d) => {
          setItem(d);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

    useEffect(() => {
      AOS.init({ duration: 2000 });
    }, [item]);

  return (
    <>
          <MDBCard data-aos="fade-left" className="shadow-0 border rounded-3 mb-4 mt-2 mb-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-2 mb-lg-0">
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image rounded hover-zoom hover-overlay"
                  >
                    <MDBCardImage
                      src={item.image}
                      fluid
                      className={`w-100 conteneurProduit rounded-1`}
                      style={{height:"100%"}}
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </MDBRipple>
                </MDBCol>
                <MDBCol md="6">
                <h5 style={{color:"gray"}}>{item.nom}</h5>
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
                  </div>
                  <p className="text-truncate mb-2 mb-md-0">
                    {item.description}
                  </p> */}
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                  <div>
                    <div className="d-flex flex-row align-items-center mb-1" style={{textAlign:"center", alignItems:"center", justifyContent:"center"}}>
                      <h4 className="mb-5 me-1" style={{fontSize:"1.8rem", textAlign:"center"}}>{item.prix} Ar</h4>
                      {/* <span className="text-danger">
                        <s>$20.99</s>
                      </span> */}
                    </div>
                    {/* <h6 className="text-success">Free shipping</h6> */}
                    <div className="d-flex flex-column mt-4">
                      <Button onClick={()=>{window.location.href=`./${item.id}/profile`}} variant="contained" color="primary" style={{marginTop:"30%", marginBottom:"10px"}} size="sm">
                          Details
                      </Button>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
    </>
  );
}

export default App;