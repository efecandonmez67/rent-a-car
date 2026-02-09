import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Backend'e göndereceğimiz veri (Araba Ekleme)
interface CreateCarRequest {
    modelId: number;
    dailyPrice: number;
    modelYear: number;
    plate: string;
    state: number; // 1: Müsait, 2: Kirada, 3: Bakımda
}

// Backend'den çekeceğimiz Model Listesi için yapı
// (Backend'deki GetModelResponse ile aynı olmalı)
interface Model {
    id: number;
    name: string;      // Örn: "3.20i"
    brandName?: string; // Örn: "BMW" (Varsa süper olur, yoksa sadece name)
}

function AdminPage() {
    const navigate = useNavigate();

    // Bildirim Mesajı
    const [notification, setNotification] = useState<{type: "success" | "error" | ""; message: string}>({
        type: "", message: ""
    });

    // Modelleri tutacak olan liste (Dropdown için)
    const [models, setModels] = useState<Model[]>([]);

    // --- 1. GÜVENLİK VE VERİ YÜKLEME ---
    useEffect(() => {
        // A) Token Kontrolü
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // B) Modelleri Çek (Dropdown dolsun diye)
        fetchModels();
    }, [navigate]);

    // Modelleri getiren fonksiyon
    const fetchModels = async () => {
        try {
            // DİKKAT: Backend adresin '/api/models' mi? Kontrol et.
            const response = await axios.get("http://localhost:8080/api/models");
            setModels(response.data);
        } catch (error) {
            console.error("Modeller yüklenemedi:", error);
            // Eğer model çekemezsek uyarı verelim
            setNotification({ type: "error", message: "Hata: Modeller listesi yüklenemedi!" });
        }
    };

    // --- 2. FORM İŞLEMLERİ ---
    const [formData, setFormData] = useState<CreateCarRequest>({
        modelId: 0, // Başlangıçta 0 (Seçilmedi)
        dailyPrice: 0,
        modelYear: 2023,
        plate: "",
        state: 1
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "plate" ? value : Number(value) });
        if(notification.message) setNotification({type:"", message:""});
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Model seçilmiş mi kontrolü
        if (formData.modelId === 0) {
            setNotification({ type: "error", message: "Lütfen listeden bir model seçiniz!" });
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/cars", formData);

            setNotification({ type: "success", message: "İşlem Başarılı: Araç filoya eklendi." });
            // Formu sıfırla
            setFormData({ modelId: 0, dailyPrice: 0, modelYear: 2023, plate: "", state: 1 });

            setTimeout(() => setNotification({type:"", message:""}), 3000);

        } catch (error) {
            console.error("Hata:", error);
            setNotification({ type: "error", message: "Hata: Plaka formatını veya sunucu bağlantısını kontrol ediniz." });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6 font-sans text-gray-900">
            <div className="max-w-5xl mx-auto">

                {/* Üst Bar */}
                <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Yönetim <span className="text-orange-600">Paneli</span> 🛠️
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Araç filosu yönetim merkezi</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-gray-500 hover:text-orange-600 font-medium transition text-sm">
                            Siteyi Görüntüle
                        </Link>
                        <button onClick={handleLogout} className="bg-red-50 text-red-600 border border-red-200 px-5 py-2 rounded-xl hover:bg-red-600 hover:text-white transition font-bold text-sm">
                            Oturumu Kapat
                        </button>
                    </div>
                </div>

                {/* Araç Ekleme Formu */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                        <span className="bg-orange-100 text-orange-600 p-2 rounded-lg text-xl">✚</span>
                        Yeni Araç Kaydı
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* --- BURASI DEĞİŞTİ: ARTIK DROPDOWN --- */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2 ml-1 text-sm">Araç Modeli</label>
                            <select
                                name="modelId"
                                value={formData.modelId}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
                                required
                            >
                                <option value={0}>-- Bir Model Seçiniz --</option>
                                {/* Modelleri Listeleme Döngüsü */}
                                {models.map((model) => (
                                    <option key={model.id} value={model.id}>
                                        {model.brandName ? `${model.brandName} - ` : ""} {model.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Fiyat */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2 ml-1 text-sm">Günlük Fiyat</label>
                            <input type="number" name="dailyPrice" placeholder="Örn: 1500" value={formData.dailyPrice || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                        </div>

                        {/* Yıl */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2 ml-1 text-sm">Model Yılı</label>
                            <input type="number" name="modelYear" placeholder="Örn: 2023" value={formData.modelYear} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                        </div>

                        {/* Plaka */}
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2 ml-1 text-sm">Plaka</label>
                            <input type="text" name="plate" placeholder="34 ABC 123" value={formData.plate} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                        </div>

                        {/* Durum */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-600 font-semibold mb-2 ml-1 text-sm">Araç Durumu</label>
                            <select name="state" value={formData.state} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer">
                                <option value={1}>Müsait</option>
                                <option value={2}>Kirada</option>
                                <option value={3}>Bakımda</option>
                            </select>
                        </div>

                        {/* Bildirim Alanı */}
                        {notification.message && (
                            <div className={`col-span-full p-4 rounded-xl text-center font-bold ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {notification.message}
                            </div>
                        )}

                        <button type="submit" className="col-span-full mt-2 bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition shadow-lg shadow-orange-500/20 transform hover:-translate-y-1">
                            KAYDET VE YAYINLA
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;