import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Sayfa geçişi için

interface Car {
    id: number;
    plate: string;
    dailyPrice: number;
    modelYear: number;
    state: number;
    modelName: string;
    modelBrandName: string;
}

function HomePage() {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/cars").then(res => setCars(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Üst Bar: Admin Paneline Geçiş Linki */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Mevcut <span className="text-orange-600">Araçlar</span>
                    </h1>
                    <Link to="/admin" className="text-sm text-gray-500 hover:text-orange-600 underline">
                        Yönetici Girişi 🔒
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <div key={car.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group hover:shadow-orange-100 transition-all">
                            <div className="relative h-48 bg-gray-200">
                                <img src="https://placehold.co/600x400/e2e8f0/1e293b?text=Araba+Resmi" alt="Car" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                                <div className="absolute top-4 right-4 bg-white/95 text-orange-600 font-bold px-3 py-1 rounded-lg shadow">
                                    {car.dailyPrice} ₺
                                </div>
                            </div>
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-gray-800">{car.modelBrandName} - {car.modelName}</h2>
                                <div className="flex justify-between mt-4 text-sm text-gray-600">
                                    <span>📅 {car.modelYear}</span>
                                    <span className="font-mono bg-gray-100 px-2 rounded">{car.plate}</span>
                                </div>
                                <div className="mt-4">
                       <span className={`text-xs font-bold px-2 py-1 rounded ${car.state === 1 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {car.state === 1 ? "MÜSAİT" : "KİRADA"}
                      </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default HomePage;