import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    // Hata veya Başarı mesajlarını ekranda göstermek için state
    const [formStatus, setFormStatus] = useState<{type: "success" | "error" | ""; message: string}>({
        type: "",
        message: ""
    });

    const [creds, setCreds] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
        // Kullanıcı yazmaya başlayınca hata mesajını temizle
        if (formStatus.message) setFormStatus({ type: "", message: "" });
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", creds);

            // HATA ÇÖZÜMÜ: response değişkenini burada kullanarak TS hatasını giderdik.
            console.log("Sunucu Yanıtı:", response.data);

            // Şimdilik geçici token (Backend kodunu atınca burayı düzelteceğiz)
            localStorage.setItem("token", "fake-token-demo");

            // Ekrana başarı mesajı yaz (Alert yok)
            setFormStatus({ type: "success", message: "Giriş başarılı. Yönlendiriliyorsunuz..." });

            // 1 saniye sonra yönlendir (Kullanıcı mesajı okusun)
            setTimeout(() => {
                navigate("/admin");
            }, 1000);

        } catch (error) {
            console.error("Login Hatası:", error);
            // Ekrana hata mesajı yaz
            setFormStatus({ type: "error", message: "Giriş başarısız. Lütfen bilgilerinizi kontrol ediniz." });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
            <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Yönetim Paneli <span className="text-orange-600">Girişi</span>
                    </h1>
                    <p className="text-gray-500 mt-3 text-sm">Devam etmek için lütfen oturum açınız.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">E-Posta Adresi</label>
                        <input
                            type="email"
                            name="email"
                            value={creds.email}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                            placeholder="ornek@rentacar.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Şifre</label>
                        <input
                            type="password"
                            name="password"
                            value={creds.password}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* DİNAMİK MESAJ ALANI (Alert yerine burası çalışacak) */}
                    {formStatus.message && (
                        <div className={`text-center p-3 rounded-lg text-sm font-bold ${
                            formStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                            {formStatus.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/30"
                    >
                        Giriş Yap
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <button onClick={() => navigate("/")} className="text-gray-400 hover:text-orange-600 text-sm font-semibold transition">
                        ← Ana Sayfaya Dön
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;