
import React, { useState } from "react";
import { useCategorias } from "../../modules/categorias/categorias";
import type { Categoria } from "../../modules/categorias/categorias";
import { Table } from "../../components/Table";
import { ButtonPrimary, ButtonDanger, ButtonWarning } from "../../components/ActionButtons";
import { ConfirmModal } from "../../components/ConfirmModal";


export default function CategoriasPage() {

  const { categorias, loading, error, createCategoria, updateCategoria, deleteCategoria } = useCategorias();
  const [editing, setEditing] = useState<Categoria | null>(null);
  const [form, setForm] = useState<Partial<Categoria>>({ nombre: "" });
  const [modal, setModal] = useState<{ open: boolean; type: "edit" | "delete" | null; categoria?: Categoria }>({ open: false, type: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { nombre: form.nombre };
    if (editing) {
      await updateCategoria(editing.id, data);
      setEditing(null);
    } else {
      await createCategoria(data);
    }
    setForm({ nombre: "" });
  };


  const handleEdit = (cat: Categoria) => {
    setEditing(cat);
    setForm({ nombre: cat.nombre });
  };

  const handleDelete = (cat: Categoria) => {
    setModal({ open: true, type: "delete", categoria: cat });
  };

  const handleModalConfirm = async () => {
    if (modal.type === "delete" && modal.categoria) {
      await deleteCategoria(modal.categoria.id);
    }
    setModal({ open: false, type: null });
  };

  const handleModalCancel = () => {
    setModal({ open: false, type: null });
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 32 }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 18 }}>Categorías</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: 'center' }}>
        <input name="nombre" value={form.nombre || ""} onChange={handleChange} placeholder="Nombre" required style={{ flex: 2, padding: 8 }} />
        <ButtonPrimary type="submit">{editing ? "Actualizar" : "Crear"}</ButtonPrimary>
        {editing && <ButtonDanger type="button" onClick={() => { setEditing(null); setForm({ nombre: "" }); }}>Cancelar</ButtonDanger>}
      </form>
      {loading ? <div>Cargando...</div> : error ? <div style={{ color: 'red' }}>{error}</div> : (
        <Table
          columns={[{ key: "nombre", label: "Nombre" }]}
          data={categorias}
          renderActions={(cat: Categoria) => (
            <>
              <ButtonWarning style={{ marginRight: 8 }} onClick={() => handleEdit(cat)}>Editar</ButtonWarning>
              <ButtonDanger onClick={() => handleDelete(cat)}>Eliminar</ButtonDanger>
            </>
          )}
        />
      )}

      <ConfirmModal
        open={modal.open}
        title="Eliminar categoría"
        description={`¿Seguro que deseas eliminar la categoría "${modal.categoria?.nombre}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        danger
      />
    </div>
  );
}