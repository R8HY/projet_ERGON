// IMPORTS
import React, { useEffect, useState} from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import CardContent from "@mui/material/CardContent";
// import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomInput from "./CustomInput";
import axios from "axios";
//APP
export default function SettingsCard({donnees, setModification}) {
  //TAB STATES
  const [value, setValue] = React.useState("one");
  const [data, setData] = React.useState(donnees);
  // const [showSuccess, setShowSuccess] = useState(false);

  
  useEffect(() => {
    setData(donnees);
    console.log(donnees);
  }, [donnees]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const changeField = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  //BUTTON STATES
  const [edit] = useState({
    required: true,
    disabled: true,
    isEdit: true
  });

  const modifierClient = (e) => {
    const cat = data.categorie==="Particulier" ? "Particulier":"Societe"
    e.preventDefault();
      axios.patch(`http://127.0.0.1:8000/store/${cat}/${data.id}/`, data)
      .then(response => {
        console.log("Nuyyyyyyyce", response.data)
      })
    setModification(true);
  }

  const createPanier = (id) =>{
    const urlPanier = 'http://127.0.0.1:8000/store/Panier/';

    const dataPanier = {client:id};

    axios.post(urlPanier, dataPanier)
    .then(response => {
      // Gérez la réponse ou effectuez une action en cas de succès
      const panierId = response.data.id;
      console.log("Ajout réussi", panierId);
      window.location.replace(`../../paniers/${panierId}/articles`)
    })
    .catch(error => {
      // Gérez les erreursc()
      console.error("Erreur lors de l'ajout", error);
    });
  }


  return (
    <Card variant="outlined" sx={{ height: "95%", width: "98%" }} style={{ borderRadius:'20px'}} className="mb-4">
      {/* TABS */}
      <br></br>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor={donnees.categorie==="Particulier"?"secondary":"primary"}
        indicatorColor={donnees.categorie==="Particulier"?"secondary":"primary"}
      >
        <Tab value="one" label="Compte" />
      </Tabs>
      <Divider></Divider>

      {/* MAIN CONTENT CONTAINER */}
      <form>
        <CardContent
          sx={{
            p: 3,
            maxHeight: { md: "80vh" },
            textAlign: { xs: "center", md: "start" }
          }}
        >
          {/* FIELDS */}
          <FormControl fullWidth>
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              columnSpacing={5}
              rowSpacing={3}
            >
              {/* ROW 1: FIRST NAME */}
              {data.categorie === "Société" && (
                <>
                  <Grid component="form" item xs={6}>
                  <CustomInput
                    id="firstName"
                    name="nom"
                    value={data.nom}
                    onChange={changeField}
                    title="Nom du représentant"
                  ></CustomInput>
                </Grid>

                {/* ROW 1: LAST NAME */}
                <Grid component="form" item xs={6}>
                  <CustomInput
                    id="lastName"
                    name="nomSociete"
                    value={data.nomSociete}
                    onChange={changeField}
                    title="Nom de la société"
                  ></CustomInput>
                </Grid>

                {/* ROW 2: MIDDLE NAME */}
                <Grid item xs={6}>
                  <CustomInput
                    id="midName"
                    name="contact"
                    value={data.contact}
                    onChange={changeField}
                    title="Contact"
                  ></CustomInput>
                </Grid>

                {/* ROW 2: GENDER */}
                <Grid item xs={6}>
                  <CustomInput
                    id="midName"
                    name="domiciliation"
                    value={data.domiciliation}
                    onChange={changeField}
                    title="Domiciliation"
                  ></CustomInput>
                </Grid>

                {/* ROW 3: PHONE */}
                <Grid item xs={6}>
                  <CustomInput
                    id="phone"
                    name="email"
                    value={data.email}
                    onChange={changeField}
                    title="Email"
                    //DIALING CODE
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+261</InputAdornment>
                      )
                    }}
                  ></CustomInput>
                </Grid>

                {/* ROW 3: EMAIL */}
                <Grid item xs={6}>
                  <CustomInput
                    type="email"
                    id="email"
                    name="nif"
                    value={data.nif}
                    onChange={changeField}
                    title="NIF"
                  ></CustomInput>
                </Grid>

                {/* ROW 4: PASSWORD */}
                <Grid item xs={6}>
                  <CustomInput
                    id="pass"
                    name="stat"
                    value={data.stat}
                    onChange={changeField}
                    title="STAT"
                    // PASSWORD ICON
                  ></CustomInput>
                </Grid>

                </>
              )}

              {data.categorie === "Particulier" && (
                <>
                  <Grid component="form" item xs={6}>
                  <CustomInput
                    id="firstName"
                    name="Nom"
                    value={data.nom}
                    onChange={changeField}
                    title="Nom"
                  ></CustomInput>
                </Grid>

                {/* ROW 1: LAST NAME */}
                <Grid component="form" item xs={6}>
                  <CustomInput
                    id="lastName"
                    name="Prenom"
                    value={data.prenom}
                    onChange={changeField}
                    title="Prénom"
                  ></CustomInput>
                </Grid>

                {/* ROW 2: MIDDLE NAME */}
                <Grid item xs={6}>
                  <CustomInput
                    id="midName"
                    name="contactP"
                    value={data.contact}
                    onChange={changeField}
                    title="Contact"
                  ></CustomInput>
                </Grid>

                {/* ROW 2: GENDER */}
                <Grid item xs={6}>
                  <CustomInput
                    id="midName"
                    name="dateNaiss"
                    value={data.date_naissance}
                    onChange={changeField}
                    title="Date de naissance"
                  ></CustomInput>
                </Grid>

                {/* ROW 3: PHONE */}
                <Grid item xs={6}>
                  <CustomInput
                    id="phone"
                    name="lieuNaiss"
                    value={data.lieu_naissance}
                    onChange={changeField}
                    title="Lieu de naissance"
                  ></CustomInput>
                </Grid>

                {/* ROW 3: EMAIL */}
                <Grid item xs={6}>
                  <CustomInput
                    type="email"
                    id="email"
                    name="numCin"
                    value={data.num_CIN}
                    onChange={changeField}
                    title="CIN"
                  ></CustomInput>
                </Grid>

                {/* ROW 4: PASSWORD */}
                <Grid item xs={6}>
                  <CustomInput
                    id="pass"
                    name="delivCin"
                    value={data.cin_date_delivrance}
                    onChange={changeField}
                    title="Date de délivrance de CIN"
                    // PASSWORD ICON
                  ></CustomInput>
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    id="pass"
                    name="certificatRes"
                    value={data.certificat_residence}
                    onChange={changeField}
                    title="Certificat de résidence"
                    // PASSWORD ICON
                  ></CustomInput>
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    id="pass"
                    name="lieuRes"
                    value={data.lieu_residence}
                    onChange={changeField}
                    title="Lieu de résidence"
                    // PASSWORD ICON
                  ></CustomInput>
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    id="pass"
                    name="email"
                    value={data.email}
                    onChange={changeField}
                    title="Adresse email"
                    // PASSWORD ICON
                  ></CustomInput>
                </Grid>

                </>
              )}
              {/* BUTTON */}
              <Grid
                container
                style={{float:'right'}}
                item
                xs={6}
              >
                <Button
                  sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                  style={{marginRight:'10px'}}
                  component="button"
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={modifierClient}
                >
                  {edit.isEdit === false ? "UPDATE" : "MODIFIER"}
                </Button>
                <Button
                  sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                  component="button"
                  size="large"
                  variant="contained"
                  color="warning"
                  onClick={()=>createPanier(data.id)}
                >
                  Créer un évènement
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </form>
    </Card>
  );
}
