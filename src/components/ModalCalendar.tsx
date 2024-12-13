import { FunctionComponent } from "react";
import DatePicker from "react-datepicker";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import Modal from "react-modal";

interface ModalCalendarProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalIsOpen: boolean;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues>;
  submitModal: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const ModalCalendar: FunctionComponent<ModalCalendarProps> = ({
  setIsOpen,
  modalIsOpen,
  register,
  control,
  errors,
  submitModal,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
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

        <form className="flex flex-col gap-4" onSubmit={submitModal}>
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
  );
};

export default ModalCalendar;
