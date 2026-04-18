const Spinner = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 0' }}>
            {/* Dönen Çember */}
            <div style={{
                width: '60px',
                height: '60px',
                border: '6px solid #f3f3f3',
                borderTop: '6px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }}></div>

            {/* Kullanıcıyı Bilgilendiren Metin */}
            <h3 style={{ marginTop: '20px', color: '#555', fontFamily: 'sans-serif' }}>
                Sistem Motoru Isıtıyor...
            </h3>
            <p style={{ color: '#888', fontSize: '14px', fontFamily: 'sans-serif' }}>
                Ücretsiz bulut sunucusu kullanıldığı için ilk yükleme 30-40 saniye sürebilir.
            </p>

            {/* Animasyon için CSS */}
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default Spinner;