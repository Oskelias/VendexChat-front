import { useState, useEffect, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import type { QuickResponse } from "../../types";
import "./QuickResponsesPanel.css";

interface QuickResponsesPanelProps {
  storeId: string;
}

export function QuickResponsesPanel({ storeId }: QuickResponsesPanelProps) {
  const [responses, setResponses] = useState<QuickResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Load quick responses
  useEffect(() => {
    loadResponses();
  }, [storeId]);

  const loadResponses = async () => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from("quick_responses")
        .select("*")
        .eq("store_id", storeId)
        .order("created_at", { ascending: false });

      if (err) throw err;
      setResponses(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar respuestas");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!question.trim() || !answer.trim()) {
      setError("Pregunta y respuesta no pueden estar vacías");
      return;
    }

    try {
      const { error: err } = await supabase
        .from("quick_responses")
        .insert([{ store_id: storeId, question, answer }]);

      if (err) throw err;

      setQuestion("");
      setAnswer("");
      await loadResponses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al agregar respuesta");
    }
  };

  const handleUpdate = async (id: string, updatedQuestion: string, updatedAnswer: string) => {
    if (!updatedQuestion.trim() || !updatedAnswer.trim()) {
      setError("Pregunta y respuesta no pueden estar vacías");
      return;
    }

    try {
      const { error: err } = await supabase
        .from("quick_responses")
        .update({ question: updatedQuestion, answer: updatedAnswer })
        .eq("id", id);

      if (err) throw err;

      setEditingId(null);
      await loadResponses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar respuesta");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Eliminar esta respuesta rápida?")) return;

    try {
      const { error: err } = await supabase
        .from("quick_responses")
        .delete()
        .eq("id", id);

      if (err) throw err;
      await loadResponses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar respuesta");
    }
  };

  if (loading) {
    return <div className="quick-responses-panel__loading">Cargando respuestas rápidas...</div>;
  }

  return (
    <div className="quick-responses-panel">
      <div className="quick-responses-panel__header">
        <h3>Respuestas Rápidas</h3>
        <p className="quick-responses-panel__subtitle">
          Agregá preguntas frecuentes que el asistente IA usará automáticamente
        </p>
      </div>

      {error && <div className="quick-responses-panel__error">{error}</div>}

      <div className="quick-responses-panel__form">
        <div className="quick-responses-panel__form-group">
          <label>Pregunta del cliente</label>
          <input
            type="text"
            placeholder="Ej: ¿Hacen envíos a domicilio?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && answer.trim()) handleAdd();
            }}
          />
        </div>

        <div className="quick-responses-panel__form-group">
          <label>Respuesta del bot</label>
          <textarea
            placeholder="Ej: Sí, hacemos envíos a toda la ciudad de lunes a sábado de 11hs a 23hs."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={3}
          />
        </div>

        <button className="quick-responses-panel__add-btn" onClick={handleAdd}>
          + Agregar
        </button>
      </div>

      <div className="quick-responses-panel__list">
        {responses.length === 0 ? (
          <p className="quick-responses-panel__empty">
            Sin respuestas rápidas aún. ¡Agregá las primeras!
          </p>
        ) : (
          responses.map((response) =>
            editingId === response.id ? (
              <EditingRow
                key={response.id}
                response={response}
                onSave={(q, a) => handleUpdate(response.id, q, a)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <ResponseRow
                key={response.id}
                response={response}
                onEdit={() => setEditingId(response.id)}
                onDelete={() => handleDelete(response.id)}
              />
            )
          )
        )}
      </div>
    </div>
  );
}

function ResponseRow({
  response,
  onEdit,
  onDelete,
}: {
  response: QuickResponse;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="quick-response-item">
      <div className="quick-response-item__content">
        <p className="quick-response-item__question">
          <strong>P:</strong> {response.question}
        </p>
        <p className="quick-response-item__answer">
          <strong>R:</strong> {response.answer}
        </p>
      </div>
      <div className="quick-response-item__actions">
        <button className="quick-response-item__edit" onClick={onEdit}>
          Editar
        </button>
        <button className="quick-response-item__delete" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

function EditingRow({
  response,
  onSave,
  onCancel,
}: {
  response: QuickResponse;
  onSave: (question: string, answer: string) => void;
  onCancel: () => void;
}) {
  const [q, setQ] = useState(response.question);
  const [a, setA] = useState(response.answer);

  return (
    <div className="quick-response-item quick-response-item--editing">
      <div className="quick-response-item__edit-form">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="quick-response-item__edit-input"
        />
        <textarea
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="quick-response-item__edit-textarea"
          rows={3}
        />
      </div>
      <div className="quick-response-item__actions">
        <button className="quick-response-item__save" onClick={() => onSave(q, a)}>
          Guardar
        </button>
        <button className="quick-response-item__cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
