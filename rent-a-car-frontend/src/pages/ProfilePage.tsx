import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RentalService from "../services/RentalService";

interface RentalResponse {
    id: number;
    dateStarted: string;
    totalPrice: number;
    carPlate: string;
    rentedForDays: number;
}

const ProfilePage = () => {
    const navigate = useNavigate();
    const [rentals, setRentals] = useState<RentalResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
            navigate("/login");
            return;
        }

        // Kiralama geçmişini çek
        const fetchRentals = async () => {
            try {
                const response = await RentalService.getRentalsByUserId(parseInt(userId));
                setRentals(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Geçmiş çekilirken hata:", err);
                setError("Kiralama geçmişiniz yüklenemedi. Lütfen daha sonra tekrar deneyin.");
                setLoading(false);
            }
        };

        fetchRentals();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6 font-sans text-gray-900">
            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 flex items-center gap-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
                        👤
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Hesabım</h1>
                        <p className="text-gray-500 mt-1">Kiralama geçmişinizi ve faturalarınızı buradan takip edebilirsiniz.</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-lg text-lg">🧾</span>
                    Kiralama Geçmişim
                </h2>

                {loading && <div className="text-center font-bold text-xl py-10 text-gray-500">Kayıtlar aranıyor... ⏳</div>}
                {error && <div className="bg-red-100 text-red-600 font-bold p-6 rounded-2xl text-center border border-red-200">{error}</div>}

                {!loading && !error && rentals.length === 0 && (
                    <div className="text-center bg-white p-12 rounded-3xl border border-dashed border-gray-300">
                        <span className="text-5xl mb-4 block">🏜️</span>
                        <h3 className="text-xl font-bold text-gray-800">Henüz hiç araç kiralamamışsınız.</h3>
                        <p className="text-gray-500 mt-2 mb-6">Yola çıkmak için harika araçlarımız sizi bekliyor.</p>
                        <button onClick={() => navigate("/")} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                            Araçlarımıza Göz At
                        </button>
                    </div>
                )}

                {!loading && !error && rentals.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {rentals.map((rental) => (
                            <div key={rental.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col relative overflow-hidden">

                                <div className="absolute top-0 right-0 w-16 h-1 bg-blue-500"></div>

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 mb-1">Kiralama No: #{rental.id}</p>
                                        <h3 className="text-2xl font-black text-slate-800 tracking-wider">
                                            {rental.carPlate}
                                        </h3>
                                    </div>
                                    <div className="bg-green-50 text-green-700 font-bold px-3 py-1 rounded-lg text-sm border border-green-100">
                                        Onaylandı
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                    <div className="flex gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Başlangıç Tarihi</p>
                                            <p className="font-bold text-gray-800">{rental.dateStarted}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                                                Bitiş Tarihi
                                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full ml-1">
                                                    {rental.rentedForDays} Gün
                                                </span>
                                            </p>
                                            <p className="font-bold text-red-600">
                                                {(() => {
                                                    const start = new Date(rental.dateStarted);
                                                    start.setDate(start.getDate() + rental.rentedForDays);
                                                    return start.toISOString().split('T')[0];
                                                })()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-3 md:pt-0">
                                        <p className="text-sm text-gray-500 font-medium">Ödenen Tutar</p>
                                        <p className="text-2xl font-black text-blue-600">₺{rental.totalPrice}</p>
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

export default ProfilePage;