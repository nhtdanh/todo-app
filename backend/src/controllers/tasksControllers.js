import express from "express";
import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  // Filter
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      // Sunday - 0, Monday - 1, ...
      const mondatDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    // const tasks = await Task.find().sort({ createdAt: "descending" }); // từ dưới lên, -1 hoặc "descending"
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    // throw new Error("Lỗi thử nghiệm");
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;
    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách nhiệm vụ:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi tạo nhiệm vụ:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, // láy từ ỦRl
      {
        title,
        status,
        completedAt,
      },
      {
        new: true, // trả về giá trị đã update, ko có thì trả giá tri ban đầu
      }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Lỗi khi cập nhật nhiệm vụ:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    console.error("Lỗi khi xóa nhiệm vụ:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
