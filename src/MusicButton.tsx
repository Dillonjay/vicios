interface MusicButtonProps {
  icon: any; // The icon component (e.g., FaSpotify, FaApple, etc.)
  href: string; // The URL to link to
}

const MusicButton: React.FC<MusicButtonProps> = ({ icon: Icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center p-2 rounded-full bg-transparent text-white transition duration-300 ease-in-out 
        hover:text-cyan-400"
    >
      <Icon className="text-3xl group-hover:scale-110 transition-transform duration-300" />
    </a>
  );
};
export default MusicButton;
