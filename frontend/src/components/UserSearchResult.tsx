export const UserSearchResult = (props: any) => {
  return (
    <div className="flex flex-row justify-between w-full mb-4">
      <div className="flex flex-row items-center">
        <img
          className="h-12 w-12 rounded-3xl "
          src={props.thumbnail}
          alt="User Profile"
        />
        <div className="ml-2">
          <h2 className="mr-48 text-primary-800 text-base font-medium">
            {props.displayName}
          </h2>
          <div className="text-primary-800 font-light text-xs">
            u/{props.username}
          </div>
        </div>
      </div>
    </div>
  );
};
