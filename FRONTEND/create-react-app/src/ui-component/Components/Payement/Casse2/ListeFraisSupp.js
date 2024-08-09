import React from "react";

function ArticleCheckUp({fraisSupp}) {

  return (
        <table className="table" style={{width:"100%", marginTop:"10px"}}>
        <tbody>
            {fraisSupp.map((elem, index) => (
            <tr key={index}>
                <td style={{color:"red"}}>x</td>
                <td>{elem.motif}</td>
                <td>-</td>
                <td>{elem.montant} Ariary</td>
            </tr>
            ))}
        </tbody>
        </table>
  );
}

export default ArticleCheckUp;