// import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// import logo1 from '../../../icones/LOGO-HD_TITAN.png'
// import logo2 from '../../../icones/LOGO-HD_ERGON.png'
// // import logo3 from '../../../icones/LOGO-HD-background_ERGON.png'
// //import logo3 from '../../../../Components/assets/LOGO-HD-background_ERGON.png'
// import React, {useState, useEffect} from 'react';

// const styles = StyleSheet.create({
//   // Vos styles personnalisés ici
//   horizontalLine: {
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//     width: '100%',
//   },
//   page: {
//     paddingTop: 15, // Marge en haut
//     paddingBottom: 0, // Marge en bas
//     paddingLeft: 50, // Marge à gauche
//     paddingRight: 50, // Marge à droite
//   },
// });

// const Footer = () => (
//   <View style={styles.footer}>
//      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, display:'flex',alignContent:'flex-end'}}>
//         <View style={{top:'175px',}}>
//             <View style={styles.horizontalLine}></View>
//         </View>
//         <View style={{display:'flex', flexDirection:'row'}}>
//             <View style={{top:'175px', width:'50%', display:'flex', alignContent:'flex-end', textAlign:'right', right:'10px'}}>
//                 <View >
//                     <View style={{opacity:0.5, fontSize:'9px', top:'10px'}}>
//                         <Text>Ergon Group SARL</Text>
//                         <Text>Lot P93M Ambohipo Sud Alasora Bypass</Text>
//                     </View>
//                 </View>
//                 <View>
//                     <View style={{fontWeight:'bold', fontSize:'9px', top:'20px'}}>
//                         <Text>ergon@ergon.mg</Text>
//                         <Text>+261 34 61 791 41</Text>
//                     </View>
//                 </View>
//             </View>

//             <View style={{top:'175px', width:'50%', display:'flex', alignContent:'flex-start', textAlign:'left', left:'10px'}}>
//                 <View>
//                     <View style={{opacity:0.5, fontSize:'9px', top:'10px'}}>
//                         <Text>NIF: 6003298589</Text>
//                         <Text>STAT: 77290 11 2019 010 215</Text>
//                     </View>
//                 </View>
//                 <View>
//                     <View style={{fontWeight:'bold', fontSize:'9px', top:'20px'}}>
//                         <Text>ergon@ergon.mg</Text>
//                         <Text>+261 34 61 791 41</Text>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     </View>
//   </View>
// );

// const ContratTitan2 = ({ id_panier }) => {
//     const [articleData, setArticleData] = useState([]);

//        useEffect(() => {
//          const apiUrl = `http://127.0.0.1:8000/store/Panier/${id_panier}/article_panier/`;
    
//          fetch(apiUrl)
//            .then((response) => {
//              if (!response.ok) {
//                throw new Error('Network response was not ok');
//              }
//              return response.json();
//            })
//            .then((data) => {
//              setArticleData(data);
//              console.log('Les donnees des articles sont bien récupérer');
//              console.log(id_panier)
//            })
//            .catch((error) => {
//              console.error('Error fetching data (articles):', error, 'noob');
//            });
//        }, [id_panier]);

//   const maxItemsPerPage = 10; // Nombre maximal d'éléments par page (à titre d'exemple)

//   const pages = [];
//   for (let i = 0; i < articleData.length; i += maxItemsPerPage) {
//     const tailleArticle = articleData.slice(i, i + maxItemsPerPage);
//     pages.push(
//       <Page key={i} size="A4" style={styles.page}>
//         <View>
//             {/* les logo d'entete */}
//             <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'25px'}}>
//                 <View>
//                     <View>
//                         <Image src={logo2} alt="logo" style={{width:'110px', height:'100px'}}/> 
//                     </View>
//                     <View style={{marginLeft:'30px'}}>
//                         <Text style={{fontSize:'10px'}}>ergon@ergon.mg</Text>
//                         <Text style={{fontSize:'10px'}}>+261 34 61 791 41</Text>
//                     </View>
//                 </View>
//                 <View>
//                     <View>
//                         <Image src={logo1} alt="logo" style={{width:'110px', height:'100px'}}/> 
//                     </View>
//                     <View style={{marginLeft:'20px'}}>
//                         <Text style={{fontSize:'10px'}}>titan@ergon.mg</Text>
//                         <Text style={{fontSize:'10px'}}>+261 34 61 791 42</Text>
//                     </View>
//                 </View>
//             </View>

