import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashboardLayout from "./components/custom/DashboardLayout";
import Allstudents from "./pages/Students/Allstudents";
import AddStudent from "./pages/Students/AddStudent";
import StudentsPromotion from "./pages/Students/StudentsPromotion";
import Parents from "./pages/Parents";
import AllTeachers from "./pages/Teachers/AllTeachers";
import AddTeachers from "./pages/Teachers/AddTeachers";
import FeesGroup from "./pages/Account/FeesGroup";
import StudentFees from "./pages/Account/StudentFees";
import Expenses from "./pages/Account/Expenses";
import AddExpenses from "./pages/Account/AddExpenses";
import Subjects from "./pages/Subjects";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/classes";
import VerifyAccount from "./pages/VerifyAccount";
import { CustomAlert } from "./components/custom/Alert";

const routes = createBrowserRouter([
  { path: "/", Component: Login },
  {
    path: "/register",
    Component: SignUp,
  },
  {
    path: "/verifyAccount",
    Component: VerifyAccount,
  },
  {
    path: "/sys",
    Component: DashboardLayout,
    children: [
      {
        path: "/sys/",
        Component: Dashboard,
      },
      {
        path: "/sys/allStudents",
        Component: Allstudents,
      },
      {
        path: "/sys/addStudent",
        Component: AddStudent,
      },
      {
        path: "/sys/studentsPromotion",
        Component: StudentsPromotion,
      },
      {
        path: "/sys/parents",
        Component: Parents,
      },
      {
        path: "/sys/allTeachers",
        Component: AllTeachers,
      },
      {
        path: "/sys/addTeacher",
        Component: AddTeachers,
      },
      {
        path: "/sys/classes",
        Component: Classes,
      },
      {
        path: "/sys/feesGroup",
        Component: FeesGroup,
      },
      {
        path: "/sys/studentFees",
        Component: StudentFees,
      },
      {
        path: "/sys/expenses",
        Component: Expenses,
      },
      {
        path: "/sys/addExpense",
        Component: AddExpenses,
      },
      {
        path: "/sys/subject",
        Component: Subjects,
      },
      {
        path: "/sys/settings",
        Component: Settings,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <CustomAlert />
    </>
  );
}

export default App;
