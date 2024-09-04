import ManageAppoinmentsImg from "../../../assets/images/patient/appoinment/manageAppoinments.png";
import wdgetBG from "../../../assets/images/patient/appoinment/widgetsBg.png";
import Footer from "../../Footer";
import "../../../assets/css/page_loading_animation.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";

interface Props {
  name: string;
  title: string;
  buttontitles: string[];
  buttonimages: IconType[];
  navigations: string[];
}
const MedicalCenterSection = ({
  name,
  title,
  buttontitles,
  buttonimages,
  navigations,
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`h-screen flex flex-col ${loaded ? "fade-in" : ""}`}>
        <div className="m-8">
          <p className="text-[var(--text-a)] font-medium text-xl">
            Medical Centers
          </p>
          <p className="text-[var(--text-b)] text-xs">
            We hope you're having a great day .
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-white w-[60%] h-auto pl-6 pt-6 pb-6 pr-6 flex flex-col rounded-[20px]">
            <div className="flex flex-row items-center justify-center mb-4">
              <p className="flex-1 h-1/2 text-left font-bold text-xl">
                Hi, {name} <br />
                {title}
              </p>
              <img src={ManageAppoinmentsImg} className="h-[220px]" alt="" />
            </div>

            <div className="flex justify-center">
              <div className="w-1/2">
                <div className="flex flex-row gap-4 h-54 text-white">
                  {buttontitles.map((button, index) => {
                    const IconComponent = buttonimages[index];
                    return (
                      <button
                        key={index}
                        className="flex-1 w-[1/3] flex bg-contain bg-right hover:opacity-90 justify-center p-5 rounded-[16px]"
                        style={{
                          backgroundImage: `url(${wdgetBG})`,
                          backgroundRepeat: "no-repeat",
                          backgroundBlendMode: "luminosity",
                          backgroundColor:
                            index % 2 === 0 ? "var(--text-b)" : "var(--accent)",
                        }}
                        onClick={() => navigate(navigations[index])}
                      >
                        <div className="flex items-center justify-center flex-col w-24">
                          <IconComponent style={{ fontSize: "2rem" }} />
                          <p className="text-sm text-center font-semibold mt-1">
                            {button}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MedicalCenterSection;
