import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Backend'e kapıyı çalıyoruz
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password
            });

            // YENİ SİSTEM: Paketin içinden hem bileti (token) hem rozeti (role) alıyoruz!
            const { token, role } = response.data;

            // İkisini de tarayıcının kasasına kilitliyoruz
            localStorage.setItem("token", token);
            localStorage.setItem("role", role); // İŞTE BÜTÜN SİHRİ YAPACAK SATIR BU!

            // Şov vakti: Adam ADMIN ise direkt yönetim paneline, değilse vitrine yolla
            if (role === "ADMIN" || role === "ROLE_ADMIN") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (err) {
            console.error("Giriş hatası:", err);
            setError("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
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
                    <p className="text-gray-500 mt-2 font-medium">Hoş geldiniz, lütfen giriş yapın.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
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
                        {loading ? "Giriş Yapılıyor... ⏳" : "GİRİŞ YAP"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm font-medium text-gray-500">
                    Hesabınız yok mu? <Link to="/register" className="text-blue-600 hover:underline">Hemen Kayıt Olun</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;