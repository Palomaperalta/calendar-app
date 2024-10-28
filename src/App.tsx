import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import Modal from "react-modal";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EventClickArg } from "@fullcalendar/core/index.js";

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState(() => {
    if (localStorage.getItem("eventKey")) {
      return JSON.parse(localStorage.getItem("eventKey"));
    } else {
      return [];
    }
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function openModal({
    dateTo,
    dateFrom,
    notes,
    who,
    title,
    id,
  }: {
    dateTo?: Date;
    dateFrom?: Date;
    notes?: string;
    who?: string;
    title?: string;
    id?: string;
  }) {
    setIsOpen(true);
    reset({
      dateFrom: dateFrom,
      dateTo: dateTo,
      notes: notes,
      who: who,
      thisTitle: title,
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDateClick = (arg: DateClickArg) => {
    openModal({ dateFrom: arg.date });
    console.log(arg);
  };

  const handleEventClick = (arg: EventClickArg) => {
    console.log(arg);
    openModal({
      title: arg.event.title,
      dateFrom: arg.event.start,
      dateTo: arg.event.end,
      notes: arg.event.extendedProps.notes,
      who: arg.event.extendedProps.who,
      id: arg.event.id,
    });
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4 bg-rose-200 rounded h-18">
        <button
          onClick={() => openModal({})}
          className="block w-fit m-4 text-white bg-rose-600 hover:bg-rose-800 focus:ring-2  focus:ring-rose-300 font-medium rounded-lg text-sm mr-20 px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700"
        >
          Visitas
        </button>
      </div>
      <div className="h-full">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          headerToolbar={{ start: "", center: "title" }}
          height={"auto"}
          selectable={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
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
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="flex w-fit text-white bg-rose-600 hover:bg-rose-800 focus:ring-2  focus:ring-rose-300 font-medium rounded-lg text-sm px-5 m-2 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700"
            >
              Close
            </button>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit((data) => {
              setEvents([
                ...events,
                {
                  id: events.length + 1,
                  title: data.thisTitle,
                  start: data.dateFrom,
                  end: data.dateTo,
                  extendedProps: {
                    who: data.who,
                    notes: data.notes,
                  },
                },
              ]);
              closeModal();
              localStorage.setItem(
                "eventKey",
                JSON.stringify([
                  ...events,
                  {
                    id: events.length + 1,
                    title: data.thisTitle,
                    start: data.dateFrom,
                    end: data.dateTo,
                    extendedProps: {
                      who: data.who,
                      notes: data.notes,
                    },
                  },
                ])
              );
            })}
          >
            <input
              {...register("thisTitle")}
              className="bg-rose-300 focus:ring-2 focus:outline-none focus:ring-rose-800  text-gray-900 text-sm rounded-lg  p-2.5 placeholder-gray-900  max-w-sm"
              placeholder="Title"
            />
            <input
              {...register("who", { required: true })}
              className="bg-rose-300 focus:ring-2 focus:outline-none focus:ring-rose-800  text-gray-900 text-sm rounded-lg  p-2.5 placeholder-gray-900  max-w-sm"
              placeholder="Who is coming"
            />
            {errors.who && <p>Who is coming is required.</p>}
            <Controller
              name="dateFrom"
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
            <Controller
              name="dateTo"
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
              {...register("notes")}
              className="bg-rose-300 border placeholder-gray-900 focus:ring-2 focus:outline-none border-rose-400 text-gray-900 text-sm rounded-lg focus:ring-rose-800 p-2.5 max-w-sm"
              placeholder="Notes"
            ></textarea>

            <div className="flex justify-around">
              <button
                type="submit"
                className="flex  w-fit text-white bg-rose-600 hover:bg-rose-800 focus:ring-2  focus:ring-rose-300 font-medium rounded-lg text-sm mr-20 px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700"
              >
                Aceptar
              </button>
              <button
                onClick={closeModal}
                className="flex  w-fit text-white bg-rose-600 hover:bg-rose-800 focus:ring-2  focus:ring-rose-300 font-medium rounded-lg text-sm mr-20 px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default App;
