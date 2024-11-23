import React from "react";
import CardTitleAndValue from "../../CardTitleAndValue";
import VacancyDetailedMarkSlots from "./VacancyDetailedMarkSlots";

function VacancyDetailedBody() {
  const vacancyDataObj = {
    aptCategories: ["OPD", "DENTAL"],
    contactNumber: "071-3072929",
    note: "Contact us for any clarifications.",
  };
  return (
    <div>
      <div className="bg-mediphix_card_background mx-4 mt-8 p-8 rounded-lg">
        <p className="font-bold mb-4">Basic Details</p>
        <div className="flex items-center justify-between mb-2">
          <CardTitleAndValue
            title="Appointment Category"
            value={vacancyDataObj.aptCategories.join(", ")}
          />
          <CardTitleAndValue
            title="Contact Number"
            value={vacancyDataObj.contactNumber}
          />
        </div>
        <CardTitleAndValue
          title="Note from the medical center"
          value={vacancyDataObj.contactNumber}
        />
      </div>
      <VacancyDetailedMarkSlots />
    </div>
  );
}

export default VacancyDetailedBody;
