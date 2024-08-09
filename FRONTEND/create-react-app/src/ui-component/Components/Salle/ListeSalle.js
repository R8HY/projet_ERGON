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
import { Button } from '@mui/material'; 
import { Box, Card, Grid, Typography } from '@mui/material';
import addImage from 'assets/images/produits/addImage.png';
import FormModal from 'ui-component/Components/Modals/FormModal'
import FormSalle from './Form/FormSalle'

const ColorBox = ({ title, data }) => (
  <>
    <Card sx={{ mb: 3, background: 'rgba(255, 255, 255, 0)' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 8,
          marginRight:'2px',
          backgroundSize: 'cover',
          // color: dark ? 'grey.800' : '#ffffff' //l forme anle box
        }}
      >
        {title && (
          <Typography variant="subtitle1" color="inherit">
            {title}
          </Typography> //titre ao anatiny
        )}
        {!title && <Box sx={{ p: 0.0 }} />}
      </Box>
    </Card>
    {data && data.label!=="" && (
      <Grid container justifyContent="space-between" alignItems="center" className="sousTitreProduit">
        <Grid item style={{display:'block'}}>
          <Typography variant="subtitle2" style={{color:'gray'}}>
            {data.label}<br/>
            {data.prix.toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
    )}
  </>
);

function App() {
  const [data, setData] = useState([]);
  const [showFormProduit, setShowFormProduit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data]);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

return (
  <>
  {data.map((item, index) => (
      <div key={index}>
        <div data-aos="zoom-in" key={index}>
            <FormModal showForm={showFormProduit} setShowForm={setShowFormProduit} onSubmit={()=>{setSubmitted(true)}}>
              <FormSalle submitted={submitted} setSubmitted={setSubmitted} />
            </FormModal>
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
                  {/* <div className="mt-1 mb-0 text-muted big">
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
                  </div> */}
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
                    <h4 className="mb-5 me-1" style={{fontSize:"1.8rem", textAlign:"center"}}>{item.prix.toLocaleString()} Ar</h4>
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
        </div>
        
      </div>
  //     </MDBCol>
  //   </MDBRow>
  // </MDBContainer>
  ))}
  <Grid onClick={()=>setShowFormProduit(true)} data-aos="zoom-in" style={{backgroundImage:`url(${addImage})`}} item xs={20} sm={20} md={20} lg={20} className='mb-4-none ajoutProduit rounded-1 btnAjoutProduit'>
      <ColorBox bgcolor="grey.50" data={{ label: "", color: ""}} dark />
  </Grid>
  </>
);
}

export default App;
