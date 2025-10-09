import React from "react";

const DashboardAdmin: React.FC = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Dashboard do Administrador</h1>
            <section style={{ marginTop: "2rem" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.5rem"
                }}>
                    <div style={{ background: "#f5f5f5", padding: "1.5rem", borderRadius: "8px" }}>
                        <h2>Usuários</h2>
                        <p>Gerencie usuários cadastrados.</p>
                        <button>Ver usuários</button>
                    </div>
                    <div style={{ background: "#f5f5f5", padding: "1.5rem", borderRadius: "8px" }}>
                        <h2>Relatórios</h2>
                        <p>Acesse relatórios do sistema.</p>
                        <button>Ver relatórios</button>
                    </div>
                    <div style={{ background: "#f5f5f5", padding: "1.5rem", borderRadius: "8px" }}>
                        <h2>Configurações</h2>
                        <p>Altere configurações administrativas.</p>
                        <button>Configurar</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashboardAdmin;