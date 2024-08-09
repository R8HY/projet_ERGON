import { Page, Document, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import logo1 from '../../../../Components/assets/LOGO-HD_HAHITANTSOA.png'
import logo2 from '../../../../Components/assets/LOGO-HD_ERGON.png'
import logo3 from '../../../../Components/assets/LOGO-HD-background_ERGON.png'
import React, {useState, useEffect} from 'react';


const styles = StyleSheet.create({
    page: {
        paddingTop: 15, // Marge en haut
        paddingBottom: 0, // Marge en bas
        paddingLeft: 50, // Marge à gauche
        paddingRight: 50, // Marge à droite
    },
    backgroundImage: {
        position: 'absolute',
        zIndex: -1,
        top: '200px',
        left: -150,
        right: '900px',
        bottom: 0,
        resizeMode: 'cover', // Redimensionner pour couvrir toute la page
        opacity: 0.1, // Ajuster l'opacité si nécessaire
        width: '200%',
        height:'50%',
      
      },
    text1:{
        fontSize:11,
    },
    horizontalLine: {
        marginTop:'5px',
        borderBottom: 1, 
        color:'black',
        borderColor:'black',
        width:'100%',
        opacity:0.8,
      },
});
    
    
const ReglementHahitantsoa = ({idClient}) => {
    const [client, setClient] = useState({});
    console.log(idClient);

    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/store/Client/${idClient}/`;
    
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setClient(data);
            console.log(client.nom)
            console.error('gg');
          })
          .catch((error) => {
            console.error('Error fetching data:', error, 'noob');
          });
      }, [idClient]);

    return (
  <Document>
  <Page size="A4" style={styles.page}>
  <Image src={logo3} style={styles.backgroundImage} />
        <View>
            {/* les logo d'entete */}
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'25px'}}>
                <View>
                    <View>
                        <Image src={logo2} alt="logo" style={{width:'130px', height:'110px'}}/> 
                    </View>
                    <View style={{marginLeft:'30px'}}>
                        <Text style={styles.text1}>ergon@ergon.mg</Text>
                        <Text style={styles.text1}>+261 34 61 791 41</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Image src={logo1} alt="logo" style={{width:'140px', height:'110px'}}/> 
                    </View>
                    <View style={{marginLeft:'20px'}}>
                        <Text style={styles.text1}>hahitantsoa@ergon.mg</Text>
                        <Text style={styles.text1}>+261 34 61 791 44</Text>
                    </View>
                </View>
            </View>

            {/* le titre */}

            <View style={{display:'flex',  alignItems:'center'}}>
                <View style={{fontSize:13, fontWeight:'bold', textDecoration:'underline'}}>
                    <Text>REGLEMENT INTERIEUR</Text>
                </View>
            </View>

          
            <View style={{marginTop:'50px', width:'100%', left:'30px'}}>
                <View style={{fontSize:'10px', lineHeight: 1.5, bottom:'20px'}}>
                    <Text>
                        Interdiction de fumer à l’intérieur des locaux (chapiteau et bâtiments) ;
                    </Text>
                </View>
                <View style={{fontSize:'10px', lineHeight: 1.5, bottom:'20px'}}>
                    <Text>
                        Puissance d’appareils
                        en cuisine limité à 6 000 W (hors congélateur et réfrigérateur) ;
                    </Text>
                </View>
                <View style={{fontSize:'10px', lineHeight: 1.5, bottom:'20px'}}>
                    <Text>
                        Interdiction de toucher aux plantes 
                        du jardin (surtout pour vos prestataires en décoration);
                    </Text>
                </View>
                <View style={{fontSize:'10px', lineHeight: 1.5, bottom:'20px'}}>
                    <Text>
                        Interdiction de s’asseoir, s’appuyer sur les pierres décoratives ;
                    </Text>
                </View>
                <View style={{fontSize:'10px', lineHeight: 1.5, bottom:'20px'}}>
                    <Text>
                        Accès au salon réservé uniquement aux mariés et ses 
                        proches à présenter aux responsables avant l’événement ;
                    </Text>
                </View>
                <View style={{fontSize:'10px', lineHeight: 1.5, bottom:'20px'}}>
                    <Text>
                        Pour les prestataires, respecter le silence lors des préparatifs en soirée ;
                    </Text>
                </View>
                <View style={{fontSize:'10px', lineHeight: 1.5, bottom:'20px'}}>
                    <Text>
                        Pour raison de sécurité : fermeture du portail à 23h00, 
                        ouverture à 04h30 du matin lors des préparatifs ;
                    </Text>
                </View>
                <View style={{fontSize:'10px', lineHeight: 1.5, bottom:'20px'}}>
                    <Text>
                        En cas de rallonge d’heure le jour J, possible si les lieux sont libres le lendemain, 
                        le tarif d’utilisation de nuit est appliqué. Cependant, la réception doit prendre fin à 
                        21 heures pour cause de tapage nocturne sans autorisation.
                    </Text>
                </View>
            </View>

            <View style={{fontSize:'10px', lineHeight:1.5}}>
                <Text>
                    Le client est tenu d’informer
                    le règlement intérieur et le plan d’évacuation incendie à tous ses prestataires ainsi que ses convives.
                </Text>
            </View>

            <View style={{top:'350px'}}>
                <View style={styles.horizontalLine}></View>
            </View>

             {/*footer */}
             <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'375px'}}>
                                    <View style={{display:'flex', flexDirection:'column', width:'50%', justifyContent:'flex-end', alignItems:'flex-end', fontSize:'9px', marginRight:'15px'}}>
                                        <View>
                                            <View style={{opacity:0.5, alignItems:'flex-end', marginTop:'5px'}}>
                                                <Text>Ergon Group SARL</Text>
                                                <Text>Lot P93M Ambohipo Sud Alasora Bypass</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={{fontWeight:'bold', marginTop:'10px'}}>
                                                <Text>ergon@ergon.mg</Text>
                                                <Text>+261 34 61 791 41</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{display:'flex', flexDirection:'column', width:'50%', justifyContent:'flex-start', alignItems:'flex-start', fontSize:'9px', marginLeft:'15px'}}>
                                        <View>
                                            <View style={{opacity:0.5, alignItems:'flex-start', marginTop:'5px'}}>
                                                <Text>NIF: 6003298589</Text>
                                                <Text>STAT: 77290 11 2019 010 215</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={{fontWeight:'bold', marginTop:'10px'}}>
                                                <Text>hahitantsoa@ergon.mg</Text>
                                                <Text>+261 34 61 791 44</Text>
                                            </View>
                                        </View>
                                    </View>
                        </View>
        </View>
  </Page>
  </Document>
        );
    }
    
export default ReglementHahitantsoa;