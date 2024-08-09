// IMPORTS
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProfileCard from "./ProfileCard";
import SettingsCard from "./SettingsCard";
import { useEffect } from "react"; 
import { useParams } from "react-router-dom";

// STYLE & THEME
const theme = createTheme();

// APP
export default function App() {
  const params = useParams();
  const [mainUser, setMainUser] = useState({});
  const [societeData, setSocieteData] = useState([]);
  const [particulierData, setParticulierData] = useState([]);
  const [modification, setModification] = useState(false);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/store/Client/${params.id}`;
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((donnee) => {
        setMainUser(donnee);
        const urlCategorie = donnee.categorie === "Société" ?
          `http://127.0.0.1:8000/store/Societe/${params.id}` :
          `http://127.0.0.1:8000/store/Particulier/${params.id}`;
  
        fetch(urlCategorie)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (donnee.categorie === "Société") {
              setSocieteData(data);
            } else {
              setParticulierData(data);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      if(modification)setModification(false);
  }, [modification]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        {/* BACKGROUND */}
        <Grid container direction="column" sx={{ overflowX: "hidden" }}>
          {/* <Grid item xs={12} md={6}>
            <img
              alt="avatar"
              style={{
                width: "100vw",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 50%",
                position: "relative"
              }}
              src="https://iris2.gettimely.com/images/default-cover-image.jpg"
            />
          </Grid> */}

          {/* COMPONENTS */}
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            spacing={3}
          >
            {/* PROFILE CARD */}
            {mainUser.categorie === "Société" && (
              <>
                <Grid item md={3.8}>
                  <ProfileCard
                    // donnees = {societeData}
                    // name={fullName}
                    // sub={mainUser.id}
                    // dt1={societeData.nomSociete}
                    // dt2={societeData.email}
                    // dt3={societeData.contact}
                    // style={{width:"350px"}}
                    name={societeData.nom+" "+societeData.prenom}
                    sub={societeData.id}
                    dt1={societeData.nom}
                    dt2={societeData.contact}
                    dt3={societeData.categorie}
                  ></ProfileCard>
                </Grid>

                  {/* SETTINGS CARD */}
                  <Grid item md={8.2}>
                    <SettingsCard
                      // categorie = {mainUser.categorie}
                      // expose={(v: string) => setText(v)}
                      // nom={societeData.nom}
                      // nomSociete={societeData.nomSociete}
                      // contact={societeData.contact}
                      // domiciliation={societeData.domiciliation}
                      // email={societeData.email}
                      // nif={societeData.nif}
                      // stat={societeData.stat}
                      donnees = {societeData}
                      setData = {setSocieteData}
                      modification = {modification}
                      setModification = {setModification}
                    ></SettingsCard>
                  </Grid>
              </>
            )}

            {mainUser.categorie === "Particulier" && (
              <>
                <Grid item md={3.8}>
                  <ProfileCard
                    // donnees = {particulierData}
                    // categorieP = {mainUser.categorie}
                    // name={fullNameP}
                    // sub={mainUser.id}
                    // dt1={particulierData.nom}
                    // dt2={particulierData.email}
                    // dt3={particulierData.contact}
                    // style={{width:"350px"}}
                    name={particulierData.nom+" "+particulierData.prenom}
                    sub={particulierData.id}
                    dt1={particulierData.nom}
                    dt2={particulierData.contact}
                    dt3={particulierData.categorie}
                  ></ProfileCard>
                </Grid>

                  {/* SETTINGS CARD */}
                  <Grid item md={8.2}>
                    <SettingsCard
                      // Nom={particulierData.nom}
                      // Prenom={particulierData.prenom}
                      // contactP={particulierData.contact}
                      // dateNaiss={particulierData.date_naissance}
                      // lieuNaiss={particulierData.lieu_naissance}
                      // numCin={particulierData.num_CIN}
                      // delivCin={particulierData.cin_date_delivrance}
                      // certificatRes={particulierData.certificat_residence}
                      // lieuRes={particulierData.lieu_residence}
                      // emailP={particulierData.email}
                      donnees = {particulierData}
                      setData = {setParticulierData}
                      modification = {modification}
                      setModification = {setModification}
                    ></SettingsCard>
                  </Grid>
              </>
            )}
            
          </Grid>
        </Grid>
      </CssBaseline>
    </ThemeProvider>
  );
}
