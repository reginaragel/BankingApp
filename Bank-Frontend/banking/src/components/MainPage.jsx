import React, { useState } from 'react';

import './MainPage.css';
import Header from './Header';
import { assets } from '../assets/image';

const MainPage=()=>{

    const [isvisible,setIsVisible]=useState(false);

    return(
        <div>
            <Header/>
            
            <section className='main_section'>
                <div className='content_container'>
                    <div className='main_img'>
                        <img src={assets.piggy_icon} alt='piggy'/>
                    </div>
                    <div className='text_content'>
                        <p>Prosperity<br/> is a long game</p>
                        <span>Bank on the right <br/>Partner.</span>
                        <div>
                        <button onClick={setIsVisible}>Learn More</button>
                        </div>
                        {isvisible && (<p className='para'>
                        Choosing the right bank is essential for managing your finances effectively.<br/>
                         When selecting a bank, consider factors like account fees, interest rates,<br/>
                         and the range of services offered. <br/>
                         Look for a bank that provides easy access to online and mobile banking,<br/>
                          ensuring you can manage your money conveniently.<br/>
                        Customer service and ATM availability are also important for smooth day-to-day<br/>
                         transactions. Additionally, ensure the bank <br/>
                        offers secure, low-cost options for savings and checking accounts, along with loan<br/>
                         and investment products.<br/>
                        Comparing different banks based on your financial needs will help you make an informed decision.</p>)}
                        
                    </div>
                </div>
            </section>
            {/* <section className="About">
                <div className="abt-us">
                    <p>About Us</p>
                </div>
                <div className="abt_content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quaerat perspiciatis officiis error molestias hic saepe doloribus impedit nesciunt unde modi sequi magnam atque, asperiores similique quisquam maxime repellendus nihil.</p>
                </div>

            </section> */}
        </div>
    )
}
export default MainPage