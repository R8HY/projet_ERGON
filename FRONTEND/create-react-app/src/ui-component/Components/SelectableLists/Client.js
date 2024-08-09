import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ProfileCard from "ui-component/Components/Client/Profile/ClientCard";
import AOS from 'aos';
import 'aos/dist/aos.css';

function ListeGuest({client, setClient}) {
  const [data, setData] = useState([]);
  const [societeData, setSocieteData] = useState({});
  const [selectedClient, setSelectedClient] = useState();
  const [particulierData, setParticulierData] = useState({});
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [showAllCheckBox, setShowAllCheckBox] = useState(client===false);

  useEffect(() => {
    if(client) setSelectedClient(client[0]);
    // Define the URL for your GET request
    const apiUrl = "http://127.0.0.1:8000/store/Client/";
    const apiUrlS = "http://127.0.0.1:8000/store/Societe/";
    const apiUrlP = "http://127.0.0.1:8000/store/Particulier/";

    // Make the GET request using the fetch API
    Promise.all([fetch(apiUrl), fetch(apiUrlS), fetch(apiUrlP)])
      .then(([response1, response2, response3]) => Promise.all([response1.json(), response2.json(), response3.json()]))
      .then(([artData, data, d]) => {
        setData(artData);
        setSocieteData(data);
        setParticulierData(d);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const selectClient = (cl) => {
    setSelectedClient(cl);
    setShowAllCheckBox(!showAllCheckBox);
    if(showAllCheckBox===true){
      if(cl.categorie==="Particulier"){
        const d = particulierData.filter(data=>data.id===cl.id)[0];
        setClient(d);
      }
      if(cl.categorie==="Société"){
        const d = societeData.filter(data=>data.id===cl.id)[0];
        setClient(d);
      }
    }
    else setClient(false);
  }
  
  const showProfile = (id) => {
    window.location.href=`../clients/${id}/profile`;
  };

  const getNom = (item) => {
    if(item){
      if(item.categorie==="Particulier"){
        const d = particulierData.filter(data=>data.id===item.id)[0];
        return d.nom+" "+d.prenom;
      }
      if(item.categorie==="Société"){
        const d = societeData.filter(data=>data.id===item.id)[0];
        return d.nomSociete;
      }
    }
    
  };

  const formatDate = (date) =>{
    if(date){
      const datePart = date.split('-');
      return datePart[2]+"/"+datePart[1]+"/"+datePart[0];
    }
    
  }

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <Grid style={{height:"700px", overflow:showScrollbar?"auto":"hidden", width:"100%"}}
      onMouseOver={()=>setShowScrollbar(true)}
      onMouseOut={()=>setShowScrollbar(false)}
      >
          {data.map((item, index) => (
            item.categorie!=="Guest" && <Grid item md={4} key={index} style={{display:"inline-block", width:"265px", marginLeft:"15px", padding:"8px"}}>
              <ProfileCard
                name={getNom(item)}
                sub={formatDate(item.date_ajout)}
                dt1={item.id}
                dt2={item.contact}
                dt3={item.categorie}
                onclick = {()=>showProfile(item.id)}
              ></ProfileCard>
              {
                (!showAllCheckBox)?
                (
                  (selectedClient.id===item.id)?
                  (<input className="form-check-input" type="checkbox" checked={!(client===false)} value="" onChange={()=>{selectClient(item)}} style={{float:"right", width:"20px", height:"20px"}}/>
                  ):(<></>)
                )  
                :
                (<input className="form-check-input" type="checkbox" value="" onChange={()=>{selectClient(item)}} style={{float:"right", width:"20px", height:"20px"}}/>)
              }
            </Grid>
          ))}
    </Grid>
  );
}

export default ListeGuest;