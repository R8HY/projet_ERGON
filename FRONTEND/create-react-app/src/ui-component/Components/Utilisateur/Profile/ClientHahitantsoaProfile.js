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
    borderTop: "1px solid #e1e1e1"
  },
  value: {
    padding: ".5rem 1rem",
    borderTop: "1px solid #e1e1e1",
    color: "#899499"
  }
};

//APP
export default function ProfileCardHahitantsoa(props: any) {
  const clientColor = (props.dt3==="Particulier"?"warning":"primary");
  const clientBadge = (props.dt3==="Particulier"?"rgb(255,230,0)":"#2196F3");
  const clientTextBadge = (props.dt3==="Particulier"?"black":"white");
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
              marginBottom:"10px"
            }}
          >
            {clientText}
          </div>

          {/* DESCRIPTION */}
          <Typography variant="h6" sx={{ fontSize: '.8rem' }}>{props.name}</Typography>
          <Typography color="text.secondary" sx={{ fontSize: '0.6rem' }}>id : {props.sub}</Typography>
        </Grid>
        {/* CARD HEADER END */}

        {/* DETAILS */}
        <Grid container>
          <Grid item xs={6}>
            <Typography style={styles.details} sx={{ fontSize: '.7rem' }}>Nom</Typography>
            <Typography style={styles.details} sx={{ fontSize: '.7rem' }}>CIN</Typography>
            <Typography style={styles.details} sx={{ fontSize: '.7rem' }}>Résidence</Typography>
          </Grid>
          {/* VALUES */}
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Typography style={styles.value} sx={{ fontSize: '.7rem' }}>{props.dt1}</Typography>
            <Typography style={styles.value} sx={{ fontSize: '.7rem' }}>{props.dt2}</Typography>
            <Typography style={styles.value} sx={{ fontSize: '.7rem' }}>{props.dt3}</Typography>
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