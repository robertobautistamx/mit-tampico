
import React, { useState } from "react";
import { useProductos, Producto } from "../../modules/productos/productos";
import { Table } from "../../components/Table";
import { ButtonPrimary, ButtonDanger, ButtonWarning } from "../../components/ActionButtons";

import { ConfirmModal } from "../../components/ConfirmModal";

export default function ProductosPage() {
  const { productos, loading, error, createProducto, updateProducto, deleteProducto } = useProductos();
  const [editing, setEditing] = useState<Producto | null>(null);
  const [form, setForm] = useState<Partial<Producto>>({ nombre: "", precio: 0, stock: 0, activo: true });
  const [modal, setModal] = useState<{ open: boolean; type: "edit" | "delete" | null; producto?: Producto }>({ open: false, type: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await updateProducto(editing.id, form);
      setEditing(null);
    } else {
      await createProducto(form);
    }
    setForm({ nombre: "", precio: 0, stock: 0, activo: true });
  };

  const handleEdit = (prod: Producto) => {
    setModal({ open: true, type: "edit", producto: prod });
  };

  const handleDelete = (prod: Producto) => {
    setModal({ open: true, type: "delete", producto: prod });
  };

  const handleModalConfirm = async () => {
    if (modal.type === "delete" && modal.producto) {
      await deleteProducto(modal.producto.id);
    }
    if (modal.type === "edit" && modal.producto) {
      setEditing(modal.producto);
      setForm(modal.producto);
    }
    setModal({ open: false, type: null });
  };

  const handleModalCancel = () => {
    setModal({ open: false, type: null });
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 32 }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 18 }}>Productos</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: 'center' }}>
        <input name="nombre" value={form.nombre || ""} onChange={handleChange} placeholder="Nombre" required style={{ flex: 2, padding: 8 }} />
        <input name="precio" type="number" value={form.precio || 0} onChange={handleChange} placeholder="Precio" required style={{ flex: 1, padding: 8 }} />
        <input name="stock" type="number" value={form.stock || 0} onChange={handleChange} placeholder="Stock" required style={{ flex: 1, padding: 8 }} />
        <ButtonPrimary type="submit">
          {editing ? "Actualizar" : "Crear"}
        </ButtonPrimary>
        {editing && (
          <ButtonDanger type="button" onClick={() => { setEditing(null); setForm({ nombre: "", precio: 0, stock: 0, activo: true }); }}>
            Cancelar
          </ButtonDanger>
        )}
      </form>

      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
          <Table
            columns={[
              { key: "nombre", label: "Nombre" },
              { key: "precio", label: "Precio" },
              { key: "stock", label: "Stock" },
              { key: "activo", label: "Activo" },
            ]}
            data={productos}
            renderActions={(prod) => (
              <>
                <ButtonWarning style={{ marginRight: 8 }} onClick={() => handleEdit(prod)}>
                  Editar
                </ButtonWarning>
                <ButtonDanger onClick={() => handleDelete(prod)}>
                  Eliminar
                </ButtonDanger>
              </>
            )}
          />
      )}

      <ConfirmModal
        open={modal.open}
        title={modal.type === "delete" ? "Confirmar Eliminación" : "Editar Producto"}
        description={
          modal.type === "delete"
            ? `¿Estás seguro de que deseas eliminar el producto "${modal.producto?.nombre}"? Esta acción no se puede deshacer.`
            : `¿Deseas editar el producto "${modal.producto?.nombre}"?`
        }
        confirmText={modal.type === "delete" ? "Eliminar" : "Editar"}
        cancelText="Cancelar"
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        danger={modal.type === "delete"}
      />
    </div>
  );
}

