

import { SERVICES } from "../utils/constants";
const ServiceCard = ({ color, title, Icon, iconColor, iconSize, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      <Icon fontSize={iconSize} className={iconColor} />
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

export default function Services() {
  return (
    <div className="flex flex-col w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-10 py-12 px-4">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
            Services that we
            <br />
            continue to improve
          </h1>
          <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          The best choice for buying and selling your crypto assets, with the
          various super friendly services we offer
        </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
      {SERVICES.map((service, index) => (
        <ServiceCard
          key={index}
          color={service.color}
          title={service.title}
          Icon={service.Icon}
          iconColor={service.iconColor}
          iconSize={service.iconSize}
          subtitle={service.subtitle}
        />
      ))}
      </div>
    </div>
  );
}
