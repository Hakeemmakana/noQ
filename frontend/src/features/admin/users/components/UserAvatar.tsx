import type { User } from "../types/types";

type UserAvatarProps = {
  user: User;
  className?: string;
};

export default function UserAvatar({ user, className = "h-11 w-11" }: UserAvatarProps) {
  if (user.imageUrl) {
    return (
     <img
  src={user.imageUrl}
  alt={user.name}
  className={`${className} rounded-full object-cover`}
/>
    );
  }

  return (
    <div
      className={`${className} flex items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300`}
    >
      {user.name.charAt(0).toUpperCase()}
    </div>
  );
}