import { Carousel } from "antd";
import FeedbackItem from "./FeedbackItem";
import feedbackImg01 from "./../../../assets/images/landing-page/feedback1.png";
import feedbackImg02 from "./../../../assets/images/landing-page/feedback2.png";
import feedbackImg03 from "./../../../assets/images/landing-page/feedback3.png";

function Feedback() {
  return (
    <div className="bg-mediphix_text_d p-8 rounded-lg">
      <Carousel infinite={true} autoplay={true}>
        <FeedbackItem
          img={feedbackImg01}
          feedback="The scheduling system has streamlined my appointments and improved patient care."
          name="Dr. Anjali Perera, Cardiologist at Nawaloka Hospital."
        />
        <FeedbackItem
          img={feedbackImg02}
          feedback="Managing my sessions and patient records has never been easier or more efficient."
          name="Dr. Kamal Senanayake, Pediatrician at Lanka Hospitals."
        />
        <FeedbackItem
          img={feedbackImg03}
          feedback="Mediphix’s real-time updates ensure I’m always prepared for my next patient."
          name="Dr. Roshan de Silva, General Practitioner at Asiri Medical Center."
        />
      </Carousel>
    </div>
  );
}

export default Feedback;
