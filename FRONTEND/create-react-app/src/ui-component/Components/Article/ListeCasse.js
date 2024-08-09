import React from "react";
//import FormPanier from "../Panier/FormPanier";
import { Grid } from '@mui/material';
import 'aos/dist/aos.css';
import {
    MDBProgress,
    MDBProgressBar
  } from 'mdb-react-ui-kit';

function ArticleCheckUp({casseProd, casseDeco, produitLouee, decoLouee}) {
    const getPourcentage = (value, base) =>{
        return parseInt(value*100/base);
    }

    // const getPourcentageColor = (pc) =>{
    //     const color = [pc, pc<20?"red":pc===100?"green":"orange"];
    //     return color
    // }

    const casse = (elem, type) => {
        var tab = [];
        if(type==='prod'){
            tab = casseProd.filter(cs=>cs.article===elem.produit);
        }
        else{
            tab = casseDeco.filter(cs=>cs.decoration===elem.decoration);
        }
        return tab;
    }

  return (
    <Grid>
        <Grid item data-aos="zoom-in" className="myContainer" style={{marginLeft:"5px", marginRight:"5px", marginBottom:"15px", height:"666px"}} 
            xs={12} sm={12} md={12} lg={12}>
            <p><span style={{fontWeight:"bold"}}>Rendues : </span></p>
            <table className="table" style={{width:"100%"}}>
                <tbody>
                {produitLouee.map((elem, index) => (
                    casse(elem, "prod").length!=0&&
                    <tr key={index} style={{height:"50px"}}>
                        <td style={{color:"red"}}>x</td>
                        <td>{elem.nomP}</td>
                        <td style={{width:"40%"}}>
                            <MDBProgress className="rounded">
                                <MDBProgressBar 
                                    width={getPourcentage(elem.quantite - casse(elem, "prod")[0].quantiteCasse,elem.quantite)} valuemin={0} valuemax={100} />
                            </MDBProgress>
                        </td>
                        <td><span style={{color:"blue"}}>quantité louée : </span>{elem.quantite }</td>
                        <td><span style={{color:"purple"}}>rendue : </span>{elem.quantite - casse(elem, "prod")[0].quantiteCasse}</td>
                    </tr>
                ))}
                {decoLouee.map((elem, index) => (
                    casse(elem, "deco").length!=0&&
                    <tr key={index} style={{height:"50px"}}>
                        <td style={{color:"red"}}>x</td>
                        <td>{elem.nomDecoration}</td>
                        <td style={{width:"40%"}}>
                            <MDBProgress className="rounded">
                                <MDBProgressBar width={getPourcentage(elem.quantite-casse(elem, "deco")[0].quantiteCasse, elem.quantite)} valuemin={0} valuemax={100} />
                            </MDBProgress>
                        </td>
                        <td><span style={{color:"blue"}}>quantité louée : </span>{elem.quantite}</td>
                        <td><span style={{color:"purple"}}>rendue : </span>{elem.quantite - casse(elem, "deco")[0].quantiteCasse}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Grid>
    </Grid>
  );
}

export default ArticleCheckUp;