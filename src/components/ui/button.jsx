export default function Button({ onClick, children, ...rest }) {
  return (
    <button
      {...rest}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
