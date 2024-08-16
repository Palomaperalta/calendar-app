import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: new Date(),
    },
  ]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function openModal(selectedDate?: any) {
    setIsOpen(true);
    reset({ date: selectedDate });
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDateClick = (arg) => {
    openModal(arg.date);
    console.log(arg);
  };

  return (
    <>
      <div className="flex flex-col items-end gap-4 p-4 bg-rose-200 rounded">
        <button
          onClick={() => openModal()}
          className="block w-fit text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm mr-20 px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
        >
          Visitas
        </button>
      </div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          headerToolbar={{ start: "", center: "title" }}
          height={"auto"}
          selectable={true}
          dateClick={handleDateClick}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            inset: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            height: "fit-content",
          },
        }}
      >
        <div className="flex flex-col gap-4 w-full h-full p-4 bg-rose-200 rounded">
          <button
            onClick={closeModal}
            className="block w-fit text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm mr-20 px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
          >
            Close
          </button>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => {
              setEvents([
                ...events,
                { title: data.firstName, start: data.date },
              ]);
              closeModal();
            })}
          >
            <input
              {...register("firstName")}
              className="bg-rose-300 focus:ring-2 focus:outline-none focus:ring-rose-800  text-gray-900 text-sm rounded-lg  p-2.5 placeholder-gray-900  max-w-sm"
              placeholder="Name"
            />
            <input
              {...register("lastName", { required: true })}
              className="bg-rose-300 focus:ring-2 focus:outline-none focus:ring-rose-800  text-gray-900 text-sm rounded-lg  p-2.5 placeholder-gray-900  max-w-sm"
              placeholder="Lastname"
            />
            {errors.lastName && <p>Last name is required.</p>}
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  name={field.name}
                  dateFormat="dd/MM/yyyy"
                  className="w-full bg-rose-300 border focus:ring-2 focus:outline-none border-rose-400 text-gray-900 text-sm rounded-lg focus:ring-rose-800 p-2.5 max-w-sm"
                />
              )}
            />
            <textarea
              {...register("Note")}
              className="bg-rose-300 border placeholder-gray-900 focus:ring-2 focus:outline-none border-rose-400 text-gray-900 text-sm rounded-lg focus:ring-rose-800 p-2.5 max-w-sm"
              placeholder="Notes"
            ></textarea>
            <input
              type="submit"
              className="block w-fit text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
            />
          </form>
        </div>
      </Modal>
    </>
  );
}

export default App;
