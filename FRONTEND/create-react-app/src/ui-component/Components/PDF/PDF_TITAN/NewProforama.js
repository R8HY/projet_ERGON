import React from "react";
import { Page, Document, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import logo1 from '../../../../Components/assets/LOGO-HD-NOIR_TITAN.png'
import logo2 from '../../../../Components/assets/LOGO-HD-NOIR_ERGON.png'
import logo3 from '../../../../Components/assets/LOGO-HD-GRIS2_TITAN.png'
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
      left: '80px',
      right: 0,
      bottom: 0,
      //resizeMode: 'cover', // Redimensionner pour couvrir toute la page
      opacity: 0.3, // Ajuster l'opacité si nécessaire
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
    
    
const NewProforama = () => {
    return (
  <Document>
  <Page size="A4" style={styles.page}>
  <Image src={logo3} style={styles.backgroundImage} />
  <View style={{display:'flex', flexDirection:'row'}}>
    <View style={{width:'25%', backgroundColor:'#c3c3c3', height:'840px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
       <View>
            <View>
                <Image style={{zIndex:2}} src={logo1} alt="logo"/>
            </View>
       </View>
       <View style={{display:'flex', marginLeft:'3px', marginTop:'450px'}}>
            <View style={{fontSize:'10px', marginBottom:'10px'}}>
                <Text style={{fontWeight:'bold'}}>BANK</Text>
                <Text>BMOI MADAGASCAR</Text>
            </View>
            <View style={{fontSize:'10px', marginBottom:'10px'}}>
                <Text  style={styles.text1}>RIB</Text>
                <Text style={styles.text}>00004 00009 0331932010233</Text>
            </View>
            <View style={{fontSize:'10px', marginBottom:'10px'}}>
                <Text>ERGON Group SARL</Text>
                <Text>Lot Text93M AmbohiTexto sud</Text>
                <Text>By-pass</Text>
                <Text style={styles.text}>+261 34 61 791 41</Text>
            </View>
            <View style={{fontSize:'10px', marginBottom:'10px'}}>
                <Text>NIF : 6003298583</Text>
                <Text>STAT : 77290 11 2019 0 10215</Text>
            </View>
       </View>
       <View>
            <View>
                <Image style={{zIndex:2}} src={logo2} alt="logo"/>
            </View>
       </View>
    </View>
    <View style={{width:'75%'}}>
        {/*l entete voloany a droite */}
        <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
            <View style={{display:'flex', flexDirection:'column', paddingRight:'70px'}}>
                <View style={{fontSize:'10px'}}>
                    <Text>PROFORMA N°</Text>
                </View>
                <View style={styles.horizontalLine1}></View>
                <View>
                    <Text style={{fontWeight:'bold'}}>PROFORMA</Text>
                </View>
                <View style={{fontSize:'10px'}}>
                    <Text>Date</Text>
                </View>
            </View>
        </View>

            {/*l entete faharoa a droite */}
        <View style={{marginTop:'40px', marginBottom:'25px'}}>
            <View style={{marginLeft:'15px', marginBottom: '2px'}}>
                <View style={{fontSize:'10px'}}>
                    <Text>NOM</Text>
                </View>
                <View style={styles.horizontalLine2}></View>
                <View style={{fontSize:'10px', marginBottom: '2px'}}>
                    <Text>CONTACT</Text>
                </View>
                <View style={styles.horizontalLine2}></View>
                <View style={{fontSize:'10px', marginBottom: '2px'}}>
                    <Text>LOCATION DU</Text>
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
              <View style={{fontSize:'10px'}}>
                <Text>
                  Données 1
                </Text>
              </View>
          </View>
          <View style={styles.verticalLine1}></View>
        </View >
          
        <View style={{display:'flex', flexDirection:'row'}}>
          <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{fontSize:'10px'}}>
                <Text>DESIGNATION</Text>
              </View>
              <View style={{fontSize:'10px'}}>
                <Text>
                  Données 1
                </Text>
              </View>
          </View>
          <View style={styles.verticalLine1}></View>
        </View >

        <View style={{display:'flex', flexDirection:'row'}}>
          <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{fontSize:'10px'}}>
                <Text>PU</Text>
              </View>
              <View style={{fontSize:'10px'}}>
                <Text>
                  Données 1
                </Text>
              </View>
          </View>
          <View style={styles.verticalLine1}></View>
        </View >

        <View>
          <View style={{display:'flex', flexDirection:'column'}}>
              <View style={{fontSize:'10px'}}>
                <Text>MONTANT</Text>
              </View>
              <View style={{fontSize:'10px'}}>
                <Text>
                  Données 1
                </Text>
              </View>
          </View>
        </View >
      </View>

      {/* L remise */}
      <View style={{marginTop:'25px', marginLeft:'300px',display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
        <View >
                <View style={{fontSize:'10px'}}>
                    <Text>TOTAL</Text>
                </View>
                <View style={styles.horizontalLine1}></View>
        </View>
        <View>
            <View style={{fontSize:'10px'}}>
                <Text>REMISE</Text>
            </View>
            <View style={styles.horizontalLine1}></View>
        </View>
      </View>
    
    {/*tableau 2 */}
      <View style={{border:'1px', marginTop:'50px', width:'90%', marginLeft:'10px'}}>
        <View style={{paddingLeft:'10px', paddingTop:'1px', backgroundColor:'#c3c3c3', fontSize:'10px', height:'20px'}}>
            <Text>TOTAL A PAYER</Text>
        </View>
        <View>
            <View style={{display:'flex', flexDirection:'row', height:'40px', paddingLeft:'10px', alignItems:'center'}}>
                <View>
                    <View>
                        <View style={{fontSize:'10px'}}>
                            <Text>Arrêtée la présente facture</Text>
                        </View>
                        <View style={{fontSize:'10px'}}>
                            <Text>proforma à la somme de</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalLine}></View>
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

export default NewProforama;