//             {/* le titre */}

//             <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
//                 <View style={{fontSize:13, fontWeight:'bold'}}>
//                     <Text>CONTRAT DE LOCATION DE MATERIELS EVENEMENTIELS</Text>
//                 </View>
//                 <View style={{fontSize:13, fontWeight:'bold', marginTop:'10px'}}>
//                     <Text>« TITAN RENTAL »</Text>
//                 </View>
//             </View>

//             {/* les soussignes */}
//             <View style={{marginTop:'20px', width:'100%'}}>
//                 <View style={{fontSize:'9px', marginBottom:'10px'}}>
//                     <Text>Entre les soussignés :</Text>
//                 </View>
//             </View>

//             {/* les parties*/}
//             <View>
//                 <View style={{fontSize:'9px', marginBottom:'10px'}}>
//                     <Text>Le Client et le Prestataire étant dénommés ci-après les « Parties »</Text>
//                 </View>
//                 <View style={{fontSize:'9px', marginBottom:'10px'}}>
//                     <Text>IL A ETE CONVENU CE QUI SUIT :</Text>
//                 </View>
//                 <View style={{display:'flex', flexDirection:'row', marginBottom:'10px'}}>
//                     <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
//                         <Text>Article 1</Text>
//                     </View>
//                     <View style={{fontSize:'9px'}}>
//                         <Text>: Objet du contrat</Text>
//                     </View>
//                 </View>
//                 <View style={{fontSize:'9px', marginBottom:'10px'}}>
//                     <Text>Le présent contrat est conclu entre les Parties en vue de la location de matériels évènementiels comprenant :</Text>
//                 </View>
               
//                 <View style={{marginLeft:'10px', fontSize:'9px', bottom:'8px', lineHeight:1.2}}>
//                     {tailleArticle.map((item, index) => (
//                         // Générer dynamiquement votre contenu en fonction des éléments de la liste
//                         <Text key={index}>{item.nomP}</Text>
//                     ))}
//                 </View>
                
//             </View>
//         </View>
//         <Footer />
//       </Page>
//     );
//   }

//   return (
//     <Document>
//       {pages}
//     </Document>
//   );
// }

// export default ContratTitan2;

// // import React from 'react';
// // import {Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// // // Définir la taille maximale de contenu par page
// // const maxContentPerPage = 500; // Valeur arbitraire à ajuster en fonction de la taille de votre contenu

// // const styles = StyleSheet.create({
// //   page: {
// //     flexDirection: 'column',
// //     padding: 10,
// //   },
// //   text: {
// //     fontSize: 12,
// //     marginBottom: 10,
// //   },
// // });

// // const ContratTitan2 = ({ content }) => {
// //   const contentPages = [];

// //   let currentPage = [];
// //   let currentPageContent = 0;

// //   content.forEach((item) => {
// //     // Calculer la taille de l'élément (cette valeur doit être adaptée à votre contenu réel)
// //     const itemSize = item.length;

// //     // Vérifier si l'élément dépasse la taille maximale par page
// //     if (currentPageContent + itemSize > maxContentPerPage) {
// //       contentPages.push(currentPage); // Ajouter la page actuelle
// //       currentPage = []; // Commencer une nouvelle page
// //       currentPageContent = 0; // Réinitialiser la taille de la nouvelle page
// //     }

// //     currentPage.push(item); // Ajouter l'élément à la page
// //     currentPageContent += itemSize; // Ajouter la taille de l'élément à la taille de la page
// //   });

// //   if (currentPage.length > 0) {
// //     contentPages.push(currentPage); // Ajouter la dernière page
// //   }

// //   return (
// //       <Document>
// //         {contentPages.map((pageContent, index) => (
// //           <Page key={index} size="A4" style={styles.page}>
// //             <View>
// //               {pageContent.map((item, itemIndex) => (
// //                 <Text key={itemIndex} style={styles.text}>
// //                   {item}
// //                 </Text>
// //               ))}
// //             </View>
// //           </Page>
// //         ))}
// //       </Document>
// //   );
// // };

// // // Exemple d'utilisation :
// // const App = () => {
// //   const dummyContent = [
// //     "Contenu 1...",
// //     "Contenu 2...",
// //     // ... Ajouter le contenu à afficher dans le PDF
// //   ];

