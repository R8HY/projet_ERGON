import { Page, Document, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import logo1 from '../../../../Components/assets/LOGO-HD_HAHITANTSOA.png'
import logo2 from '../../../../Components/assets/LOGO-HD_ERGON.png'
import logo3 from '../../../../Components/assets/LOGO-HD-background_ERGON.png'
import React, {useState, useEffect} from 'react';

const getCheckboxSymbol = (isChecked) => (isChecked ? '☑' : '☐');

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
    
    
const ContratHahitantsoa = ({idClient}) => {
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
                        <Image src={logo2} alt="logo" style={{width:'120px', height:'100px'}}/> 
                    </View>
                    <View style={{marginLeft:'30px'}}>
                        <Text style={styles.text1}>ergon@ergon.mg</Text>
                        <Text style={styles.text1}>+261 34 61 791 41</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Image src={logo1} alt="logo" style={{width:'130px', height:'100px'}}/> 
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
                    <Text>CONTRAT DE LOCATION « HAHITANTSOA »</Text>
                </View>
            </View>

            {/* les soussignes */}
            <View style={{marginTop:'20px', width:'100%'}}>
                <View style={{fontSize:'9px', marginBottom:'10px'}}>
                    <Text>Entre les soussignés :</Text>
                </View>
                <View style={{fontSize:'9px', lineHeight: 1.5}}>
                    <Text>
                    La société ERGON GROUP dont le siège social 
                    se situe au Lot P93M Sud Ambohipo Alasora Antananarivo,
                     représentée par …………………………………………………………………………………………………….. en sa qualité de ……………………………….
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

            {/* la societe */}
            <View style={{marginTop:'10px', width:'100%'}}>
                <View style={{fontSize:'9px', lineHeight: 1.5}}>
                    <Text>
                        La société …………………………………………… domiciliée ………………………………………………
                    </Text>
                </View>
                <View style={{fontSize:'9px', lineHeight: 1.5}}>
                    <Text>
                        NIF : ………………………………………….
                    </Text>
                </View>
                <View style={{fontSize:'9px', lineHeight: 1.5}}>
                    <Text>
                        STAT : ………………………………………….
                    </Text>
                </View>
                <View style={{fontSize:'9px', lineHeight: 1.5}}>
                    <Text>
                        RCS : ………………………………………….
                    </Text>
                </View>
                <View style={{fontSize:'9px', lineHeight: 1.5}}>
                    <Text>
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
                <View style={{fontSize:'9px', marginBottom:'10px', lineHeight:1.5}}>
                    <Text>
                        Le présent contrat est conclu entre les Parties
                        en vue de la location du domaine Hahitantsoa, 
                        un lieu de réception situé au Lot P93M Sud Ambohipo Alasora Antananarivo comprenant :
                    </Text>
                </View>
               
                <View style={{marginLeft:'10px'}}>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-     Une salle de réception de 600 m2 ;</Text>
                    </View>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-     Huit toilettes attenantes ;</Text>
                    </View>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-     Une cuisine équipée de réfrigérateur et congélateur ;</Text>
                    </View>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-     Un parking intérieur et extérieur sécurisé (50 places) ;</Text>
                    </View>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-     Un salon avec salle d’eau pour les mariés ;</Text>
                    </View>
                    <View style={{fontSize:'9px', marginBottom:'5px'}}>
                        <Text>-     Un espace vert.</Text>
                    </View>
                </View>
                <View style={{fontSize:'9px', marginBottom:'20px', left:'20px', top:'10px'}}>
                    <Text>Ci-après désignés les « Lieux Loués ».</Text>
                </View>
                <View style={{fontSize:'9px', marginBottom:'5px', lineHeight: 1.5}}>
                    <Text>Le client déclare parfaitement connaitre les Lieux loués 
                        pour les avoir visités et examinés en vue des présentes, 
                        sans qu’il soit nécessaire d’en faire plus ample désignation et déclare les accepter dans l’état où ils se trouvent tels qu’ils existent, s’entendent et comportent avec leurs dépendances.
                    </Text>
                </View>

                <View style={{top:'25px'}}>
                    <View style={styles.horizontalLine}></View>
                </View>
                
            </View>

            {/*footer */}
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'55px'}}>
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

  {/*2 eme page */}
  <Page size="A4" style={styles.page}>
    <Image src={logo3} style={styles.backgroundImage} />

     {/*logo d'entete */}
     <View style={{display:'flex', alignItems:'center', top:'-10px'}}>
        <View>
            <Image src={logo1} alt="logo" style={{width:'90px', height:'75px'}}/> 
        </View>
    </View>

    {/*article 2 */}
    <View style={{display:'flex', flexDirection:'row', marginTop:'5px',marginBottom:'5px'}}>
        <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
            <Text>Article 2</Text>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>: Destination</Text>
        </View>
    </View>
    <View>
        <View style={{fontSize:'9px', lineHeight:1.4}}>
            <Text>
                Le lieu de réception loué est destiné à accueillir les évènements suivants :
                 mariages, anniversaires, réceptions privées, séminaires.
            </Text>
        </View>
        <View style={{fontSize:'9px', lineHeight:1.4}}>
            <Text>
                Toute autre activité en sus non mentionné doit faire l’objet d’une annexe à titre d’avenant conclu entre les parties.
            </Text>
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
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                La présente location est consentie et acceptée du ………..…….………….... à ……. heures au ………….……..….. à …….. heures.
            </Text>
        </View>
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                Les prestataires peuvent accéder aux locaux la veille : 15 heures 30 si aucune 
                réception n’a lieu sur les lieux, à 22 heures dans le cas contraire.
            </Text>
        </View>
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                Toute rallonge sur les heures convenues feront l’objet de facturation en sus suivant la grille du prestataire.
            </Text>
        </View>
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                L’heure de fin comprend les heures de démantèlement et reprise des lieux loués par le Prestataire.
            </Text>
        </View>
    </View>

    {/*article 4 */}
    <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
        <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
            <Text>Article 4</Text>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>: Tarifs</Text>
        </View>
    </View>

    <View>
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                La présente location est consentie et acceptée moyennant le prix de …………………………………. Ariary TTC.
            </Text>
        </View>
        <View style={{left:'20px'}}>
            <View style={{fontSize:'9px', marginBottom:'5px'}}>
                <Text>
                    Type de location : ……………………………….. / Proforma N° : …………
                </Text>
            </View>
            <View style={{fontSize:'9px', marginBottom:'5px'}}>
                <Text>
                    Nombre de convives : ..........................
                </Text>
            </View>
            <View style={{fontSize:'9px', marginBottom:'5px'}}>
                <Text>
                    Assiettes : ..........................
                </Text>
            </View>
            <View style={{fontSize:'9px', marginBottom:'5px'}}>
                <Text>
                    Coussin : ..........................
                </Text>
            </View>

              {/*les checkbox */}
            <View>
                <View style={{fontSize:'9px', marginBottom:'8px'}}>
                    <Text>
                        {/* Nombre de convives : {getCheckboxSymbol(data.convives === 'checked')} ... */}
                        Utilisation de nuit
                    </Text>
                </View>

                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <View>
                        <View style={{fontSize:'9px', marginBottom:'5px'}}>
                            <Text>
                                {/* Nombre de convives : {getCheckboxSymbol(data.convives === 'checked')} ... */}
                                Carrelage
                            </Text>
                        </View>
                        <View style={{fontSize:'9px', marginBottom:'5px'}}>
                            <Text>
                                {/* Nombre de convives : {getCheckboxSymbol(data.convives === 'checked')} ... */}
                                Gazon synthétique
                            </Text>
                        </View>
                    </View>

                    <View style={{right:'50px'}}>
                        <View style={{fontSize:'9px', marginBottom:'5px'}}>
                                <Text>
                                    {/* Nombre de convives : {getCheckboxSymbol(data.convives === 'checked')} ... */}
                                    Voilage
                                </Text>
                            </View>
                            <View style={{fontSize:'9px', marginBottom:'5px'}}>
                                <Text>
                                    {/* Nombre de convives : {getCheckboxSymbol(data.convives === 'checked')} ... */}
                                    Rideau
                                </Text>
                            </View>
                    </View>
                </View>
                

                <View style={{fontSize:'9px', marginBottom:'8px'}}>
                    <Text>
                        Nombre de convives : {getCheckboxSymbol(client.nom === client.nom)} ...
                        Effets spéciaux
                    </Text>
                </View>
                <View style={{fontSize:'9px', marginBottom:'5px'}}>
                    <Text>
                        {/* Nombre de convives : {getCheckboxSymbol(data.convives === 'checked')} ... */}
                        Ciel étoilé
                    </Text>
                </View>
                <View style={{fontSize:'9px', marginBottom:'5px'}}>
                    <Text>
                        {/* Nombre de convives : {getCheckboxSymbol(data.convives === 'checked')} ... */}
                        Piste lumineuse
                    </Text>
                </View>
                <View style={{fontSize:'9px', marginBottom:'5px'}}>
                    <Text>
                        {/* Nombre de convives : {getCheckboxSymbol(data.convives === 'checked')} ... */}
                        Décoration
                    </Text>
                </View>
                
            </View>
        </View>
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                Une facture sera établie après la réception de la totalité du règlement. 
                Un reçu sera établi lors de la réception des fonds pour acompte.
            </Text>
        </View>
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                Le ménage du lieu de réception est compris dans le prix.
            </Text>
        </View>
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                Dans le cas où le client n’aurait pas quitté les Lieux loués aux date et heure indiquées à l’article 3,
                le Client devra payer la somme supplémentaire de 500 000,00 Ariary TTC pour occupation des Lieux Loués sans autorisation.
            </Text>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>
                Pour les utilisations de nuit, l’heure d’occupation ne devant pas excéder 5h du matin.
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
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                La présente location est consentie et acceptée moyennant le versement d’un acompte de :
            </Text>
        </View>
        <View style={{left:'20px'}}>
            <View style={{fontSize:'9px', marginBottom:'5px'}}>
                <Text>
                    -   1 000 000,00 Ariary dans le cas d’une location séparée ;
                </Text>
            </View>
            <View style={{fontSize:'9px', marginBottom:'5px'}}>
                <Text>
                    -   1 500 000,00 Ariary dans le cas d’un package.
                </Text>
            </View>
        </View>

        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                Celui-ci devra être réglé le jour de la réservation de la salle, soit à la signature par le 
                Client du présent contrat. Le client s’engage à verser le solde du montant de la location en deux tranches :
            </Text>
        </View>
        <View style={{left:'20px'}}>
            <View style={{fontSize:'9px', marginBottom:'5px'}}>
                <Text>
                    -   La première tranche 1 mois avant l’évènement au plus tard ;
                </Text>
            </View>
            <View style={{fontSize:'9px', marginBottom:'5px'}}>
                <Text>
                    -   La deuxième tranche 10 jours avant l’évènement.
                </Text>
            </View>
        </View>
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                Un droit de logistique moyennant le prix de 300 000,00 Ariary TTC sera 
                versé lors du règlement du solde pour le cas d’une location séparée.
            </Text>
        </View>
        <View style={{fontSize:'9px', marginBottom:'5px'}}>
            <Text>
                Un droit d’effets spéciaux de 100 000,00 Ariary TTC sera également
                versé dans le cas où le client fait appel à un autre prestataire.
            </Text>
        </View>

            <View style={{top:'10px'}}>
                    <View style={styles.horizontalLine}></View>
            </View>
             {/*footer */}
             <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'20px'}}>
                <View style={{display:'flex', flexDirection:'column', width:'50%', justifyContent:'flex-end', alignItems:'flex-end', fontSize:'9px', marginRight:'15px'}}>
                    <View>
                        <View style={{opacity:0.5, alignItems:'flex-end', marginTop:'5px'}}>
                            <Text>Ergon Group SARL</Text>
                            <Text>Lot P93M Ambohipo Sud Alasora Bypass</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{fontWeight:'bold', marginTop:'10px'}}>
                            <Text>hahitantsoa@ergon.mg</Text>
                            <Text>+261 34 61 791 44</Text>
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
  </Page>

  {/*3 eme page */}
  <Page size="A4" style={styles.page}>
    <Image src={logo3} style={styles.backgroundImage} />

        {/*logo d'entete */}
        <View style={{display:'flex', alignItems:'center', top:'-10px'}}>
        <View>
            <Image src={logo1} alt="logo" style={{width:'90px', height:'75px'}}/> 
        </View>
        </View>

        <View style={{top:'10px'}}>
            <View style={{fontSize:'9px', lineHeight:1.4}}>
                <Text>
                    En cas de force majeur, les deux parties se rapprochent pour évaluer les éventuels remboursements sans engagement de part et d’autres.
                    Dans le cas où le Prestataire ne pourrait respecter ses engagements pour cas de force majeure, il se réserve le droit d’annuler la réservation et 
                    de rembourser intégralement au Client les sommes qu’il a versées.
                </Text>             
            </View>
        </View>

        {/*article 11 */}
        <View style={{display:'flex', flexDirection:'row', marginTop:'20px',marginBottom:'10px'}}>
            <View style={{fontSize:'9px', fontWeight:'bold' , marginBottom:'5px', textDecoration:'underline'}}>
                <Text>Article 11</Text>
            </View>
            <View style={{fontSize:'9px'}}>
                <Text>: Sécurité incendie</Text>
            </View>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>
                Le Client déclare avoir pris connaissance de la règlementation incendie relative 
                aux Lieux Loués et notamment du plan d’évacuation (Cf Annexe).
            </Text>
        </View>

          {/*article 12 */}
        <View style={{display:'flex', flexDirection:'row', marginTop:'20px',marginBottom:'10px'}}>
            <View style={{fontSize:'9px', fontWeight:'bold', marginBottom:'5px', textDecoration:'underline'}}>
                <Text>Article 12</Text>
            </View>
            <View style={{fontSize:'9px'}}>
                <Text>: Assurances</Text>
            </View>
        </View>
        <View style={{fontSize:'9px'}}>
            <View style={{fontSize:'9px', bottom:'5px'}}>
                <Text>
                    Le Client fera parvenir au Prestataire un justificatif de domicile (Facture d’abonnement électricité/eau).
                </Text>
            </View>
            <View style={{fontSize:'9px', bottom:'5px'}}>
                <Text>
                    Dans le cas où il y a des dégâts en plus sur les Lieux Loués, 
                    le Client s’engage à procéder aux réparations de ces derniers.
                </Text>
            </View>
        </View>

        {/*article 13 */}
        <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
        <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
            <Text>Article 13</Text>
        </View>
        <View style={{fontSize:'9px'}}>
            <Text>: Responsabilité</Text>
        </View>
        </View>
        <View style={{fontSize:'9px'}}>
            <View style={{fontSize:'9px', marginBottom:'8px'}}>
                <Text>
                    Le prestataire décline toute responsabilité d’un éventuel accident survenu lors des festivités et ne 
                    peut être tenu responsable des vols et dégradations sur les biens du Preneur ou de ses convives.
                </Text>
            </View>
            <View style={{fontSize:'9px', marginBottom:'8px'}}>
                <Text>
                    Il ne pourra pas non plus être tenu responsable des dommages
                    causés aux véhicules ou au matériel situés sur le parking.
                </Text>
            </View>
            <View style={{fontSize:'9px'}}>
                <Text>
                    Le Client est tenu d’assurer la sécurité des objets valeureux de ses convives. 
                    Le Prestataire décline toute responsabilité sur des objets valeureux non déclarés.
                </Text>
            </View>
        </View>

        {/*article 14 */}
        <View style={{display:'flex', flexDirection:'row', marginTop:'20px',marginBottom:'10px'}}>
            <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
                <Text>Article 14</Text>
            </View>
            <View style={{fontSize:'9px'}}>
                <Text>: Clause résolutoire</Text>
            </View>
        </View>
        <View style={{fontSize:'9px'}}>
            <View style={{fontSize:'9px', marginBottom:'8px', lineHeight:1.4}}>
                <Text>
                    Il est expressément convenu qu’en cas de paiement par chèque,
                    le règlement ne sera considéré effectif qu’après l’encaissement du chèque. 
                    Dans le cas où le chèque serait sans provision, la présente clause sera appliquée et le présent contrat deviendra nul de plein droit.
                </Text>
            </View>
            <View style={{fontSize:'9px', marginBottom:'8px'}}>
                <Text>
                    A défaut de production par le Client d’une attestation couvrant sa responsabilité civile dans les délais prévus à
                    l’article 13, il sera également fait application de la présente clause. Le présent contrat sera nul.
                </Text>
            </View>
        </View>

        {/*article 15 */}
        <View style={{display:'flex', flexDirection:'row', marginTop:'20px',marginBottom:'10px'}}>
            <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
                <Text>Article 15</Text>
            </View>
            <View style={{fontSize:'9px'}}>
                <Text>: Annexes</Text>
            </View>
        </View>

        <View style={{fontSize:'9px' , marginBottom:'8px'}}>
            <Text>
                Sont annexés au présent contrat :
            </Text>
        </View>

        <View style={{left:'20px', fontSize:'9px', lineHeight:1.4}}>
            <View>
                <Text>
                    Plan des locaux
                </Text>
            </View>
            <View>
                <Text>
                    Le cas échéant règlement intérieur
                </Text>
            </View>
            <View>
                <Text>
                    Plan d’évacuation incendie
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
                            <Text>hahitantsoa@ergon.mg</Text>
                            <Text>+261 34 61 791 44</Text>
                        </View>
                    </View>
                </View>
    </View>
  </Page>
  </Document>
        );
    }
    
export default ContratHahitantsoa;