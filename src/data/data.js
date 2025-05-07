export default {
  tasks: [
    {
      id: 1,
      text: "Buy groceries",
      completed: false,
      deleted: true,
      createdAt: "2025-02-03T12:00:00Z",
      coordinates: [46.6980291, 24.7174989],
    },
    {
      id: 2,
      text: "Complete the React project",
      completed: false,
      deleted: false,
      createdAt: "2025-02-03T13:00:00Z",
      coordinates: [46.7619747, 24.69047],
    },
    {
      id: 3,
      text: "Read a book",
      completed: true,
      deleted: false,
      createdAt: "2025-02-03T14:00:00Z",
      coordinates: [46.6765577, 24.6359078],
    },
  ],
  counts: {
    uncompleted: 1,
    completed: 1,
    deleted: 1,
  },
};
