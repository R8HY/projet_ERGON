import React, { useEffect } from "react";
import AccountCard from "../dashboardmain/Default/ItemAccount";
import SelectedAccountCard from "../dashboardmain/Default/SelectedItemAccount";
import AOS from 'aos';
import 'aos/dist/aos.css'
import Delete from '@mui/icons-material/Delete';
import Modify from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

function ListeGuest({isLoading, accounts, selectedData, setSelectedData}) {
  
  const HandleClickAccount = (account) => {
    setSelectedData(account);
  }

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <div style={{display:"flex", flexDirection:"column", width:"100%", paddingTop:"20px"}}>
          {accounts.map((item, index) => (
            <div data-aos="zoom-in" key={index} style={{margin:"10px 10px 10px 10px"}}>
              {
                selectedData && item.id===selectedData.id?
                (
                  <div style={{display:"flex", flexDirection:"row"}}>
                    <div style= {{width:"80%"}}>
                      <SelectedAccountCard isLoading={isLoading} account={item}></SelectedAccountCard>
                    </div>
                    <div style= {{marginLeft:"2%", display:"flex", flexDirection:"row", width:"30%"}}>
                      <Button className="btnAccount">
                        <Modify style= {{color:"primary", fontSize:"25px", marginBottom:"5%"}}></Modify>
                      </Button>
                      <Button className="btnAccount">
                        <Delete style= {{color:"red", fontSize:"26px", marginTop:"5%"}}></Delete>
                      </Button>
                    </div>
                  </div>
                ):
                <AccountCard onclickaccount={HandleClickAccount} isLoading={isLoading} account={item}></AccountCard>
                
              }
            </div> 
          ))}
    </div>
  );
}

export default ListeGuest;