import { schoolSelector } from "@/app/features/schoolSlice";
import { userSelector } from "@/app/features/userSlice";
import Header from "@/components/custom/Header";
import InfoDisplay from "@/components/custom/InfoDisplay";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateSchool } from "@/app/Api/school";
import { updateUser } from "@/app/Api/user";
import LogoutComponent from "@/components/custom/logoutComponent";
import { AppDispatch } from "@/app/store";
import { runCompleteProcess, runFailProcess } from "@/app/features/proccesThunk";

function Settings() {
  const school = useSelector(schoolSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch<AppDispatch>()

  const [formData, setFormData] = useState({
    schoolName: school.school?.name || "",
    address: school.school?.address || "",
    email: user.user?.email || "",
    firstName: user.user?.firstName || "",
    lastName: user.user?.lastName || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (newValue: string | Date, name: string) => {
    setFormData({
      ...formData,
      [name]: newValue,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log("Saved data:", formData);
    setIsEditing(false);
    try {
      await updateUser(user.user?._id || "", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
      await updateSchool({
        address: formData.address,
        name: formData.schoolName,
      });
      dispatch(runCompleteProcess("updated successfully"))
    } catch (error) {
      console.error("Error updating data:", error);
      dispatch(runFailProcess(" failed to update"))
    }
  };

  return (
    <div className="h-full pb-10">
      <Header />
      <div className="px-6 flex-1">
        <div className="flex flex-col flex-1">
          <p className="font-bold mt-4">Students</p>
          <p className="w-10 mt-1 h-1 bg-myBlue"></p>
          <p className="text-gray-600 inline-block">
            Home / <span className="text-myBlue font-semibold">Settings</span>
          </p>
        </div>
        <div className="bg-white mt-2 rounded w-[95%] mx-auto relative">
          <p className="absolute top-10 left-10 text-white font-bold text-lg">
            Account settings
          </p>
          <img
            src="/waterFall.png"
            alt="profile img"
            className="w-full h-[250px]"
          />

          <div className="absolute top-24 left-10 p-1 bg-white rounded-full">
            <img
              src="/profileLarge.png"
              alt=" profile sample pic "
              className="w-52 rounded-full"
            />
          </div>

          <div className="mt-16 z-50 px-10">
            <p className="text-lg font-semibold mb-10">
              {`${user.user?.firstName} ${user.user?.lastName}`}{" "}
              <span className="font-normal text-gray-600 text-base">
                -Admin
              </span>
            </p>

            <div className="pb-10">
              <InfoDisplay
                name="schoolName"
                label="School Name"
                value={formData.schoolName}
                onChange={handleChange}
              />
              <InfoDisplay
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
              />
              <InfoDisplay
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <InfoDisplay
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InfoDisplay
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />

              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Save
                </button>
              ) : (
                <div className="mr-auto mt-10">
                  <LogoutComponent />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
