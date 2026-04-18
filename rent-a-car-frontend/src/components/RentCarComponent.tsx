import { useState } from 'react';
import RentalService from '../services/RentalService';

interface RentCarProps {
    carId: number;
    dailyPrice: number;
    carName: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const RentCarComponent = ({ carId, dailyPrice, carName, onSuccess, onCancel }: RentCarProps) => {
    const [dateStarted, setDateStarted] = useState('');
    const [rentedForDays, setRentedForDays] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleRent = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setError("Kiralama yapmak için önce giriş yapmalısınız!");
            return;
        }

        const requestData = {
            carId: carId,
            userId: parseInt(userId),
            dateStarted: dateStarted,
            rentedForDays: rentedForDays
        };

        try {
            setLoading(true);
            setError('');
            await RentalService.rentCar(requestData);

            setIsSuccess(true);

            setTimeout(() => {
                onSuccess();
            }, 3000);

        } catch (err: any) {
            setError(err.response?.data?.message || "Kiralama işlemi başarısız oldu.");
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-bounce-short">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg shadow-green-200">
                    ✓
                </div>
                <h3 className="text-2xl font-black text-slate-800">İşlem Başarılı!</h3>
                <p className="text-slate-500 mt-2">
                    <span className="font-bold text-slate-700">{carName}</span> başarıyla kiralandı. <br />
                    Keyifli sürüşler dileriz! 🚗💨
                </p>
                <button
                    onClick={onSuccess}
                    className="mt-6 text-blue-600 font-bold hover:underline"
                >
                    Hemen listeye dön
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h3 className="font-black text-2xl text-slate-800">{carName}</h3>
                <p className="text-slate-500">Kiralama detaylarını belirleyin</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold border border-red-100">{error}</div>}

            <div className="flex flex-col gap-3">
                <label className="font-semibold text-slate-700 text-sm">
                    Başlangıç Tarihi:
                    <input
                        type="date"
                        className="border border-slate-200 p-3 rounded-xl w-full mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={dateStarted}
                        onChange={(e) => setDateStarted(e.target.value)}
                    />
                </label>

                <label className="font-semibold text-slate-700 text-sm">
                    Kaç Gün?:
                    <input
                        type="number"
                        min="1"
                        className="border border-slate-200 p-3 rounded-xl w-full mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={rentedForDays}
                        onChange={(e) => setRentedForDays(parseInt(e.target.value))}
                    />
                </label>

                <div className="bg-blue-50 p-4 rounded-2xl mt-2 flex justify-between items-center border border-blue-100">
                    <span className="font-bold text-blue-800/60">Toplam Tutar:</span>
                    <span className="text-2xl font-black text-blue-600">₺{dailyPrice * rentedForDays}</span>
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
                    >
                        İptal
                    </button>
                    <button
                        onClick={handleRent}
                        disabled={loading || !dateStarted}
                        className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/30"
                    >
                        {loading ? "Onaylanıyor..." : "Onayla ve Kirala"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RentCarComponent;