import React from 'react';

interface DoctorCardProps {
  doctor: {
    id: number;
    name: string;
    specialty: string;
    availability: string;
    imageUrl: string;
  };
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 my-2 flex items-center">
      <img
        src={doctor.imageUrl}
        alt={doctor.name}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p className="text-gray-500">{doctor.specialty}</p>
        <span
          className={`text-sm font-medium ${doctor.availability === 'Available' ? 'text-green-500' : 'text-red-500'}`}
        >
          {doctor.availability}
        </span>
      </div>
    </div>
  );
};

export default DoctorCard;
