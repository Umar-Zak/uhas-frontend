import React from 'react'
import briefCase from "../assets/brief-case.svg"
import Idea from "../assets/Idea.svg"
import Lines from "../assets/lines.svg"
const HomePage = () => {
    const announcements = [
        {
            tag:"1",text:" New Covid-19 Variant  spotted in China"
        },
        {
            tag:"2",text:"Government to Give grants to teenage mothers"
        },
        {
            tag:"3",text:"Breast cancer on the rise in Oti regigion"
        },
        {
            tag:"4",text:" New vaccines available for AIDS patients"
        },
        {
            tag:"5",text:"Health workers to embark on 3 weeks strike"
        },
    ]
    const works =[
        {
            title:"New Covid-19 Variant  spotted in China",
            date:"Jan 19",
            writer:"Story By: Laryea Israel"
    },
    {
        title:" 19% of women with disabilities were....",
        date:"Dec 05",
        writer:"Story By: Mac Manu"
},
{
    title:"UHAS to embark on 30 day health tour",
    date:"Oct 30",
    writer:"Story By: Ankomah Prince"
},
    ]
    return ( <>
            <section className="hero">
            <div className="hero__overlay"></div>
            <nav className="nav-bar">
                <button className="button button__primary">LOGIN</button>
            </nav>
           <div className="block">
           <div className="hero__content">
                <div className="hero__content-grid">
                    <h1 className="hero__title">
                    DEPARTMENT OF FAMILY AND COMMUNITY HEALTH
                    UNIVERSITY OF HEALTH AND ALLIED SCIENCES, HO, VOLTA REGION, GHANA
                    </h1>
                    <p className="hero__tagline">
                    Effect of soymilk-burkina intake on gut microbiome 
                    and nutritional status of Ghanaian women
                    </p>
                    <div className="button--container">
                    <button className="button button__light button__default">
                    Request for data
                    </button>
                    </div>
                </div>
            </div>
           </div>
            </section>
            <div className="announcement-container">
                <div className="announcement">
                 {
                     announcements.map( (a) =>(
                        <a href="#">
                        <div className="simple-flex">
                             <div className="circle">
                                 <p className="circled__text">{a.tag}</p>
                             </div>
                             <p className="announcement__text">
                              {a.text}
                             </p>
                         </div>
                        </a>
                     ))
                 }
                </div>
            </div>
                 <div className="works-section">
                 <img src={Lines} alt="" className="lines" />
                     <div className="block paper-works">
                         <div>
                             <h3 className="paper-works__title">
                             Our Latest Paper works
                             </h3>
                             <p className="paper-works__tagline">
                             For the sake of public information, we get you informed on our research works
                             </p>
                             <img src={briefCase} alt="" className="paper-works__image" />
                         </div>
                         <div className="news-grid"> 
                            {
                                works.map((work)=>(
                                   <a href="#">
                                        <div className="news">
                                    <div className="simple-flex">
                                        <img src={Idea} alt="" className="idea" />
                                        <div className="news__header">
                                            <h5 className="news__title">
                                            {work.title}
                                            </h5>
                                            <div className="news__date">
                                                <p>{work.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="news__writer">
                                    {work.writer}
                                    </p>
                                </div>
                                   </a>
                                ))
                            }
                         </div>
                     </div>
                    
                 </div>

            </>
             );
}
 
export default HomePage;