// //   return <PDFDocument content={dummyContent} />;
// // };

// // export default ContratTitan2;


// import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// import logo1 from '../../../icones/LOGO-HD_TITAN.png'
// import logo2 from '../../../icones/LOGO-HD_ERGON.png'
// // // import logo3 from '../../../icones/LOGO-HD-background_ERGON.png'
// //import logo3 from '../../../../Components/assets/LOGO-HD-background_ERGON.png'
// import React, {useState, useEffect} from 'react';

// const styles = StyleSheet.create({
//   // Vos styles personnalisés ici
//   horizontalLine: {
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//     width: '100%',
//   },
//   page: {
//     paddingTop: 15, // Marge en haut
//     paddingBottom: 0, // Marge en bas
//     paddingLeft: 50, // Marge à gauche
//     paddingRight: 50, // Marge à droite
//   },
// });

// const Entete_newPage = () => (
//     <View style={{display:'flex', alignItems:'center'}}>
//         <View>
//             <Image src={logo1} alt="logo" style={{width:'85px', height:'75px'}}/> 
//         </View>
//     </View>
//   );
// // Fonction pour le footer
// const Footer = () => (
//   <View style={styles.footer}>
//      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, display:'flex',alignContent:'flex-end'}}>
//         <View style={{top:'175px',}}>
//             <View style={styles.horizontalLine}></View>
//         </View>
//         <View style={{display:'flex', flexDirection:'row'}}>
//             <View style={{top:'175px', width:'50%', display:'flex', alignContent:'flex-end', textAlign:'right', right:'10px'}}>
//                 <View >
//                     <View style={{opacity:0.5, fontSize:'9px', top:'10px'}}>
//                         <Text>Ergon Group SARL</Text>
//                         <Text>Lot P93M Ambohipo Sud Alasora Bypass</Text>
//                     </View>
//                 </View>
//                 <View>
//                     <View style={{fontWeight:'bold', fontSize:'9px', top:'20px'}}>
//                         <Text>ergon@ergon.mg</Text>
//                         <Text>+261 34 61 791 41</Text>
//                     </View>
//                 </View>
//             </View>

//             <View style={{top:'175px', width:'50%', display:'flex', alignContent:'flex-start', textAlign:'left', left:'10px'}}>
//                 <View>
//                     <View style={{opacity:0.5, fontSize:'9px', top:'10px'}}>
//                         <Text>NIF: 6003298589</Text>
//                         <Text>STAT: 77290 11 2019 010 215</Text>
//                     </View>
//                 </View>
//                 <View>
//                     <View style={{fontWeight:'bold', fontSize:'9px', top:'20px'}}>
//                         <Text>ergon@ergon.mg</Text>
//                         <Text>+261 34 61 791 41</Text>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     </View>
//   </View>
// );

// const ContratTitan2 = ({ id_panier }) => {
//     const [articleData, setArticleData] = useState([]);

//        useEffect(() => {
//          const apiUrl = `http://127.0.0.1:8000/store/Panier/${id_panier}/article_panier/`;
    
//          fetch(apiUrl)
//            .then((response) => {
//              if (!response.ok) {
//                throw new Error('Network response was not ok');
//              }
//              return response.json();
//            })
//            .then((data) => {
//              setArticleData(data);
//              console.log('Les donnees des articles sont bien récupérer');
//              console.log(id_panier)
//            })
//            .catch((error) => {
//              console.error('Error fetching data (articles):', error, 'noob');
//            });
//        }, [id_panier]);

//   const content = '3508px';
//   const maxItemsPerPage = content; // Nombre maximal d'éléments par page (à titre d'exemple)

//   const pages = [];
//   for (let i = 0; i < content.length; i += maxItemsPerPage) {
//     pages.push(
//       <Page key={i} size="A4" style={styles.page}>
//         <View>
//             {/* les logo d'entete */}
//             <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'25px'}}>
//                 <View>
//                     <View>
//                         <Image src={logo2} alt="logo" style={{width:'110px', height:'100px'}}/> 
//                     </View>
//                     <View style={{marginLeft:'30px'}}>
//                         <Text style={{fontSize:'10px'}}>ergon@ergon.mg</Text>
//                         <Text style={{fontSize:'10px'}}>+261 34 61 791 41</Text>
//                     </View>
//                 </View>
//                 <View>
//                     <View>
//                         <Image src={logo1} alt="logo" style={{width:'110px', height:'100px'}}/> 
//                     </View>
//                     <View style={{marginLeft:'20px'}}>
//                         <Text style={{fontSize:'10px'}}>titan@ergon.mg</Text>
//                         <Text style={{fontSize:'10px'}}>+261 34 61 791 42</Text>
//                     </View>
//                 </View>
//             </View>

