import axios from "axios";

interface UploadResponse {
  message: string;

}

export async function uploadProfileImage(file: File, url:string): Promise<void> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post<UploadResponse>(
      `http://localhost:3000/${url}`, 
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      console.log(response.data.message);
      alert("Profile image uploaded successfully");
    } else {
      console.error("Unexpected status code: ", response.status);
    }
    //@ts-expect-error any
  } catch (error: Error) {
    if (error.response) {
      console.error("Error uploading file:", error.response.data.message);
    } else {
      console.error("Error uploading file:", error.message);
      alert("Error uploading file, please try again.");
    }
  }
}



