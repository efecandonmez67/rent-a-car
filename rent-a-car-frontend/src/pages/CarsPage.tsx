import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RentCarComponent from '../components/RentCarComponent';
import Spinner from '../components/Spinner'; // 1. SPINNER'I İÇERİ ALDIK

// 인터फेйслер aynı kalıyor
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

// 2. HAYAT KURTARAN URL MANTIĞI: Canlıda Render'a, lokalde 8080'e gider.
const API_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:8080/api";

const CarsPage = () => {
    const navigate = useNavigate();
    const [selectedCar, setSelectedCar] = useState<CarResponse | null>(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["carsAndImages"],
        queryFn: async () => {
            // 3. LOCALHOST YAZAN YERLERİ DİNAMİK YAPTIK
            const [carsRes, imagesRes] = await Promise.all([
                axios.get(`${API_URL}/cars`),
                axios.get(`${API_URL}/car-images/getAll`)
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

                {/* 4. YAZIYI SİLDİK, YERİNE SPINNER KOYDUK */}
                {isLoading ? (
                    <Spinner />
                ) : availableCars.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-3xl border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800">Şu an tüm araçlarımız kirada.</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Arabaları listeleme kısmı aynı... */}
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

            {/* Modal kısmı aynı... */}
            {selectedCar && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full relative">
                        <button onClick={() => setSelectedCar(null)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 text-xl font-bold">✕</button>

                        <RentCarComponent
                            carId={selectedCar.id}
                            dailyPrice={selectedCar.dailyPrice}
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