//             {/* le titre */}

//             <View style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
//                 <View style={{fontSize:13, fontWeight:'bold'}}>
//                     <Text>CONTRAT DE LOCATION DE MATERIELS EVENEMENTIELS</Text>
//                 </View>
//                 <View style={{fontSize:13, fontWeight:'bold', marginTop:'10px'}}>
//                     <Text>« TITAN RENTAL »</Text>
//                 </View>
//             </View>

//             {/* les soussignes */}
//             <View style={{marginTop:'20px', width:'100%'}}>
//                 <View style={{fontSize:'9px', marginBottom:'10px'}}>
//                     <Text>Entre les soussignés :</Text>
//                 </View>
//                 <View style={{fontSize:'9px', lineHeight: 1.5}}>
//                     <Text>
//                         La société ERGON GROUP, dont le siège social se situe au Lot P93M 
//                         Sud Ambohipo Alasora Antananarivo 10301, 
//                         représentée par
//                         en sa qualité de ……………………………………..
//                     </Text>
//                 </View>
//             </View>

//             {/*le prestataire */}
//             <View style={{display:'flex', alignItems:'flex-end' ,marginTop:'10px'}}>
//                 <View style={{fontSize:'9px', marginBottom:'5px'}}>
//                     <Text>Ci-après dénommée « Le prestataire »</Text>
//                 </View>
//                 <View style={{fontWeight:'bold', textDecoration:'underline', fontSize:'10px'}}>
//                     <Text>D’UNE PART,</Text>
//                 </View>
//             </View>

//             {/* la societe */}
//             <View style={{marginTop:'10px', width:'100%'}}>
//                 <View style={{fontSize:'9px', lineHeight: 1.5}}>
//                     <Text>
//                         La société  domiciliée 
//                     </Text>
//                 </View>
//                 <View style={{fontSize:'9px', lineHeight: 1.5}}>
//                     <Text>
//                         NIF :
//                     </Text>
//                 </View>
//                 <View style={{fontSize:'9px', lineHeight: 1.5}}>
//                     <Text>
//                         STAT : 
//                     </Text>
//                 </View>
//                 <View style={{fontSize:'9px', lineHeight: 1.5}}>
//                     <Text>
//                         RCS : ………………………………………….
//                     </Text>
//                 </View>
                   
//             </View>

//             {/*le client */}
//             <View style={{display:'flex', alignItems:'flex-end' ,marginTop:'10px'}}>
//                 <View style={{fontSize:'9px', marginBottom:'5px'}}>
//                     <Text>Ci-après dénommée « Le client »</Text>
//                 </View>
//                 <View style={{fontWeight:'bold', textDecoration:'underline', fontSize:'10px', marginBottom:'10px'}}>
//                     <Text>D’AUTRE PART,</Text>
//                 </View>
//             </View>

//             {/* les parties*/}
//             <View>
//                 <View style={{fontSize:'9px', marginBottom:'10px'}}>
//                     <Text>Le Client et le Prestataire étant dénommés ci-après les « Parties »</Text>
//                 </View>
//                 <View style={{fontSize:'9px', marginBottom:'10px'}}>
//                     <Text>IL A ETE CONVENU CE QUI SUIT :</Text>
//                 </View>
//                 <View style={{display:'flex', flexDirection:'row', marginBottom:'10px'}}>
//                     <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
//                         <Text>Article 1</Text>
//                     </View>
//                     <View style={{fontSize:'9px'}}>
//                         <Text>: Objet du contrat</Text>
//                     </View>
//                 </View>
//                 <View style={{fontSize:'9px', marginBottom:'10px'}}>
//                     <Text>Le présent contrat est conclu entre les Parties en vue de la location de matériels évènementiels comprenant :</Text>
//                 </View>
               
