import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 p-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <Link to="/" className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    RentA<span className="text-blue-600">Car</span>
                </Link>

                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-500 hover:text-blue-600 font-semibold transition">Ana Sayfa</Link>
                    <Link to="/cars" className="text-gray-500 hover:text-blue-600 font-semibold transition">Araçlarımız</Link>

                    {token ? (
                        <>
                            {role === 'ADMIN' && (
                                <Link to="/admin" className="text-gray-500 hover:text-blue-600 font-semibold transition">
                                    Yönetim Paneli
                                </Link>
                            )}

                            <Link to="/profile" className="text-gray-500 hover:text-blue-600 font-semibold transition">
                                Profilim
                            </Link>
                            <button onClick={handleLogout} className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl font-bold transition">
                                Çıkış Yap
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition shadow-lg shadow-blue-500/30">
                            Giriş Yap
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;