import { Controller } from "react-hook-form";
import { Select, Input } from "antd";
import AddNewEntryButton from "./AddNewEntryButton";
import { useEffect, useState } from "react";

const { TextArea } = Input;

interface LabReportsEntryProps {
  control: any;
  labReports: any[];
  onAddLabReport: (labReports: any[]) => void;
}

const LabReportsEntry = ({
  control,
  labReports,
  onAddLabReport,
}: LabReportsEntryProps) => {
  const [labReportEntries, setLabReportEntries] = useState(
    labReports.length > 0
      ? labReports
      : [{ priority_level: "", test_type: "", test_name: "", note: "" }]
  );

  const addNewLabReportEntry = () => {
    const updatedLabReports = [
      ...labReportEntries,
      { priority_level: "", test_type: "", test_name: "", note: "" },
    ];
    setLabReportEntries(updatedLabReports);
    onAddLabReport(updatedLabReports);
  };

  useEffect(() => {
    onAddLabReport(labReportEntries);
  }, [labReportEntries, onAddLabReport]);

  return (
    <div>

      {labReportEntries.map((entry, index) => (
        <div key={index} className="flex flex-col border p-4 my-2 rounded-md">
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-1/2">
              <label
                htmlFor={`labReportEntries.${index}.priority_level`}
                className="mb-2"
              >
                Priority Level <span className="text-red-500">*</span>
              </label>
              <Controller
                name={`labReportEntries.${index}.priority_level`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-2/3"
                    placeholder="Select priority level"
                  >
                    <Select.Option value="high">High</Select.Option>
                    <Select.Option value="medium">Medium</Select.Option>
                    <Select.Option value="low">Low</Select.Option>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label
                htmlFor={`labReportEntries.${index}.test_type`}
                className="mb-2"
              >
                Test Type <span className="text-red-500">*</span>
              </label>
              <Controller
                name={`labReportEntries.${index}.test_type`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-2/3"
                    placeholder="Select test type"
                  >
                    <Select.Option value="blood">Blood Test</Select.Option>
                    <Select.Option value="urine">Urine Test</Select.Option>
                    <Select.Option value="xray">X-Ray</Select.Option>
                  </Select>
                )}
              />
            </div>
          </div>

          <label
            htmlFor={`labReportEntries.${index}.test_name`}
            className="mb-2"
          >
            Test Name <span className="text-red-500">*</span>
          </label>
          <Controller
            name={`labReportEntries.${index}.test_name`}
            control={control}
            render={({ field }) => (
              <Input placeholder="Enter test name" {...field} />
            )}
          />

          <label
            htmlFor={`labReportEntries.${index}.note`}
            className="mb-2 mt-4"
          >
            Note
          </label>
          <Controller
            name={`labReportEntries.${index}.note`}
            control={control}
            render={({ field }) => (
              <TextArea
                rows={1}
                placeholder="Enter any note about the test"
                {...field}
              />
            )}
          />
        </div>
      ))}

      <AddNewEntryButton onClick={addNewLabReportEntry} />
    </div>
  );
};

export default LabReportsEntry;
