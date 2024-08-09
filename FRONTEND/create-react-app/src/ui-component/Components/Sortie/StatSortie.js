import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'
import { Grid } from '@mui/material';
import {
    MDBProgress,
    MDBProgressBar
  } from 'mdb-react-ui-kit';

function ListePayement({clients}) {
  const [totalData, setTotalData] = useState(0);
  const [totalParticulier, setTotalParticulier] = useState(0);
  const [totalSociete, setTotalSociete] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  useEffect(()=>{
    const apiSUrl = "http://127.0.0.1:8000/store/Societe/";
    const apiPUrl = "http://127.0.0.1:8000/store/Particulier/";
    Promise.all([fetch(apiSUrl), fetch(apiPUrl)])
    .then(([response2, response3]) => Promise.all([
      response2.json(),
      response3.json()
    ]))
    .then(([data1, data2]) => {
      setAjoutSocieteParMois(getDataParMois(data1));
      setAjoutParticulierParMois(getDataParMois(data2));
      setTotalSociete(data1.length);
      setTotalParticulier(data2.length);
      setTotalData(data1.length+data2.length);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  },[clients])

  const getDataParMois = (data) => {
    const tab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    data.forEach((elem) => {
      const date = elem.date_ajout;
      const dateObj = new Date(date);
      const mois = dateObj.getMonth();
      tab[mois] += 1;
    });
    return tab;
  };

  const getPourcentage = (value, base) =>{
    return parseInt(value*100/base);
  }


  return (
        <Grid container>
          <Grid data-aos="zoom-in" container className="mb-3 d-flex">
            <Grid style={{width:"100%", padding:"10px"}} className="mt-2">
                <div style={{width:"100%", marginTop:"40px"}} >
                    Clients ({totalData}) <MDBProgress className="rounded mt-1 mb-2">
                        <MDBProgressBar 
                            width={totalData===0?0:100} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    Particuliers ({totalParticulier}) <MDBProgress className="rounded mt-1 mb-2">
                        <MDBProgressBar 
                            width={getPourcentage(totalParticulier, totalData)} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    Sociétés ({totalSociete}) <MDBProgress className="rounded mt-1">
                        <MDBProgressBar 
                            width={getPourcentage(totalSociete, totalData)} valuemin={0} valuemax={100} />
                    </MDBProgress>
                </div>
                
            </Grid>
          </Grid>
        </Grid>
  );
}

export default ListePayement;