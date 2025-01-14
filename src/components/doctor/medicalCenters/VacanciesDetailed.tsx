/* eslint-disable @typescript-eslint/no-unused-vars */
import { Breadcrumb } from "antd";

import VacancyDetailedBody from "./VacancyDetailedBody";
import { useLocation } from "react-router-dom";

function VacanciesDetailed() {
  const location = useLocation();
  const openSessions = location.state?.openSessions;
  const mobile = location.state?.mobile;
  const vacancyNoteToDoctors = location.state?.vacancyNoteToDoctors;
  const aptCategories = location.state?.aptCategories;
  console.log("openSessions:sssss ", openSessions);
 

  return (
    <div>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">
          Nawaloka Hospital - OPD - Dental
        </p>
      </div>
      <div>
        <Breadcrumb
          className="ml-[1%]"
          items={[
            {
              title: "Medical Center",
            },
            {
              title: (
                <a href="/doctor/medicalcenters/mymedicalcenters/">
                  My Medical Centers
                </a>
              ),
            },
            {
              title: (
                <a href="/doctor/medicalcenters/mymedicalcenters/vacancies/">
                  Vacancies
                </a>
              ),
            },
            {
              title: <a href="">Nawaloka - OPD - Dental</a>,
            },
          ]}
        />
      </div>
      <VacancyDetailedBody
       openSessions = {openSessions}
       mobile = {mobile}
       vacancyNoteToDoctors = {vacancyNoteToDoctors}
       aptCategories = {aptCategories}
       />
    </div>
  );
}

export default VacanciesDetailed;
