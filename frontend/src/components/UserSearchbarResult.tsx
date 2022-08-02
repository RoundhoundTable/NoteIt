export const UserSearchbarResult = (props: any) => {
  return (
    <li className="flex flex-row justify-between w-full p-2 items-center">
      <a href={`/u/${encodeURIComponent(props.username)}`}>
        <div className="flex flex-row items-center">
          <img
            className="h-12 w-12 rounded-3xl"
            src={props.thumbnail}
            alt="User Profile"
          />
          <div>
            <h2 className="ml-2 text-primary-800 text-sm font-medium">
              {props.displayName}
            </h2>
            <p className="ml-2 text-xs font-light">u/{props.username}</p>
          </div>
        </div>
      </a>
    </li>
  );
};
