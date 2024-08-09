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
    
    
const DechargeHahitantsoa = ({idClient}) => {
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

                        <View style={{fontSize:'13px', textDecoration:'underline', display:'flex', alignItems:'center'}}>
                            <View>
                                <Text>
                                    DECHARGE DE RESPONSABILITE
                                </Text>
                            </View>
                        </View>

                        <View style={{width:'100%'}}>
                            <View style={{left:'20px', fontSize:'10px', lineHeight:2, top:'30px'}}>
                                <View style={{left:'30px'}}>
                                    <Text>
                                        Je soussigné(e), ………………………………………………………………………………, 
                                    </Text>
                                </View>
                                <View style={{fontSize:'10px', lineHeight:2}}>
                                    <Text>
                                        décharge par la présente lettre, ERGON Group, de toute responsabilité 
                                        lors de l’événement du …………………………………………………… au domaine HAHITANTSOA sis au Lot P93M Sud Ambohipo Alasora.
                                    </Text>
                                </View>
                            </View>

                            <View style={{left:'30px', fontSize:'10px', lineHeight:2, top:'40px'}}>
                                <View>
                                    <Text style={{left:'30px'}}>
                                        Je renonce à faire valoir toute revendication, de quelque nature qu’elle soit,
                                        en particulier en cas d’accident
                                    </Text>
                                </View>
                                <View style={{fontSize:'10px', lineHeight:2}}>
                                    <Text>
                                    , blessure, vol, dégâts sur les biens personnels 
                                        ou autres se produisant lors de la durée de mon contrat. Je reconnais avoir pris connaissance du règlement intérieur de cet établissement.
                                    </Text>
                                </View>
                                
                            </View>

                            <View style={{left:'20px', fontSize:'10px', lineHeight:2, top:'40px'}}>
                                <View style={{left:'30px'}}>
                                    <Text>
                                        Je suis informé(e) qu’il m’appartient de souscrire personnellement une assurance maladie/accident
                                        et  
                                    </Text>
                                </View>
                                <View style={{fontSize:'10px', lineHeight:2}}>
                                    <Text>
                                        responsabilité civile. Je me porte également garant(e) financier en cas de dégradation que je pourrais occasionner durant 
                                        les festivités. Le refus de signer cette décharge de responsabilité réserve le droit à l’hôte d’annuler le contrat.
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={{display:'flex', alignItems:'flex-end'}}>
                            <View style={{fontSize:'9px', top:'175px'}}>
                                <Text>Fait à Antananarivo, le ………………………………</Text>
                            </View>
                        </View>

                        <View style={{top:'275px'}}>
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
    
export default DechargeHahitantsoa;