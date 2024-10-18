import { createTeacher } from "@/app/Api/teachers";
import { uploadProfileImage } from "@/app/Api/uploads";
import { runCompleteProcess, runFailProcess } from "@/app/features/proccesThunk";
import { ITeacher } from "@/app/globals";
import { AppDispatch } from "@/app/store";
import Header from "@/components/custom/Header";
import AddteacherForm from "@/components/Forms/AddteacherForm";
import { Button } from "@/components/ui/Button";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

function AddTeachers() {
  const [formState, setFormState] = useState<ITeacher>({
    firstName: "",
    lastName: "",
    email: "",
    gender: "unknown",
    classes: [],
    subjects: [],
  });
  const [imageState, setImageState] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>()

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }
  function handleSelectChange(name: string, value: string) {
    setFormState({ ...formState, [name]: value });
  }

  function handleMultipleSelectionChange(array: string[], val: string) {
    array.push(val);
  }

  async function handleSubmit() {
    console.log(formState)
    const createdTeacher = await createTeacher(formState);
    if (createdTeacher) {
      console.log(createdTeacher);
      dispatch(runCompleteProcess("teacher created successfully"));
    } else {
      dispatch(runFailProcess("failed to create teacher"));
    }

    try {
      if (!imageState) return;
      await uploadProfileImage(imageState, "student");
      dispatch(runCompleteProcess("profile image uploaded successfully"))
    } catch (error) {
      console.log(error);
      dispatch(runFailProcess("failed upload teacher's picture "))
    }

    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      gender: "unknown",
      classes: [],
      subjects: [],
    })

  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
 
    const file = event.target.files?.[0];
    if (file) {
      setImageState(file);
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-[100vh]">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col flex-1 ">
          <p className="font-bold  mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"> </p>
          <p className="text-gray-600 inline-block">
            Home /
            <span className="text-myBlue font-semibold">Register teachers</span>
          </p>
        </div>

        <div className=" w-full bg-white mt-6  rounded py-3 px-4 flex flex-col justify-between pb-10">
          <div>
            <h1 className="text-xl font-semibold ">Add new teacher </h1>
            <AddteacherForm
              state={formState}
              updatefn={updateState}
              handleSelectChange={handleSelectChange}
              handleMultipleSelectionChange={handleMultipleSelectionChange}
            />
          </div>
          <div className=" mt-10">
            <div className="flex gap-4 items-end mb-8">
              <div className=" w-40 h-40 rounded-full bg-gray-200">
              <img src={previewImage || ""} alt="" className="w-full h-full rounded-full"/>
              </div>
              <div className="m">
                <p>upload teacher's photo (150px by 150px)</p>
                <input
                  type="file"
                  name="studentPhoto"
                  className="text-sm mb-6 "
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button className="bg-myBlue w-28 " onClick={handleSubmit}>
                save
              </Button>
              <button className="bg-black px-4 py-1 text-white font-semibold rounded w-28">
                reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTeachers;
