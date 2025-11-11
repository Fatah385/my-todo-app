import { Menu, Plus, CalendarDays } from "lucide-react";

function App() {
  return (
    <div className="container-layout w-full h-screen flex justify-center items-start pt-12">
      <div className="container max-w-96 h-9/10 bg-white rounded-lg shadow-md p-4 overflow-y-scroll  scrollbar-hide">
        <nav className="flex items-center justify-between mb-4">
          <Menu />
          <h1 className="text-3xl font-bold  text-neutral-800">Chores</h1>
        </nav>
        <div className="Input-container bg-neutral-200 flex justify-between rounded-full py-2 px-3 items-center gap-2">
          <input
            type="text"
            className="text-md border-none outline-none w-4/5"
            placeholder="Add a new chore..."
          />
          <button
            type="submit"
            className="bg-blue-500 rounded-full p-1  hover:bg-blue-600 transition-colors"
          >
            <Plus />
          </button>
        </div>

        <hr className="my-4 border-t border-gray-300 w-full" />

        <div className="todo-display text-md mb-4">
          <h2 className="uppercase font-semibold py-2">to do</h2>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 py-2 px-4 rounded shadow shadow-gray-400/50 ">
              <input
                type="checkbox"
                className="appearance-none w-6 h-6 rounded-full border border-gray-400 checked:bg-green-300 checked:border-green-300 cursor-pointer checked:after:content-['✓'] checked:after:text-green-900 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:h-full checked:after:w-full"
              />{" "}
              <span>Pick up mail</span>
              <span className="text-gray-500 flex text-sm items-center gap-1 ml-auto">
                <CalendarDays /> Due: Today
              </span>
            </li>
            <li className="flex items-center gap-2 py-2 px-4 rounded shadow shadow-gray-400/50 ">
              <input
                type="checkbox"
                className="appearance-none w-6 h-6 rounded-full border border-gray-400 checked:bg-green-300 checked:border-green-300 cursor-pointer checked:after:content-['✓'] checked:after:text-green-900 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:h-full checked:after:w-full"
              />{" "}
              <span>Get gift for her</span>
              <span className="text-gray-500 flex text-sm items-center gap-1 ml-auto">
                <CalendarDays /> 11/25/2025
              </span>
            </li>
            <li className="flex items-center gap-2 py-2 px-4 rounded shadow shadow-gray-400/50 ">
              <input
                type="checkbox"
                className="appearance-none w-6 h-6 rounded-full border border-gray-400 checked:bg-green-300 checked:border-green-300 cursor-pointer checked:after:content-['✓'] checked:after:text-green-900 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:h-full checked:after:w-full"
              />{" "}
              <span>Pick up mail</span>
              <span className="text-gray-500 flex text-sm items-center gap-1 ml-auto">
                <CalendarDays /> Due: Tomorrow
              </span>
            </li>
            <li className="flex items-center gap-2 py-2 px-4 rounded shadow shadow-gray-400/50 ">
              <input
                type="checkbox"
                className="appearance-none w-6 h-6 rounded-full border border-gray-400 checked:bg-green-300 checked:border-green-300 cursor-pointer checked:after:content-['✓'] checked:after:text-green-900 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:h-full checked:after:w-full"
              />{" "}
              <span>Go to the store</span>
              <span className="text-gray-500 flex text-sm items-center gap-1 ml-auto">
                <CalendarDays /> 11/12/2025
              </span>
            </li>
          </ul>
        </div>

        <div className="complete-display text-md">
          <h2 className="uppercase font-semibold py-2">completed</h2>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 py-2 px-4 rounded shadow shadow-gray-400/50 ">
              <input
                checked
                type="checkbox"
                className="appearance-none w-6 h-6 rounded-full border border-gray-400 checked:bg-green-300 checked:border-green-300 cursor-pointer checked:after:content-['✓'] checked:after:text-green-900 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:h-full checked:after:w-full"
              />{" "}
              <span style={{ textDecoration: "line-through" }}>
                Buy cat food
              </span>
              <span className="text-gray-500 flex text-sm items-center gap-1 ml-auto">
                <CalendarDays /> Due: Today
              </span>
            </li>
            <li className="flex items-center gap-2 py-2 px-4 rounded shadow shadow-gray-400/50 ">
              <input
                checked
                type="checkbox"
                className="appearance-none w-6 h-6 rounded-full border border-gray-400 checked:bg-green-300 checked:border-green-300 cursor-pointer checked:after:content-['✓'] checked:after:text-green-900 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:h-full checked:after:w-full"
              />{" "}
              <span style={{ textDecoration: "line-through" }}>
                Water the plants
              </span>
              <span className="text-gray-500 flex text-sm items-center gap-1 ml-auto">
                <CalendarDays /> Due: today
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
