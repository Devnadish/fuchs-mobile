// useCars.js
import { useEffect, useState } from 'react';
import { getAllCars } from '@api/getAllCars';

const useCarSelection = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});
  const [carsModel, setCarsModel] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCarsData = async () => {
    setLoading(true);
    const carsData = await getAllCars();
    setCars(carsData);
    setLoading(false);
  };

  useEffect(() => {
    getCarsData();
  }, []);

  return {
    cars,
    selectedCar,
    setSelectedCar,
    carsModel,
    setCarsModel,
    loading,
  };
};

export default useCarSelection;