//                 <View style={{marginLeft:'10px', fontSize:'9px', bottom:'8px', lineHeight:1.2}}>
//                     {articleData.map((item, index) => (
//                         // Générer dynamiquement votre contenu en fonction des éléments de la liste
//                         <Text key={index}>{item.nomP}</Text>
//                     ))}
                    
//                 </View>
                
//                 <View style={{fontSize:'9px', marginBottom:'10px'}}>
//                     <Text>Ci-après désignés les « Matériels Loués ».</Text>
//                 </View>
//                 <View style={{fontSize:'9px', marginBottom:'5px', lineHeight: 1.5}}>
//                     <Text>Le client déclare parfaitement connaitre les Matériels loués pour les avoir examinés en 
//                         vue des présentes, sans qu’il soit nécessaire d’en faire plus ample désignation et déclare les accepter dans l’état 
//                         où ils se trouvent tels qu’ils existent.
//                     </Text>
//                 </View>
//                 <View style={{display:'flex', flexDirection:'row', marginBottom:'5px'}}>
//                     <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
//                         <Text>Article 2</Text>
//                     </View>
//                     <View style={{fontSize:'9px'}}>
//                         <Text>: Destination</Text>
//                     </View>
//                 </View>
                
//             </View>
//         </View>
//         <Footer />
//            {/*logo d'entete */}
//     <Entete_newPage/>

// <View>
//         <View style={{fontSize:'9px', marginBottom:'5px', marginTop:'10px'}}>
//             <Text>Les matériels loués sont destinés à usage dans le cadre des évènements 
//                 suivants : mariages, anniversaires, réceptions privées, séminaires.
//             </Text>
//         </View>
//         <View style={{fontSize:'9px', marginBottom:'2px'}}>
//             <Text>Toute autre activité en sus non mentionné doit faire l’objet d’une annexe à titre d’avenant conclu entre les parties.</Text>
//         </View>
//         <View style={{fontSize:'9px'}}>
//             <Text>Le lieu de destination devant être mentionnée par le Client.</Text>
//         </View>
//     </View>

//     {/*article 3 */}
//     <View style={{display:'flex', flexDirection:'row', marginTop:'10px',marginBottom:'10px'}}>
//         <View style={{fontSize:'9px', marginBottom:'5px', textDecoration:'underline'}}>
//             <Text>Article 3</Text>
//         </View>
//         <View style={{fontSize:'9px'}}>
//             <Text>: Durée</Text>
//         </View>
//     </View>
//     <View>
//         <View style={{fontSize:'9px', marginBottom:'8px'}}>
//             <Text>La présente location est consentie et acceptée du …………..…..…. à …... heures au ………….…… à …... heures.</Text>
//         </View>
//         <View style={{fontSize:'9px', lineHeight:1.4}}>
//             <Text>
//                 Il sera alors convenu un prélèvement des matériels du ………….………à ...... heures, pour une restitution au ……………….……. à …... heures. 
//             </Text>
//         </View>
//     </View>

//     <Footer/>
//       </Page>
//     );
//   }

//   return (
//     <Document>
//       {pages}
//     </Document>
//   );
// }

// export default ContratTitan2;

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
 import logo1 from '../../../icones/LOGO-HD_TITAN.png'
 import logo2 from '../../../icones/LOGO-HD_ERGON.png'

