import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Backend'deki register endpoint'ine gidiyoruz
            // NOT: Backend'deki DTO yapına göre firstName, lastName isimlerini kontrol et!
            await axios.post("https://rent-a-car-api-ccen.onrender.com/api/auth/register", {
                firstName,
                lastName,
                email,
                password
            });

            // Kayıt başarılıysa kullanıcıyı login sayfasına yönlendiriyoruz
            alert("Kayıt başarılı! Giriş yapabilirsiniz.");
            navigate("/login");

        } catch (err: any) {
            console.error("Kayıt hatası:", err);
            // Eğer CORS hatası alırsan yine o kırmızı hatayı göreceğiz
            setError("Kayıt başarısız! E-posta zaten kullanımda olabilir veya sunucu hatası.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        RentA<span className="text-blue-600">Car</span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">Yeni hesap oluşturun.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Ad</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                placeholder="Ahmet"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Soyad</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                placeholder="Demir"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">E-posta Adresi</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="ornek@mail.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Şifre</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 disabled:opacity-70"
                    >
                        {loading ? "Kaydediliyor... ⏳" : "KAYIT OL"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm font-medium text-gray-500">
                    Zaten hesabınız var mı? <Link to="/login" className="text-blue-600 hover:underline">Giriş Yapın</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;