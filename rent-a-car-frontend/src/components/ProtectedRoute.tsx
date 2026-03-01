import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // KURAL 1: Adamın bileti (token) yoksa kapıdan içeri alma, Login'e yolla.
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // KURAL 2: Bileti var ama yetkisi ADMIN değilse, VIP odaya (Admin'e) alma, Ana Sayfaya yolla.
    if (role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    // Sorun yoksa, VIP odaya geçebilir.
    return <Outlet />;
};

export default ProtectedRoute;