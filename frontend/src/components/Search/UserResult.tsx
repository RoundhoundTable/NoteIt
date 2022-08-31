import { User } from "../../interfaces/Entities";

interface IUserResultProps {
  data: User;
  isBar?: boolean;
}

export const UserResult = ({ data, isBar }: IUserResultProps) =>
  isBar ? (
    <li className="flex flex-row justify-between w-full p-2 items-center">
      <a href={`/u/${encodeURIComponent(data.username)}`}>
        <div className="flex flex-row items-center">
          <img
            className="h-12 w-12 rounded-3xl"
            src={data.thumbnail}
            alt="User Profile"
          />
          <div>
            <h2 className="ml-2 text-primary-800 text-sm font-medium">
              {data.displayName}
            </h2>
            <p className="ml-2 text-xs font-light">u/{data.username}</p>
          </div>
        </div>
      </a>
    </li>
  ) : (
    <div className="flex flex-row justify-between w-full mb-4">
      <a href={`/u/${encodeURIComponent(data.username)}`}></a>
      <div className="flex flex-row items-center">
        <img
          className="h-12 w-12 rounded-full "
          src={data.thumbnail}
          alt="User Profile"
        />
        <div className="ml-2">
          <h2 className="mr-48 text-primary-800 text-base font-medium">
            {data.displayName}
          </h2>
          <div className="text-primary-800 font-light text-xs">
            u/{data.username}
          </div>
        </div>
      </div>
      <a />
    </div>
  );
