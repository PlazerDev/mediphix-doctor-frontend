import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import type { UploadFile, UploadProps } from "antd";

const { Dragger } = Upload;

interface DPUploadProps {
  email: string;
}

function DPUpload({ email }: DPUploadProps) {
  const [frontID, setFrontID] = useState<UploadFile | null>(null);
  const [backID, setBackID] = useState<UploadFile | null>(null);

  const uploadPropsFront: UploadProps = {
    name: "file",
    multiple: false,
    action:
      `http://localhost:9000/media/upload?email=${email}&userType=doctor&uploadType=profileImage`,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} front side uploaded successfully.`);
        setFrontID(info.file); // Save the uploaded file to state
      } else if (status === "error") {
        message.error(`${info.file.name} front side upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped front ID files", e.dataTransfer.files);
    },
  };


  return (
    <div className="flex justify-between gap-4 mb-12">
      <div>
        <p className="text-mediphix_text_c">Upload a Profile Picture</p>
        <Dragger {...uploadPropsFront}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Upload a professional photo of yourself.
          </p>
        </Dragger>
      </div>
    </div>
  );
}

export default DPUpload;
