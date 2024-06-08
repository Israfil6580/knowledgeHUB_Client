import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Container from "../Components/Public_Components/Container";
import useAuth from "../Hooks/useAuth";
import { RotatingLines } from "react-loader-spinner";
import useAdmin from "../Hooks/useAdmin";
import useTutor from "../Hooks/useTutor";
import { ProfileMenu } from "../Components/Public_Components/ProfileMenu";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [isAdmin] = useAdmin();
  const [isTutor] = useTutor();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isAdmin) {
        navigate("/dashboard/viewallusers");
      } else if (isTutor) {
        navigate("/dashboard/createsession");
      } else {
        navigate("/dashboard/bookedsession");
      }
    }
  }, [loading, isAdmin, isTutor, navigate]);

  return (
    <Container>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <div className="min-h-screen p-4">
          <div className="flex h-[calc(100vh-2rem)] gap-4">
            {/* Sidebar */}
            <div className="w-1/6 bg-gradient-to-r from-[#e2ffe4] to-[#E8F5E9] shadow-lg rounded-2xl">
              <div className="flex flex-col gap-4 m-3">
                <h1 className="text-2xl font-title font-black uppercase">
                  Dashboard
                </h1>
                {/* Conditional navigation based on user role */}
                {isAdmin && (
                  <NavLink
                    to="/dashboard/viewallusers"
                    className="w-full text-left font-normal text-base normal-case flex gap-1 items-center"
                  >
                    View All Users
                  </NavLink>
                )}
                {isTutor && (
                  <>
                    <NavLink
                      to="/dashboard/createsession"
                      className="w-full text-left font-normal text-base normal-case flex gap-1 items-center"
                    >
                      Create Session
                    </NavLink>
                    <NavLink
                      to="/dashboard/myallsession"
                      className="w-full text-left font-normal text-base normal-case flex gap-1 items-center"
                    >
                      My All Sessions
                    </NavLink>
                    <NavLink
                      to="/dashboard/uploadmaterials"
                      className="w-full text-left font-normal text-base normal-case flex gap-1 items-center"
                    >
                      Upload Materials
                    </NavLink>
                    <NavLink
                      to="/dashboard/allmaterials"
                      className="w-full text-left font-normal text-base normal-case flex gap-1 items-center"
                    >
                      View All Materials
                    </NavLink>
                  </>
                )}
                {!isAdmin && !isTutor && (
                  <>
                    <NavLink
                      to="/dashboard/bookedsession"
                      className="w-full text-left font-normal text-[15px] normal-case flex items-center gap-1"
                    >
                      My Booked Sessions
                    </NavLink>
                    <NavLink
                      to="/dashboard/createnotes"
                      className="w-full text-left font-normal text-base normal-case flex gap-1 items-center"
                    >
                      Create Notes
                    </NavLink>
                    <NavLink
                      to="/dashboard/managenotes"
                      className="w-full text-left font-normal text-base normal-case flex gap-1 items-center"
                    >
                      Manage Notes
                    </NavLink>
                    <NavLink
                      to="/dashboard/studymaterials"
                      className="w-full text-left font-normal text-base normal-case flex gap-1 items-center"
                    >
                      Study Materials
                    </NavLink>
                  </>
                )}
                {/* Home link */}
                <hr className="m-3 border-[#5b5f97]" />
                <NavLink
                  to="/"
                  className="w-full text-left font-normal text-base normal-case flex gap-1 items-center"
                >
                  Home
                </NavLink>
              </div>
            </div>

            {/* Main content */}
            <div className="w-5/6 shadow-lg rounded-3xl bg-green-50 px-5 py-6">
              <div className="flex justify-between items-start gap-2">
                <div className="leading-4">
                  <h1 className="text-4xl font-black font-title tracking-wide">
                    Hello, {user.displayName}
                  </h1>
                  <p className="text-base">Welcome Back!</p>
                </div>
                <div className="flex items-center gap-2 lg:min-w-[10rem]">
                  <ProfileMenu />
                  <div className="flex flex-col leading-4">
                    <p className="font-bold">{user.displayName}</p>
                    <p className="text-sm">
                      {isAdmin ? "Admin" : isTutor ? "Tutor" : "Student"}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;
