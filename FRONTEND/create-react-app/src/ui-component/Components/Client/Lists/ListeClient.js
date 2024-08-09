
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ProfileCard from "../Profile/ClientCard";
import AOS from 'aos';
import 'aos/dist/aos.css';
import SearchSection from "ui-component/Components/SearchSection/index";

function ListeGuest({setClients}) {
  const [data, setData] = useState([]);
  const [societeData, setSocieteData] = useState({});
  const [particulierData, setParticulierData] = useState({});
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    // Define the URL for your GET request
    const apiUrl = "http://127.0.0.1:8000/store/Client/";
    const apiUrlS = "http://127.0.0.1:8000/store/Societe/";
    const apiUrlP = "http://127.0.0.1:8000/store/Particulier/";

    // Make the GET request using the fetch API
    Promise.all([fetch(apiUrl), fetch(apiUrlS), fetch(apiUrlP)])
      .then(([response1, response2, response3]) => Promise.all([response1.json(), response2.json(), response3.json()]))
      .then(([artData, data, d]) => {
        setSocieteData(data);
        setParticulierData(d);
        setClients(artData)
        artData = artData.filter(data=>data.nom.toLowerCase().includes(inputSearch.toLowerCase())||
          data.prenom.toLowerCase().includes(inputSearch.toLowerCase())||
          ((data.categorie==="Société")&&getNom(data).toLowerCase().includes(inputSearch.toLowerCase()))||
          data.categorie.toLowerCase().includes(inputSearch.toLowerCase())||
          data.date_ajout.toLowerCase().includes(inputSearch.toLowerCase())||
          data.contact.toLowerCase().includes(inputSearch.toLowerCase()))
        setData(artData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data, inputSearch]);
  
  const showProfile = (id) => {
    window.location.href=`./${id}/profile`;
  };

  const getNom = (item) => {
    if(item.categorie==="Particulier"){
      const d = particulierData.filter(data=>data.id===item.id)[0];
      return d.nom+" "+d.prenom;
    }
    if(item.categorie==="Société"){
      const d = societeData.filter(data=>data.id===item.id)[0];
      return d.nomSociete;
    }
  };

  const formatDate = (date) =>{
    const datePart = date.split('-');
    return datePart[2]+"/"+datePart[1]+"/"+datePart[0]
  }

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <Grid style={{height:"750px", overflow:showScrollbar?"auto":"hidden", width:"95%", marginLeft:"4%"}} 
      data-aos="zoom-in"
      onMouseOver={()=>setShowScrollbar(true)}
      onMouseOut={()=>setShowScrollbar(false)}
      >
        <div style={{marginBottom:"10px", marginRight:"8%", display:"flex", justifyContent:"center"}}>
            <SearchSection value={inputSearch} setValue={setInputSearch}/>
        </div>
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
            </Grid>
          ))}
    </Grid>
  );
}

export default ListeGuest;