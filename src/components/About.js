import { Outlet } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h2>About Us Page</h2>
      <p>This is About us Page</p>
      <Outlet />
    </div>
  );
};

export default About;
