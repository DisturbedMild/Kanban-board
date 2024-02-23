import { createServer } from "miragejs"

 createServer({
  routes() {
    this.get("http://127.0.0.1:5173", {
      tasks: {
        "task-1": { id: "task-1", title: "Drink Coffee", content: "Drink coffe with friends", author: "Vlad", date: "12-05-2023" },
        "task-2": { id: "task-2", title: "Studying", content: "Learn new technologies", author: "Vlad", date: "12-05-2023" },
        "task-3": { id: "task-3", title: "Play games", content: "Play new videogame", author: "Vlad", date: "12-05-2023" },
        "task-4": { id: "task-4", title: "New Task", content: "dddddd", author: "Vlad", date: "12-05-2023" }
      },
      columns: {
        "column-1": {
          id: "column-1",
          title: "to do",
          taskIds: ["task-1", "task-2", "task-3"]
        },
        "column-2": {
          id: "column-2",
          title: "doing...",
          taskIds: ["task-4"]
        },
        "column-3": {
          id: "column-3",
          title: "done",
          taskIds: []
        }
      },
      columnOrder: ["column-1", "column-2", "column-3"]
    })
  }
})