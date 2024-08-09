import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'
import { Grid } from '@mui/material';
import Chart from './Courbe/TotalGrowthBarChart';

function ListePayement() {
    const [data, setData] = useState([]);
    const [totalData, setTotalData] = useState(0);
 
    useEffect(()=>{
      setData([0,0,0,0,0,0,0,0,0,0,0,0]);
      const apiUrl = "http://127.0.0.1:8000/store/Evenement/";
      Promise.all([fetch(apiUrl)])
      .then(([response1]) => Promise.all([
        response1.json()
      ]))
      .then(([d]) => {
        setData(getDataParMois(d));
        setTotalData(d.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    },[])
  
    const getDataParMois = (data) => {
      const tab = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      data.forEach((elem) => {
        const date = elem.date;
        const dateObj = new Date(date);
        const mois = dateObj.getMonth();
        tab[mois] += 1;
      });
      return tab;
    };
  
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);


  

  return (
        <Grid container>
          <Grid data-aos="zoom-in" style={{height:'700px'}} container className="myContainer mb-3 d-flex">
            <Chart data={data} totalData={totalData}/>
          </Grid>
        </Grid>
  );
}

export default ListePayement;