import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  // MDBIcon,
  // MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import AOS from 'aos';
import 'aos/dist/aos.css'

function App() {

  const [data, setData] = useState([]);
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
    }, []);

    useEffect(() => {
      AOS.init({ duration: 2000 });
    }, []);

  return (
    <MDBContainer fluid className="my-5 text-center">
      <MDBRow>
      {data.map((item, index) => (
        <MDBCol md="12" key={index} lg="4" className="mb-3">
          <MDBCard className="mb-4" style={{height:"100%"}}>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-zoom"
            >
              <MDBCardImage
                src={item.image}
                fluid
                className={`w-100 conteneurProduit rounded-1`}
                style={{boxShadow:"1px 1px 5px #aaa"}}
              />
              <a href="#!">
                <div className="mask">
                  <div className="d-flex justify-content-start align-items-end h-100">
                    <h5>
                      <span className="badge bg-primary ms-2">New</span>
                    </h5>
                  </div>
                </div>
                <div className="hover-overlay">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </div>
              </a>
            </MDBRipple>
            <MDBCardBody>
              <a href="#!" className="text-reset">
                <h5 className="card-title mb-3">{item.nom}</h5>
              </a>
              <a href="#!" className="text-reset">
                <p>Category</p>
              </a>
              <h6 className="mb-3">{item.prix.toLocaleString()} Ar</h6>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
    
  );
}

export default App;
