// hooks/useCars.js
import { useCallback, useState } from 'react';

const useSelectCar = initialSelectedCar => {
  const [selectedCar, setSelectedCar] = useState(initialSelectedCar);

  const handlePressItem = useCallback((item, userLanguage, setCarsModel) => {
    setSelectedCar({
      carId: item.id.toString(),
      car: userLanguage === 'ar' ? item?.carAr : item?.carEn,
      modelId: null,
      model: 'select model',
      year: 'select year',
    });
    setCarsModel(item.CarModel);
  }, []);

  return { selectedCar, setSelectedCar, handlePressItem };
};

export default useSelectCar;
