function Header({
  openModal,
}: {
  openModal: ({
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
  }) => void;
}) {
  return (
    <div className="flex flex-col items-start gap-4 bg-rose-200 rounded h-18">
      <button
        onClick={() => openModal({})}
        className="block w-fit m-4 text-white bg-rose-600 hover:bg-rose-800 focus:ring-2  focus:ring-rose-300 font-medium rounded-lg text-sm mr-20 px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700"
      >
        Visitas
      </button>
    </div>
  );
}

export default Header;
