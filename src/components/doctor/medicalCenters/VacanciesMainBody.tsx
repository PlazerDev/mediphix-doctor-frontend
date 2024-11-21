import React from "react";
import img from "./../../../assets/images/medical-center/NawalokaHospitals.jpeg";
import { Link } from "react-router-dom";

function VacanciesMainBody() {
  const vacancyDataList = [
    {
      name: "Nawaloka Hospital",
      apt_categories: ["OPD", "Dental"],
      id: "1",
    },
    {
      name: "Asiri Medical Center",
      apt_categories: ["Cardiology", "Radiology", "Pediatrics"],
      id: "2",
    },
    {
      name: "Lanka Hospitals",
      apt_categories: ["Neurology", "Oncology", "Orthopedics"],
      id: "3",
    },
    {
      name: "Durdans Hospital",
      apt_categories: ["ENT", "Dermatology", "Urology"],
      id: "4",
    },
    {
      name: "National Hospital of Sri Lanka",
      apt_categories: ["Emergency", "Psychiatry", "Maternity"],
      id: "5",
    },
    {
      name: "Naval Hospital Colombo",
      apt_categories: ["Surgery", "Pathology", "Ophthalmology"],
      id: "6",
    },
    {
      name: "Apollo Hospitals",
      apt_categories: ["Gynecology", "Endocrinology", "Physical Therapy"],
      id: "7",
    },
    {
      name: "Teaching Hospital Peradeniya",
      apt_categories: ["Nephrology", "Hematology", "Rheumatology"],
      id: "8",
    },
    {
      name: "Kandy General Hospital",
      apt_categories: ["General Medicine", "Anesthesiology", "Pediatrics"],
      id: "9",
    },
    {
      name: "Kalubowila Hospital",
      apt_categories: [
        "Gastroenterology",
        "Pulmonology",
        "Infectious Diseases",
      ],
      id: "10",
    },
  ];

  return (
    <div className="flex flex-wrap mx-4 mt-4 gap-4 mb-8">
      {vacancyDataList.map((vacancy) => {
        return (
          <Link
            key={vacancy.id}
            to={
              "/doctor/medicalcenters/mymedicalcenters/vacancies/" + vacancy.id
            }
            className="bg-mediphix_card_background p-8 rounded-lg flex justify-start items-center gap-4 w-[350px] hover:cursor-pointer hover:shadow-md"
          >
            <img src={img} alt="" className="w-16 h-16" />
            <div className="flex flex-col gap-1">
              <div>
                <p className="text-sm text-mediphix_text_c">Name</p>
                <p>{vacancy.name}</p>
              </div>
              <div>
                <p className="text-sm text-mediphix_text_c">
                  Appointment Categories
                </p>
                <p>{vacancy.apt_categories.join(", ")}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default VacanciesMainBody;
