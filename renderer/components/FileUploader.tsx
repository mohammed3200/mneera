"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from '@/renderer/lib/utils'
import { Upload } from "lucide-react";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="h-[88%] flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-dark-500 bg-dark-400 p-5">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={250}
          height={250}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
          style={{
            width: "auto"
          }}
        />
      ) : (
        <>
          <div className="h-full flex flex-col items-center justify-center gap-2 text-center text-white">
            <Upload size={40} className="text-blue-500" />
            <p className="text-lg font-din-regular text-right ">
              <span className="text-blue-500">انقر لرفع</span>
              {" "}أو اسحب و أفلت
            </p>
            <p className="text-base text-left font-din-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;