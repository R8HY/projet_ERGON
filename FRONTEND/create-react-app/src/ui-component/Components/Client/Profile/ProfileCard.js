// IMPORTS
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
// import Avatar from "@mui/material/Avatar";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
// import { Button } from 'react-bootstrap'; 

// STYLES
const styles = {
  details: {
    padding: "1rem",
    borderTop: "1px solid whiteSmoke",
  },
  value: {
    padding: "1rem",
    borderTop: "1px solid whiteSmoke",
    color: "#899499"
  }
};

//APP
export default function ProfileCard(props: any) {
  const clientColor = (props.dt3==="Particulier"?"secondary":"primary");
  const clientBadge = (props.dt3==="Particulier"?"#9c1ed2":"#2196F3");
  const clientTextBadge = ("white");
  const clientText = (props.dt3==="Particulier"?"P":"S");
  return (
    <Card variant="outlined" sx={{ height: "95%"}} style={{ borderRadius:'20px'}} className="mb-4" >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ paddingTop:'30px'}}
      >
        {/* CARD HEADER START */}
        <Grid className="mt-4 mb-5" item sx={{ p: "0rem 0rem", textAlign: "center", display:"flex", flexDirection:"column", alignItems:"center" }}>
          {/* PROFILE PHOTO */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: clientBadge,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3rem",
              color: clientTextBadge, 
              boxShadow: "1px 1px 2px gray",
              marginBottom:"50px"
            }}
          >
            {clientText}
          </div>

          {/* DESCRIPTION */}
          <Typography variant="h6">{props.name}</Typography>
          <Typography color="text.secondary">Inscris le {props.sub}</Typography>
        </Grid>
        {/* CARD HEADER END */}

        {/* DETAILS */}
        <Grid container>
          <Grid item xs={6}>
            <Typography style={styles.details}>Identifiant</Typography>
            <Typography style={styles.details}>Catégorie</Typography>
            <Typography style={styles.details}>Contact</Typography>
          </Grid>
          {/* VALUES */}
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography style={styles.value}>N°{props.dt1}</Typography>
            <Typography style={styles.value}>{props.dt3}</Typography>
            <Typography style={styles.value}>{props.dt2}</Typography>
          </Grid>
        </Grid>

        {/* BUTTON */}
        <Grid item style={styles.details} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color={clientColor}
            sx={{ width: "99%", p: 1, my: 2, height:"60px" }}
            onClick = {props.onclick}
          >
            Supprimer le profil
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}