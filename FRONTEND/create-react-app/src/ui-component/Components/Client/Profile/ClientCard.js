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
    padding: ".5rem",
    borderTop: "1px solid whiteSmoke"
  },
  value: {
    padding: ".5rem 1rem",
    borderTop: "1px solid whiteSmoke",
    color: "#899499"
  }
};

//APP
export default function ProfileCard(props: any) {
  const clientColor = (props.dt3==="Particulier"?"secondary":"primary");
  const clientBadge = (props.dt3==="Particulier"?"#753dba":"#2196F3");
  const clientTextBadge = ("white");
  const clientText = (props.dt3==="Particulier"?"P":"S");
  return (
    <Card variant="outlined" sx={{ height: "95%"}} className="mb-4" >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ paddingTop:'20px'}}
      >
        {/* CARD HEADER START */}
        <Grid item sx={{ p: "0rem 0rem", textAlign: "center", display:"flex", flexDirection:"column", alignItems:"center" }}>
          {/* PROFILE PHOTO */}
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: clientBadge,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              color: clientTextBadge, 
              boxShadow: "1px 1px 2px gray",
              marginBottom:"5px"
            }}
          >
            {clientText}
          </div>

          {/* DESCRIPTION */}
          <Typography variant="h6" sx={{ fontSize: '.8rem' }}>{props.name}</Typography>
          <Typography color="text.secondary" style={{marginBottom:"10px"}} sx={{ fontSize: '0.6rem' }}>Inscris le {props.sub}</Typography>
        </Grid>
        {/* CARD HEADER END */}

        {/* DETAILS */}
        <Grid container>
          <Grid item xs={6}>
            <Typography style={styles.details} sx={{ fontSize: '.7rem' }}>Identifiant</Typography>
            <Typography style={styles.details} sx={{ fontSize: '.7rem' }}>Catégorie</Typography>
            <Typography style={styles.details} sx={{ fontSize: '.7rem' }}>Contact</Typography>
          </Grid>
          {/* VALUES */}
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography style={styles.value} sx={{ fontSize: '.7rem' }}>N°{props.dt1}</Typography>
            <Typography style={styles.value} sx={{ fontSize: '.7rem' }}>{props.dt3}</Typography>
            <Typography style={styles.value} sx={{ fontSize: '.7rem' }}>{props.dt2}</Typography>
          </Grid>
        </Grid>

        {/* BUTTON */}
        <Grid item style={styles.details} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color={clientColor}
            sx={{ width: "99%", p: 0.5, my: 2 }}
            onClick = {props.onclick}
          >
            Voir le profil
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}