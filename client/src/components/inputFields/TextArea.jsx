const TextArea = ({ value, onChange, name, label }) => {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="min-w-[684px] block overflow-hidden rounded-lg border border-ternary px-3 py-2 lg:w-[300px] shadow-sm focus-within:border-accent focus-within:ring-1 focus-within:ring-accent "
      >
        <span className="text-xs font-medium text-primaryT ">{label}</span>

        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          className="mt-1 w-full border-none bg-transparent text-primaryT p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm relative"
        />
      </label>
    </div>
  );
};

export default TextArea;
