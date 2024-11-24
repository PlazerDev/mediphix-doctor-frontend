import featureImg1 from "./../../assets/images/landing-page/feature_01.png";
import featureImg2 from "./../../assets/images/landing-page/feature_02.png";
import featureImg3 from "./../../assets/images/landing-page/feature_03.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import FirstSectionTitle from "./components/FirstSectionTitle";
import FirstSectionImg from "./components/FirstSectionImg";
import Stat from "./components/Stat";
import Feature from "./components/Feature";
import WhyUs from "./components/WhyUs";
import Feedback from "./components/Feedback";
import FAQ from "./components/FAQ";
import JoinWithUs from "./components/JoinWithUs";
import Footer from "./components/Footer";

function LandingPage() {
  const { state } = useAuthContext();

  useEffect(() => {
    AOS.init();
  }, []);

  return !state.isAuthenticated ? (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* First Section */}
      <div className="px-24 bg-mediphix_text_a">
        <FirstSectionTitle />
        <FirstSectionImg />
      </div>
      {/* Second Section */}
      <div className="bg-mediphix_card_background px-24 py-8">
        <Stat />
      </div>
      <div className="px-24 bg-mediphix_card_background">
        <Feature
          isReverse={false}
          title="Access Patient Records at Your Fingertips"
          description="Get seamless, on-demand access to comprehensive patient medical records. Mediphix’s centralized system ensures that you have all the information you need—medical histories, diagnostic details, and treatment plans—available in one secure platform. Empower yourself to make well-informed decisions with the confidence of having accurate, real-time data, enhancing both diagnosis precision and patient outcomes."
          img={featureImg1}
        />
        <Feature
          isReverse={true}
          title="Deliver Superior Care"
          description="Revolutionize the way you deliver healthcare with Mediphix. By streamlining administrative workflows, our platform minimizes the time spent on paperwork and manual data management, allowing you to concentrate on building stronger relationships with your patients. Provide a higher level of care and attention while enjoying the efficiency and support Mediphix brings to your practice."
          img={featureImg2}
        />
        <Feature
          isReverse={false}
          title="Effortless Session Management"
          description="Simplify your practice management with our intuitive tools for scheduling and session handling. Mediphix helps you stay organized by allowing you to manage appointments, set your availability, and even send reminders to your patients. With everything in one place, you can focus on providing a seamless experience, reducing wait times, and enhancing patient satisfaction."
          img={featureImg3}
        />
      </div>
      <div className="bg-mediphix_card_background px-24 py-8">
        <WhyUs />
      </div>
      <div className="bg-mediphix_card_background px-24 py-8">
        <Feedback />
      </div>
      <div className="bg-mediphix_card_background px-24 py-8">
        <FAQ />
      </div>
      <div className="bg-mediphix_card_background px-24 py-8">
        <JoinWithUs />
      </div>
      <div className="bg-mediphix_card_background px-24 pt-8 pb-2">
        <Footer />
      </div>
    </div>
  ) : (
    <Navigate to={"medicalCenterStaff/"} />
  );
}

export default LandingPage;
