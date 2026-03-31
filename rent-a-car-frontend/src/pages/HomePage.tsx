import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCars } from "../services/CarService";

const HomePage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await getAllCars();
                setCars(response.data);
            } catch (error) {
                console.error("Arabalar çekilemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    return (
        <div className="font-sans text-gray-900">

            {/* HERO SECTION */}
            <div className="bg-slate-900 text-white py-32 px-6 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Yola Çıkmanın <br />
                        <span className="text-blue-500">En Güvenli Yolu</span>
                    </h1>
                    <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
                        Binlerce mutlu müşteri, yüzlerce araç seçeneği. Tam kasko güvencesiyle ister günlük, ister aylık kirala.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/cars" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/30 transform hover:-translate-y-1">
                            Hemen Kirala 🚗
                        </Link>
                        <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition backdrop-blur-sm">
                            Bize Ulaşın
                        </Link>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
            </div>

            {/* FEATURES */}
            <div className="py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="p-6 border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition">
                        <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl text-blue-600">💎</div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">Premium Araçlar</h3>
                        <p className="text-gray-500">Her bütçeye uygun, bakımları yetkili serviste yapılmış, son model araç filosu.</p>
                    </div>
                    <div className="p-6 border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition">
                        <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl text-indigo-600">🛡️</div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">Tam Güvence</h3>
                        <p className="text-gray-500">Genişletilmiş kasko ve 7/24 kesintisiz yol yardım desteği ile gözünüz arkada kalmasın.</p>
                    </div>
                    <div className="p-6 border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition">
                        <div className="bg-sky-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl text-sky-600">⚡</div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800">Hızlı Teslimat</h3>
                        <p className="text-gray-500">Sıra beklemeden online rezervasyon yapın, aracınızı dakikalar içinde teslim alın.</p>
                    </div>
                </div>
            </div>

            {/* ARABA LİSTESİ (DİNAMİK KISIM) */}
            <div className="py-24 bg-slate-50 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900">
                        Sizin İçin Seçtiğimiz <span className="text-blue-600">Araçlar</span>
                    </h2>

                    {loading ? (
                        <div className="text-center text-xl font-bold text-gray-500 animate-pulse">
                            Garaj kapıları açılıyor, araçlar yükleniyor... 🏎️💨
                        </div>
                    ) : cars.length === 0 ? (
                        <div className="text-center text-gray-500 font-medium bg-white p-8 rounded-2xl shadow-sm">
                            Şu an galerimizde boş araç bulunmuyor. Lütfen daha sonra tekrar deneyin.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {cars.map((car: any) => (
                                <div key={car.id} className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col">
                                    {/* Resimler JsonIgnore olduğu için şimdilik havalı bir placeholder koyduk */}
                                    <img
                                        src={"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                        alt="Araba"
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                {/* Eğer backend'den DTO geliyorsa car.modelName olabilir, Entity geliyorsa car.model?.name olabilir. Biz güvene aldık, bulamazsa Plakayı yazar! */}
                                                <h3 className="text-2xl font-bold text-gray-800">
                                                    {car.modelName || (car.model && car.model.name) || car.plate || "Bilinmeyen Araç"}
                                                </h3>
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                                                    {car.modelYear}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                                Plaka: <span className="font-bold">{car.plate}</span> <br/>
                                                Durum: {car.state === 1 ? "Müsait" : "Kirada/Bakımda"}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Günlük</span>
                                                <span className="text-blue-600 font-extrabold text-2xl">{car.dailyPrice} ₺</span>
                                            </div>
                                            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition shadow-md">
                                                Kirala
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default HomePage;