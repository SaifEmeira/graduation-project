import destination from "../assets/istockphoto-1500380376-612x612.jpg";
import Nancy from "../assets/WhatsApp Image 2025-03-07 at 10.14.57 PM.jpeg";
import Nada from "../assets/WhatsApp Image 2025-03-07 at 10.09.06 PM.jpeg";
import raheem from "../assets/WhatsApp Image 2025-03-07 at 3.59.07 PM.jpeg";
import saif from "../assets/WhatsApp Image 2025-03-09 at 12.06.34 PM.jpeg";
import Amir from "../assets/amir.jpeg";
import toqa from "../assets/toqa.jpeg";
import radwa from "../assets/radwa.jpeg";






import Navbar from "../components/Navbar";
import Footer from "./Footer";



export default function AboutUs() {
    
  return (
    <>
     <Navbar />
      {/* --- Creative Upper Section --- */}
      <div
        className="d-flex justify-content-center align-items-center vh-100 text-center position-relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg,rgba(20,20,20,0.85) 60%,rgba(30,27,24,0.95) 100%), url(${destination})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#171513",
          minHeight: 500,
        }}
      >
        {/* Animated Blobs */}
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0,overflow:'hidden'}}>
          <div style={{position:'absolute',width:220,height:220,background:'rgba(255,193,7,0.18)',borderRadius:'50%',top:30,left:60,filter:'blur(30px)',animation:'float1 8s ease-in-out infinite'}}></div>
          <div style={{position:'absolute',width:180,height:180,background:'rgba(23,162,184,0.15)',borderRadius:'50%',top:200,right:80,filter:'blur(30px)',animation:'float2 10s ease-in-out infinite'}}></div>
          <style>{`
            @keyframes float1 { 0%{transform:translateY(0);} 50%{transform:translateY(40px);} 100%{transform:translateY(0);} }
            @keyframes float2 { 0%{transform:translateY(0);} 50%{transform:translateY(-30px);} 100%{transform:translateY(0);} }
          `}</style>
        </div>
        {/* Animated Section Content */}
        <div className="d-flex flex-column align-items-center justify-content-center w-100 position-relative" style={{zIndex:2}}>
          <h1 className="text-white display-1 fw-bold animate__animated animate__fadeInDown" style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)", letterSpacing: 8 }}>
            <span style={{color:'#ffc107'}}>A</span> B O U T
          </h1>
          <h1 className="text-white display-1 fw-bold animate__animated animate__fadeInUp" style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)", letterSpacing: 8 }}>
            <span style={{color:'#17a2b8'}}>U</span> S
          </h1>
          <div className="mx-auto my-3 animate__animated animate__fadeIn" style={{width:120, height:6, background:'linear-gradient(90deg,#ffc107,#17a2b8)', borderRadius:3, boxShadow:'0 2px 12px #ffc10755'}}></div>
          <p className="lead text-info animate__animated animate__fadeInUp" style={{maxWidth:600}}>
            We are a passionate team of developers, designers, and dreamers, united by a love for travel and technology. Our mission is to make your journey unforgettable, one click at a time.
          </p>
        </div>
      </div>



      <div
        className="position-relative text-white py-5 w-100 overflow-hidden"
        style={{ backgroundColor: "#1e1b18", paddingLeft: "5vw", paddingRight: "5vw", minHeight: 700 }}
      >
        {/* Animated background blobs */}
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0,overflow:'hidden'}}>
          <div style={{position:'absolute',width:300,height:300,background:'rgba(255,193,7,0.15)',borderRadius:'50%',top:40,left:60,filter:'blur(30px)',animation:'float1 8s ease-in-out infinite'}}></div>
          <div style={{position:'absolute',width:250,height:250,background:'rgba(23,162,184,0.13)',borderRadius:'50%',top:300,right:80,filter:'blur(30px)',animation:'float2 10s ease-in-out infinite'}}></div>
          <style>{`
            @keyframes float1 { 0%{transform:translateY(0);} 50%{transform:translateY(40px);} 100%{transform:translateY(0);} }
            @keyframes float2 { 0%{transform:translateY(0);} 50%{transform:translateY(-30px);} 100%{transform:translateY(0);} }
          `}</style>
        </div>
        {/* Section Header */}
        <div className="text-center mb-5 position-relative" style={{zIndex:2}}>
          <h1 className="display-3 fw-bold animate__animated animate__fadeInDown" style={{letterSpacing:6, textShadow:'2px 2px 10px #000'}}>Meet the Team</h1>
          <div className="mx-auto my-3" style={{width:120, height:6, background:'linear-gradient(90deg,#ffc107,#17a2b8)', borderRadius:3, boxShadow:'0 2px 12px #ffc10755'}}></div>
          <p className="lead text-info animate__animated animate__fadeInUp">Passionate. Creative. United by a love for travel and technology.</p>
        </div>
        {/* Team Grid */}
        <div className="row g-4 justify-content-center" style={{zIndex:2, position:'relative'}}>
          {/* Team Member Card */}
          {[{
            img: Nancy, name: 'ENG. Nancy Rashad', role: 'Flutter Developer',
            socials: { linkedin: '#', github: '#', instagram: '#' },
            fact: 'Loves building beautiful mobile apps.'
          },{
            img: raheem, name: 'ENG. Raheem Saad', role: 'React Developer',
            socials: { linkedin: '#', github: '#', instagram: '#' },
            fact: 'Enjoys hiking and coding in nature.'
          },{
            img: Nada, name: 'ENG. Nada Khaled', role: 'UI/UX Designer',
            socials: { linkedin: '#', dribbble: '#', instagram: '#' },
            fact: 'Sketchbook always in hand.'
          },{
            img: saif, name: 'ENG. Saif Emeira', role: 'React Developer',
            socials: { linkedin: '#', github: '#', instagram: '#' },
            fact: 'Coffee-powered code wizard.'
          },{
            img: radwa, name: 'ENG. Radwa Nader', role: 'Backend Developer',
            socials: { linkedin: '#', github: '#', instagram: '#' },
            fact: 'API magician and backend ninja.'
          },{
            img: toqa, name: 'ENG. Toqa Ahmed', role: 'Flutter Developer',
            socials: { linkedin: '#', github: '#', instagram: '#' },
            fact: 'Loves pixel-perfect UIs.'
          },{
            img: Amir, name: 'ENG. Amir Elsagan', role: 'Backend Developer',
            socials: { linkedin: '#', github: '#', instagram: '#' },
            fact: 'Automates everything.'
          }].map((member, i) => (
            <div className={`col-md-4 d-flex justify-content-center ${i===6?'offset-md-4':''}`} key={member.name}>
              <div className="team-card position-relative shadow-lg animate__animated animate__zoomIn" style={{
                background: 'rgba(30,27,24,0.85)',
                borderRadius: '24px',
                overflow: 'hidden',
                minWidth: 280,
                maxWidth: 320,
                width: '100%',
                border: '2px solid #ffc10733',
                transition: 'transform 0.3s',
                cursor: 'pointer',
                boxShadow: '0 8px 32px #0008',
              }}>
                <div className="overflow-hidden position-relative" style={{height:220}}>
                  <img src={member.img} alt={member.name} className="w-100 h-100" style={{objectFit:'cover',filter:'brightness(0.95)'}} />
                  <div className="team-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center" style={{
                    background:'linear-gradient(120deg,rgba(23,162,184,0.7) 0%,rgba(255,193,7,0.7) 100%)',
                    opacity:0,
                    transition:'opacity 0.4s',
                    color:'#222',
                  }}>
                    <div className="mb-2 fw-bold">{member.fact}</div>
                    <div className="d-flex gap-3">
                      {member.socials.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-dark fs-4"><i className="fab fa-linkedin"></i></a>}
                      {member.socials.github && <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-dark fs-4"><i className="fab fa-github"></i></a>}
                      {member.socials.dribbble && <a href={member.socials.dribbble} target="_blank" rel="noopener noreferrer" className="text-dark fs-4"><i className="fab fa-dribbble"></i></a>}
                      {member.socials.instagram && <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-dark fs-4"><i className="fab fa-instagram"></i></a>}
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h2 className="fw-bold mb-1" style={{color:'#ffc107'}}>{member.name}</h2>
                  <p className="mb-0 text-info">{member.role}</p>
                </div>
              </div>
              <style>{`
                .team-card:hover { transform: scale(1.04) translateY(-6px); box-shadow:0 12px 36px #17a2b855; }
                .team-card:hover .team-overlay { opacity:1; }
              `}</style>
            </div>
          ))}
        </div>
      </div>
      <Footer />  

    </>
  )
}
