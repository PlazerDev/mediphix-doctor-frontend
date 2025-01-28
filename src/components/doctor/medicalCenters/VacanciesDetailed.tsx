/* eslint-disable @typescript-eslint/no-unused-vars */
import { Breadcrumb } from "antd";

import VacancyDetailedBody from "./VacancyDetailedBody";
import { useLocation, useParams } from "react-router-dom";

function VacanciesDetailed() {
  const location = useLocation();
  const openSessions = location.state?.openSessions;
  const mobile = location.state?.mobile;
  const vacancyNoteToDoctors = location.state?.vacancyNoteToDoctors;
  const aptCategories = location.state?.aptCategories;
  const vacancyObject = location.state?.vacancyObject;
  console.log("openSessions:sssss ", openSessions);

  const { id } = useParams<{
    id: string;
  }>();

  return (
    <div>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">
          {"Session Vacancy in "+vacancyObject?.centerName + " - " + vacancyObject?.aptCategories}
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
              title: (
                <a href="">
                  {vacancyObject?.centerName +
                    " - " +
                    vacancyObject?.aptCategories}
                </a>
              ),
            },
          ]}
        />
      </div>
      <VacancyDetailedBody
        vacacncyId={id}
        openSessions={openSessions}
        mobile={mobile}
        vacancyNoteToDoctors={vacancyNoteToDoctors}
        aptCategories={aptCategories}
        vacancyObject={vacancyObject}
      />
    </div>
  );
}

export default VacanciesDetailed;
