import { Breadcrumb } from "antd";
import React from "react";
import VacancyMyRequestsBody from "./VacancyMyRequestsBody";

function VacanciesMyRequests() {
  return (
    <div>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">My Requests</p>
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
              title: <a href="">Vacancies</a>,
            },
          ]}
        />
        <VacancyMyRequestsBody />
      </div>
    </div>
  );
}

export default VacanciesMyRequests;
