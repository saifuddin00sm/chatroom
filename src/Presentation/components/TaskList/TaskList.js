import search_icon from "../../../assets/img/search_icon.png";
import icon_8 from "../../../assets/img/icon_8.png";
import Input from "../../common/Input/Input";
import "./TaskList.css";
import TaskCard from "./TaskCard";
import Pagination from "./Pagination";


const TaskList = () => {
  
  return (
    <div className="task_list_container">
      <div className="search_container">
        <div className="search_left">
          <div>
            <img src={search_icon} alt="Search_Icon" className="img-fluid" />
          </div>
          <Input placeholderText={"Search tasks"} />
        </div>
        <button>
          <img src={icon_8} alt="" className="img-fluid" />
        </button>
      </div>

      {/* ALL TASKS BOX */}
      <div className="all_tasks_box">
        {Array.from({ length: 5 }).map((_, idx) => (
          <TaskCard key={idx} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default TaskList;
