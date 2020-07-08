import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
export const UploadMutation = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      path
      id
      filename
      mimetype
    }
  }
`;
// pass in the UploadMutation mutation we created earlier.
const FileUpload = () => {
  const [uploadFile] = useMutation(UploadMutation);
  const onDrop = useCallback(
    acceptedFiles => {
      // select the first file from the Array of files
      const file = acceptedFiles[0];
      console.log(file);
      // use the uploadFile variable created earlier
      uploadFile({
        // use the variables option so that you can pass in the file we got above
        variables: { file },
        onCompleted: () => {}
      });
    },
    // pass in uploadFile as a dependency
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  });
  return (
    <>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive && "isActive"}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <pre style={{ background: "antiquewhite" }}>
            <p>Drag 'n' drop some file here, or click to select file</p>
          </pre>
        )}
      </div>
    </>
  );
};
export default FileUpload;
