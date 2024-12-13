import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { EventClickArg } from "@fullcalendar/core/index.js";
import Header from "./components/Header";
import ModalCalendar from "./components/ModalCalendar";

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState(() => {
    if (localStorage.getItem("eventKey")) {
      return JSON.parse(localStorage.getItem("eventKey") || "");
    } else {
      return [];
    }
  });
  const [idEvent, setIdEvent] = useState("");

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

  const handleDateClick = (arg: DateClickArg) => {
    openModal({ dateFrom: arg.date });
  };

  const handleEventClick = (arg: EventClickArg) => {
    setIdEvent(arg.event.id);
    openModal({
      title: arg.event.title,
      dateFrom: arg.event.start ?? undefined,
      dateTo: arg.event.end ?? undefined,
      notes: arg.event.extendedProps.notes,
      who: arg.event.extendedProps.who,
      id: arg.event.id,
    });
  };

  const submitModal = handleSubmit((data) => {
    if (idEvent) {
      const editedEvents = events.map((e) => {
        if (e.id === parseInt(idEvent)) {
          return {
            id: e.id,
            title: data.thisTitle,
            start: data.dateFrom,
            end: data.dateTo,
            extendedProps: {
              who: data.who,
              notes: data.notes,
            },
          };
        } else {
          return e;
        }
      });

      localStorage.setItem("eventKey", JSON.stringify([...editedEvents]));

      setEvents(editedEvents);
      setIdEvent("");
    } else {
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
    }
    setIsOpen(false);
  });

  return (
    <>
      <Header openModal={openModal}></Header>
      <ModalCalendar
        setIsOpen={setIsOpen}
        modalIsOpen={modalIsOpen}
        register={register}
        control={control}
        errors={errors}
        submitModal={submitModal}
      />
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
    </>
  );
}

export default App;
