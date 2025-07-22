"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Upload } from "lucide-react";
import { set } from "date-fns";

type FileUploaderProps = {
  onChange: (file: File) => void;
};

const FileUploader = ({ onChange }: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));
      onChange(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="h-[88%] flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-dark-500 bg-dark-400 p-5"
    >
      <input {...getInputProps()} />
      {preview ? (
        <Image
          src={preview}
          width={250}
          height={250}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
          style={{
            width: "auto",
          }}
        />
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-2 text-center text-white">
          <Upload size={40} className="text-blue-500" />
          <p className="text-lg font-din-regular text-right ">
            <span className="text-blue-500">انقر لرفع</span> أو اسحب و أفلت
          </p>
          <p className="text-base text-left font-din-regular">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