const ContratTitan2 = () => {
  const styles = StyleSheet.create({
    horizontalLine: {
             borderBottomColor: 'black',
             borderBottomWidth: 1,
             width: '100%',
           },
           page: {
             paddingTop: 15,  
             paddingBottom: 0, 
             paddingLeft: 50,  
             paddingRight: 50,  
           },
  });

//   const generateContent = () => {
//     const content = [];
//     const linesPerPage = 1;

//     for (let i = 1; i <= linesPerPage; i++) {
//     //   const lineNumber = (pageNumber - 1) * linesPerPage + i;
//       content.push(
       
        
//       );
//     }

//     return content;
//   };

const Footer = () => (
      <View style={styles.footer}>
         <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, display:'flex',alignContent:'flex-end'}}>
            <View style={{top:'150px',}}>
                <View style={styles.horizontalLine}></View>
            </View>
            <View style={{display:'flex', flexDirection:'row'}}>
                <View style={{top:'150px', width:'50%', display:'flex', alignContent:'flex-end', textAlign:'right', right:'10px'}}>
                    <View >
                        <View style={{opacity:0.5, fontSize:'9px', top:'10px'}}>
                            <Text>Ergon Group SARL</Text>
                            <Text>Lot P93M Ambohipo Sud Alasora Bypass</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{fontWeight:'bold', fontSize:'9px', top:'20px'}}>
                            <Text>ergon@ergon.mg</Text>
                            <Text>+261 34 61 791 41</Text>
                        </View>
                    </View>
                </View>
    
                <View style={{top:'150px', width:'50%', display:'flex', alignContent:'flex-start', textAlign:'left', left:'10px'}}>
                    <View>
                        <View style={{opacity:0.5, fontSize:'9px', top:'10px'}}>
                            <Text>NIF: 6003298589</Text>
                            <Text>STAT: 77290 11 2019 010 215</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{fontWeight:'bold', fontSize:'9px', top:'20px'}}>
                            <Text>ergon@ergon.mg</Text>
                            <Text>+261 34 61 791 41</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
      </View>
    );

  const generatePages = () => {
    // const totalPages = 1; // Vous pouvez ajuster le nombre de pages selon vos besoins
    // const pages = [];
    const content = '3000px';
    const maxItemsPerPage = content; // Nombre maximal d'éléments par page (à titre d'exemple)
    
    const pages = [];
    for (let i = 0; i < content.length; i += maxItemsPerPage) {
      pages.push(
        <Page key={i} style={styles.page}>
           <View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:'25px'}}>
                <View>
                    <View>
                        <Image src={logo2} alt="logo" style={{width:'110px', height:'100px'}}/> 
                    </View>
                    <View style={{marginLeft:'30px'}}>
                        <Text style={{fontSize:'10px'}}>ergon@ergon.mg</Text>
                        <Text style={{fontSize:'10px'}}>+261 34 61 791 41</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Image src={logo1} alt="logo" style={{width:'110px', height:'100px'}}/> 
                    </View>
                    <View style={{marginLeft:'20px'}}>
                        <Text style={{fontSize:'10px'}}>titan@ergon.mg</Text>
                        <Text style={{fontSize:'10px'}}>+261 34 61 791 42</Text>
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
                         représentée par
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

            
             {/* la societe */}
             <View style={{marginTop:'10px', width:'100%'}}>
                 <View style={{fontSize:'9px', lineHeight: 1.5}}>
                     <Text>
                         La société  domiciliée 
                     </Text>
                 </View>
                 <View style={{fontSize:'9px', lineHeight: 1.5}}>
                     <Text>
                         NIF :
                     </Text>
                 </View>
                 <View style={{fontSize:'9px', lineHeight: 1.5}}>
                     <Text>
                         STAT : 
                     </Text>
                 </View>
                 <View style={{fontSize:'9px', lineHeight: 1.5}}>
                     <Text>
                         RCS : ………………………………………….
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
               
                <View style={{marginLeft:'10px', fontSize:'9px', bottom:'8px', lineHeight:1.2}}>
                    {/* {articleData.map((item, index) => (
                        //Générer dynamiquement votre contenu en fonction des éléments de la liste
                        <Text key={index}>{item.nomP}</Text>
                    ))} */}
                    <Text>-</Text>
                    <Text>-</Text>
                    <Text>-</Text>
                    <Text>-</Text>
                    <Text>-</Text>
                    <Text>-</Text>
                    <Text>-</Text>
                    <Text>-</Text>
                    <Text>-</Text>
                    <Text>-</Text>
                    
                </View>
                
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
                
            </View>
            <Footer/>
        <View>
            <View style={{fontSize:'9px', marginBottom:'5px', marginTop:'10px'}}>
                <Text>Les matériels loués sont destinés à usage dans le cadre des évènements 
                    suivants : mariages, anniversaires, réceptions privées, séminaires.
                </Text>
            </View>
            <View style={{fontSize:'9px', marginBottom:'2px'}}>
                <Text>Toute autre activité en sus non mentionné doit faire l’objet d’une annexe à titre d’avenant conclu entre les parties.</Text>
            </View>
            <View style={{fontSize:'9px'}}>
                <Text>Le lieu de destination devant être mentionnée par le Client.</Text>
            </View>
        </View>    
    </View>
        </Page>
      );
    }

    return pages;
  };

  return (
    <Document>
      {generatePages()}
    </Document>
  );
};

export default ContratTitan2;
