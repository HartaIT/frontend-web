import { Outlet } from "react-router-dom";

function Content() {
  return (
    <div className="container mx-auto flex max-w-7xl flex-col items-center space-y-2 p-2 pt-16">
      <Outlet />
    </div>
  );
}

export default Content;
