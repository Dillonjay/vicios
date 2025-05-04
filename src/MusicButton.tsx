import { IconType } from "react-icons";

interface MusicButtonProps {
  icon: IconType;
  href: string;
}

export const MusicButton: React.FC<MusicButtonProps> = ({
  icon: Icon,
  href,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center p-3 md:p-4 rounded-full bg-transparent text-white transition duration-300 ease-in-out 
        hover:text-cyan-400 touch-manipulation"
    >
      <Icon className="text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300" />
    </a>
  );
};
