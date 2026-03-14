import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CarResponse {
    id: number;
    dailyPrice: number;
    modelYear: number;
    plate: string;
    state: number;
    modelName: string;
    modelBrandName: string; // Düzeltilmiş marka ismi
}

interface CarImageResponse {
    id: number;
    imagePath: string;
    car: { id: number };
}

const CarsPage = () => {
    const navigate = useNavigate();

    // 🚀 İŞTE REACT QUERY SİHRİ: useState ve useEffect çöpe gitti!
    // Tek satırda hem loading, hem veri çekme, hem de önbellekleme (caching) yapıyoruz.
    const { data, isLoading } = useQuery({
        queryKey: ["carsAndImages"], // Bu verinin hafızadaki etiketi (ID'si)
        queryFn: async () => {
            const [carsRes, imagesRes] = await Promise.all([
                axios.get("https://rent-a-car-api-ccen.onrender.com/api/cars"),
                axios.get("https://rent-a-car-api-ccen.onrender.com/api/car-images/getAll")
            ]);
            // İki veriyi birleştirip tek bir paket olarak hafızaya atıyoruz
            return { cars: carsRes.data as CarResponse[], images: imagesRes.data as CarImageResponse[] };
        }
    });

    // Kurşun Geçirmez Eşleştirici Fonksiyon
    const getCarImage = (carId: number) => {
        const carImages = data?.images; // Veri React Query'den geliyor

        if (!Array.isArray(carImages)) {
            return "https://placehold.co/600x400/e2e8f0/64748b?text=Fotograf+Yok";
        }

        const imageObj = carImages.find(img => img?.car?.id === carId);
        return imageObj
            ? imageObj.imagePath
            : "https://placehold.co/600x400/e2e8f0/64748b?text=Fotograf+Yok";
    };

    // Müsait araçları filtrele (Eğer data henüz gelmediyse boş dizi [] dön)
    const availableCars = data?.cars?.filter(car => car.state === 1) || [];

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-6 font-sans">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        Premium <span className="text-blue-600">Filomuz</span>
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        Hayalinizdeki aracı seçin, saniyeler içinde kiralayın. Güvenli ve konforlu yolculuğun tadını çıkarın.
                    </p>
                </div>

                {/* isLoading değişkenini artık React Query bizim için otomatik yönetiyor */}
                {isLoading ? (
                    <div className="text-center text-xl font-bold text-slate-400 py-20">
                        Araçlar garajdan çıkarılıyor... ⏳
                    </div>
                ) : availableCars.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-3xl border border-slate-200">
                        <span className="text-5xl block mb-4">🏜️</span>
                        <h3 className="text-2xl font-bold text-slate-800">Şu an tüm araçlarımız kirada.</h3>
                        <p className="text-slate-500 mt-2">Lütfen daha sonra tekrar kontrol edin.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availableCars.map((car) => (
                            <div key={car.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col">

                                <div className="h-56 overflow-hidden relative bg-slate-100">
                                    <img
                                        src={getCarImage(car.id)}
                                        alt={`${car.modelBrandName} ${car.modelName}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-900 font-black px-4 py-2 rounded-xl text-sm shadow-sm">
                                        ₺{car.dailyPrice} <span className="text-slate-500 text-xs font-medium">/ gün</span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-4">
                                        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                                            {car.modelYear} Model
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900">
                                            {car.modelBrandName} {car.modelName}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-slate-100 text-slate-600 text-sm font-semibold px-3 py-1 rounded-lg">
                                            {car.plate}
                                        </div>
                                        <div className="bg-green-50 text-green-600 text-sm font-semibold px-3 py-1 rounded-lg flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Müsait
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <button
                                            onClick={() => navigate("/rent", { state: { car } })}
                                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
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
        </div>
    );
};

export default CarsPage;