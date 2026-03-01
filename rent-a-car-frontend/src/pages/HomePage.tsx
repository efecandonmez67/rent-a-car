import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="font-sans text-gray-900">

            {/* HERO SECTION (Kurumsal Lacivert Giriş) */}
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

            {/* FEATURES (Neden Biz?) */}
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

        </div>
    );
};

export default HomePage;