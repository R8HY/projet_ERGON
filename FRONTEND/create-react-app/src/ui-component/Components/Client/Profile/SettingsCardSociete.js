// IMPORTS
import React, { useEffect, useState} from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// import InputAdornment from "@mui/material/InputAdornment";
import CardContent from "@mui/material/CardContent";
// import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomInput from "./CustomInput";
import axios from "axios";
import MessageModal from "ui-component/Components/Modals/MessageModal";
//APP
export default function SettingsCard({donnees, setModification}) {
  //TAB STATES
  const [value, setValue] = React.useState("one");
  const [data, setData] = React.useState(donnees);
  const [showMessageModified, setShowMessageModified] = React.useState(false);
  const [dataUpdated, setDataUpdated] = React.useState(false);
  // const [showSuccess, setShowSuccess] = useState(false);

  
  useEffect(() => {
    setData(donnees);
    if(dataUpdated){
      setShowMessageModified(true);
      setDataUpdated(false);
    }
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

  const modifierClient = () => {
    const cat = data.categorie==="Particulier" ? "Particulier":"Societe"
      axios.patch(`http://127.0.0.1:8000/store/${cat}/${data.id}/`, data)
      .then(response => {
        console.log("Nuyyyyyyyce", response.data);
        setDataUpdated(true);
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
      <MessageModal showForm={showMessageModified} setShowForm={setShowMessageModified} message="Les informations ont bien été modifiées"/>
      {/* MAIN CONTENT CONTAINER */}
      {
          value==="two"&&
          <Grid style={{padding:"20px"}}>
              <Button
                sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                component="button"
                size="large"
                variant="contained"
                style={{float:"right"}}
                color="warning"
                onClick={()=>createPanier(data.id)}
            >
                Créer un évènement
            </Button>
          </Grid>
      }
      {value==="one"&&<form>
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

                <Grid item xs={6}>
                  <CustomInput
                    id="midName"
                    name="domiciliation"
                    value={data.domiciliation}
                    onChange={changeField}
                    title="Domiciliation"
                  ></CustomInput>
                </Grid>

                

                {/* ROW 2: GENDER */}
                

                {/* ROW 3: PHONE */}
                <Grid item xs={6}>
                  <CustomInput
                    id="phone"
                    name="email"
                    value={data.email}
                    onChange={changeField}
                    title="Email"
                    //DIALING CODE
                    
                  ></CustomInput>
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    id="midName"
                    name="contact"
                    value={data.contact}
                    onChange={changeField}
                    title="Contact"
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">+261</InputAdornment>
                    //   )
                    // }}
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
                {/* ROW 2: MIDDLE NAME */}
                

                <Grid component="form" item xs={6}>
                  <CustomInput
                    id="firstName"
                    name="nom"
                    value={data.nom}
                    onChange={changeField}
                    title="Nom du représentant"
                  ></CustomInput>
                </Grid>

                <Grid component="form" item xs={6}>
                  <CustomInput
                    id="lastName"
                    name="prenom"
                    value={data.prenom}
                    onChange={changeField}
                    title="Prénom du représentant"
                  ></CustomInput>
                </Grid>

                </>
              )}
              {/* BUTTON */}
              <Grid
                item
                style={{width:"100%",float:'right', marginLeft:"50%"}}
                xs={6}
              >
                <Button
                  sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                  style={{marginRight:'10px', float:"right"}}
                  component="button"
                  size="large"
                  variant="contained"
                  color={data.categorie === "Société"?"primary":"secondary"}
                  onClick={modifierClient}
                >
                  {edit.isEdit === false ? "UPDATE" : "MODIFIER"}
                </Button>
                
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </form>}
    </Card>
  );
}
