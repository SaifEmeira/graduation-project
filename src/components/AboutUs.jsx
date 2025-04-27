
import destination from "../assets/Team.jpg";
import Nancy from "../assets/WhatsApp Image 2025-03-07 at 10.14.57 PM.jpeg";
import Nada from "../assets/WhatsApp Image 2025-03-07 at 10.09.06 PM.jpeg";
import raheem from "../assets/WhatsApp Image 2025-03-07 at 3.59.07 PM.jpeg";
import saif from "../assets/WhatsApp Image 2025-03-09 at 12.06.34 PM.jpeg";
import Amir from "../assets/amir.jpeg";
import toqa from "../assets/toqa.jpeg";
import radwa from "../assets/radwa.jpeg";






import Navbar from "../components/Navbar";



export default function AboutUs() {
    
  return (
    <>
     <Navbar />
          <div
            className="d-flex justify-content-center align-items-center vh-100 text-center"
            style={{
              backgroundImage: `url(${destination})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "#171513",
            }}
          >
            <div className="d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-white display-1 fw-bold d-block" style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)" }}>
              A B O U T 
            </h1>
            
            <h1 className="text-white display-1 fw-bold" style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)" }}>
              U S
            </h1>
            </div>
          </div>



          <div
  className="text-white py-5  w-100"
  style={{ backgroundColor: "#1e1b18", paddingLeft: "5vw", paddingRight: "5vw" }}
>
  <div className="row g-4">
    
    {/* Image 1 */}
    <div className="col-md-4 d-flex justify-content-center">
      <div className="image-container">
        <img src={Nancy} alt="Nancy" className="image" />
        <div className="overlay text-warning d-flex flex-column align-items-center justify-content-center">
          <h2>ENG. Nancy Rashad</h2>
          <p>Flutter Developer</p>
        </div>
      </div>
    </div>

    {/* Image 2 */}
    <div className="col-md-4 d-flex justify-content-center">
      <div className="image-container">
        <img src={raheem} alt="raheem" className="image" />
        <div className="overlay text-warning d-flex flex-column align-items-center justify-content-center">
          <h2>ENG. Raheem Saad</h2>
          <p>React Developer</p>
        </div>
      </div>
    </div>

    {/* Image 3 */}
    <div className="col-md-4 d-flex justify-content-center">
      <div className="image-container">
        <img src={Nada} alt="Nada" className="image" />
        <div className="overlay text-warning d-flex flex-column align-items-center justify-content-center">
          <h2>ENG. Nada Khaled </h2>
          <p>UI/UX Designer</p>
        </div>
      </div>
    </div>

    {/* Image 4 */}
    <div className="col-md-4 d-flex justify-content-center">
      <div className="image-container">
        <img src={saif} alt="saif" className="image" />
        <div className="overlay text-warning d-flex flex-column align-items-center justify-content-center">
          <h2>ENG. Saif Emeira</h2>
          <p>React Developer</p>
        </div>
      </div>
    </div>

    {/* Image 5 */}
    <div className="col-md-4 d-flex justify-content-center">
      <div className="image-container">
        <img src={radwa} alt="radwa" className="image" />
        <div className="overlay text-warning d-flex flex-column align-items-center justify-content-center">
          <h2>ENG. Radwa Nader</h2>
          <p>Backend Developer</p>
        </div>
      </div>
    </div>

    {/* Image 6 */}
    <div className="col-md-4 d-flex justify-content-center">
      <div className="image-container">
        <img src={toqa} alt="toqa" className="image" />
        <div className="overlay text-warning d-flex flex-column align-items-center justify-content-center">
          <h2>ENG. Toqa Ahmed</h2>
          <p>Flutter Developer</p>
        </div>
      </div>
    </div>

    {/* Image 7 (Will be centered if only 1 in last row) */}
    <div className="col-md-4 offset-md-4 d-flex justify-content-center">
      <div className="image-container">
        <img src={Amir} alt="amir" className="image" />
        <div className="overlay text-warning d-flex flex-column align-items-center justify-content-center">
          <h2>ENG. Amir Elsagan</h2>
          <p>Backend Developer</p>
        </div>
      </div>
    </div>

  </div>
</div>


    </>
  )
}
