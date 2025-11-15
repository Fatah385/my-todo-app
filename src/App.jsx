import { Menu, Plus, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  /* stores the date the user selects */
  const [dueDate, setDueDate] = useState("");
  /* date input appears after typing something */
  const [pickingDate, setPickingDate] = useState(false);
  /* remembers which item needs a due date */
  const [tempId, setTempId] = useState(null);

  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDue, setEditDue] = useState("");

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  function handleAddItem() {
    if (inputValue.trim() === "") return;

    const newItem = {
      id: Date.now(),
      text: inputValue,
      checked: false,
      due: "",
    };
    setItems([...items, newItem]);
    setInputValue("");
    setPickingDate(true);
    setTempId(newItem.id);
  }

  function handleToggleChecked(id) {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  }

  function handleSaveDate(e) {
    e.preventDefault();
    if (!dueDate) return;
    const updatedItems = items.map((item) =>
      item.id === tempId ? { ...item, due: dueDate } : item
    );
    setItems(updatedItems);
    setDueDate("");
    setPickingDate(false);
    setTempId(null);
  }

  function handleCancelDate() {
    setItems(items.filter((item) => item.id !== tempId));
    setPickingDate(false);
    setDueDate("");
    setTempId(null);
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleOpenEdit(item) {
    setEditing(true);
    setEditId(item.id);
    setEditText(item.text);
    setEditDue(item.due) || "";
  }

  function handleSaveEdit() {
    const updated = items.map((item) =>
      item.id === editId ? { ...item, text: editText, due: editDue } : item
    );
    setItems(updated);

    setEditing(false);
    setEditId(null);
    setEditText("");
    setEditDue("");
  }

  function handleCancelEdit() {
    setEditing(false);
    setEditId(null);
    setEditText("");
    setEditDue("");
  }

  return (
    <div className="container-layout w-full h-screen flex justify-center items-start pt-12">
      <div className="container max-w-96 h-[90%] bg-white rounded-lg shadow-md p-4 overflow-y-scroll scrollbar-hide">
        <Navbar />
        <InputBar
          input={inputValue}
          onAddItem={handleAddItem}
          setInputValue={setInputValue}
          dueDate={dueDate}
          setDueDate={setDueDate}
        />

        <PickingDate
          dueDate={dueDate}
          setDueDate={setDueDate}
          pickingDate={pickingDate}
          setPickingDate={setPickingDate}
          handleSaveDate={handleSaveDate}
          handleCancelDate={handleCancelDate}
        />

        <EditPopup
          editing={editing}
          onSaveEdit={handleSaveEdit}
          onCencelEdit={handleCancelEdit}
          editText={editText}
          setEditText={setEditText}
          editDue={editDue}
          setEditDue={setDueDate}
        />

        <hr className="my-4 border-t border-gray-300 w-full" />

        <BoxDisplay title="to do">
          <TodoList
            items={items.filter((item) => !item.checked)}
            onToggleChecked={handleToggleChecked}
            onDelete={handleDelete}
            onOpenEdit={handleOpenEdit}
          />
        </BoxDisplay>

        <hr className="my-4 border-t border-gray-300 w-full" />

        <BoxDisplay title="completed">
          <CompletedList
            items={items.filter((item) => item.checked)}
            onToggleChecked={handleToggleChecked}
            onDelete={handleDelete}
            onOpenEdit={handleOpenEdit}
          />
        </BoxDisplay>
      </div>
    </div>
  );
}

export default App;

function Navbar() {
  return (
    <nav className="flex items-center justify-between mb-4">
      <Menu />
      <h1 className="text-xl font-bold  text-neutral-800">Daily activities</h1>
    </nav>
  );
}

function InputBar({ input, onAddItem, setInputValue }) {
  function onSubmit(e) {
    e.preventDefault();
    onAddItem();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="Input-container bg-neutral-200 flex justify-between rounded-full py-2 px-3 items-center gap-2"
    >
      <input
        value={input}
        type="text"
        className="text-md border-none outline-none w-4/5"
        placeholder="Add a new chore..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 rounded-full p-1  hover:bg-blue-600 transition-colors"
      >
        <Plus />
      </button>
    </form>
  );
}

function BoxDisplay({ title, children }) {
  return (
    <div className="todo-display text-md mb-4">
      <h2 className="uppercase font-semibold py-2">{title}</h2>
      {children}
    </div>
  );
}

