import React, {useState, useEffect} from "react";
import { Page, Document, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import {format} from "date-fns";
import logo from 'assets/images/LOGO-HD_ERGON.png';
// import { Image } from '@react-pdf/renderer';
//import { display } from "@mui/system";
// import jsPDF from "jspdf";
// import 'jspdf-autotable'


const styles = StyleSheet.create({
    // horizontalLine: {
    //     borderBottom: 1, // Bordure droite pour la ligne verticale
    //     color:'red',
    //     borderColor:'red',
    //     width:'50px',
    //   },
    backgroundImage: {
      position: 'absolute',
      zIndex: -1,
      top: '300px',
      left: '100px',
      right: 0,
      bottom: 0,
      resizeMode: 'cover', // Redimensionner pour couvrir toute la page
      opacity: 0.1, // Ajuster l'opacité si nécessaire
      width: '100%', // Pour étendre sur toute la largeur
      // height: '70%', // Pour occuper 80% de la hauteur de la page
    
    },
      verticalLine1: {
        borderRight: 1, // Bordure droite pour la ligne verticale
        paddingHorizontal: 5, // Espace horizontal à gauche et à droite de la cellule
        paddingLeft: '10%',
        paddingRight: '2%',
        color:'black',
        height:'350px',
        borderColor:'black',
      },
      verticalLine2: {
        borderRight: 1, // Bordure droite pour la ligne verticale
        paddingHorizontal: 5, // Espace horizontal à gauche et à droite de la cellule
        paddingLeft: '10%',
        paddingRight: '15%',
        color:'black',
        height:'350px',
        borderColor:'black',
      },
      verticalLine3: {
        borderRight: 1, // Bordure droite pour la ligne verticale
        paddingHorizontal: 5, // Espace horizontal à gauche et à droite de la cellule
        // paddingLeft: '10%',
        // paddingRight: '2%',
        marginLeft:'25px',
        color:'black',
        height:'350px',
        borderColor:'black',
      },
      horizontalLine1: {
        borderBottom: 1, // Bordure droite pour la ligne verticale
        marginLeft:'80px',
        color:'black',
        borderColor:'black',
        width:'100px',
      },
      horizontalLine2: {
        borderBottom: 1, // Bordure droite pour la ligne verticale
        marginLeft:'80px',
        color:'black',
        borderColor:'black',
        width:'300px',
      },
      horizontalLine: {
        borderBottom: 1, // Bordure droite pour la ligne verticale
        marginBottom: '1px',
        marginLeft:'5px',
        color:'red',
        borderColor:'black',
        width:'250px',
      },
});
    
    
const FactureTitan = ({idClient, panier, decorations, produits, salle}) => {
    const [client, setClient]=useState({});
    const [commande, setCommande]=useState([]);

    useEffect(()=>{
        const apiUrl = `http://127.0.0.1:8000/store/Client/${idClient}`;
        const apiUrlC = `http://127.0.0.1:8000/store/Commande`;
        Promise.all([fetch(apiUrl), fetch(apiUrlC)])
            .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
            .then(([artData, data]) => {
                setClient(artData);
                data = (data.filter(f=>f.panier===panier.id))[0]
                setCommande(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    },[client, commande])

    const getSplittedDate = (date) => {
        if(date){const [datePart, timePart] = date.split('T');
        const result = [...datePart.split('-'), ...timePart.split(':')];
        return result[2]+"/"+result[1]+"/"+result[0];}
      };
      
      const total = ()=>{
          var totalProd = 0;
          var totalDeco = 0;
          var totalSalle = 0;

        produits.map(prod=>{
            totalProd+=parseInt(prod.prix_unitaireP)*parseInt(prod.quantite)
        })
        decorations.map(prod=>{
            totalDeco+=parseInt(prod.prixDecoration)*parseInt(prod.quantite)
        })
        salle.map(prod=>{
            totalSalle+=parseInt(prod.prixSalle)
        })
        return totalProd+totalDeco+totalSalle
    }

    return (
  <Document>
  <Page size="A4" style={styles.page}>
  <Image src={logo} style={styles.backgroundImage} />
  <View style={{display:'flex', flexDirection:'row'}}>
    <View style={{width:'25%', backgroundColor:'#c3c3c3', height:'840px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
       <View>
            <View>
                <Image style={{zIndex:2}} src={logo} alt="logo"/>
            </View>
       </View>
       <View style={{display:'flex', marginLeft:'3px', marginTop:'450px'}}>
            <View style={{fontSize:'10px', marginBottom:'10px'}}>
                <Text style={{fontWeight:'bold'}}>BANK</Text>
                <Text>BMOI MADAGASCAR</Text>
            </View>
            <View style={{fontSize:'10px', marginBottom:'10px'}}>
                <Text>RIB</Text>
                <Text>00004 00009 0331932010233</Text>
            </View>
            <View style={{fontSize:'10px', marginBottom:'10px'}}>
                <Text>ERGON Group SARL</Text>
                <Text>Lot Text93M AmbohiTexto sud</Text>
                <Text>By-pass</Text>
                <Text>+261 34 61 791 41</Text>
            </View>
            <View style={{fontSize:'10px', marginBottom:'10px'}}>
                <Text>NIF : 6003298583</Text>
                <Text>STAT : 77290 11 2019 0 10215</Text>
            </View>
       </View>
       <View>
            <View>
                <Image style={{zIndex:2}} src={logo} alt="logo"/>
            </View>
       </View>
    </View>
    <View style={{width:'75%'}}>
        {/*l entete voloany a droite */}
        <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
            <View style={{display:'flex', flexDirection:'column', paddingRight:'70px'}}>
                <View style={styles.horizontalLine1}></View>
                <View>
                    <Text style={{fontWeight:'bold'}}>FACTURE</Text>
                </View>
                <View style={{fontSize:'10px'}}>
                    <Text>Date {format(new Date(), "dd/MM/yyyy")}</Text>
                </View>
            </View>
        </View>

            {/*l entete faharoa a droite */}
        <View style={{marginTop:'40px', marginBottom:'25px'}}>
            <View style={{marginLeft:'15px', marginBottom: '2px'}}>
                <View style={{fontSize:'10px'}}>
                    <Text>NOM : {client.nom}</Text>
                </View>
                <View style={styles.horizontalLine2}></View>
                <View style={{fontSize:'10px', marginBottom: '2px'}}>
                    <Text>CONTACT : {client.contact}</Text>
                </View>
                <View style={styles.horizontalLine2}></View>
                <View style={{fontSize:'10px', marginBottom: '2px'}}>
                    <Text>LOCATION DU : {getSplittedDate(commande.date_debutLoc)} - {getSplittedDate(commande.date_finLoc)}</Text>
                </View>
                <View style={styles.horizontalLine2}></View>
            </View>
        </View>
        
        {/*l tableau */}
        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'350px',textAlign:'center', marginLeft:'50px'}}>
        <View style={{display:'flex', flexDirection:'row'}}>
          <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{fontSize:'10px'}}>
                <Text>QTE</Text>
              </View>
              {produits&&
              produits.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                  {p.quantite}
                </Text>
              </View>
              )}
              {decorations&&
              decorations.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                  {p.quantite}
                </Text>
              </View>
              )}
              {salle&&
              salle.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>

                </Text>
              </View>
              )}
          </View>
          <View style={styles.verticalLine1}></View>
        </View >
          
        <View style={{display:'flex', flexDirection:'row'}}>
          <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{fontSize:'10px'}}>
                <Text>DESIGNATION</Text>
              </View>
              {produits&&
              produits.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                  {p.nomP}
                </Text>
              </View>
              )}
              {decorations&&
              decorations.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                  {p.nomDecoration}
                </Text>
              </View>
              )}
              {salle&&
              salle.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                 Location de {'"'+p.nomSalle+'"'}
                </Text>
              </View>
              )}
          </View>
          <View style={styles.verticalLine1}></View>
        </View >

        <View style={{display:'flex', flexDirection:'row'}}>
          <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{fontSize:'10px'}}>
                <Text>PU</Text>
              </View>
              {produits&&
              produits.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                  {p.prix_unitaireP}
                </Text>
              </View>
              )}
              {decorations&&
              decorations.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                  {p.prixDecoration}
                </Text>
              </View>
              )}
              {salle&&
              salle.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                    {p.prixSalle}
                </Text>
              </View>
              )}
          </View>
          <View style={styles.verticalLine1}></View>
        </View >

        <View>
          <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{fontSize:'10px'}}>
                <Text>MONTANT</Text>
                
              {produits&&
              produits.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                  {parseInt(p.prix_unitaireP)*parseInt(p.quantite)}
                </Text>
              </View>
              )}
              {decorations&&
              decorations.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                  {parseInt(p.prixDecoration)*parseInt(p.quantite)}
                </Text>
              </View>
              )}
              {salle&&
              salle.map((p, index)=>
              <View key={index} style={{fontSize:'10px'}}>
                <Text>
                    {p.prixSalle}
                </Text>
              </View>
              )}
              </View>
          </View>
        </View >
      </View>
      {/* L remise */}
      <View style={{marginTop:'25px', marginLeft:'300px',display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
        <View >
                <View style={{fontSize:'10px'}}>
                    <Text>TOTAL EN ARIARY {total()}</Text>
                </View>
                <View style={styles.horizontalLine1}>
                </View>
        </View>
      </View>

      {/* l signature */}
      <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row', marginTop:'10px'}}>
        <View style={{fontSize:'10px', marginLeft:'20px'}}>
            <Text>Le responsable</Text>
        </View>

        <View style={{fontSize:'10px', marginRight:'20px'}}>
            <Text>Le client</Text>
        </View>
      </View>

      {/* l footer */}
      <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row', marginTop:'110px'}}>
        <View style={{fontSize:'10px', fontWeight:'bold', marginLeft:'20px'}}>
            <Text>titan@ergon.mg</Text>
        </View>

        <View style={{fontSize:'10px',fontWeight:'bold', marginRight:'20px'}}>
            <Text>+261 34 61 791 42</Text>
        </View>
      </View>

    </View>
  </View>
  </Page>
</Document>
      );
}

export default FactureTitan;

