import { useState, useEffect, useMemo } from "react";
import { Search, Plus, X, Building2, Phone, Mail, MapPin, FileText, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  fetchCustomerOrders,
  type CustomerOrder,
} from "../../services/customersApi";
import type { Customer } from "../../types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
}

function formatCurrency(n: number | null) {
  if (n == null) return "—";
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  storeId: string;
}

interface ModalState {
  open: boolean;
  customer: Customer | null; // null = create mode
}

// ─── Customer Modal ──────────────────────────────────────────────────────────

function CustomerModal({
  storeId,
  customer,
  onClose,
  onSaved,
}: {
  storeId: string;
  customer: Customer | null;
  onClose: () => void;
  onSaved: (c: Customer) => void;
}) {
  const isEdit = !!customer;
  const [name, setName] = useState(customer?.name ?? "");
  const [whatsapp, setWhatsapp] = useState(customer?.whatsapp ?? "");
  const [email, setEmail] = useState(customer?.email ?? "");
  const [address, setAddress] = useState(customer?.address ?? "");
  const [companyName, setCompanyName] = useState(customer?.company_name ?? "");
  const [notes, setNotes] = useState(customer?.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) {
      setError("Nombre y WhatsApp son obligatorios.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      let saved: Customer;
      if (isEdit) {
        saved = await updateCustomer(customer.id, {
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim() || null,
          address: address.trim() || null,
          company_name: companyName.trim() || null,
          notes: notes.trim() || null,
        });
      } else {
        saved = await createCustomer({
          store_id: storeId,
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim() || null,
          address: address.trim() || null,
          company_name: companyName.trim() || null,
          notes: notes.trim() || null,
        });
      }
      onSaved(saved);
    } catch (err: any) {
      setError(err.message ?? "Error al guardar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">
            {isEdit ? "Editar cliente" : "Nuevo cliente"}
          </h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Nombre *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre completo"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">WhatsApp *</label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+54 9 11 1234-5678"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Empresa</label>
            <div className="relative">
              <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nombre de empresa (opcional)"
                className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Notas</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notas internas sobre el cliente…"
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Order History Panel ──────────────────────────────────────────────────────

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  preparing: "En preparación",
  ready: "Listo",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-purple-100 text-purple-700",
  ready: "bg-cyan-100 text-cyan-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

function OrderHistoryPanel({
  customer,
  storeId,
  onAssignCompany,
}: {
  customer: Customer;
  storeId: string;
  onAssignCompany: (companyName: string) => void;
}) {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerOrders(customer.id, storeId)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [customer.id, storeId]);

  // Detect company from orders if customer has none
  const detectedCompany = useMemo(() => {
    if (customer.company_name) return null;
    for (const o of orders) {
      const c = o.metadata?.company_name;
      if (c) return c;
    }
    return null;
  }, [orders, customer.company_name]);

  return (
    <div className="mt-4 space-y-3">
      {/* Detected company badge */}
      {detectedCompany && (
        <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Building2 size={15} className="text-blue-500" />
            <span className="text-sm text-blue-700">
              Empresa detectada: <strong>{detectedCompany}</strong>
            </span>
          </div>
          <button
            onClick={() => onAssignCompany(detectedCompany)}
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
          >
            <CheckCircle size={13} />
            Asociar
          </button>
        </div>
      )}

      {/* Orders list */}
      {loading ? (
        <p className="py-4 text-center text-sm text-slate-400">Cargando pedidos…</p>
      ) : orders.length === 0 ? (
        <p className="py-4 text-center text-sm text-slate-400">Sin pedidos registrados.</p>
      ) : (
        <div className="space-y-2">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-700">
                  #{order.order_number ?? order.public_id}
                </p>
                <p className="text-xs text-slate-400">{formatDate(order.created_at)}</p>
                {order.metadata?.company_name && (
                  <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-blue-600">
                    <Building2 size={11} />
                    {order.metadata.company_name}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] ?? "bg-slate-100 text-slate-600"}`}
                >
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Customer Card ────────────────────────────────────────────────────────────

function CustomerCard({
  customer,
  storeId,
  onEdit,
  onCompanyAssigned,
}: {
  customer: Customer;
  storeId: string;
  onEdit: () => void;
  onCompanyAssigned: (customerId: string, companyName: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  async function handleAssignCompany(companyName: string) {
    try {
      const updated = await updateCustomer(customer.id, { company_name: companyName });
      onCompanyAssigned(customer.id, updated.company_name ?? companyName);
    } catch (err) {
      console.error("Error al asignar empresa:", err);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Card header */}
      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          {/* Left: name + meta */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-slate-800">{customer.name}</p>

            {/* Company */}
            {customer.company_name && (
              <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-blue-600">
                <Building2 size={11} />
                {customer.company_name}
              </p>
            )}

            {/* Contact chips */}
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Phone size={11} />
                {customer.whatsapp}
              </span>
              {customer.email && (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Mail size={11} />
                  {customer.email}
                </span>
              )}
              {customer.address && (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin size={11} />
                  {customer.address}
                </span>
              )}
            </div>
          </div>

          {/* Right: stats + actions */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">{formatCurrency(customer.total_spent)}</p>
              <p className="text-xs text-slate-400">
                {customer.total_orders ?? 0} pedido{customer.total_orders !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={onEdit}
                className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
              >
                Editar
              </button>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
              >
                Pedidos
                {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>
          </div>
        </div>

        {/* Notes */}
        {customer.notes && (
          <p className="mt-2 flex items-start gap-1 text-xs text-slate-400">
            <FileText size={11} className="mt-0.5 shrink-0" />
            {customer.notes}
          </p>
        )}
      </div>

      {/* Order history (expandable) */}
      {expanded && (
        <div className="border-t border-slate-100 px-4 pb-4">
          <OrderHistoryPanel
            customer={customer}
            storeId={storeId}
            onAssignCompany={handleAssignCompany}
          />
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CustomersPage({ storeId }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [modal, setModal] = useState<ModalState>({ open: false, customer: null });

  // Load customers
  useEffect(() => {
    if (!storeId) return;
    setLoading(true);
    fetchCustomers(storeId)
      .then(setCustomers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [storeId]);

  // Client-side filtering
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cf = companyFilter.trim().toLowerCase();
    return customers.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.whatsapp.toLowerCase().includes(q) ||
        (c.email ?? "").toLowerCase().includes(q);
      const matchesCompany =
        !cf || (c.company_name ?? "").toLowerCase().includes(cf);
      return matchesSearch && matchesCompany;
    });
  }, [customers, search, companyFilter]);

  function handleSaved(saved: Customer) {
    setCustomers((prev) => {
      const idx = prev.findIndex((c) => c.id === saved.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = saved;
        return next;
      }
      return [saved, ...prev];
    });
    setModal({ open: false, customer: null });
  }

  function handleCompanyAssigned(customerId: string, companyName: string) {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, company_name: companyName } : c))
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-2xl space-y-4">

        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
            <p className="text-sm text-slate-500">{customers.length} registrados</p>
          </div>
          <button
            onClick={() => setModal({ open: true, customer: null })}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
          >
            <Plus size={16} />
            Nuevo cliente
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, WhatsApp o email…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm shadow-sm focus:border-blue-400 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Company filter */}
        <div className="relative">
          <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            placeholder="Filtrar por empresa…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm shadow-sm focus:border-blue-400 focus:outline-none"
          />
          {companyFilter && (
            <button
              onClick={() => setCompanyFilter("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Results count when filtering */}
        {(search || companyFilter) && !loading && (
          <p className="text-xs text-slate-400">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Content */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={() => {
                setError("");
                setLoading(true);
                fetchCustomers(storeId)
                  .then(setCustomers)
                  .catch((e) => setError(e.message))
                  .finally(() => setLoading(false));
              }}
              className="mt-2 text-sm font-medium text-red-700 underline"
            >
              Reintentar
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center">
            <p className="text-sm text-slate-400">
              {search || companyFilter ? "Sin resultados para los filtros aplicados." : "Aún no hay clientes."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                storeId={storeId}
                onEdit={() => setModal({ open: true, customer })}
                onCompanyAssigned={handleCompanyAssigned}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit modal */}
      {modal.open && (
        <CustomerModal
          storeId={storeId}
          customer={modal.customer}
          onClose={() => setModal({ open: false, customer: null })}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
