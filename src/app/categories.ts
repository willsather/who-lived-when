export interface Category {
  name: string;
  color: string;
}

export const categories: { [key: string]: Category } = {
  Art: { name: "Art", color: "bg-red-500" },
  Entertainment: { name: "Entertainment", color: "bg-teal-500" },
  Exploration: { name: "Exploration", color: "bg-green-500" },
  Literature: { name: "Literature", color: "bg-yellow-500" },
  Music: { name: "Music", color: "bg-pink-500" },
  Philosophy: { name: "Philosophy", color: "bg-purple-500" },
  Politics: { name: "Politics", color: "bg-orange-500" },
  Religion: { name: "Religion", color: "bg-indigo-500" },
  Science: { name: "Science", color: "bg-blue-500" },
};
