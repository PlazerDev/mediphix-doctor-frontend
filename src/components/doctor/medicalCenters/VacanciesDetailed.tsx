import { Breadcrumb } from "antd";

import VacancyDetailedBody from "./VacancyDetailedBody";

function VacanciesDetailed() {
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
      <VacancyDetailedBody />
    </div>
  );
}

export default VacanciesDetailed;
