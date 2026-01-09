import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import Footer from "@/components/Footer";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/tasks");
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompletedTaskCount(res.data.completedCount);
      // console.log(res.data.tasks);
    } catch (error) {
      console.error("Lỗi khi truy xuất task:", error);
      toast.error("Lỗi khi truy xuất tasks");
    }
  };
  // render lại nên ko dùng cần dùng state
  const filteredTask = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });
  return (
    <div className="min-h-screen w-full relative">
      {/* Aurora Silk Fade Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(150deg, #B39DDB 0%, #D1C4E9 20%, #F3E5F5 40%, #FCE4EC 60%, #FFCDD2 80%, #FFAB91 100%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask />

          {/* Thống kê và bộ lọc */}

          <StatsAndFilters
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
            filter={filter}
            setFilter={setFilter}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList filteredTask={filteredTask} filter={filter}/>

          {/* Phân trang và lọc theo Date */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>

          {/* Chân trang */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
