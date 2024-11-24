import { Breadcrumb, Select } from "antd";
import React from "react";
import CenterSearchPannel from "./CenterSearchPannel";
import VacanciesMainHead from "./VacanciesMainHead";
import VacanciesMainBody from "./VacanciesMainBody";

function VacanciesMain() {
  return (
    <div>
      <div>
        <p className="text-xl font-bold ml-[1%] mt-[1%]">Vacancies</p>
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
      </div>
      <VacanciesMainHead />
      <VacanciesMainBody />
    </div>
  );
}

export default VacanciesMain;
