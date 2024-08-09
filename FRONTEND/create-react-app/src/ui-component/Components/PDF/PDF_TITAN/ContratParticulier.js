import { Page, Document, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import logo1 from '../../../../Components/assets/LOGO-HD_TITAN.png'
import logo2 from '../../../../Components/assets/LOGO-HD_ERGON.png'
import logo3 from '../../../../Components/assets/LOGO-HD-background_ERGON.png'
import React, { useState, useEffect } from 'react';



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
        fontSize:13,
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
    
    
const ContratParticulier = ({idClient, id_panier}) => {
    const [client, setClient] = useState({});
    const [articleData, setArticleData] = useState([]);
    console.log(idClient);

    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/store/Client/${idClient}`;
    
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setClient(data);
            console.error('gg');
          })
          .catch((error) => {
            console.error('Error fetching data:', error, 'noob');
          });
      }, [idClient]);

      useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/store/Particulier/${idClient}`;
    
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setSocieteData(data);
            console.log('Les donnees des sciete sont bien récupérer');
          })
          .catch((error) => {
            console.error('Error fetching data:', error, 'noob');
          });
      }, [idClient]);

      useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/store/Panier/${id_panier}/article_panier/`;
    
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setArticleData(data);
            console.log('Les donnees des articles sont bien récupérer');
            console.log(id_panier)
          })
          .catch((error) => {
            console.error('Error fetching data (articles):', error, 'noob');
          });
      }, [id_panier]);

    return (
  <Document>
  <Page size="A4" style={styles.page}>
  <Image src={logo3} style={styles.backgroundImage} />
        <View>
            {/* les logo d'entete */}
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'25px'}}>
                <View>
                    <View>
                        <Image src={logo2} alt="logo" style={{width:'110px', height:'100px'}}/> 
                    </View>
                    <View style={{marginLeft:'30px'}}>
                        <Text style={styles.text1}>ergon@ergon.mg</Text>
                        <Text style={styles.text1}>+261 34 61 791 41</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Image src={logo1} alt="logo" style={{width:'110px', height:'100px'}}/> 
                    </View>
                    <View style={{marginLeft:'20px'}}>
                        <Text style={styles.text1}>titan@ergon.mg</Text>
                        <Text style={styles.text1}>+261 34 61 791 42</Text>
                    </View>
                </View>
            </View>

            {/* le titre */}

            <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <View style={{fontSize:13, fontWeight:'bold'}}>
                    <Text>CONTRAT DE LOCATION DE MATERIELS EVENEMENTIELS</Text>
                </View>
                <View style={{fontSize:13, fontWeight:'bold', marginTop:'10px'}}>
                    <Text>« TITAN RENTAL »</Text>
                </View>
            </View>

            {/* les soussignes */}
            <View style={{marginTop:'20px', width:'100%'}}>
                <View style={{fontSize:'9px', marginBottom:'10px'}}>
                    <Text>Entre les soussignés :</Text>
                </View>
                <View style={{fontSize:'9px', lineHeight: 1.5}}>
                    <Text>
                        La société ERGON GROUP, dont le siège social se situe au Lot P93M 
                        Sud Ambohipo Alasora Antananarivo 10301, 
                        représentée par {client.nom}. 
                        en sa qualité de ……………………………………..
                    </Text>
                </View>
            </View>

            {/*le prestataire */}
            <View style={{display:'flex', alignItems:'flex-end' ,marginTop:'10px'}}>
                <View style={{fontSize:'9px', marginBottom:'5px'}}>
                    <Text>Ci-après dénommée « Le prestataire »</Text>
                </View>
                <View style={{fontWeight:'bold', textDecoration:'underline', fontSize:'10px'}}>
                    <Text>D’UNE PART,</Text>
                </View>
            </View>

            {/* le particulier */}
            <View style={{marginTop:'10px', width:'100%'}}>
                <View style={{fontSize:'9px', lineHeight: 1.5}}>
                    <Text>
                        Madame, Monsieur ………………………………………………………………...………………….……., né(e)
                        le…………………………….. à ……….…………………...., titulaire de la Carte d’Identité Nationale
                         ……………………………………………………délivrée le………………….…… à……………………………,
                          demeurant au ………………………………………...………………………..
                        Contact : ………………………………………….
                    </Text>
                </View>
                   
            </View>

            {/*le client */}
            <View style={{display:'flex', alignItems:'flex-end' ,marginTop:'10px'}}>
                <View style={{fontSize:'9px', marginBottom:'5px'}}>
                    <Text>Ci-après dénommée « Le client »</Text>
                </View>
                <View style={{fontWeight:'bold', textDecoration:'underline', fontSize:'10px', marginBottom:'10px'}}>
                    <Text>D’AUTRE PART,</Text>
                </View>
            </View>

            {/* les parties*/}
            <View>
                <View style={{fontSize:'9px', marginBottom:'10px'}}>
                    <Text>Le Client et le Prestataire étant dénommés ci-après les « Parties »</Text>
                </View>
                <View style={{fontSize:'9px', marginBottom:'10px'}}>
                    <Text>IL A ETE CONVENU CE QUI SUIT :</Text>
                </View>
                <View style={{display:'flex', flexDirection:'row', marginBottom:'10px'}}>
                    <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
                        <Text>Article 1</Text>
                    </View>
                    <View style={{fontSize:'9px'}}>
                        <Text>: Objet du contrat</Text>
                    </View>
                </View>
                <View style={{fontSize:'9px', marginBottom:'10px'}}>
                    <Text>Le présent contrat est conclu entre les Parties en vue de la location de matériels évènementiels comprenant :</Text>
                </View>
               
                <View style={{marginLeft:'10px'}}>
                    {articleData.map((article, index)=>
                        <View key={index}>
                            <View style={{fontSize:'9px', marginBottom:'5px'}}>
                                <Text>- {article.nomP}</Text>
                            </View>
                        </View>
                    )}
                    
                </View>
                    {/*<View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-</Text>
                    </View>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-</Text>
                    </View>
                     <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-</Text>
                    </View>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-</Text>
                    </View>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-</Text>
                    </View>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-</Text>
                    </View>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-</Text>
                    </View> */}
                
                <View style={{fontSize:'9px', marginBottom:'10px'}}>
                    <Text>Ci-après désignés les « Matériels Loués ».</Text>
                </View>
                <View style={{fontSize:'9px', marginBottom:'5px', lineHeight: 1.5}}>
                    <Text>Le client déclare parfaitement connaitre les Matériels loués pour les avoir examinés en 
                        vue des présentes, sans qu’il soit nécessaire d’en faire plus ample désignation et déclare les accepter dans l’état 
                        où ils se trouvent tels qu’ils existent.
                    </Text>
                </View>
                <View style={{display:'flex', flexDirection:'row', marginBottom:'5px'}}>
                    <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
                        <Text>Article 2</Text>
                    </View>
                    <View style={{fontSize:'9px'}}>
                        <Text>: Destination</Text>
                    </View>
                </View>

                <View>
                    <View style={styles.horizontalLine}></View>
                </View>
                
            </View>

            {/*footer */}
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'10px'}}>
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
            </View>
        

        </View>
  </Page>

  {/*2eme page */}
  <Page size="A4" style={styles.page}>
  <Image src={logo3} style={styles.backgroundImage} />
    {/*logo d'entete */}
    <View style={{display:'flex', alignItems:'center'}}>
        <View>
            <Image src={logo1} alt="logo" style={{width:'85px', height:'75px'}}/> 
        </View>
    </View>

    <View>
        <View style={{fontSize:'9px', marginBottom:'5px', marginTop:'10px'}}>
            <Text>Les matériels loués sont destinés à usage dans le cadre des évènements 
                suivants : mariages, anniversaires, réceptions privées, séminaires.
            </Text>
        </View>
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>Toute autre activité en sus non mentionné doit faire l’objet d’une annexe à titre d’avenant conclu entre les parties.</Text>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>Le lieu de destination devant être mentionnée par le Client.</Text>
        </View>
    </View>

    {/*article 3 */}
    <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
        <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
            <Text>Article 3</Text>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>: Durée</Text>
        </View>
    </View>
    <View>
        <View style={{fontSize:'9px', marginBottom:'8px'}}>
            <Text>La présente location est consentie et acceptée du …………..…..…. à …... heures au ………….…… à …... heures.</Text>
        </View>
        <View style={{fontSize:'9px', lineHeight:1.4}}>
            <Text>
                Il sera alors convenu un prélèvement des matériels du ………….………à ...... heures, pour une restitution au ……………….……. à …... heures. 
            </Text>
        </View>
    </View>

    {/*article 4 */}
    <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
        <View style={{fontSize:'9px', marginBottom:'8px', textDecoration:'underline'}}>
            <Text>Article 4</Text>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>: Tarifs</Text>
        </View>
    </View>
    <View>
        <View style={{fontSize:'9px', marginBottom:'8px'}}>
            <Text>La présente location est consentie et acceptée moyennant le prix de ……………………………… Ariary TTC.</Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px', lineHeight:1.4}}>
            <Text>
            Une facture sera établie après la réception de la totalité du règlement. Un reçu sera établi lors de la réception des fonds pour acompte.
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px', lineHeight:1.4}}>
            <Text>
                Dans le cas où le client n’aurait pas rendu les Matériels loués aux date et heure indiquées 
                à l’article 3, le Client devra payer la somme supplémentaire de 50% du montant total de la facture par jour de non remise des Matériels Loués.
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px', lineHeight:1.4}}>
            <Text>
                Dans le cas où il y a préjudice causé par la rallonge de retour des Matériels loués, le Client est tenu de 
                prendre en charge tous les frais liés au démantèlement avec la somme supplémentaire de 100% pour réparation de dommage.
            </Text>
        </View>
    </View>

    {/*article 5 */}
    <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
        <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
            <Text>Article 5</Text>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>: Modalités de paiement</Text>
        </View>
    </View>
    <View>
        <View style={{fontSize:'9px',  marginBottom:'8px', lineHeight:1.4}}>
            <Text>
                La présente location est consentie et acceptée moyennant le versement d’un acompte de 25 % de la somme totale due. Celui-ci devra être réglé le jour de la réservation des
                matériels, soit à la signature par le Client du présent contrat.
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px'}}>
            <Text>
            Le client s’engage à verser le solde du montant de la location cinq jours avant l’enlèvement des Matériels Loués au plus tard.
            </Text>
        </View>
    </View>

    {/*article 6 */}
    <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
        <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
            <Text>Article 6</Text>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>: Etat des Matériels</Text>
        </View>
    </View>
    <View>
        <View style={{fontSize:'9px', marginBottom:'8px'}}>
            <Text>
            Un état des Matériels sera établi à l’enlèvement à contrario d’un état dressé à la remise des dits matériels à la fin du contrat.
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px'}}>
            <Text>
            Le client est tenu de rester le temps nécessaire pour procéder à l’état des Matériels.
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px'}}>
            <Text>
                Chaque article devra être restitué à l’état lors de la prise de possession.
            </Text>
        </View>
    </View>

    {/*article 7 */}
    <View>
        <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
            <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
                <Text>Article 7</Text>
            </View>
            <View style={{fontSize:'9px'}}>
                <Text>: Dépôt de garantie</Text>
            </View>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px'}}>
            <Text>Le client verse au Prestataire à titre de dépôt de garantie :</Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px', left:'10px'}}>
            <Text>
                - 100 000,00 Ariary (Cent mille Ariary) pour les locations de moins de 200 000,00 Ariary (Deux cent mille Ariary)
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px', left:'20px'}}>
            <Text>
            - 50% du montant total pour les locations de plus de 200 000,00 Ariary.
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px'}}>
            <Text>La somme correspondant au dépôt de garantie est versée le jour du règlement de solde du contrat.</Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px'}}>
            <Text>Le montant du dépôt de garantie sera remboursé au Client le jour de la fin de location dans le cas d’un retour sans casse.</Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px', lineHeight:1.4}}>
            <Text>Par ailleurs, en cas de casse il sera alloué au Prestataire cinq jours de délai pour traitement et restitution du dépôt de garantie 
                après déduction de toutes les sommes dont il est destiné à garantir le paiement notamment les casses et préjudices causés par le Client à l’usage des articles de location.</Text>
        </View>
    </View>

    <View>
        <View style={styles.horizontalLine}></View>
    </View>

    {/*footer */}
    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'10px'}}>
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
    </View>
  </Page>

  {/*3 eme page */}
  <Page size="A4" style={styles.page}>
  <Image src={logo3} style={styles.backgroundImage} />
    <View style={{display:'flex', alignItems:'center'}}>
        <View>
            <Image src={logo1} alt="logo" style={{width:'85px', height:'75px'}}/> 
        </View>
    </View>
    
    <View style={{marginTop:'10px'}}>
        <View style={{fontSize:'9px', lineHeight:1.4}}>
            <Text>
                Si le montant du préjudice est supérieur au montant du dépôt de garantie, le Client s’engage à rembourser les frais supplémentaires sous 8 jours après réception d’une mise en demeure 
                l’informant du montant de la somme due au titre de ces désagréments.
            </Text>
        </View>
    </View>

    {/*articles 8 */}
    <View>
        <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
            <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline', fontWeight:'bold'}}>
                <Text>Article 8</Text>
            </View>
            <View style={{fontSize:'9px', fontWeight:'bold'}}>
                <Text>: Obligations du Prestataire</Text>
            </View>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px'}}>
            <Text>
            Le Prestataire s’engage à mettre à disposition du Client l’ensemble des éléments mentionnés dans l’article 1 du présent contrat.
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px'}}>
            <Text>
            Il s’engage à ne pas faire entrave à la jouissance du Client pendant toute la durée de la location.
            </Text>
        </View>
    </View>

    {/*article 9*/}
    <View>
        <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
            <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline', fontWeight:'bold'}}>
                <Text>Article 9</Text>
            </View>
            <View style={{fontSize:'9px', fontWeight:'bold'}}>
                <Text>: Obligations du Client</Text>
            </View>
        </View>
        <View style={{fontSize:'9px', left:'20px'}}>
            <View style={{marginBottom:'5px'}}>
                <Text>
                    - Le Client prendra les Matériels Loués dans l’état où ils se trouvent au moment de l’entrée en jouissance, sans 
                    pouvoir exiger du Prestataire toute forme de modifications en sus ;
                </Text>
            </View>
            <View style={{marginBottom:'5px'}}>
                <Text>
                    - Le Client ne pourra faire aucune modification sur les Matériels Loués ; 
                </Text>
            </View>
            <View style={{marginBottom:'5px'}}>
                <Text>
                    - Le Client s’engage à utiliser les Matériels Loués en bon père de famille ;
                </Text>
            </View>
            <View style={{marginBottom:'5px'}}>
                <Text>
                    - Le Client s’engage à respecter et à faire respecter par toutes les personnes présentes lors de l’évènement le bon 
                    usage en bon père de famille des Matériels Loués ;
                </Text>
            </View>
            <View style={{marginBottom:'5px'}}>
                <Text>
                    - Le Client s’engage à rendre les Matériels loués lavés et séchés.
                </Text>
            </View>
        </View>
    </View>

    {/*articles 10 */}
    <View>
        <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
            <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline', fontWeight:'bold'}}>
                <Text>Article 10</Text>
            </View>
            <View style={{fontSize:'9px', fontWeight:'bold'}}>
                <Text>: Annulation</Text>
            </View>
        </View>
        <View>
        <View style={{fontSize:'9px', marginBottom:'8px'}}>
            <Text>
                Le preneur ne pourrait annuler la location sauf pour cas de force majeure, et ne peut prévaloir un droit à remboursement.
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px', lineHeight:1.4}}>
            <Text>
            En cas de force majeur, les deux parties se rapprochent pour évaluer les éventuels remboursements sans engagement de part et d’autres.
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px', lineHeight:1.4}}>
            <Text>
                Dans le cas où le Prestataire ne pourrait respecter ses engagements pour cas de force majeure, il se réserve le droit d’annuler la réservation
                et de rembourser intégralement au Client les sommes qu’il a versées.
            </Text>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px', lineHeight:1.4}}>
            <Text>
                Dans le cas où il y a préjudice causé par la rallonge de retour des Matériels loués, le Client est tenu de prendre en charge tous les frais liés au démantèlement avec
                la somme supplémentaire de 100% pour réparation de dommage.
            </Text>
        </View>
    </View>

    </View>

    {/*articles 11 */}
    <View>
        <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
            <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline', fontWeight:'bold'}}>
                <Text>Article 11</Text>
            </View>
            <View style={{fontSize:'9px', fontWeight:'bold'}}>
                <Text>: Clause résolutoire</Text>
            </View>
        </View>
        <View style={{fontSize:'9px',  marginBottom:'8px', lineHeight:1.4}}>
            <Text>
                Il est expressément convenu qu’en cas de paiement par chèque, le règlement ne sera considéré effectif qu’après l’encaissement du chèque. 
                Dans le cas où le chèque serait sans provision, la présente clause
                sera appliquée et le présent contrat deviendra nul de plein droit.
            </Text>
        </View>
    </View>

    {/*avant footer */}
    <View style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
        <View style={{fontSize:'9px', marginBottom:'25px'}}>
            <Text>Fait en trois exemplaires originaux</Text>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>
                A …………..……………………, le …………..............
            </Text>   
        </View>
    </View>

    {/*signature */}
    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'25px'}}>
        <View style={{fontSize:'9px', left:'15px'}}>
            <Text>Le Prestataire,</Text>
        </View>
        <View style={{fontSize:'9px', right:'15px'}}>
            <Text>Le Client,</Text>
        </View>
    </View>
    <View style={{top:'70px'}}>
        <View style={styles.horizontalLine}></View>
    </View>

    {/*footer */}
    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'90px'}}>
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
                            <Text>titan@ergon.mg</Text>
                            <Text>+261 34 61 791 42</Text>
                        </View>
                    </View>
                </View>
    </View>
  </Page>
</Document>
      );
}

export default ContratParticulier;
