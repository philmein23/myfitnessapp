const icons = {
  checkmark:
    "M198.717 458.848l-198.934-195.8 98.689-97.135 100.245 98.666 214.81-211.426 98.689 97.135-313.499 308.56zM53.956 263.048l144.762 142.481 259.328-255.241-44.518-43.816-214.81 211.426-100.245-98.667-44.517 43.817z",
};

interface IconProps {
  icon: string;
  width: string;
  height: string;
  fill: string;
}

const Icon: React.FC<IconProps> = ({ icon, width, height, fill }) => {
  return (
    <svg fill={fill} width={width} height={height} viewBox="0 0 500 500">
      <path d={icons[icon]}></path>
    </svg>
  );
};

export default Icon;
