import {
  FaArrowRightFromBracket,
  FaChartColumn,
  FaFileLines,
  FaGear,
  FaHouse,
  FaTriangleExclamation,
  FaUsers,
  FaVideo,
} from 'react-icons/fa6';

const navLinks = () => {
  return [
    { label: 'Dashboard', icon: FaHouse },
    { label: 'Live Cameras', icon: FaVideo },
    { label: 'Traffic Analytics', icon: FaChartColumn },
    { label: 'Alerts', icon: FaTriangleExclamation },
    { label: 'Reports', icon: FaFileLines },
    { label: 'Settings', icon: FaGear },
    { label: 'Users', icon: FaUsers },
    { label: 'Logout', icon: FaArrowRightFromBracket },
  ];
};

export default navLinks;
