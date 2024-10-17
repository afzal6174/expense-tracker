export default function NotFound({ title }) {
  return (
    <div className="flex items-center py-2">
      <div>
        <h3 className="text-base font-medium leading-7 text-gray-600">
          {`No ${title} Found`}
        </h3>
      </div>
    </div>
  );
}
