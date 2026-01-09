import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination"
import Footer from "@/components/Footer"
import React from "react";

const HomePage = () => {
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

          <StatsAndFilters />

          {/* Danh sách nhiệm vụ */}
          <TaskList />

          {/* Phân trang và lọc theo Date */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>

          {/* Chân trang */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
