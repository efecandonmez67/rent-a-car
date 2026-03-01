import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface CreateCarRequest { modelId: number; dailyPrice: number; modelYear: number; plate: string; state: number; }
interface Model { id: number; name: string; brandName?: string; }
interface CarResponse { id: number; dailyPrice: number; modelYear: number; plate: string; state: number; modelName: string; modelBrandName: string; }

function AdminPage() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState<{type: "success" | "error" | ""; message: string}>({ type: "", message: "" });

    const [models, setModels] = useState<Model[]>([]);
    const [cars, setCars] = useState<CarResponse[]>([]);

    const fetchModels = async () => { try { const res = await axios.get("http://localhost:8080/api/models"); setModels(res.data); } catch (e) { console.error(e); } };
    const fetchCars = async () => { try { const res = await axios.get("http://localhost:8080/api/cars"); setCars(res.data); } catch (e) { console.error(e); } };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "ADMIN") {
            navigate("/");
            return;
        }

        fetchModels();
        fetchCars();
    }, [navigate]);

    // --- 1. ARAÇ EKLEME İŞLEMLERİ ---
    const [formData, setFormData] = useState<CreateCarRequest>({ modelId: 0, dailyPrice: 0, modelYear: 2023, plate: "", state: 1 });
    const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.name === "plate" ? e.target.value : Number(e.target.value) });

    const handleCarSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/cars", formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            setNotification({ type: "success", message: "Araç başarıyla eklendi." });
            setFormData({ modelId: 0, dailyPrice: 0, modelYear: 2023, plate: "", state: 1 });
            fetchCars();
            setTimeout(() => setNotification({type:"", message:""}), 3000);
        } catch (error) {
            setNotification({ type: "error", message: "Hata: Araç eklenemedi!" });
        }
    };

    // --- 2. İADE (TESLİM ALMA) İŞLEMLERİ ---
    const handleReturnCar = async (car: CarResponse) => {
        try {
            const targetModel = models.find(m => m.name === car.modelName);
            if (!targetModel) return;
            const updatePayload = { id: car.id, modelId: targetModel.id, dailyPrice: car.dailyPrice, modelYear: car.modelYear, plate: car.plate, state: 1 };
            await axios.put("http://localhost:8080/api/cars", updatePayload, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            setNotification({ type: "success", message: `${car.plate} plakalı araç teslim alındı!` });
            fetchCars();
            setTimeout(() => setNotification({type:"", message:""}), 3000);
        } catch (error) {
            setNotification({ type: "error", message: "Teslim alma işlemi başarısız!" });
        }
    };

    // --- 3. FOTOĞRAF YÜKLEME İŞLEMLERİ ---
    const [imageCarId, setImageCarId] = useState<number>(0);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImageSubmit = async (e: any) => {
        e.preventDefault();
        if (imageCarId === 0 || !selectedFile) {
            setNotification({ type: "error", message: "Lütfen bir araç ve fotoğraf seçin!" });
            return;
        }

        const uploadData = new FormData();
        uploadData.append("file", selectedFile);
        uploadData.append("carId", imageCarId.toString());

        try {
            await axios.post("http://localhost:8080/api/car-images/add", uploadData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            setNotification({ type: "success", message: "Fotoğraf başarıyla yüklendi! 📸" });
            setSelectedFile(null);
            setImageCarId(0);
            fetchCars();
            setTimeout(() => setNotification({type:"", message:""}), 4000);
        } catch (error) {
            setNotification({ type: "error", message: "Fotoğraf yüklenirken bir sorun oluştu." });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const availableCars = cars.filter(car => car.state === 1);
    const rentedCars = cars.filter(car => car.state === 2);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6 font-sans text-gray-900">
            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-extrabold tracking-tight">Yönetim <span className="text-blue-600">Paneli</span> 🛠️</h1>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-gray-500 hover:text-blue-600 font-medium">Siteyi Görüntüle</Link>
                        <button onClick={handleLogout} className="bg-red-50 text-red-600 px-5 py-2 rounded-xl hover:bg-red-600 hover:text-white font-bold transition">Çıkış Yap</button>
                    </div>
                </div>

                {notification.message && (
                    <div className={`mb-6 p-4 rounded-xl text-center font-bold shadow-sm ${notification.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                        {notification.message}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                    <div className="lg:col-span-1 space-y-8">

                        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-2 h-full bg-blue-500"></div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg text-lg">📸</span> Fotoğraf Yükle
                            </h2>
                            <form onSubmit={handleImageSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-600 font-semibold mb-2 text-sm">Araç Seçin</label>
                                    <select value={imageCarId} onChange={(e) => setImageCarId(Number(e.target.value))}
                                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500">
                                        <option value={0}>-- Seçiniz --</option>
                                        {cars.map(car => (
                                            <option key={car.id} value={car.id}>
                                                {car.plate} - {car.modelBrandName} {car.modelName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-600 font-semibold mb-2 text-sm">Dosya (.jpg,
                                        .png)</label>
                                    <input type="file" accept="image/*"
                                           onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                                           className="w-full bg-gray-50 border border-gray-200 p-2 rounded-xl text-sm"/>
                                </div>
                                <button type="submit"
                                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                                    YÜKLE
                                </button>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="bg-gray-100 text-gray-600 p-2 rounded-lg text-lg">✚</span> Yeni Araç Kaydı
                            </h2>
                            <form onSubmit={handleCarSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Model</label>
                                    <select name="modelId" value={formData.modelId} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl" required>
                                        <option value={0}>-- Seç --</option>
                                        {models.map((m) => (<option key={m.id} value={m.id}>{m.brandName} {m.name}</option>))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Fiyat (₺)</label>
                                    <input type="number" name="dailyPrice" value={formData.dailyPrice || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Yıl</label>
                                    <input type="number" name="modelYear" value={formData.modelYear} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Plaka</label>
                                    <input type="text" name="plate" value={formData.plate} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl uppercase" required />
                                </div>
                                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">KAYDET</button>
                            </form>
                        </div>

                    </div>

                    <div className="lg:col-span-2 space-y-8">

                        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-2 h-full bg-orange-400"></div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="bg-orange-100 text-orange-600 p-2 rounded-lg text-lg">🔑</span> Kiradaki Araçlar (İade Bekleyenler)
                            </h2>
                            {rentedCars.length === 0 ? (
                                <p className="text-gray-500 italic p-4 text-center border border-dashed rounded-xl">Şu an kirada araç bulunmuyor.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {rentedCars.map(car => (
                                        <div key={car.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col justify-between">
                                            <div>
                                                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block">Kirada</span>
                                                <h3 className="font-bold text-lg text-gray-800">{car.plate}</h3>
                                                <p className="text-sm text-gray-600">{car.modelBrandName} {car.modelName} ({car.modelYear})</p>
                                            </div>
                                            <button onClick={() => handleReturnCar(car)} className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition shadow-md">
                                                Teslim Al (İade)
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-2 h-full bg-green-500"></div>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="bg-green-100 text-green-600 p-2 rounded-lg text-lg">✅</span> Müsait Araçlar (Vitrin)
                            </h2>
                            {availableCars.length === 0 ? (
                                <p className="text-gray-500 italic p-4 text-center border border-dashed rounded-xl">Filoda müsait araç yok.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-t-xl">
                                        <tr>
                                            <th className="px-4 py-3">Plaka</th>
                                            <th className="px-4 py-3">Marka/Model</th>
                                            <th className="px-4 py-3">Yıl</th>
                                            <th className="px-4 py-3">Fiyat</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {availableCars.map(car => (
                                            <tr key={car.id} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-4 py-3 font-bold text-gray-900">{car.plate}</td>
                                                <td className="px-4 py-3">{car.modelBrandName} {car.modelName}</td>
                                                <td className="px-4 py-3">{car.modelYear}</td>
                                                <td className="px-4 py-3 font-semibold text-blue-600">₺{car.dailyPrice}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminPage;