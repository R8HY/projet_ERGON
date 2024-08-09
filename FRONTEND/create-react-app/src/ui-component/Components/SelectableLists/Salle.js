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
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Button} from "@mui/material";

function App({salle, setView, params}) {
    const [data, setData] = useState([]);
    const [selectedSalle, setSelectedSalle] = useState();
    const [showAllCheckBox, setShowAllCheckBox] = useState(salle.length===0);

    useEffect(() => {
      const apiUrl = "http://127.0.0.1:8000/store/Location/Salle";
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((d) => {
          setData(d);
          if(salle) setSelectedSalle(d.filter(dd=>dd.id===salle[0].salle)[0])
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

    useEffect(() => {
      AOS.init({ duration: 2000 });
    }, []);

    const selectSalle = (cl) => {
        setSelectedSalle(cl);
        setShowAllCheckBox(!showAllCheckBox);
    }

    const setSalleLouee = () => {
      if (salle.length!=0&&selectedSalle.id !== salle[0].salle) {
        console.log(salle);
        if (salle) {
          const deleteSalleUrl = `http://127.0.0.1:8000/store/Panier/${params.id}/salle_panier/${salle[0].id}`;
          fetch(deleteSalleUrl, {
            method: "DELETE",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              console.log("Salle supprimée avec succès !");
            })
            .catch((error) => {
              console.error("Error deleting salle:", error);
            });
            
        }
      }
          const eleteSalleUrl = `http://127.0.0.1:8000/store/Panier/${params.id}/salle_panier/`;
            const salleToSave = {salle:selectedSalle.id, panier:params.id}
            fetch(eleteSalleUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(salleToSave),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                console.log("Salle supprimée avec succès !");
              })
              .catch((error) => {
                console.error("Error deleting salle:", error);
              });

        setView("main")
    };

  return (
    <>
    {/* // <MDBContainer fluid>
    //   <MDBRow className="justify-content-center">
    //     <MDBCol md="12" xl="10" className="mb-4"> */}
    {data.map((item, index) => (
        <div data-aos="zoom-in" key={index}>
          <MDBCard className="shadow-0 border rounded-3 mb-4 mt-2 mb-3">
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
                <h4 style={{color:"rgb(50,50,255)"}}>{item.nom}</h4>
                  <div className="d-flex flex-row">
                    <div className="text-danger mb-1 me-2">
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                    </div>
                    {/* <span>310</span> */}
                  </div>
                  <div className="mt-1 mb-0 text-muted big">
                    <span>100% cotton</span>
                    <span className="text-primary"> • </span>
                    <span>Light weight</span>
                    <span className="text-primary"> • </span>
                    <span>
                      Best finish
                      <br />
                    </span>
                  </div>
                  <div className="mb-2 text-muted big">
                    <span>Unique design</span>
                    <span className="text-primary"> • </span>
                    <span>For men</span>
                    <span className="text-primary"> • </span>
                    <span>
                      Casual
                      <br />
                    </span>
                  </div>
                  <p className="mb-2 mb-md-0 text-muted small">
                    {item.description}
                  </p>
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
                  <div className="d-flex flex-column">
                    
                      <div style={{display:"flex-end", marginTop:"35%"}}>
                      {
                        (!showAllCheckBox)?
                          (
                            selectedSalle.id===item.id?
                            (<input className="form-check-input" type="checkbox" value="" checked={!(salle===false)} onChange={()=>{selectSalle(item)}} style={{float:"right", width:"25px", height:"25px"}}/>
                            ):(<></>)
                          )  
                        :
                        (<input className="form-check-input" type="checkbox" value="" onChange={()=>{selectSalle(item)}} style={{float:"right", width:"25px", height:"25px"}}/>)
                      }
                      </div>
                  </div>
                </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </div>
    //     </MDBCol>
    //   </MDBRow>
    // </MDBContainer>
    ))}
    <div style={{position:"fixed", right:"50px", bottom:"40px"}}>
      <Button variant="contained" color="primary" disabled={showAllCheckBox} onClick={()=>setSalleLouee(selectedSalle)}>Confirmer</Button>
      <Button variant="outlined" color="primary" style={{marginLeft:"10px"}} onClick={()=>setView("main")}>Retour</Button>
    </div>
    
    </>
  );
}

export default App;