function TodoList({ items, onToggleChecked, onDelete, onOpenEdit }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          text={item.text}
          checked={item.checked}
          due={item.due}
          onToggleChecked={onToggleChecked}
          onDelete={onDelete}
          onOpenEdit={onOpenEdit}
        />
      ))}
    </ul>
  );
}

function CompletedList({ items, onToggleChecked, onDelete, onOpenEdit }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          text={item.text}
          checked={item.checked}
          due={item.due}
          onToggleChecked={onToggleChecked}
          onDelete={onDelete}
          onOpenEdit={onOpenEdit}
        />
      ))}
    </ul>
  );
}

function Item({
  id,
  text,
  checked,
  due,
  onToggleChecked,
  onDelete,
  onOpenEdit,
}) {
  const [active, setActive] = useState(false);

  function getDueLabel(due) {
    if (!due) return "No due date";

    const todayDate = new Date();
    const dueDateObj = new Date(due);

    const diffTime = dueDateObj - todayDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Do today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 0) return "Overdue";
    if (diffDays <= 7) return `in ${diffDays} days`;
    return due;
  }

  return (
    <>
      <li
        onClick={() => setActive((open) => !open)}
        className="flex flex-col  bg-neutral-50 items-center gap-2 px-4 py-2 rounded shadow shadow-gray-400/50 z-1 "
      >
        <div className="flex w-full items-center gap-2">
          {" "}
          <input
            key={id}
            checked={!!checked}
            onChange={(e) => {
              e.stopPropagation();
              onToggleChecked(id);
            }}
            type="checkbox"
            className="appearance-none w-6 h-6 rounded-full border border-gray-400 checked:bg-green-300 checked:border-green-300 cursor-pointer checked:after:content-['✓'] checked:after:text-green-900 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:h-full checked:after:w-full"
          />{" "}
          <span className={`${checked ? "line-through text-gray-400" : ""}`}>
            {text}
          </span>
          <span className="text-gray-500 flex text-sm items-center gap-1 ml-auto">
            <CalendarDays /> Due: {getDueLabel(due)}
          </span>
        </div>
        {active && (
          <div className="flex w-full justify-end mt-2 gap-2">
            {!checked && (
              <button
                onClick={() => onOpenEdit({ id, text, due })}
                className="bg-sky-500 text-white w-1/4 py-1 rounded hover:bg-sky-600 transition-colors"
              >
                Edit
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="bg-sky-500 text-white w-1/4 py-1 rounded hover:bg-sky-600 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </li>
    </>
  );
}

function PickingDate({
  pickingDate,
  dueDate,
  setDueDate,
  handleSaveDate,
  handleCancelDate,
}) {
  return (
    <>
      {pickingDate && (
        <form
          onSubmit={handleSaveDate}
          className="z-99 w-full h-screen fixed top-0 left-0 bg-black/30 flex justify-center items-center "
        >
          <div className="bg-white p-6 rounded-lg flex flex-col gap-4">
            <input
              autoFocus
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="text-md px-4 py-2 shadow-md rounded-lg border border-gray-300"
            />
            <div className="flex justify-between gap-2">
              <button
                type="submit"
                className="bg-sky-600 text-white w-1/2 py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                OK
              </button>
              <button
                onClick={handleCancelDate}
                className="bg-red-600 text-white w-1/2 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

function EditPopup({
  editing,
  onSaveEdit,
  onCencelEdit,
  editText,
  setEditText,
  editDue,
  setEditDue,
}) {
  return (
    <>
      {editing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSaveEdit();
          }}
          className="z-99 w-full h-screen fixed top-0 left-0 bg-black/30 flex justify-center items-center "
        >
          <div className="bg-white p-6 rounded-lg flex flex-col gap-4">
            {/* Text */}
            <input
              autoFocus
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="text-md px-4 py-2 shadow-md rounded-lg border border-gray-300"
            />

            {/* Due Date */}
            <input
              type="date"
              value={editDue}
              onChange={(e) => setEditDue(e.target.value)}
              className="text-md px-4 py-2 shadow-md rounded-lg border border-gray-300"
            />

            {/* Buttons */}
            <div className="flex justify-between gap-2">
              <button
                type="submit"
                className="bg-sky-600 text-white w-1/2 py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCencelEdit}
                className="bg-red-600 text-white w-1/2 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
