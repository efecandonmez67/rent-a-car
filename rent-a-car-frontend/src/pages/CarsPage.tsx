import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RentCarComponent from '../components/RentCarComponent';

interface CarResponse {
    id: number;
    dailyPrice: number;
    modelYear: number;
    plate: string;
    state: number;
    modelName: string;
    modelBrandName: string;
}

interface CarImageResponse {
    id: number;
    imagePath: string;
    car: { id: number };
}

const CarsPage = () => {
    const navigate = useNavigate();
    const [selectedCar, setSelectedCar] = useState<CarResponse | null>(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["carsAndImages"],
        queryFn: async () => {
            const [carsRes, imagesRes] = await Promise.all([
                axios.get("http://localhost:8080/api/cars"),
                axios.get("http://localhost:8080/api/car-images/getAll")
            ]);
            return { cars: carsRes.data as CarResponse[], images: imagesRes.data as CarImageResponse[] };
        }
    });

    const getCarImage = (carId: number) => {
        const carImages = data?.images;
        if (!Array.isArray(carImages)) return "https://placehold.co/600x400/e2e8f0/64748b?text=Fotograf+Yok";
        const imageObj = carImages.find(img => img?.car?.id === carId);
        return imageObj ? imageObj.imagePath : "https://placehold.co/600x400/e2e8f0/64748b?text=Fotograf+Yok";
    };

    const availableCars = data?.cars?.filter(car => car.state === 1) || [];

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-6 font-sans relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        Premium <span className="text-blue-600">Filomuz</span>
                    </h1>
                </div>

                {isLoading ? (
                    <div className="text-center text-xl font-bold text-slate-400 py-20">Araçlar garajdan çıkarılıyor... ⏳</div>
                ) : availableCars.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-3xl border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800">Şu an tüm araçlarımız kirada.</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availableCars.map((car) => (
                            <div key={car.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
                                <div className="h-56 overflow-hidden relative bg-slate-100">
                                    <img
                                        src={getCarImage(car.id)}
                                        alt={`${car.modelBrandName} ${car.modelName}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 font-black px-4 py-2 rounded-xl text-sm">
                                        ₺{car.dailyPrice}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-black text-slate-900">{car.modelBrandName} {car.modelName}</h3>
                                    <div className="mt-auto">
                                        <button
                                            onClick={() => {
                                                const userId = localStorage.getItem("userId");
                                                if(!userId) {
                                                    alert("Lütfen önce giriş yapın!");
                                                    navigate("/login");
                                                } else {
                                                    console.log("Seçilen Araç Data:", car); // Kontrol için ekledik
                                                    setSelectedCar(car);
                                                }
                                            }}
                                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl mt-4"
                                        >
                                            Hemen Kirala
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedCar && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full relative">
                        <button onClick={() => setSelectedCar(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 text-xl font-bold">✕</button>

                        <RentCarComponent
                            carId={selectedCar.id}
                            dailyPrice={selectedCar.dailyPrice}
                            // 🎯 DÜZELTME BURADA: Eğer data null ise boşluk bırak diyoruz
                            carName={`${selectedCar.modelBrandName || ""} ${selectedCar.modelName || ""}`}
                            onCancel={() => setSelectedCar(null)}
                            onSuccess={() => {
                                setSelectedCar(null);
                                refetch();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarsPage;